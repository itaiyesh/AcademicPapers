import torch
from torch import nn

class SparseMultiAE(nn.Module):
    def __init__(self, in_dim, hidden_dim1, hidden_dim2, half = False):
        super(SparseMultiAE, self).__init__()
        # use_embeddings = True
        print(
            "SparseMultiAE: input dim = {}, hidden_dim1 = {} hidden_dim2 = {}".format(in_dim, hidden_dim1, hidden_dim2))
        self.in_dim = in_dim
        self.title_emb_dim = 512
        self.hidden_dim2 = hidden_dim2
        self.half = half

        self.emb1 = nn.EmbeddingBag(in_dim, hidden_dim1, mode='sum', sparse=True)

        self.l1 = nn.Linear(hidden_dim1, self.hidden_dim2)

        # Decode
        self.l2 = nn.Linear(self.hidden_dim2, hidden_dim1)

        self.l3 = nn.Linear(hidden_dim1, in_dim)

        # TODO: Is this activated in eval?
        self.drop = nn.Dropout(0.5)

    def forward(self, array, offsets, weights):
        z = self.encode(array, offsets, weights)
        return self.decode(z)

    def encode(self, array, offsets, weights):
        x = self.emb1(input=array, offsets=offsets, per_sample_weights=weights)

        x = torch.tanh(x)

        # TODO: R
        x = self.drop(x)

        # print(x.shape)

        x = self.l1(x)
        x = torch.tanh(x)

        return x

    def decode(self, z):
        z = self.l2(z)
        z = torch.tanh(z)
        z = self.l3(z)
        return z
