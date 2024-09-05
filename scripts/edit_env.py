#!/usr/bin/python3

from Crypto.Cipher import AES
from getpass import getpass
from hashlib import md5
from base64 import b64encode, b64decode
from tempfile import NamedTemporaryFile

from pickle import loads as ploads, dumps as pdumps
from json import loads as jloads, dumps as jdumps

import shutil
import sys
import os

FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "env.aes")

def encrypt(data: bytes, key: bytes) -> bytes:
    hashed = md5(key).hexdigest()
    k1 = hashed[:16]
    k2 = hashed[16:]
    obj = AES.new(k1.encode(), AES.MODE_CBC, k2.encode())

    while len(data) % 16:
        data += b'='

    return obj.encrypt(data)

def decrypt(data: bytes, key: bytes) -> bytes:
    hashed = md5(key).hexdigest()
    k1 = hashed[:16]
    k2 = hashed[16:]
    obj = AES.new(k1.encode(), AES.MODE_CBC, k2.encode())
    data = obj.decrypt(data)
    if not len(data):
        return data
    while data[-1] == 61:
        data = data[:-1]
    return data

password = getpass("Password: ").encode()

with open(FILE_PATH, 'r') as f:
    data = b64decode(f.read())

data = decrypt(data, password)

try:
    data = ploads(data)
except:
    print("Could not deserialize. Wrong password ?")
    sys.exit(1)

tf = NamedTemporaryFile(delete=False)
tf.write(jdumps(data, indent=4).encode())
tf.close()
name = tf.name

os.system(f"$EDITOR {name}")

with open(name, 'rb') as f:
    data = b64encode(encrypt(pdumps(jloads(f.read())), password))

os.remove(name)

data = b'\n'.join([data[i:i+70] for i in range(0, len(data), 70)])

with open(FILE_PATH, 'wb+') as f:
    f.write(data)
