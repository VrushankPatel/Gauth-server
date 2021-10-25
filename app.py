import os
import urllib
import hashlib
from autopylogger import init_logging
from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config.config import getFirebaseConfig
from src import constants
from src.securityUtil import (encryptImages, getDecryptedImage,
                            validateToken)                    
from src.util import buildResponse, buildResponseWithImgId, cacheImages
import pickle

logger = init_logging(log_name="Gauth-logs", log_directory="logsdir")

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

imgs = dict()
db = SQLAlchemy(app)
class ImageHashDB(db.Model):
    __tablename__ = 'imageHashDB'
    img_id = db.Column('image_id', db.String(100), primary_key=True)    
    key = db.Column('key', db.String(10485760))
    iv = db.Column('iv', db.String(10485760))

    def __init__(self, img_id, key, iv):
        self.img_id = img_id        
        self.key = key
        self.iv = iv

class UserRecord(db.Model):
    __tablename__ = 'UserRecord'
    firstName = db.Column('firstName', db.String(100))
    lastName = db.Column('lastName', db.String(100))
    userName = db.Column('userName', db.String(1000), primary_key=True)
    password = db.Column('password', db.String(1000))
    imgId = db.Column('imgId', db.Integer)
    coordHash = db.Column('coordHash', db.String(1000))

    def __init__(self, jsonObj):
        super().__init__()
        self.firstName = jsonObj['firstName']
        self.lastName = jsonObj['lastName']
        self.userName = jsonObj['userName']
        self.password = str(hashlib.md5(jsonObj['password'].encode()).digest())
        self.imgId = jsonObj['imgId']
        self.coordHash = jsonObj['coordHash']

# encryptImages(ImageHashDB, db, False)
ttlImgs = len(os.listdir(constants.IMAGES_ENCRYPTED_DIR))

imgs = cacheImages(ImageHashDB)

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        if checkIfUserExists(request.json['userName'])[1] == 200:
            return buildResponse("Record Already Exists", 409)
        else:
            record = UserRecord(request.json)
            db.session.add(record)
            db.session.commit()        
            return buildResponse("Record successfully inserted", 200)
    except:
        return buildResponse("DB Server closed connection..", 500)
    

@app.route('/api/getImage/<image_id>', methods=['POST'])
def getImage(image_id):    
    token = request.args['x-token']
    if not validateToken(token): 
        logger.warn("Token is Expired")
        return buildResponse("Token Expired!.", 401)
    image_id = int(image_id)
    image_id = image_id % ttlImgs if image_id > ttlImgs-1 else image_id
    if image_id in imgs.keys():
        return imgs[image_id]
    else:
        imgs[image_id] = getDecryptedImage(ImageHashDB, f"{image_id}.png")
        return imgs[image_id]
    
@app.route('/api/checkIfUserExists/<userName>', methods=['POST'])
def checkIfUserExists(userName):
    record = UserRecord.query.filter(UserRecord.userName == userName).first()
    return buildResponseWithImgId("User Exists", record.imgId, 200) if record else buildResponse("User doesn't exists", 404)     

@app.route('/api/login', methods=['POST'])
def login():
    try:
        userName = request.json['userName']
        if checkIfUserExists(userName)[1] == 404:
            return buildResponse("No such user exists", 404)
        record = UserRecord.query.filter(UserRecord.userName == userName).first()
        if 'password' in request.json.keys():
            return buildResponse("Successfully logged in.",200) if record.password == str(hashlib.md5(request.json['password'].encode()).digest()) else buildResponse("Invalid password", 403)
        elif 'coordHash' in request.json.keys():
            return buildResponse("Successfully logged in.",200) if record.coordHash == request.json['coordHash'] else buildResponse("Invalid coordHash", 403)
    except:
        buildResponse("Unknown error occured!", 500)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)