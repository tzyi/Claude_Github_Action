from flask import Flask, jsonify, request
from flask_cors import CORS
from data import WALKING_SPOTS, CITIES

app = Flask(__name__)
CORS(app)


@app.route("/api/cities", methods=["GET"])
def get_cities():
    return jsonify({"cities": CITIES})


@app.route("/api/spots/<city>", methods=["GET"])
def get_spots(city):
    if city not in WALKING_SPOTS:
        return jsonify({"error": "找不到該縣市"}), 404
    return jsonify({"city": city, "spots": WALKING_SPOTS[city]})


@app.route("/api/spots", methods=["GET"])
def get_all_spots():
    return jsonify({"spots": WALKING_SPOTS})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
