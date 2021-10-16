import os
import urllib
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config.config import getFirebaseConfig
from src.cryptoUtil import encryptImages, getDecryptedImage, cacheImages

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
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


@app.route('/api/getImage/<image_id>', methods=['POST'])
def getImage(image_id):       
    image_id = int(image_id)
    image_id = image_id % len(imgs) if image_id > len(imgs)-1 else image_id
    print(imgs)
    return imgs[image_id]       

if __name__ == '__main__':
    db.create_all()
    # encryptImages(ImageHashDB, db, False)
    imgs = cacheImages(ImageHashDB)
    app.run(debug=True)