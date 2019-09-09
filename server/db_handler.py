import torch
import psycopg2
import json
from inference.scholarly import search_author

class DBHandler:
    def __init__(self, cf = None, mock=False):
        if not mock:
            self.connection = psycopg2.connect(user="papersadmin",
                                               password="papersadmin",
                                               host='papersproject.cqp8a83ogeue.eu-central-1.rds.amazonaws.com',
                                               port="5432",
                                               database="papers_project")

        # TO use its author2idx (save memory)
        self.cf = cf
        self.mock = mock

    def __del__(self):
        if not self.mock: self.connection.close()

    def get_authors_data_from_scholarly(self, list_of_author_ids):
        if self.mock:
            return {id: {
                'name': 'someone',
                'email': 'email@gmail',
                'affiliation': 'some affiliation',
                'citedby': '1337'
            }
            for id in list_of_author_ids}

        authors_data = self.get_authors_data(list_of_author_ids)
        for author, data in authors_data.items():
            try:
                scholarly_data = next(search_author(data['name']))
                authors_data[author]['img'] = scholarly_data['url_picture']
                authors_data[author]['affiliation'] = scholarly_data['affiliation']
                authors_data[author]['email'] = scholarly_data['email']
                authors_data[author]['citedby'] = scholarly_data['citedby']
            except:
                pass
        return authors_data

    def get_authors_data(self, list_of_author_ids):
        commandGetMultipleIds = " SELECT * FROM test2 \n WHERE author_id in ({})".format(','.join([str(id) for id in list_of_author_ids]))
        cur = self.connection.cursor()
        cur.execute(commandGetMultipleIds)
        result = cur.fetchall()
        #     print(result)
        resultDict = {}
        for i in result:
            resultDict[i[0]] = {}
            resultDict[i[0]]['name'] = i[1]
            resultDict[i[0]]['id'] = i[0]
        #       print(resultDict)

        resultJason = json.dumps(resultDict)
        #     print("result jason \n")
        #     print(resultJason)
        cur.close()
        self.connection.commit()
        # return json
        return resultDict
        # return resultJason

    def get_authors_names_regex(self, regex, limit=30):
        if self.mock:
            return [
                {
                    'id': 1,
                    'name': 'someone',
                    'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
                    'email': 'some email',
                    'affiliation': 'some affiliation',
                    'citedby': 1337

                }

                for _ in range(limit)]

        commandGetNameStartWIth = "SELECT author_id, author_name FROM test2 \n WHERE LOWER(author_name) LIKE '{}%' \n LIMIT {}".format(
            regex.lower(), limit)

        cur = self.connection.cursor()
        cur.execute(commandGetNameStartWIth)
        result = cur.fetchall()

        cur.close()
        self.connection.commit()
        # return list of strings (author_id, author_name)
        # return [(r[0], r[1]) for r in result]
        authors = []
        for id, name in result:
            try:
                scholarly_data = next(search_author(name))
                img = scholarly_data['url_picture']
                affiliation = scholarly_data['affiliation']
                email = scholarly_data['email']
                citedby = scholarly_data['citedby']
                authors.append({
                    'id':id,
                    'name': name,
                    'img': img,
                    'email': email,
                    'affiliation': affiliation,
                    'citedby': citedby

                })
            except:
                pass

        return authors
        # return [
        #     {'id': id,
        #      # 'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=bYcqNlgAAAAJ',
        #      # TODO: Get REAL img from db.
        #      'img': 'https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ',
        #      'name': name
        #      }
        #     for (id, name) in result]


# if __name__ == '__main__':
#     db = DBHandler()
#
#     regex = None
#     while regex != 'bye':
#         regex = input('Input name regex')
#
#         results = db.get_authors_names_regex(regex)
#
#         print(results)
#
#         author_id = results[0][0]
#
#         print(db.get_authors_data([author_id]))
