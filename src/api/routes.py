"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API

CORS(api, origins=[os.getenv("CORS_ORIGIN")])


@api.route('/login', methods=['POST', 'GET'])
def handle_login():
    data = request.get_json()

    response_body = {
        "message": data.get("email"),
        "token": "example-token-123"
    }

    return jsonify(response_body), 200
