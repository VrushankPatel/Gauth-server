from flask import jsonify

def buildResponse(message, statusCode):
    return jsonify({"message" : message}), statusCode