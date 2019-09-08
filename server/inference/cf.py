import torch
import pickle
import os
from google_drive_downloader import GoogleDriveDownloader as gdd


class CFHandler:
    def __init__(self, model_file_id, author2idx_id, force_download=False):  # model_path, author2idx_file):
        model_file = 'model.pt'
        author2idx_file = 'author2idx.pkl'

        if not os.path.exists(model_file) or force_download:
            print("Downloading model.")
            gdd.download_file_from_google_drive(file_id=model_file_id,
                                                dest_path='./'+model_file,
                                                unzip=False)
        if not os.path.exists(author2idx_file) or force_download:
            print("Downloading author2idx map")
            gdd.download_file_from_google_drive(file_id=author2idx_id,
                                                dest_path='./'+author2idx_file,
                                                unzip=False)
        self.model = None

        with open(model_file, 'rb') as f:
            self.device = torch.device("cpu")
            self.model = torch.load(f).to(self.device)
            self.model.eval()
            self.input_dim = self.model.in_dim

        # Load mappings
        with open(author2idx_file, 'rb') as handle:
            self.author2idx = pickle.load(handle)
        # Create reverse mapping
        self.idx2author = {idx: author for author, idx in self.author2idx.items()}

        self.authors_n = len(self.author2idx)

    def get_recommended_authors(self, authors, top=5):
        author_idxs = [self.author2idx[int(author)] for author in authors]
        array = torch.tensor(author_idxs)
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
