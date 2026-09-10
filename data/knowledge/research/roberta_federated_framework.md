# Hybrid Privacy-Preserving Cyberbullying Detection Framework: Research Foundation

## 1. Research Overview (Author: Harini L)
This framework develops a robust, privacy-preserving methodology for detecting cyberbullying across decentralized social networks without compromising user privacy.

## 2. Core Methodological Components
1. **RoBERTa Transformer Architecture**:
   - Utilizes Robustly Optimized BERT Pretraining Approach (RoBERTa), using dynamic masking and larger mini-batches over bidirectional self-attention mechanisms.
   - Captures contextual nuances, sarcasm, and subtle syntactical cues superior to traditional sequence models.
2. **Affective Feature Integration**:
   - Incorporates sentiment polarity alongside multi-dimensional emotion vectors (anger, fear, sadness, disgust, joy, neutral).
   - Cyberbullying messages exhibit distinct affective signatures (predominantly elevated anger and hostility coupled with negative sentiment).
3. **Federated Learning (FL)**:
   - Client devices compute gradient updates locally on edge nodes.
   - Raw user communication text never leaves the client device; only encrypted model weight gradients are transmitted to the central parameter server.
4. **Differential Privacy (DP)**:
   - Integrated via calibrated Gaussian noise injection and gradient clipping (using Opacus or equivalent DP-SGD mechanisms).
   - Bounds the privacy budget (epsilon, delta), mathematically guaranteeing that individual training samples cannot be reverse-engineered or reconstructed.

## 3. Empirical Performance Benchmarks
In benchmark evaluations against classical deep learning sequence baselines:
- **RNN**: 80% Accuracy, 78% Precision, 79% Recall, 78% F1
- **LSTM**: 87% Accuracy, 86% Precision, 86% Recall, 86% F1
- **GRU**: 88% Accuracy, 87% Precision, 87% Recall, 87% F1
- **CNN**: 89% Accuracy, 88% Precision, 88% Recall, 88% F1
- **Bi-LSTM**: 90% Accuracy, 89% Precision, 89% Recall, 89% F1
- **Proposed RoBERTa + Affective Model**: **93% Accuracy, 94% Precision, 93% Recall, 94% F1-Score**.
