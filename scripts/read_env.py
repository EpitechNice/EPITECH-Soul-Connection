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

password = os.getenv("ENV_PASSWORD")
if not password:
    password = getpass("Password: ")

password = password.encode()

with open(FILE_PATH, 'r') as f:
    data = b64decode(f.read().replace('\n', ''))

data = decrypt(data, password)

try:
    data = ploads(data)
except:
    sys.stderr.write("Could not deserialize. Wrong password ?\n")
    sys.stderr.flush()
    sys.exit(1)

# Either $VAR to change it to the value of that variable
# Or ?(VAR=value:VAR_OR_VALUE_IF_TRUE:VAR_OR_VALUE_IF_FALSE) # Note that both the true and false need no $ before them
# If they are a var, it will be capted
# Please don't use any of the following in logic string : ':', '(', ')'

for k in data.keys():
    for key in data.keys():
        data[k] = str(data[k]).replace(f"${key}", str(data[key]))
        while f"?({key}" in data[k]:
            pos = data[k].index(f"?({key}")
            if not ')' in data[k][pos:]:
                print(f"Could not evaluate logic string at pos {pos}: missing closing )", file=sys.stderr)
                sys.exit(1)
            values = data[k][pos:].split(')')[0]
            values = values.split('(')[-1]
            values = values.split(':')
            condition = values[0].split('=')
            if len(condition) != 2:
                print(f"Could not evaluate logic string at pos {pos}: condition have {len(condition) - 1} '=' instead of 1", file=sys.stderr)
                sys.exit(1)
            if not condition[0] in data.keys():
                print(f"Could not evaluate logic string at pos {pos}: {condition[0]}: unknown value", file=sys.stderr)
                sys.exit(1)
            closing_pos = pos + data[k][pos:].index(')') + 1
            value = values[1]
            if str(data[condition[0]]) != condition[1]:
                value = values[2]
            if value in data.keys():
                value = data[value]
            data[k] = data[k][:pos] + value + data[k][closing_pos:]

for k in data.keys():
    print(f"{k}={data[k]}")
