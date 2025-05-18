
import { Subject } from "@/types";
export const dataScience: Subject = {
    id: 2,
    name: "Data Science",
    description: "Learn data analysis, machine learning, and statistical methods to extract insights from data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800",
    exams: [
      {
  "id": 4,
  "title": "Python for Data Science",
  "subject": "Data Science",
  "duration": 50,
  "passingScore": 70,
  "questions": [
    {
      "id": 1,
      "text": "Which library is commonly used for data manipulation in Python?",
      "options": ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      "correctAnswer": 1
    },
    {
      "id": 2,
      "text": "What is the primary purpose of NumPy arrays?",
      "options": [
        "Text processing",
        "Efficient numerical operations",
        "Web scraping",
        "Database management"
      ],
      "correctAnswer": 1
    },
    {
      "id": 3,
      "text": "Which of these is not a Pandas data structure?",
      "options": ["Series", "DataFrame", "Panel", "Matrix"],
      "correctAnswer": 3
    },
    {
      "id": 4,
      "text": "What is the purpose of Matplotlib?",
      "options": [
        "Machine learning",
        "Data visualization",
        "Data cleaning",
        "Web development"
      ],
      "correctAnswer": 1
    },
    {
      "id": 5,
      "text": "Which method is used to handle missing values in Pandas?",
      "options": ["dropna()", "fillna()", "both a and b", "none of these"],
      "correctAnswer": 2
    },
    {
      "id": 6,
      "text": "What is the purpose of the 'groupby' function in Pandas?",
      "options": [
        "To group data by a column and perform aggregate functions",
        "To group data by index",
        "To group data by row",
        "To group data by time"
      ],
      "correctAnswer": 0
    },
    {
      "id": 7,
      "text": "What is the purpose of the 'merge' function in Pandas?",
      "options": [
        "To merge two DataFrames based on a common column",
        "To merge two lists",
        "To merge two arrays",
        "To merge two dictionaries"
      ],
      "correctAnswer": 0
    },
    {
      "id": 8,
      "text": "What is the purpose of the 'apply' function in Pandas?",
      "options": [
        "To apply a function to each element in a DataFrame",
        "To apply a function to each row in a DataFrame",
        "To apply a function to each column in a DataFrame",
        "All of the above"
      ],
      "correctAnswer": 3
    },
    {
      "id": 9,
      "text": "What is the purpose of the 'pivot_table' function in Pandas?",
      "options": [
        "To create a pivot table from a DataFrame",
        "To create a pivot table from a list",
        "To create a pivot table from an array",
        "To create a pivot table from a dictionary"
      ],
      "correctAnswer": 0
    },
    {
      "id": 10,
      "text": "What is the purpose of the 'cut' function in Pandas?",
      "options": [
        "To bin values into discrete intervals",
        "To cut a DataFrame into smaller pieces",
        "To cut a list into smaller pieces",
        "To cut an array into smaller pieces"
      ],
      "correctAnswer": 0
    },
    {
      "id": 11,
      "text": "Which library is used for data visualization in Python?",
      "options": ["NumPy", "Pandas", "Matplotlib", "SciPy"],
      "correctAnswer": 2
    },
    {
      "id": 12,
      "text": "What function is used to create a Pandas DataFrame from a dictionary?",
      "options": [
        "DataFrame()",
        "pd.DataFrame()",
        "df.create()",
        "pd.create()"
      ],
      "correctAnswer": 1
    },
    {
      "id": 13,
      "text": "Which function is used to generate random numbers in Python?",
      "options": ["random.randint()", "random()", "numpy.random()", "numpy.random.rand()"],
      "correctAnswer": 2
    },
    {
      "id": 14,
      "text": "What is the purpose of the 'iloc' function in Pandas?",
      "options": [
        "To access data by label",
        "To access data by integer position",
        "To slice data from DataFrame",
        "To access rows only"
      ],
      "correctAnswer": 1
    },
    {
      "id": 15,
      "text": "Which method is used to concatenate two DataFrames in Pandas?",
      "options": ["concat()", "append()", "merge()", "combine()"],
      "correctAnswer": 0
    },
    {
      "id": 16,
      "text": "Which of these is used to visualize a histogram in Python?",
      "options": ["plot()", "hist()", "bar()", "scatter()"],
      "correctAnswer": 1
    },
    {
      "id": 17,
      "text": "What is the purpose of the 'describe' function in Pandas?",
      "options": [
        "To generate summary statistics of a DataFrame",
        "To sort data in a DataFrame",
        "To filter data in a DataFrame",
        "To merge two DataFrames"
      ],
      "correctAnswer": 0
    },
    {
      "id": 18,
      "text": "How do you convert a column in a Pandas DataFrame to a datetime format?",
      "options": [
        "df[column].to_datetime()",
        "pd.to_datetime(df[column])",
        "df[column].as_datetime()",
        "pd.to_datetime(df[column])"
      ],
      "correctAnswer": 1
    },
    {
      "id": 19,
      "text": "Which of these is used to install Python packages?",
      "options": ["conda install", "pip install", "python install", "install pip"],
      "correctAnswer": 1
    },
    {
      "id": 20,
      "text": "What is the purpose of the 'corr' function in Pandas?",
      "options": [
        "To calculate correlation between columns",
        "To filter data",
        "To create new columns",
        "To sort data"
      ],
      "correctAnswer": 0
    },
    {
      "id": 21,
      "text": "Which function in NumPy is used to create an array from a Python list?",
      "options": [
        "np.array()",
        "np.tolist()",
        "np.fromlist()",
        "np.arraylist()"
      ],
      "correctAnswer": 0
    },
    {
      "id": 22,
      "text": "What does the 'reshape' function do in NumPy?",
      "options": [
        "Changes the shape of an array",
        "Resizes an array",
        "Changes the size of an array",
        "Reshapes the array into a DataFrame"
      ],
      "correctAnswer": 0
    },
    {
      "id": 23,
      "text": "Which method is used to plot a line chart using Matplotlib?",
      "options": [
        "plot()",
        "line()",
        "chart()",
        "draw()"
      ],
      "correctAnswer": 0
    },
    {
      "id": 24,
      "text": "How can you filter rows based on a condition in Pandas?",
      "options": [
        "df[df[column] > value]",
        "df.filter()",
        "df.select()",
        "df.condition()"
      ],
      "correctAnswer": 0
    },
    {
      "id": 25,
      "text": "Which of the following is used for statistical analysis in Python?",
      "options": ["Matplotlib", "NumPy", "SciPy", "Pandas"],
      "correctAnswer": 2
    },
    {
      "id": 26,
      "text": "What is the default index when creating a DataFrame in Pandas?",
      "options": ["Range index", "Custom index", "UUID", "DateTime index"],
      "correctAnswer": 0
    },
    {
      "id": 27,
      "text": "What is the purpose of the 'rolling' function in Pandas?",
      "options": [
        "To apply a function to a sliding window over a DataFrame",
        "To iterate over rows in a DataFrame",
        "To apply a function across all columns",
        "To group data in a DataFrame"
      ],
      "correctAnswer": 0
    },
    {
      "id": 28,
      "text": "How do you save a Pandas DataFrame to a CSV file?",
      "options": [
        "df.to_csv()",
        "df.save_csv()",
        "df.export()",
        "df.write_csv()"
      ],
      "correctAnswer": 0
    },
    {
      "id": 29,
      "text": "Which of these is used for machine learning in Python?",
      "options": ["NumPy", "Scikit-learn", "Pandas", "Matplotlib"],
      "correctAnswer": 1
    },
    {
      "id": 30,
      "text": "What is the purpose of the 'sort_values' function in Pandas?",
      "options": [
        "To sort data by column values",
        "To filter data",
        "To group data by column",
        "To merge DataFrames"
      ],
      "correctAnswer": 0
    }
  ]
},
{
  "id": 5,
  "title": "Machine Learning Basics",
  "subject": "Data Science",
  "duration": 60,
  "passingScore": 75,
  "questions": [
    {
      "id": 1,
      "text": "What is supervised learning?",
      "options": [
        "Learning without labels",
        "Learning with labeled data",
        "Learning by observation",
        "Learning through reinforcement"
      ],
      "correctAnswer": 1
    },
    {
      "id": 2,
      "text": "Which algorithm is used for classification?",
      "options": [
        "Linear Regression",
        "Random Forest",
        "K-means",
        "Principal Component Analysis"
      ],
      "correctAnswer": 1
    },
    {
      "id": 3,
      "text": "What is overfitting?",
      "options": [
        "Model performs well on training data but poorly on new data",
        "Model performs poorly on all data",
        "Model is too simple",
        "Model runs too slowly"
      ],
      "correctAnswer": 0
    },
    {
      "id": 4,
      "text": "What is cross-validation used for?",
      "options": [
        "Data cleaning",
        "Model evaluation",
        "Data visualization",
        "Feature engineering"
      ],
      "correctAnswer": 1
    },
    {
      "id": 5,
      "text": "Which metric is NOT used for regression problems?",
      "options": ["MSE", "RMSE", "MAE", "Accuracy"],
      "correctAnswer": 3
    },
    {
      "id": 6,
      "text": "What is the purpose of the 'train_test_split' function in Scikit-learn?",
      "options": [
        "To split data into training and testing sets",
        "To split data into training and validation sets",
        "To split data into training and evaluation sets",
        "To split data into training and deployment sets"
      ],
      "correctAnswer": 0
    },
    {
      "id": 7,
      "text": "What is the purpose of the 'StandardScaler' in Scikit-learn?",
      "options": [
        "To standardize features by removing the mean and scaling to unit variance",
        "To standardize features by removing the median and scaling to unit variance",
        "To standardize features by removing the mode and scaling to unit variance",
        "To standardize features by removing the mean and scaling to unit standard deviation"
      ],
      "correctAnswer": 0
    },
    {
      "id": 8,
      "text": "What is the purpose of the 'confusion_matrix' in Scikit-learn?",
      "options": [
        "To evaluate the performance of a classification model",
        "To evaluate the performance of a regression model",
        "To evaluate the performance of a clustering model",
        "To evaluate the performance of a dimensionality reduction model"
      ],
      "correctAnswer": 0
    },
    {
      "id": 9,
      "text": "What is the purpose of the 'GridSearchCV' in Scikit-learn?",
      "options": [
        "To perform hyperparameter tuning",
        "To perform feature selection",
        "To perform model selection",
        "To perform data cleaning"
      ],
      "correctAnswer": 0
    },
    {
      "id": 10,
      "text": "What is the purpose of the 'PCA' in Scikit-learn?",
      "options": [
        "To perform dimensionality reduction",
        "To perform feature selection",
        "To perform model selection",
        "To perform data cleaning"
      ],
      "correctAnswer": 0
    },
    {
      "id": 11,
      "text": "Which algorithm is used for clustering?",
      "options": [
        "Linear Regression",
        "K-means",
        "Logistic Regression",
        "Principal Component Analysis"
      ],
      "correctAnswer": 1
    },
    {
      "id": 12,
      "text": "What is the purpose of the 'fit' function in Scikit-learn?",
      "options": [
        "To train the model on the data",
        "To evaluate the model on the test data",
        "To predict values for new data",
        "To validate the model"
      ],
      "correctAnswer": 0
    },
    {
      "id": 13,
      "text": "What is the purpose of the 'predict' function in Scikit-learn?",
      "options": [
        "To predict values for new data",
        "To train the model",
        "To validate the model",
        "To evaluate the model"
      ],
      "correctAnswer": 0
    },
    {
      "id": 14,
      "text": "What is the purpose of the 'n_neighbors' parameter in K-Nearest Neighbors?",
      "options": [
        "To specify the number of neighbors to consider for classification or regression",
        "To specify the number of training samples",
        "To specify the number of features",
        "To specify the number of classes"
      ],
      "correctAnswer": 0
    },
    {
      "id": 15,
      "text": "What is the purpose of the 'max_depth' parameter in Decision Trees?",
      "options": [
        "To control the maximum depth of the tree to prevent overfitting",
        "To control the minimum number of samples required to split a node",
        "To control the minimum number of samples required at a leaf node",
        "To control the number of features to consider for each split"
      ],
      "correctAnswer": 0
    },
    {
      "id": 16,
      "text": "Which algorithm is used for regression?",
      "options": [
        "Logistic Regression",
        "K-Nearest Neighbors",
        "Linear Regression",
        "Random Forest"
      ],
      "correctAnswer": 2
    },
    {
      "id": 17,
      "text": "What is the purpose of the 'learning_rate' parameter in Gradient Boosting?",
      "options": [
        "To control the step size at each iteration while moving towards a minimum",
        "To control the number of trees in the model",
        "To control the maximum depth of each tree",
        "To control the feature selection"
      ],
      "correctAnswer": 0
    },
    {
      "id": 18,
      "text": "What is the purpose of the 'fit_transform' function in Scikit-learn?",
      "options": [
        "To fit the model and then transform the data",
        "To fit the model on training data",
        "To transform the data without fitting the model",
        "To apply a transformation on test data"
      ],
      "correctAnswer": 0
    },
    {
      "id": 19,
      "text": "Which of these is used for classification tasks?",
      "options": [
        "K-means clustering",
        "Logistic Regression",
        "Principal Component Analysis",
        "Linear Regression"
      ],
      "correctAnswer": 1
    },
    {
      "id": 20,
      "text": "Which of these is used for dimensionality reduction?",
      "options": [
        "K-means clustering",
        "Random Forest",
        "PCA",
        "Logistic Regression"
      ],
      "correctAnswer": 2
    },
    {
      "id": 21,
      "text": "Which evaluation metric is used for classification tasks?",
      "options": [
        "Mean Squared Error (MSE)",
        "Root Mean Squared Error (RMSE)",
        "Confusion Matrix",
        "R-squared"
      ],
      "correctAnswer": 2
    },
    {
      "id": 22,
      "text": "What is the purpose of the 'fit_predict' function in Scikit-learn?",
      "options": [
        "To fit the model and then predict the labels for new data",
        "To fit the model on training data",
        "To predict the labels without fitting the model",
        "To evaluate the model"
      ],
      "correctAnswer": 0
    },
    {
      "id": 23,
      "text": "Which of these algorithms is used for feature selection?",
      "options": [
        "Random Forest",
        "Lasso Regression",
        "K-Nearest Neighbors",
        "Principal Component Analysis"
      ],
      "correctAnswer": 1
    },
    {
      "id": 24,
      "text": "What is the purpose of the 'RandomForestClassifier' in Scikit-learn?",
      "options": [
        "To perform classification tasks",
        "To perform regression tasks",
        "To perform clustering tasks",
        "To perform dimensionality reduction"
      ],
      "correctAnswer": 0
    },
    {
      "id": 25,
      "text": "What is the purpose of the 'feature_importances_' attribute in Scikit-learn?",
      "options": [
        "To show the importance of each feature in a model",
        "To show the accuracy of the model",
        "To show the performance of the model",
        "To show the correlation between features"
      ],
      "correctAnswer": 0
    },
    {
      "id": 26,
      "text": "Which algorithm is used for anomaly detection?",
      "options": [
        "K-means clustering",
        "Isolation Forest",
        "Principal Component Analysis",
        "Linear Regression"
      ],
      "correctAnswer": 1
    },
    {
      "id": 27,
      "text": "Which algorithm is an ensemble method?",
      "options": [
        "Linear Regression",
        "K-Nearest Neighbors",
        "Random Forest",
        "Logistic Regression"
      ],
      "correctAnswer": 2
    },
    {
      "id": 28,
      "text": "What is the purpose of 'feature engineering'?",
      "options": [
        "To create new features from existing ones",
        "To clean the data",
        "To reduce the number of features",
        "To visualize the data"
      ],
      "correctAnswer": 0
    },
    {
      "id": 29,
      "text": "What is the purpose of the 'learning curve' in machine learning?",
      "options": [
        "To visualize the training performance over time",
        "To visualize the test performance over time",
        "To visualize the model complexity",
        "To visualize the data distribution"
      ],
      "correctAnswer": 0
    },
    {
      "id": 30,
      "text": "Which of these algorithms is used for regression tasks?",
      "options": [
        "Logistic Regression",
        "Random Forest",
        "Linear Regression",
        "Support Vector Machine"
      ],
      "correctAnswer": 2
    }
  ]
},
{
  "id": 6,
  "title": "Deep Learning Fundamentals",
  "subject": "Data Science",
  "duration": 65,
  "passingScore": 75,
  "questions": [
    {
      "id": 1,
      "text": "What is a neural network?",
      "options": [
        "A computer network",
        "A mathematical model inspired by biological neural networks",
        "A database system",
        "A programming language"
      ],
      "correctAnswer": 1
    },
    {
      "id": 2,
      "text": "What is an activation function?",
      "options": [
        "A function that starts the program",
        "A function that introduces non-linearity to the network",
        "A function that stops the network",
        "A function that saves the model"
      ],
      "correctAnswer": 1
    },
    {
      "id": 3,
      "text": "What is backpropagation?",
      "options": [
        "Moving data backward",
        "Algorithm for calculating gradients in neural networks",
        "Reversing the input",
        "Loading previous models"
      ],
      "correctAnswer": 1
    },
    {
      "id": 4,
      "text": "What is a convolutional neural network used for?",
      "options": [
        "Text processing",
        "Image processing",
        "Sound processing",
        "All of the above"
      ],
      "correctAnswer": 3
    },
    {
      "id": 5,
      "text": "What is dropout in neural networks?",
      "options": [
        "Network failure",
        "A regularization technique to prevent overfitting",
        "Removing the network",
        "Stopping training"
      ],
      "correctAnswer": 1
    },
    {
      "id": 6,
      "text": "What is the purpose of the 'softmax' function?",
      "options": [
        "To convert logits to probabilities",
        "To convert probabilities to logits",
        "To convert logits to binary values",
        "To convert probabilities to binary values"
      ],
      "correctAnswer": 0
    },
    {
      "id": 7,
      "text": "What is the purpose of the 'ReLU' activation function?",
      "options": [
        "To introduce non-linearity",
        "To introduce linearity",
        "To introduce sparsity",
        "To introduce randomness"
      ],
      "correctAnswer": 0
    },
    {
      "id": 8,
      "text": "What is the purpose of the 'Adam' optimizer?",
      "options": [
        "To optimize the weights of a neural network",
        "To optimize the learning rate",
        "To optimize the activation function",
        "To optimize the loss function"
      ],
      "correctAnswer": 0
    },
    {
      "id": 9,
      "text": "What is the purpose of the 'batch normalization' technique?",
      "options": [
        "To normalize the input data",
        "To normalize the output data",
        "To normalize the activations of a neural network",
        "To normalize the weights of a neural network"
      ],
      "correctAnswer": 2
    },
    {
      "id": 10,
      "text": "What is the purpose of the 'early stopping' technique?",
      "options": [
        "To stop training when the model starts overfitting",
        "To stop training when the model starts underfitting",
        "To stop training when the model starts converging",
        "To stop training when the model starts diverging"
      ],
      "correctAnswer": 0
    },
    {
      "id": 11,
      "text": "What does a convolution layer do in a CNN?",
      "options": [
        "Applies filters to extract features",
        "Reduces the dimensionality of the data",
        "Pools data from multiple layers",
        "ReLU activation"
      ],
      "correctAnswer": 0
    },
    {
      "id": 12,
      "text": "What is the purpose of pooling layers in CNNs?",
      "options": [
        "To reduce the spatial size of the representation",
        "To add more filters",
        "To normalize data",
        "To introduce non-linearity"
      ],
      "correctAnswer": 0
    },
    {
      "id": 13,
      "text": "What is the 'tanh' activation function?",
      "options": [
        "A function that squashes values between -1 and 1",
        "A function that squashes values between 0 and 1",
        "A function that removes negative values",
        "A function that introduces sparsity"
      ],
      "correctAnswer": 0
    },
    {
      "id": 14,
      "text": "What is a fully connected (dense) layer in a neural network?",
      "options": [
        "A layer where every neuron is connected to every other neuron",
        "A layer where each neuron is connected to a single input",
        "A layer that reduces dimensions",
        "A layer that only processes non-linear data"
      ],
      "correctAnswer": 0
    },
    {
      "id": 15,
      "text": "What does 'vanishing gradients' refer to?",
      "options": [
        "Gradients becoming very small during backpropagation",
        "Gradients becoming too large during backpropagation",
        "Gradients disappearing after one iteration",
        "Gradients only affecting the first layer"
      ],
      "correctAnswer": 0
    },
    {
      "id": 16,
      "text": "What is 'data augmentation' in the context of deep learning?",
      "options": [
        "Creating new data from existing data by transformations like rotation or flipping",
        "Cleaning data from noise",
        "Selecting the most relevant features",
        "Splitting data into training and validation sets"
      ],
      "correctAnswer": 0
    },
    {
      "id": 17,
      "text": "What is the difference between CNNs and RNNs?",
      "options": [
        "CNNs are good for image data, RNNs are good for sequential data",
        "RNNs are good for image data, CNNs are good for sequential data",
        "CNNs are faster than RNNs",
        "RNNs have more layers than CNNs"
      ],
      "correctAnswer": 0
    },
    {
      "id": 18,
      "text": "What does the 'sigmoid' function do?",
      "options": [
        "Squashes the input to a range between 0 and 1",
        "Introduces randomness",
        "Reduces the dimensions",
        "Squashes the input to a range between -1 and 1"
      ],
      "correctAnswer": 0
    },
    {
      "id": 19,
      "text": "What does 'gradient descent' do in neural networks?",
      "options": [
        "Minimizes the loss function by adjusting weights",
        "Maximizes the loss function",
        "Optimizes the learning rate",
        "Converts logits to probabilities"
      ],
      "correctAnswer": 0
    },
    {
      "id": 20,
      "text": "What is the purpose of the 'LSTM' (Long Short-Term Memory) layer?",
      "options": [
        "To remember long-term dependencies in sequential data",
        "To perform convolution on sequential data",
        "To introduce non-linearity in sequential data",
        "To normalize sequential data"
      ],
      "correctAnswer": 0
    },
    {
      "id": 21,
      "text": "What is 'transfer learning'?",
      "options": [
        "Using a pre-trained model and fine-tuning it for a new task",
        "Using a neural network with multiple tasks",
        "Using multiple datasets for training a model",
        "Fine-tuning the architecture of a neural network"
      ],
      "correctAnswer": 0
    },
    {
      "id": 22,
      "text": "What is 'model ensembling'?",
      "options": [
        "Combining predictions from multiple models to improve accuracy",
        "Training a model on multiple datasets",
        "Reducing the complexity of a model",
        "Training a model using unsupervised learning"
      ],
      "correctAnswer": 0
    },
    {
      "id": 23,
      "text": "What is 'recurrent neural network' (RNN)?",
      "options": [
        "A network that processes sequences of data",
        "A network used for image processing",
        "A network used for unsupervised learning",
        "A network for classification tasks"
      ],
      "correctAnswer": 0
    },
    {
      "id": 24,
      "text": "What is the purpose of the 'Adam' optimizer in deep learning?",
      "options": [
        "To optimize weights by adjusting learning rate and momentum",
        "To compute the loss function",
        "To minimize overfitting",
        "To apply dropout"
      ],
      "correctAnswer": 0
    },
    {
      "id": 25,
      "text": "What is 'hyperparameter tuning'?",
      "options": [
        "Optimizing parameters like learning rate and batch size",
        "Adjusting the weights of the model",
        "Reducing the model complexity",
        "Increasing the size of the dataset"
      ],
      "correctAnswer": 0
    },
    {
      "id": 26,
      "text": "What is 'exploding gradients'?",
      "options": [
        "When gradients become too large and lead to numerical instability",
        "When gradients become too small",
        "When gradients stop propagating",
        "When the model stops learning"
      ],
      "correctAnswer": 0
    },
    {
      "id": 27,
      "text": "What is a 'batch' in deep learning?",
      "options": [
        "A subset of the training data processed in one pass",
        "The final output after training",
        "The number of layers in a network",
        "The number of neurons in a layer"
      ],
      "correctAnswer": 0
    },
    {
      "id": 28,
      "text": "What is 'fine-tuning' in deep learning?",
      "options": [
        "Adjusting a pre-trained model to suit a new task",
        "Training a model from scratch",
        "Removing unnecessary layers from a model",
        "Reinforcing the model's learning ability"
      ],
      "correctAnswer": 0
    },
    {
      "id": 29,
      "text": "What is 'data augmentation' in deep learning?",
      "options": [
        "Generating new data from existing data by transformations like rotation or flipping",
        "Cleaning the dataset",
        "Splitting the dataset",
        "Normalizing the data"
      ],
      "correctAnswer": 0
    },
    {
      "id": 30,
      "text": "What is a 'deep neural network' (DNN)?",
      "options": [
        "A neural network with many hidden layers",
        "A neural network with one hidden layer",
        "A neural network with no hidden layers",
        "A network without activation functions"
      ],
      "correctAnswer": 0
    }
  ]
}

    ]
  };