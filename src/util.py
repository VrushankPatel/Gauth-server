from flask import jsonify
from autopylogger import init_logging
from .securityUtil import getDecryptedImage
import pickle5 as pickle
from . import constants
import os

logger = init_logging(log_name="Gauth-logs", log_directory="logsdir")

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