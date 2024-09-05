#!/usr/bin/python3

from Crypto.Cipher import AES
from getpass import getpass
from hashlib import md5
from base64 import b64decode

from pickle import loads as ploads

import sys
import os

FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "env.aes")

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
    data = b64decode(f.read().replace('\n', ''))

data = decrypt(data, password)

try:
    data = ploads(data)
except:
    print("Could not deserialize. Wrong password ?")
    sys.exit(1)

for k in data.keys():
    for key in data.keys():
        data[k] = str(data[k]).replace(f"${key}", str(data[key]))

for k in data.keys():
    print(f"{k}={data[k]}")
