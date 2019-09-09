#!/usr/bin/python
# -*- coding: utf-8 -*-

import random
from flask import Flask, render_template, jsonify, request
import json
from db_handler import DBHandler
from inference.cf import CFHandler
import os

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     # return 'You want path: %s' % path
#     return render_template('index.html', data = path )


use_semantic = False

# Revolet

# Force override doesnt work. must delete model and associated files.
cf = CFHandler('109jikL9APOQLYLWVbh0BPzsKh4Fj1E5y','1d4uAconWl18s629ZUMaZlXkopD2Vfzh3', '1-JiAeAJ_0XWXxkRteRP1my84x57cpVmg',
               force_download=False)
# cf = CFHandler('1-YTx2EbIctCN-SNwgPHbsoqVNFdAhTXa', '1-JiAeAJ_0XWXxkRteRP1my84x57cpVmg')

# Itaiyesh (or sum?)
# Take paper2data (authors, citing authors) from CF
if use_semantic:
    from inference.semantic import SemanticHandler
    semantic = SemanticHandler('1prP-cY9c2UXmBJMqaADTsXC9jkzIGfbb', '1syCdLDt2knRQaTb_QB5CH6Eb_4GKIUON', None)

db_handler = DBHandler(cf)

def get_best_authors(title, author_ids, top=10):
    if len(author_ids) > 0:
        cf_recommended_authors = cf.get_recommended_authors(author_ids, top)
    else:
        cf_recommended_authors = []

    # TODO: We dont care about the weight but we should
    cf_recommended_authors = [author_score_tuple[0] for author_score_tuple in cf_recommended_authors]

    if title is not None and use_semantic:
        semantic_recommended_authors = semantic.get_recommended_authors(title, top)
    else:
        semantic_recommended_authors = []

    cf_author2idx = {author: idx for idx, author in enumerate(cf_recommended_authors)}
    semantic_author2idx = {author: idx for idx, author in enumerate(semantic_recommended_authors)}

    author2average_idx = {}  #
    for idx, author in enumerate(cf_recommended_authors):
        if author in semantic_author2idx:
            author2average_idx[author] = (idx + semantic_author2idx[author]) / 2
        else:
            author2average_idx[author] = idx
    for idx, author in enumerate(semantic_author2idx):
        if author in cf_author2idx:
            author2average_idx[author] = (idx + cf_author2idx[author]) / 2
        else:
            author2average_idx[author] = idx

    authors_idx_tuples = sorted([(author, avg_idx) for author, avg_idx in author2average_idx.items()],
                                key=lambda x: x[1])

    # TODO: Gather information from dbhandler
    ranked_authors = [authors_idx_tuple[0] for authors_idx_tuple in authors_idx_tuples]
    # author2data = db_handler.get_authors_data(ranked_authors)
    author2data = db_handler.get_authors_data_from_scholarly(ranked_authors)

    print(author2data)
    print(authors_idx_tuples)

    return [
        {'id': author_id,
         'score': len(authors_idx_tuples) - score,
         # TODO: Author should ALWAYS be in DB
         'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
        'name': author2data[author_id]['name'] if author_id in author2data else 'Author not in db',
         'papers': []}

        for (author_id, score) in authors_idx_tuples
    ]


@app.route('/')
def index():
    context = {'name': 'itai'}
    # data = json.dumps(data)
    return render_template('index.html', data=context)


@app.route('/search_authors', methods=['POST'])
def search_authors():
    # POST request
    if request.method == 'POST':
        query = request.get_json()['query']

        print("Query: ", query)

        # # TODO: fetch string...
        def mock_object(i):
            if random.random() > 0.5:
                return {'id': str(i),
                        'name': 'Shaul Markovitch',
                        'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
                        'affiliation': 'Professor of Computer Science, Technion - Israel Institute of Technology',
                        'papers': [{'id': 0, 'name': 'the best paper in the world', 'year': 1986}, {'id': 1,
                                                                                                    'name': 'this is the second best paper in the world, for sure, no doubt. really',
                                                                                                    'year': 2019}],
                        'score': random.random() * 10,
                        }
            else:
                return {
                    'id': str(i),
                    'name': 'somebody',
                    'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
                    'affiliation': 'Professor of some university',
                    'papers': [{'id': 0, 'name': 'the best paper in the world', 'year': 1986}, {'id': 1,
                                                                                                'name': 'this is the second best paper in the world, for sure, no doubt. really',
                                                                                                'year': 2019}],
                    'score': random.random() * 10,
                }

        recommendedAuthors = list(map(
            lambda i: mock_object(i), range(5)
        ))
        print('Returning recommended authors {}'.format(len(recommendedAuthors)))
        return json.dumps(recommendedAuthors)


@app.route('/search_paper', methods=['POST'])
def search_paper():
    # POST request
    if request.method == 'POST':
        title = request.get_json()['title']
        authors = request.get_json()['authors']
        print(title, authors)

        return json.dumps(get_best_authors(title, authors))

        # # TODO: fetch string...
        # def mock_object(i):
        #     if random.random() > 0.5:
        #         return {'id': str(i),
        #                 'name': 'Shaul Markovitch',
        #                 'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
        #                 'affiliation': 'Professor of Computer Science, Technion - Israel Institute of Technology',
        #                 'papers': [{'id': 0, 'name': 'the best paper in the world', 'year': 1986}, {'id': 1,
        #                                                                                             'name': 'this is the second best paper in the world, for sure, no doubt. really',
        #                                                                                             'year': 2019}],
        #                 'score': random.random() * 10,
        #                 }
        #     else:
        #         return {
        #             'id': str(i),
        #             'name': 'somebody',
        #             'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
        #             'affiliation': 'Professor of some university',
        #             'papers': [{'id': 0, 'name': 'the best paper in the world', 'year': 1986}, {'id': 1,
        #                                                                                         'name': 'this is the second best paper in the world, for sure, no doubt. really',
        #                                                                                         'year': 2019}],
        #             'score': random.random() * 10,
        #         }
        #
        # recommendedAuthors = list(map(
        #     lambda i: mock_object(i), range(20)
        # ))
        #
        # return json.dumps(recommendedAuthors)


@app.route('/authors_suggestions', methods=['POST'])
def get_author_suggestions():
    # POST request
    if request.method == 'POST':
        query = request.get_json()['query']

        authors = db_handler.get_authors_names_regex(query, limit = 30)

        # authors = cf.filter_authors(authors)

        return json.dumps([
            {'id': id,
            # 'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
             # TODO: Get REAL img from db.
             'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
            'name': name
            }
            for (id, name) in authors])

        # # TODO: fetch authors beginning with string...
        # def mock_object(i):
        #     if random.random() > 0.5:
        #         return {'id': str(i),
        #                 'name': 'Shaul Markovitch',
        #                 'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
        #                 'affiliation': 'Professor of Computer Science, Technion - Israel Institute of Technology',
        #                 'papers': [{'id': 0, 'name': 'the best paper in the world', 'year': 1986}, {'id': 1,
        #                                                                                             'name': 'this is the second best paper in the world, for sure, no doubt. really',
        #                                                                                             'year': 2019}],
        #                 'score': random.random() * 10,
        #                 }
        #     else:
        #         return {
        #             'id': str(i),
        #             'name': 'somebody',
        #             'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
        #             'affiliation': 'Professor of some university',
        #             'papers': [{'id': 0, 'name': 'the best paper in the world', 'year': 1986}, {'id': 1,
        #                                                                                         'name': 'this is the second best paper in the world, for sure, no doubt. really',
        #                                                                                         'year': 2019}],
        #             'score': random.random() * 10,
        #         }
        #
        # suggestedAuthors = list(map(
        #     lambda i: mock_object(i), range(5)
        # ))
        # return json.dumps(suggestedAuthors)
        # # return jsonify(recommendedAuthors)
        #
        # # return 'OK', 220


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
