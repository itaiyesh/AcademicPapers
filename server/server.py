#!/usr/bin/python
# -*- coding: utf-8 -*-

import random
from flask import Flask, render_template,jsonify, request
import json
from db_handler import DbHandler

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     # return 'You want path: %s' % path
#     return render_template('index.html', data = path )

db_handler = DbHandler()
print("Connected to db.")

@app.route('/')
def index():
    context = {'name': 'itai'}
    # data = json.dumps(data)
    return render_template('index.html', data = context )

@app.route('/search_authors', methods=['POST'])
def search_authors():
    # POST request
    if request.method == 'POST':
        query = request.get_json()['query']

        print("Query: ",query)

        #TODO: fetch string...
        def mock_object(i):
          if random.random() > 0.5 : 
            return {  'id': str(i),
              'name': 'Shaul Markovitch', 
              'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
              'affiliation': 'Professor of Computer Science, Technion - Israel Institute of Technology',
              'papers': [{'id':0, 'name': 'the best paper in the world', 'year': 1986}, {'id':1,'name': 'this is the second best paper in the world, for sure, no doubt. really', 'year': 2019}],
              'score': random.random()*10,
                } 
          else:
            return {
              'id': str(i),
              'name': 'somebody', 
              'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
              'affiliation': 'Professor of some university',
              'papers': [{'id':0, 'name': 'the best paper in the world', 'year': 1986}, {'id':1,'name': 'this is the second best paper in the world, for sure, no doubt. really', 'year': 2019}],
              'score': random.random()*10,
          }
        recommendedAuthors = list(map(
              lambda i: mock_object(i) , range(5)
        ))
        print('Returning recommended authors {}'.format(len(recommendedAuthors)))
        return json.dumps(recommendedAuthors)

@app.route('/search_paper', methods=['POST'])
def search_paper():
    # POST request
    if request.method == 'POST':
        query = request.get_json()['query']

        #TODO: fetch string...
        def mock_object(i):
          if random.random() > 0.5 : 
            return {  'id': str(i),
              'name': 'Shaul Markovitch', 
              'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
              'affiliation': 'Professor of Computer Science, Technion - Israel Institute of Technology',
              'papers': [{'id':0, 'name': 'the best paper in the world', 'year': 1986}, {'id':1,'name': 'this is the second best paper in the world, for sure, no doubt. really', 'year': 2019}],
              'score': random.random()*10,
               } 
          else:
            return {
              'id': str(i),
              'name': 'somebody', 
              'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
              'affiliation': 'Professor of some university',
              'papers': [{'id':0, 'name': 'the best paper in the world', 'year': 1986}, {'id':1,'name': 'this is the second best paper in the world, for sure, no doubt. really', 'year': 2019}],
              'score': random.random()*10,
          }
        recommendedAuthors = list(map(
             lambda i: mock_object(i) , range(20)
        ))
        return json.dumps(recommendedAuthors)


@app.route('/authors_suggestions', methods=['POST'])
def get_author_suggestions():
    # POST request
    if request.method == 'POST':
        query = request.get_json()['query']

        #TODO: fetch authors beginning with string...
        def mock_object(i):
          if random.random() > 0.5 : 
            return {  'id': str(i),
              'name': 'Shaul Markovitch', 
              'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
              'affiliation': 'Professor of Computer Science, Technion - Israel Institute of Technology',
              'papers': [{'id':0, 'name': 'the best paper in the world', 'year': 1986}, {'id':1,'name': 'this is the second best paper in the world, for sure, no doubt. really', 'year': 2019}],
              'score': random.random()*10,
               } 
          else:
            return {
              'id': str(i),
              'name': 'somebody', 
              'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
              'affiliation': 'Professor of some university',
              'papers': [{'id':0, 'name': 'the best paper in the world', 'year': 1986}, {'id':1,'name': 'this is the second best paper in the world, for sure, no doubt. really', 'year': 2019}],
              'score': random.random()*10,
          }
        suggestedAuthors = list(map(
             lambda i: mock_object(i) , range(5)
        ))
        return json.dumps(suggestedAuthors)
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
