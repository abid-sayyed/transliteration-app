from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from dotenv import load_dotenv

from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    data = 'इदम् अद्भुतम्'
    result = transliterate(data, sanscript.DEVANAGARI, sanscript.ITRANS)
    print(result)
    return "<p>server is running</p>"


@app.route('/upload', methods=['POST'])
def process_csv():
    file = request.files['file']
    if not file:
        return jsonify({'error': 'No file provided'}), 400

    df = pd.read_csv(file)

    # Get the column name from the form data
    column_name = request.form.get('column')
    if column_name not in df.columns:
        return jsonify({'error': 'Invalid column name'}), 400

    transliterated_names = df[column_name].apply(
        lambda x: transliterate(x, sanscript.DEVANAGARI, sanscript.ITRANS))
    df["Names_Pronounced"] = transliterated_names

    output_csv_path = 'static/processed_data.csv'
    df.to_csv(output_csv_path, index=False)

    return jsonify({'message': 'File processed successfully', 'download_url': '/download'})


@app.route('/download', methods=['GET'])
def download_csv():
    return app.send_static_file('processed_data.csv')


if __name__ == '__main__':
    app.run(debug=True)
