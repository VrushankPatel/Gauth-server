from flask import jsonify

def buildResponse(message, statusCode):
    return jsonify({"message" : message}), statusCode

def buildResponseWithImgId(message, imgId, statusCode):
    return jsonify({"message" : message, "imgId" : str(imgId)}), statusCode