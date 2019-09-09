import torch
import pickle
import os
from google_drive_downloader import GoogleDriveDownloader as gdd
from torch import nn
import warnings

# MODEL NEEDS TO BE THE SAME AS IN COLAB
from .cf_model import SparseMultiAE

class CFHandler:
    def __init__(self, model_file_id, model_metadata_id, author2idx_id, force_download=False):  # model_path, author2idx_file):
        model_file = 'model.pt'
        model_meta_file = 'model_meta.pt'
        author2idx_file = 'author2idx.pkl'

        self.device = torch.device("cpu")

        if not os.path.exists(model_file) or force_download:
            print("Downloading model.")
            gdd.download_file_from_google_drive(file_id=model_file_id,
                                                dest_path='./'+model_file,
                                                unzip=False)
        if not os.path.exists(model_meta_file) or force_download:
            print("Downloading model.")
            gdd.download_file_from_google_drive(file_id=model_metadata_id,
                                                dest_path='./'+model_meta_file,
                                                unzip=False)

        if not os.path.exists(author2idx_file) or force_download:
            print("Downloading author2idx map")
            gdd.download_file_from_google_drive(file_id=author2idx_id,
                                                dest_path='./'+author2idx_file,
                                                unzip=False)
        metadata = torch.load(model_meta_file)
        print(metadata)

        self.model = SparseMultiAE(metadata['authors_n'], metadata['hidden_dim1'], metadata['hidden_dim2'])
        self.model.load_state_dict(torch.load(model_file))
        self.model.eval()

        # Load mappings
        with open(author2idx_file, 'rb') as handle:
            self.author2idx = pickle.load(handle)
        # Create reverse mapping
        self.idx2author = {idx: author for author, idx in self.author2idx.items()}

        assert metadata['authors_n'] == len(self.author2idx)

        self.authors_n = len(self.author2idx)

    def filter_authors(self, authors):
        '''
        returns only authors prsent in self.author2idx
        :param authors:
        :return:
        '''

        return [author for author in authors if author in self.author2idx]

    def get_recommended_authors(self, authors, top=5):
        # author_idxs = [self.author2idx[int(author)] for author in authors]
        warnings.warn("Checking if author in author2idx SHOULD not be made under the assumption the dict only contains relevant authors.")
        author_idxs = [self.author2idx[int(author)] for author in authors if int(author) in self.author2idx]
        warnings.warn("No authors in query are present in author2idx")

        array = torch.tensor(author_idxs).long()
        offsets = torch.tensor([0])
        weights = torch.tensor([1.0] * len(author_idxs))

        array = array.to(self.device)
        offsets = offsets.to(self.device)
        weights = weights.to(self.device)
        recon_batch = self.model(array, offsets, weights)
        flattened_batch = recon_batch.detach().numpy().flatten()
        recommended_author_idxs = flattened_batch.argsort()[-top:][::-1]
        recommended_author_ids = [self.idx2author[author_id] for author_id in recommended_author_idxs]
        author_values = [(author_id, flattened_batch[author_idx]) for author_id, author_idx in
                         zip(recommended_author_ids, recommended_author_idxs)]
        return author_values
