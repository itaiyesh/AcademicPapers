import os
from google_drive_downloader import GoogleDriveDownloader as gdd
import faiss
import shelve
from sentence_transformers import SentenceTransformer
from collections import Counter
import warnings

# Bert (FINE TUNED)
class BertEmbeddingHandler:
    def __init__(self, model_id, force_download):
        # TODO: Download model if not exists
        model_path = "/content/gdrive/My Drive/saved/model_2019-09-05_00-12-57"
        if not os.path.exists(model_id) or force_download:
            print("Downloading model_id.")
            gdd.download_file_from_google_drive(file_id=model_id,
                                                dest_path='./'+model_path,
                                                unzip=False)

        self.model = SentenceTransformer(model_path)

    def get_embeddings_for_sentence(self, sentence):
        return self.model.encode([sentence])[0]


class IndexHandler:
    def __init__(self, index_id, force_download):
        index_path = "index"
        if not os.path.exists(index_path) or force_download:
            print("Downloading index_file.")
            gdd.download_file_from_google_drive(file_id=index_id,
                                                dest_path='./'+index_path,
                                                unzip=False)

        self.index = faiss.read_index(index_path)

    def search(self, embedding, top):
        assert embedding.shape == (1, 768)
        distances, nns = self.index.search(embedding, top)
        return nns[0]


class SemanticHandler:
    def __init__(self, model_id, index_id, paper2data_shelve_id = None, force_download=False):
        self.bert = BertEmbeddingHandler(model_id, force_download)
        self.index = IndexHandler(index_id, force_download)

        self.paper2data_shelve = None
        if paper2data_shelve_id is not None:
            self.paper2data_shelve = 'paper2data_shelve'

            if not os.path.exists(self.paper2data_shelve) or force_download:
                print("Downloading paper2data_shelve.")
                gdd.download_file_from_google_drive(file_id=paper2data_shelve_id,
                                                    dest_path='./'+self.paper2data_shelve,
                                                    unzip=False)
        else:
            warnings.warn("No paper2author provided. Will only return paper IDS (not authors)")

    def get_recommended_authors(self, title, top):
        field = 100 #Search field
        AUTHORING_WEIGHT = 2
        CITING_WEIGHT = 1
        embs = self.bert.get_embeddings_for_sentence(title)
        paper_ids = self.index.search(embs, field)
        if self.paper2data_shelve is None: return paper_ids
        author2score = Counter()
        with shelve.open(self.paper2data_shelve) as paper2data:
            # Count mentions.
            # TODO: Consider paper recency
            # TODO: Consider paper distance
            for paper_id in paper_ids:
                for author in paper2data[paper_id]['authors']:
                    author2score[author] += AUTHORING_WEIGHT
                if 'citing_authors' in paper2data[paper_id]:
                    for author in paper2data[paper_id]['citing_authors']:
                        author2score[author] += CITING_WEIGHT

        return [occurrence[0] for occurrence in author2score.most_common(top)]

