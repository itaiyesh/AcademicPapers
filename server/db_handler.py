import psycopg2

class DbHandler(object):
    def __init__(self):
        self.connection = psycopg2.connect(user="papersadmin",
                              password="papersadmin",
                              host='papersproject.cqp8a83ogeue.eu-central-1.rds.amazonaws.com',
                              port="5432",
                              database="papers_project")

    def get_authors_regex(regex):
        pass
