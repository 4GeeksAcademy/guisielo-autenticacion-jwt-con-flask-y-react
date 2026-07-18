"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    firstname = request.json.get("firstname", None)
    lastname = request.json.get("lastname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Field email and field password are required"}), 400

    new_user = User(firstname=firstname, lastname=lastname,
                    email=email, password=password, is_active=True
                    )

    try:
        db.session.add(new_user)
        db.session.commit()

    except Exception as e:
        return jsonify({"msg": f"Unexpected {e=}, {type(e)=}"}), 500

    return jsonify({"msg": "Created succesfully", "user": new_user.serialize()}), 201


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    if password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    if not user.is_active:
        return jsonify({
            "msg": "Su cuenta aún no ha sido activada por el administrador."
        }), 403

    access_token = create_access_token(identity=user.id)

    return jsonify(access_token=access_token, user=user.serialize()), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    user = User.query.get (current_user_id)

    return jsonify({"id":user.id, "email":user.email}), 200