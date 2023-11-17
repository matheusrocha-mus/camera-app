from flask import Flask, request, jsonify
import os

photos_output = r'C:\Users\mathe\Desktop\Camera App\python_server\photos_output';

app = Flask(__name__)

@app.route('photos_output', methods=['POST'])
def upload_photo():
    try:
        data_uri = request.json.get('dataUri')

        # Convert data URI to image file and save it
        save_path = os.path.join('photos_output', 'uploaded_photo.png')
        with open(save_path, 'wb') as f:
            f.write(data_uri.split(',')[1].decode('base64'))

        return jsonify({'success': True, 'message': 'Photo uploaded successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
