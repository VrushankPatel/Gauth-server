from flask import Flask
from config.config import getFirebaseConfig
import pyrebase
import urllib
from flask_sqlalchemy import SQLAlchemy
import os

storage = getFirebaseConfig(pyrebase).storage()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class ImageHashDB(db.Model):
    img_id = db.Column('image_id', db.String(100), primary_key=True)
    cipher = db.Column('cipher', db.String(10485760))

    def __init__(self, img_id, cipher):
        self.img_id = img_id
        self.cipher = cipher


@app.route('/api/getImage/<image_id>')
def main(image_id):
    print(image_id)
    path = storage.child("image2.png").get_url(None)
    f = urllib.request.urlopen(path).read()
    f = bytearray(f)
    fin = open("decrypted.jpeg", 'wb')
    fin.write(f)
    fin.close()
    return "f"


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
