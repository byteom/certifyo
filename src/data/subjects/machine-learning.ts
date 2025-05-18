import { Subject } from '@/components/types';
export const machineLearning: Subject = {
    id: 5,
    name: "Machine Learning",
    description: "Master the fundamentals and advanced techniques of machine learning ",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",

    // JavaScript Fundamentals
    exams: [
        {
            "id": 12,
            "title": "Machine Learning Intermediate",
            "subject": "Machine Learning",
            "duration": 55,
            "passingScore": 70,
            "questions": [
              {
                "id": 1,
                "text": "What is supervised learning?",
                "options": [
                  "A type of machine learning where the model is trained on unlabeled data",
                  "A type of machine learning where the model is trained on synthetic data",
                  "A type of machine learning where the model learns by interacting with an environment",
                  "A type of machine learning where the model is trained on labeled data"
                ],
                "correctAnswer": 3
              },
              {
                "id": 2,
                "text": "What is unsupervised learning?",
                "options": [
                  "A type of machine learning where the model is trained on labeled data",
                  "A type of machine learning where the model is trained on unlabeled data",
                  "A type of machine learning where the model is trained on synthetic data",
                  "A type of machine learning where the model learns by interacting with an environment"
                ],
                "correctAnswer": 1
              },
              {
                "id": 3,
                "text": "What is reinforcement learning?",
                "options": [
                  "A type of machine learning where the model learns by interacting with an environment",
                  "A type of machine learning where the model is trained on unlabeled data",
                  "A type of machine learning where the model is trained on labeled data",
                  "A type of machine learning where the model is trained on synthetic data"
                ],
                "correctAnswer": 0
              },
              {
                "id": 4,
                "text": "What is a feature in machine learning?",
                "options": [
                  "A dataset used for testing",
                  "The output variable to be predicted",
                  "An input variable used to make predictions",
                  "A type of machine learning algorithm"
                ],
                "correctAnswer": 2
              },
              {
                "id": 5,
                "text": "What is overfitting in machine learning?",
                "options": [
                  "When a model is too simple to capture patterns in the data",
                  "When a model performs poorly on both training and test data",
                  "When a model is trained on too little data",
                  "When a model performs well on training data but poorly on unseen data"
                ],
                "correctAnswer": 3
              },
              {
                "id": 6,
                "text": "What is the purpose of a training dataset?",
                "options": [
                  "To clean and preprocess the data",
                  "To evaluate the performance of the model",
                  "To deploy the model in production",
                  "To train the machine learning model"
                ],
                "correctAnswer": 3
              },
              {
                "id": 7,
                "text": "What is the purpose of a test dataset?",
                "options": [
                  "To deploy the model in production",
                  "To evaluate the performance of the trained model",
                  "To train the machine learning model",
                  "To clean and preprocess the data"
                ],
                "correctAnswer": 1
              },
              {
                "id": 8,
                "text": "What is a neural network?",
                "options": [
                  "A type of decision tree algorithm",
                  "A clustering algorithm",
                  "A regression algorithm",
                  "A machine learning model inspired by the human brain"
                ],
                "correctAnswer": 3
              },
              {
                "id": 9,
                "text": "What is the role of an activation function in a neural network?",
                "options": [
                  "To optimize the learning rate",
                  "To introduce non-linearity into the model",
                  "To initialize the weights of the network",
                  "To reduce overfitting"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10,
                "text": "What is gradient descent?",
                "options": [
                  "A method for feature selection",
                  "A clustering algorithm",
                  "An optimization algorithm used to minimize the loss function",
                  "A type of decision tree algorithm"
                ],
                "correctAnswer": 2
              },
              {
                "id": 11,
                "text": "What is a loss function?",
                "options": [
                  "A function that measures the accuracy of the model",
                  "A function that selects the best features for the model",
                  "A function that initializes the weights of a neural network",
                  "A function that measures the difference between predicted and actual values"
                ],
                "correctAnswer": 3
              },
              {
                "id": 12,
                "text": "What is the purpose of cross-validation?",
                "options": [
                  "To evaluate the model's performance on unseen data",
                  "To reduce the size of the training dataset",
                  "To train the model on multiple datasets",
                  "To increase the complexity of the model"
                ],
                "correctAnswer": 0
              },
              {
                "id": 13,
                "text": "What is a decision tree?",
                "options": [
                  "A method for feature selection",
                  "A tree-like model used for classification and regression",
                  "A clustering algorithm",
                  "A type of neural network"
                ],
                "correctAnswer": 1
              },
              {
                "id": 14,
                "text": "What is the purpose of regularization in machine learning?",
                "options": [
                  "To improve the accuracy of the model on training data",
                  "To increase the complexity of the model",
                  "To reduce the size of the dataset",
                  "To prevent overfitting by adding a penalty to the loss function"
                ],
                "correctAnswer": 3
              },
              {
                "id": 15,
                "text": "What is a confusion matrix?",
                "options": [
                  "A matrix used for feature selection",
                  "A matrix used to store training data",
                  "A matrix used to initialize neural network weights",
                  "A table used to evaluate the performance of a classification model"
                ],
                "correctAnswer": 3
              },
              {
                "id": 16,
                "text": "What is precision in a classification model?",
                "options": [
                  "The ratio of true negatives to the sum of true negatives and false negatives",
                  "The ratio of true positives to the sum of true positives and false positives",
                  "The ratio of true negatives to the sum of true negatives and false positives",
                  "The ratio of true positives to the sum of true positives and false negatives"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17,
                "text": "What is recall in a classification model?",
                "options": [
                  "The ratio of true positives to the sum of true positives and false negatives",
                  "The ratio of true positives to the sum of true positives and false positives",
                  "The ratio of true negatives to the sum of true negatives and false positives",
                  "The ratio of true negatives to the sum of true negatives and false negatives"
                ],
                "correctAnswer": 0
              },
              {
                "id": 18,
                "text": "What is the F1 score?",
                "options": [
                  "The harmonic mean of precision and recall",
                  "The arithmetic mean of precision and recall",
                  "The difference between precision and recall",
                  "The sum of precision and recall"
                ],
                "correctAnswer": 0
              },
              {
                "id": 19,
                "text": "What is a support vector machine (SVM)?",
                "options": [
                  "A supervised learning algorithm used for classification and regression",
                  "An unsupervised learning algorithm used for clustering",
                  "A deep learning algorithm",
                  "A reinforcement learning algorithm"
                ],
                "correctAnswer": 0
              },
              {
                "id": 20,
                "text": "What is the purpose of a learning rate in gradient descent?",
                "options": [
                  "To select the best features for the model",
                  "To initialize the weights of the model",
                  "To control the step size during optimization",
                  "To reduce overfitting"
                ],
                "correctAnswer": 2
              },
              {
                "id": 21,
                "text": "What is a hyperparameter in machine learning?",
                "options": [
                  "A metric used to evaluate the model",
                  "A parameter set before training the model",
                  "A feature used for prediction",
                  "A parameter learned during training"
                ],
                "correctAnswer": 1
              },
              {
                "id": 22,
                "text": "What is the purpose of a validation set?",
                "options": [
                  "To test the final performance of the model",
                  "To clean and preprocess the data",
                  "To train the model",
                  "To tune hyperparameters and evaluate the model during training"
                ],
                "correctAnswer": 3
              },
              {
                "id": 23,
                "text": "What is a convolutional neural network (CNN)?",
                "options": [
                  "A type of neural network used for image processing",
                  "A type of decision tree algorithm",
                  "A regression algorithm",
                  "A clustering algorithm"
                ],
                "correctAnswer": 0
              },
              {
                "id": 24,
                "text": "What is the purpose of pooling in a CNN?",
                "options": [
                  "To reduce the spatial dimensions of the input",
                  "To introduce non-linearity into the model",
                  "To increase the number of features",
                  "To initialize the weights of the network"
                ],
                "correctAnswer": 0
              },
              {
                "id": 25,
                "text": "What is a recurrent neural network (RNN)?",
                "options": [
                  "A clustering algorithm",
                  "A regression algorithm",
                  "A type of neural network used for sequential data",
                  "A type of decision tree algorithm"
                ],
                "correctAnswer": 2
              },
              {
                "id": 26,
                "text": "What is the purpose of dropout in a neural network?",
                "options": [
                  "To increase the number of neurons in the network",
                  "To prevent overfitting by randomly dropping neurons during training",
                  "To initialize the weights of the network",
                  "To reduce the learning rate"
                ],
                "correctAnswer": 1
              },
              {
                "id": 27,
                "text": "What is transfer learning?",
                "options": [
                  "Transferring models between different programming languages",
                  "Using a pre-trained model as a starting point for a new task",
                  "Transferring data between different datasets",
                  "Training a model from scratch"
                ],
                "correctAnswer": 1
              },
              {
                "id": 28,
                "text": "What is the purpose of a confusion matrix?",
                "options": [
                  "To select the best features for the model",
                  "To evaluate the performance of a classification model",
                  "To train the model",
                  "To clean and preprocess the data"
                ],
                "correctAnswer": 1
              },
              {
                "id": 29,
                "text": "What is the difference between classification and regression?",
                "options": [
                  "Classification is used for unsupervised learning, while regression is used for supervised learning",
                  "Classification predicts continuous values, while regression predicts discrete labels",
                  "Classification predicts discrete labels, while regression predicts continuous values",
                  "There is no difference"
                ],
                "correctAnswer": 2
              },
              {
                "id": 30,
                "text": "What is the purpose of feature scaling?",
                "options": [
                  "To normalize the range of features in the dataset",
                  "To reduce the size of the dataset",
                  "To increase the complexity of the model",
                  "To select the best features for the model"
                ],
                "correctAnswer": 0
              }
            ]
          },
         

          //natural language processing
          {
            "id": 13,
            "title": "Natural language processing",
            "subject": "Machine Learning",
            "duration": 55,
            "passingScore": 70,
            "questions": [
              {
                "id": 1,
                "text": "What is natural language processing (NLP)?",
                "options": [
                  "A field focused on the interaction between computers and human languages",
                  "A technique used for image recognition",
                  "A method for data cleaning and preprocessing",
                  "A model used to predict numerical values"
                ],
                "correctAnswer": 0
              },
              {
                "id": 2,
                "text": "Which of the following is a typical use case of NLP?",
                "options": [
                  "Image segmentation",
                  "Speech recognition and translation",
                  "Predictive maintenance of machines",
                  "Clustering customers based on behavior"
                ],
                "correctAnswer": 1
              },
              {
                "id": 3,
                "text": "What is tokenization in NLP?",
                "options": [
                  "Converting a sequence of words into individual words or phrases",
                  "Mapping words into vectors of real numbers",
                  "A technique to extract keywords from text",
                  "Reducing words to their root form"
                ],
                "correctAnswer": 0
              },
              {
                "id": 4,
                "text": "Which of the following is a commonly used NLP technique for stemming words?",
                "options": [
                  "LDA",
                  "Porter Stemmer",
                  "Tfidf Vectorizer",
                  "Word2Vec"
                ],
                "correctAnswer": 1
              },
              {
                "id": 5,
                "text": "What is part-of-speech (POS) tagging?",
                "options": [
                  "Assigning labels to words based on their syntactic role in a sentence",
                  "Converting text into numerical form for machine learning models",
                  "Detecting entities like names and dates in text",
                  "Predicting the next word in a sequence of text"
                ],
                "correctAnswer": 0
              },
              {
                "id": 6,
                "text": "What is the purpose of Named Entity Recognition (NER)?",
                "options": [
                  "Identifying and classifying named entities in text such as people, locations, and organizations",
                  "Identifying the sentiment of the text",
                  "Segmenting the text into sentences and words",
                  "Mapping words to their respective synonyms"
                ],
                "correctAnswer": 0
              },
              {
                "id": 7,
                "text": "What does the term 'Word Embedding' refer to?",
                "options": [
                  "The process of embedding numerical data into a word's vector representation",
                  "A method to map words to fixed-length numeric vectors that capture semantic meaning",
                  "A method for reducing dimensionality in text data",
                  "A technique used to extract keywords from documents"
                ],
                "correctAnswer": 1
              },
              {
                "id": 8,
                "text": "Which of the following is a popular word embedding model?",
                "options": [
                  "K-Means",
                  "BERT",
                  "Word2Vec",
                  "Linear Regression"
                ],
                "correctAnswer": 2
              },
              {
                "id": 9,
                "text": "What is the primary goal of sentiment analysis in NLP?",
                "options": [
                  "To detect grammatical errors in text",
                  "To predict the sentiment (positive, negative, or neutral) of the text",
                  "To perform machine translation",
                  "To extract named entities from text"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10,
                "text": "What does the term 'stop words' refer to in NLP?",
                "options": [
                  "Words that carry the most meaning in a sentence",
                  "Commonly occurring words that are often removed from text during preprocessing",
                  "Words that have been lemmatized",
                  "Words that contain spelling errors"
                ],
                "correctAnswer": 1
              },
              {
                "id": 11,
                "text": "What is lemmatization in NLP?",
                "options": [
                  "A technique for converting a word to its base or root form",
                  "A method for tokenizing sentences",
                  "A technique for detecting named entities in text",
                  "A type of word embedding"
                ],
                "correctAnswer": 0
              },
              {
                "id": 12,
                "text": "What is the purpose of the 'TF-IDF' model in NLP?",
                "options": [
                  "To measure the importance of a word in a document relative to a corpus",
                  "To classify documents into predefined categories",
                  "To predict the next word in a sequence",
                  "To cluster similar documents together"
                ],
                "correctAnswer": 0
              },
              {
                "id": 13,
                "text": "What does the 'BERT' model in NLP stand for?",
                "options": [
                  "Bidirectional Encoder Representations from Transformers",
                  "Binary Encoding of Recursive Transformers",
                  "Basic Encoder Representation for Text",
                  "Bilateral Entity Recognition Transformer"
                ],
                "correctAnswer": 0
              },
              {
                "id": 14,
                "text": "Which of the following tasks is most likely to benefit from a pre-trained BERT model?",
                "options": [
                  "Image segmentation",
                  "Named Entity Recognition",
                  "Speech-to-text conversion",
                  "Image captioning"
                ],
                "correctAnswer": 1
              },
              {
                "id": 15,
                "text": "What does 'seq2seq' stand for in NLP?",
                "options": [
                  "Sequence-to-sequence models used for tasks like machine translation",
                  "Sequential sequence extraction for tokenization",
                  "Sentence-to-sentence transformation for summarization",
                  "Syntactic extraction of sentences"
                ],
                "correctAnswer": 0
              },
              {
                "id": 16,
                "text": "Which of the following is an example of a sequence-to-sequence model in NLP?",
                "options": [
                  "Word2Vec",
                  "Long Short-Term Memory (LSTM)",
                  "GPT-3",
                  "BERT"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17,
                "text": "What is a key advantage of using transformers in NLP models?",
                "options": [
                  "They are computationally faster than recurrent neural networks",
                  "They are less prone to overfitting than other models",
                  "They can handle very long-range dependencies in the text",
                  "They are only used for machine translation tasks"
                ],
                "correctAnswer": 2
              },
              {
                "id": 18,
                "text": "What is the purpose of tokenization in text preprocessing?",
                "options": [
                  "To separate text into individual words or subwords",
                  "To remove stop words from the text",
                  "To reduce words to their root form",
                  "To map words to numeric values"
                ],
                "correctAnswer": 0
              },
              {
                "id": 19,
                "text": "Which of the following NLP tasks involves understanding the meaning of text?",
                "options": [
                  "Tokenization",
                  "Named Entity Recognition",
                  "Semantic Role Labeling",
                  "Part-of-Speech Tagging"
                ],
                "correctAnswer": 2
              },
              {
                "id": 20,
                "text": "What does the term 'language model' refer to in NLP?",
                "options": [
                  "A model that learns to generate coherent text based on a given prompt",
                  "A model that detects the sentiment of text",
                  "A model that translates one language to another",
                  "A model that recognizes named entities in a document"
                ],
                "correctAnswer": 0
              }
            ]
          },
          
          
    ]
}