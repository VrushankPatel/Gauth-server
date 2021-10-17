import base64
import binascii
import datetime
import json
import logging
import os
import random
import secrets
import string
from io import BytesIO
from urllib.request import urlopen

import cv2
import numpy as np
import pbkdf2
import pyaes
from autopylogger import init_logging
from PIL import Image
from . import constants


logger = init_logging(log_name="Gauth-logs", log_directory="logsdir")


def encryptImages(ImageHashDb, db, forceEncrypt):
    unencryptedImages = checkIfImagesAreInSync(forceEncrypt)
    if not unencryptedImages:        
        return    
    logger.info(f"{unencryptedImages} will be encrypted now.")
    for imgName in unencryptedImages:        
        encryptImage(ImageHashDb, db, forceEncrypt, imgName)

def checkIfImagesAreInSync(forceEncrypt):
    originalImages = os.listdir(constants.IMAGES_ORIGINAL_DIR)
    encryptedImages = os.listdir(constants.IMAGES_ENCRYPTED_DIR)
    if not originalImages == encryptedImages:
        logger.warn("Images are not in sync, autoencryption is started..")  
    else:
        logger.info("Images are in sync,")
    if forceEncrypt:
        logger.warn("Encrypting images forcefully")    
    unencryptedImages = []
    if not forceEncrypt and originalImages == encryptedImages:
        return;
    unencryptedImages = originalImages if forceEncrypt else set(originalImages).difference(encryptedImages)
    return unencryptedImages

def encryptImage(ImageHashDb, db, forceEncrypt, imgName):
    with open(f"{constants.ASSET_DIR}imgs-original/{imgName}", "rb") as image_file:
        logger.info(f"encrypting {imgName}")
        data = base64.b64encode(image_file.read())

    logger.info("Generating cryptoSecrets for your image")
    password = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(11))
    passwordSalt = os.urandom(16)
    key = pbkdf2.PBKDF2(password, passwordSalt).read(32).decode('unicode-escape').encode('ISO-8859-1')
    iv = secrets.randbits(256)
    aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))

    logger.info("Encrypting image")
    try:
        ciphertext = aes.encrypt(data)        
        logger.info("Storing to cryptoDB")
        value = ImageHashDb.query.filter(ImageHashDb.img_id == imgName).first()
        if value:
            value.iv, value.key = iv, key.decode('unicode-escape')
        else:
            value = ImageHashDb(imgName, key.decode('unicode-escape'), iv)            
        db.session.add(value)
        logger.info("Committing to cryptoDB")
        db.session.commit()
        logger.info(f"Saving encrypted image to {imgName}")
        with open(f"{constants.ASSET_DIR}imgs-encrypted/{imgName}", "wb") as image_enc:
            image_enc.write(ciphertext)
    except Exception as e:
        print(e)
        logger.error("Error occured, reEncryption might be required for " + imgName)
        # encryptImage(ImageHashDb, db, forceEncrypt, imgName)
    logger.info(f"successfully encrypted image {imgName}")

def getDecryptedImage(ImageHashDB, imgName):
    cryptoData = ImageHashDB.query.filter(ImageHashDB.img_id == imgName).first()        
    key = str(cryptoData.key).encode('ISO-8859-1')
    iv = int(cryptoData.iv)    
    
    with open(f"{constants.ASSET_DIR}imgs-encrypted/{imgName}", "rb") as image_enc:
        img = image_enc.read()

    aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
    decrypted = aes.decrypt(img)        

    im = Image.open(BytesIO(base64.b64decode(decrypted.decode('ISO-8859-1'))))
    # im.save(f'{ASSET_DIR}imgs-decrypted-test/{imgName}', 'PNG')

    im_arr = np.asarray(im)
    _, im_arr = cv2.imencode('.jpg', im_arr)
    im_bytes = im_arr.tobytes()
    im_b64 = base64.b64encode(im_bytes)
    response = {
        "image": "data:image/png;base64," + decrypted.decode('ISO-8859-1')
    }
    return response

def cacheImages(ImageHashDB):
    imgs = dict()
    for i in range(len(os.listdir(constants.IMAGES_ENCRYPTED_DIR))):
        imgs[i] = getDecryptedImage(ImageHashDB, f"{i}.png")
    return imgs