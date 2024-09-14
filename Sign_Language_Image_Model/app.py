from flask import Flask, jsonify, request, render_template
import nltk
from nltk.tokenize import word_tokenize

# Ensure the 'punkt' tokenizer is downloaded
# nltk.download('punkt')

# Flask app
app = Flask(__name__,static_folder='D:/Sign Sense/Sign_Language_Image_Model/static')


# Image Dictionary
sign_language_dict = {
    'hello': 'images/sign_images/hello.jpg',
    'goodbye': 'images/sign_images/goodbye.jpg',
    'nicetomeetyou': 'images/sign_images/nicetomeetyou.jpg',
    'no': 'images/sign_images/no.jpg',
    'please': 'images/sign_images/please.jpg',
    'thanks': 'images/sign_images/thanks.jpg',
    'yes': 'images/sign_images/yes.jpg',

}

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        sentence = request.form['sentence']  # Get input from form
        tokens = word_tokenize(sentence.lower())  # Tokenize the sentence
        sign_language_images = [sign_language_dict.get(token, 'images/sign_images/default.jpg') for token in tokens]
        (sign_language_images)
        return render_template('sign_model.html', sentence=sentence, images=sign_language_images)
    return render_template('sign_model.html')

if __name__ == '__main__':
    app.run(port=4000, debug=True)
