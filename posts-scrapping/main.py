import unicodedata

from flask import Flask
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
URL = 'https://nutrircomtempero.wordpress.com/'


@app.route('/scrap_posts', methods=['GET'])
def scrap_posts():
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    posts = soup.find_all('article', class_='post')

    response = dict()

    # Get the first three posts
    for post_index in range(3):
        post = posts[post_index]

        title_string = post.find('h2', class_='entry-title').text

        title = unicodedata.normalize('NFKC', title_string)
        img = post.find('img')['src']
        link = post.find('a')['href']

        response[f'post{post_index}'] = {'title': title,
                                         'img': img,
                                         'link': link}

    return response


if __name__ == "__main__":
    app.run(debug=True)
