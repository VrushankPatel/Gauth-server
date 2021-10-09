import pyaes
import pbkdf2
import binascii
import os
import secrets
import base64
from PIL import Image
from io import BytesIO
from urllib.request import urlopen

password = "s3cr3t*c0d3"

def encryption(imgName):
    with open(f"assets/imgs-original/{imgName}", "rb") as image_file:
        data = base64.b64encode(image_file.read())

    # # Derive a 256-bit AES encryption key from the password
    
    # passwordSalt = os.urandom(16)
    passwordSalt = b" \x04\xcfn,Nz'}\xae\x01>M\xb3\xd5\x87"
    print(passwordSalt)
    # key = pbkdf2.PBKDF2(password, passwordSalt).read(32)
    key = b'G6\xc5\xc3\x84e \x0c\x93a\x83\x98\xfc\xdf\xc4\x1f3}\xc5p\x17\xde?;\xf6Pf\xc7)7U\xfb'
    print('AES encryption key:', binascii.hexlify(key))

    # Encrypt the plaintext with the given key:
    #   ciphertext = AES-256-CTR-Encrypt(plaintext, key, iv)
    # iv = secrets.randbits(256)
    iv = 62373259168451568559532187460840030189149346872845040756263784518798946831509
    plaintext = data
    aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
    ciphertext = aes.encrypt(plaintext)
    # print('Encrypted:', binascii.hexlify(ciphertext))
    with open(f"assets/imgs-encrypted/{imgName}", "wb") as image_enc:
        image_enc.write(ciphertext)

    with open(f"assets/imgs-encrypted/{imgName}", "rb") as image_enc:
        img = image_enc.read()

    aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
    decrypted = aes.decrypt(img)
    # print('Decrypted:', decrypted.decode())

    im = Image.open(BytesIO(base64.b64decode(decrypted.decode())))
    im.save(f'assets/imgs-decrypted-test/{imgName}', 'PNG')

for i in os.listdir("assets/imgs-original"):
    encryption(i)