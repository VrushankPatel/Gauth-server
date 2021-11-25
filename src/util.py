from flask import jsonify
from autopylogger import init_logging
from .securityUtil import getDecryptedImage
import pickle
from . import constants
import os
import time
import hashlib

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
        if failAttempts[userName] >= 3:
            logger.warning(f"Locking {userName} because of 3 wrong attempts.")
            record = LockedAccounts(userName, int(time.time()))
            db.session.add(record)
            db.session.commit()
            del failAttempts[userName]
        else:            
            failAttempts[userName] += 1
            logger.warning(f"Failed attempt(s) of {userName} : {failAttempts[userName]}")
    else:
        failAttempts[userName] = 1
        logger.warning(f"Failed attempt(s) of {userName} : {failAttempts[userName]}")
    return buildResponse(message, statusCode)    

def returnResponseIfPwdPassed(record, encodedPwd, LockedAccounts, db):
    logger.info(f"{record.userName} wants to login with password.")
    return buildResponse("Successfully logged in.",200) if record.password == str(hashlib.md5(encodedPwd).digest()) else countTimeAndSendErrorLogin("Invalid password", 403, record.userName, LockedAccounts, db)

def returnResponseIfCoordHashPassed(record, coordHash, LockedAccounts, db):
    logger.info(f"{record.userName} wants to login with Coordinates.")
    return buildResponse("Successfully logged in.",200) if record.coordHash == coordHash else countTimeAndSendErrorLogin("Invalid coordHash", 403, record.userName, LockedAccounts, db)

def isUserLocked(LockedAccounts, userName):    
    record = LockedAccounts.query.filter(LockedAccounts.userName == userName).first()    
    if record:
        if int(time.time()) - int(record.lockedTime) < 60:
            logger.warning(f"{userName} is locked.")
            return True
        else:
            LockedAccounts.query.filter_by(userName=userName).delete()
    return False
    