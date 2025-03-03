from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from indic_transliteration import sanscript

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>server is running</p>"

if __name__ == '__main__':
    app.run(debug=True)
