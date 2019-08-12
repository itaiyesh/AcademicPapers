#!/usr/bin/python
# -*- coding: utf-8 -*-

import random
from flask import Flask, render_template,jsonify, request
import json

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

@app.route('/')
def index():
    context = {'name': 'itai'}
    # data = json.dumps(data)
    return render_template('index.html', data = context )

@app.route('/search_paper', methods=['POST'])
def search_paper():
    # POST request
    if request.method == 'POST':
        query = request.get_json()['query']

        #TODO: fetch string...
        
        # Mock:
        # recommendedAuthors = [
        #     {  'id': 0,
          
        #       'name': 'itai', 
        #     'papers': [{'name': 'the best paper in the world', 'year': 1986}, {'name': 'the second best paper in the world', 'date': 2019}],
        #     'score': 9.7,
        #   },
        #     {  'id': 1,
          
        #       'name': 'amit', 
        #     'papers': [{'name': 'the best paper in the world', 'year': 1986}, {'name': 'the second best paper in the world', 'date': 2019}],
        #   'score': 9.6}
          
        #   ]
        recommendedAuthors = list(map(
             lambda i: {  'id': str(i),
              'name': 'name'+str(i), 
            'papers': [{'name': 'the best paper in the world', 'year': 1986}, {'name': 'the second best paper in the world', 'date': 2019}],
            'score': 9.7,
          }, range(20)
        ))
        return json.dumps(recommendedAuthors)
        # return jsonify(recommendedAuthors) 

        # return 'OK', 220

# @app.route('/hello', methods=['GET', 'POST'])
# def hello():

#     # POST request
#     if request.method == 'POST':
#         print('Incoming..')
#         print(request.get_json())  # parse as JSON
#         return 'OK', 200

#     # GET request
#     else:
#         message = {'greeting':'Hello from Flask!'}
#         return jsonify(message)  # serialize and use JSON headers

# @app.route('/test')
# def test_page():
#     # look inside `templates` and serve `index.html`
#     return render_template('index.html')


# @app.route('/hello') # take note of this decorator syntax, it's a common pattern
# def hello():
#     # It is good practice to only call a function in your route end-point,
#     # rather than have actual implementation code here.
#     # This allows for easier unit and integration testing of your functions.
#     return get_hello()


# def get_hello():
#     greeting_list = ['Ciao', 'Hei', 'Salut', 'Hola', 'Hallo', 'Hej']
#     return random.choice(greeting_list)


if __name__ == '__main__':
    # app.run()
    app.debug = True
    app.run(host='0.0.0.0', port=5000, threaded=True)