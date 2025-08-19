
# 🚨 Cyberbullying Detection using RoBERTa, NLP & Privacy-Preserving AI  

An **AI-powered Cyberbullying Detection System** developed and deployed by **Harini Lakshmanan**.  
This project integrates **RoBERTa (Transformer-based NLP model)**, **Affective Features (sentiment & emotion analysis)**, and **Federated Learning with Differential Privacy** to detect and mitigate online harassment.  

🔗 **[Live Demo](https://cyberbullying-detection-eta.vercel.app/)**  
💻 **[GitHub Repository](https://github.com/Harini410/Cyberbullying-detection)**  

---

## 📖 Project Overview  

Cyberbullying has become a growing problem in digital communication, affecting mental health, personal safety, and online communities.  
This system leverages **RoBERTa embeddings, emotion-aware NLP, and federated learning** to classify whether a given text contains bullying content.  

The goal of this project is:  
- To provide a **real-time AI solution** for online safety.  
- To contribute to **academic research** (M.Tech Thesis, IEEE-style publications).  
- To demonstrate **scalable, privacy-preserving deployment**.  

---

## ✨ Features  

- 🧠 **RoBERTa-based Transformer Model** – Captures contextual nuances in abusive language.  
- ❤️ **Emotion & Sentiment Integration** – Enhances sensitivity to hostile tone and implicit bullying.  
- 🔒 **Privacy-Preserving AI** – Uses **Federated Learning + Differential Privacy** for secure model training.  
- 📊 **Comparison with Baselines** – Outperforms CNN, RNN, LSTM, BiLSTM, and GRU models.  
- ⚡ **Real-Time Analysis** – Instant predictions via a deployed web interface.  
- 🌐 **Deployed on Vercel** – Demonstrates live working system.  

---

## 🛠️ Tech Stack  

- **Programming Language:** Python, JavaScript  
- **Machine Learning / NLP:** RoBERTa (HuggingFace), TensorFlow / PyTorch, Scikit-learn, NLTK / SpaCy  
- **Frontend:** React.js, Tailwind CSS  
- **Backend / API:** Flask / FastAPI  
- **Deployment:** Vercel (cloud hosting)  

---

## ⚙️ Installation & Setup  

Clone the repository:  
\`\`\`bash
git clone https://github.com/Harini410/Cyberbullying-detection.git
cd Cyberbullying-detection
\`\`\`

Install backend dependencies:  
\`\`\`bash
pip install -r requirements.txt
\`\`\`

Run the backend locally:  
\`\`\`bash
python app.py
\`\`\`

For frontend (if in a separate folder):  
\`\`\`bash
npm install
npm run dev
\`\`\`

---

## 🔬 How the Model Works  

1. **Data Collection & Preprocessing**  
   - Tweets and social media posts are cleaned (URLs, hashtags, emojis removed).  
   - Text is tokenized, lemmatized, and balanced using SMOTE for fairness.  

2. **Feature Engineering**  
   - **RoBERTa embeddings** capture contextual meaning.  
   - **Sentiment analysis** (positive, negative, neutral).  
   - **Emotion detection** (anger, sadness, fear, etc.) enriches context.  
   - Traditional embeddings (TF-IDF, Word2Vec) complement deep features.  

3. **Model Development**  
   - Baselines: CNN, RNN, LSTM, BiLSTM, GRU.  
   - Proposed: **Fine-tuned RoBERTa** with affective features.  
   - Training with **Federated Learning** → data stays private, only gradients shared.  
   - **Differential Privacy** noise added to safeguard user data.  

4. **Evaluation**  
   - Metrics: Accuracy, Precision, Recall, F1-score.  
   - RoBERTa achieved: **93% Accuracy, 94% Precision, 93% Recall, 94% F1-score**.  
   - Outperformed all baseline models.  

---

## 🚀 Usage  

1. Open the web app (locally or via live demo).  
2. Enter text into the input field.  
3. Click **"Detect"** → Model classifies as:  
   - ✅ **Non-Bullying**  
   - ⚠️ **Cyberbullying Detected**  

---

## 📊 Research Contribution  

- ✅ **Novel Framework**: Combines **RoBERTa + Emotion/Sentiment Features + Federated Learning**.  
- 🔒 **Privacy by Design**: Trains without exposing raw data.  
- 📈 **State-of-the-Art Performance**: Surpasses CNN/LSTM/GRU baselines.  
- 🎓 **M.Tech Thesis / IEEE-ready Research**: Suitable for academic publication.  
- 🌍 **Industry Deployment Potential**: Scalable to social media platforms for automated moderation.  

---


## 📬 Contact Information  

👩‍💻 **Developed by:** Harini Lakshmanan  
🎓 **M.Tech Research Work** | Cyberbullying Detection using AI  

🌐 **Portfolio:** [https://port-folio-02-p4yp.vercel.app/](https://port-folio-02-p4yp.vercel.app/)  
💼 **LinkedIn:** [https://www.linkedin.com/in/harini-lakshmanan-04](https://www.linkedin.com/in/harini-lakshmanan-04)  
📧 **Email:** lakshmananharini@gmail.com  

---

## ⭐ Acknowledgement  

This project was **conceptualized, implemented, and deployed independently** by Harini L as part of academic research and professional development.  
