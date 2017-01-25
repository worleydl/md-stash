from flask import Flask, request, jsonify
from flask_cors import CORS
from redis import Redis

import binascii
import os

EXPIRY_TIMEOUT = 3600

app = Flask(__name__)
CORS(app) # Lock this down more eventually...
redis = Redis(host='redis', port=6379, decode_responses=True)

@app.route('/')
def default():
    return "MD-STASH-API IS RUNNING"

# Generates auth token which expires in time
@app.route('/token', methods=['POST'])
def token():
    payload = request.json

    u = payload['u']
    p = payload['p']

    user = redis.get('mdStashAuthUser')
    pswd = redis.get('mdStashAuthPass')

    if u == user and p == pswd:
        token = binascii.b2a_hex(os.urandom(128)).decode('utf8')
        redis.setex('mdStashAuthToken', token, EXPIRY_TIMEOUT)
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid credentials'})

# Sets the user/pass, one time only, if this needs to be reset delete the keys manually
@app.route('/init', methods=['POST'])
def init():
    user = redis.get('mdStashAuthUser')
    pswd = redis.get('mdStashAuthPass')

    if user is not None or pswd is not None:
        return jsonify({'error': 'The application has already been configured'})
    else:
        payload = request.json

        u = payload['u']
        p = payload['p']

        redis.set('mdStashAuthUser', u)
        redis.set('mdStashAuthPass', p)

        return jsonify({'response': 'OK'})

@app.route('/get', methods=['POST'])
def get():
    payload = request.json

    content = redis.get('mdStashArticle' + payload['key'])

    if content is None:
        return jsonify({'error': 'That key is not available'})
    else:
        return jsonify({'content': content})

@app.route('/put', methods=['POST'])
def put():
    payload = request.json

    # TODO: Auth...
    token = payload['token']
    stored_token = redis.get('mdStashAuthToken')

    # Make sure there is a token..
    if stored_token is None:
        return jsonify({'error': 'Token has expired'})

    # Make sure the tokens match
    if token != stored_token:
        return jsonify({'error': 'Token mismatch'})

    # At this point auth was successful
    key = payload['key']
    content = payload['content']

    redis.set('mdStashArticle' + key, content)

    return jsonify({'status': 200})

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
