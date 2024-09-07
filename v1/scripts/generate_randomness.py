#!/usr/bin/python3

import hashlib, os

print(hashlib.sha256(os.urandom(16)).hexdigest())
