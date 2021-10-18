import os
import urllib
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config.config import getFirebaseConfig
from src.cryptoUtil import encryptImages, getDecryptedImage, cacheImages
from src import constants

app = Flask(__name__, static_url_path='/build/static', static_folder='build')

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

imgs = {}
ttlImgs = len(os.listdir(constants.IMAGES_ENCRYPTED_DIR))
# imgs = cacheImages(ImageHashDB)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/api/getImage/<image_id>', methods=['POST'])
def getImage(image_id):
    image_id = int(image_id)
    image_id = image_id % ttlImgs if image_id > ttlImgs-1 else image_id
    if image_id in imgs.keys():
        return imgs[image_id]
    else:
        imgs[image_id] = getDecryptedImage(ImageHashDB, f"{image_id}.png")
        return imgs[image_id]

if __name__ == '__main__':
    encryptImages(ImageHashDB, db, False)
    db.create_all()    
    app.run(debug=True)