"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os

api = Blueprint("api", __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/token", methods=["POST"])
def create_token():
    data = request.get_json()
    email = data.get("email").strip().lower()
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if user is None or not check_password_hash(user.password, password):
        return jsonify({"error": "Bad email or password"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify(
        {"token": access_token, "user_id": user.id, "message": "Login successful"}
    ), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))

    if user is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify(
        {
            "id": user.id,
            "email": user.email,
            "message": "You have received the Secret Message...\nProtect it...\nOr die trying...",
        }
    ), 200


@api.route("/translations", methods=["GET"])
def get_translations():
    lang = request.args.get("lang", "EN")

    translations_path = os.path.join(os.path.dirname(__file__), 'translations.json')
    with open(translations_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    return jsonify(translations.get(lang, translations["EN"])), 200


@api.route("/hello", methods=["GET"])
def handle_hello():
    lang = request.args.get("lang", "EN")

    translations_path = os.path.join(os.path.dirname(__file__), 'translations.json')
    with open(translations_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    message = translations.get(lang, translations["EN"]).get("home", {}).get("message", "")

    response_body = {
        "message": message
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def handle_signup():
    email = request.json.get("email").strip().lower()
    password = request.json.get("password")
    is_active = request.json.get("is_active")

    if not email or not password:
        return jsonify({"error": "An email and password are required."}), 400

    if len(password) < 8:
        return jsonify(
            {"error": "The password must have a minimum of 8 characters."}
        ), 400

    if User.query.filter_by(email=email).first():
        return jsonify(
            {"error": "The email has already been used. Please login instead."}
        ), 400

    password_hash = generate_password_hash(password, method="scrypt")

    user = User(email=email, password=password_hash, is_active=is_active)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "You have signed up successfully!"})


@api.route("/login", methods=["POST"])
def handle_login():
    email = request.json.get("email").strip().lower()
    password = request.json.get("password")
