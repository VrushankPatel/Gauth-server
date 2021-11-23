from flask import jsonify
from autopylogger import init_logging
from .securityUtil import getDecryptedImage
import pickle
from . import constants
import os
import time

logger = init_logging(log_name="Gauth-utilities", log_directory="logsdir")
failAttempts = dict()

def buildResponse(message, statusCode):
    return jsonify({"message" : message}), statusCode

def buildResponseWithImgId(message, imgId, statusCode):
    return jsonify({"message" : message, "imgId" : str(imgId)}), statusCode

def cacheImages(ImageHashDB):    
    imgs = checkIfPickledObject()
    if imgs:
        return imgs
    imgs = dict()
    logger.info("Started caching Images..")
    for i in range(len(os.listdir(constants.IMAGES_ENCRYPTED_DIR))):
        imgs[i] = getDecryptedImage(ImageHashDB, f"{i}.png")
        logger.info(f"Caching {i}.png")
    with open(constants.CACHED_PICKLE_FILE, 'wb') as outp:
        pickle.dump(imgs, outp, pickle.HIGHEST_PROTOCOL)
    return imgs

def checkIfPickledObject():
    if os.path.exists(constants.CACHED_PICKLE_FILE):
        logger.info("Found pickled object, utilizing it..")
        with open(constants.CACHED_PICKLE_FILE, 'rb') as inp:
            imgs = pickle.load(inp)
        return imgs
    return None

def countTimeAndSendErrorLogin(message, statusCode, userName, LockedAccounts, db):
    if userName in failAttempts.keys():        
        if failAttempts[userName] >= 5:            
            record = LockedAccounts(userName, int(time.time()))
            db.session.add(record)
            db.session.commit()
            del failAttempts[userName]
        else:            
            failAttempts[userName] += 1
    else:        
        failAttempts[userName] = 1    
    return buildResponse(message, statusCode)    
