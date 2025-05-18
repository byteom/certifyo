
import { Subject } from "@/types/types"
export const programmingLanguages: Subject = {
    id: 4,
    name: "Programming Languages",
    description: "Master in programming langaues, c++, java , python and more.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    exams: [
        {
            "id": 22,
            "title": "C++ (Object-Oriented Programming)",
            "subject": "Programming Languages",
            "duration": 55,
            "passingScore": 70,
            "questions": [
              {
                "id": 1,
                "text": "What is encapsulation in C++?",
                "options": [
                  "Inheriting properties from a base class",
                  "Binding data and functions together",
                  "Overloading functions",
                  "Creating multiple instances of a class"
                ],
                "correctAnswer": 1
              },
              {
                "id": 2,
                "text": "What is a constructor in C++?",
                "options": [
                  "A function to inherit properties",
                  "A function to overload operators",
                  "A special function to initialize objects",
                  "A function to delete objects"
                ],
                "correctAnswer": 2
              },
              {
                "id": 3,
                "text": "What is inheritance in C++?",
                "options": [
                  "Hiding implementation details",
                  "Creating a new class from an existing class",
                  "Overloading functions in a class",
                  "Binding data and functions together"
                ],
                "correctAnswer": 1
              },
              {
                "id": 4,
                "text": "What is polymorphism in C++?",
                "options": [
                  "Hiding implementation details",
                  "Creating multiple instances of a class",
                  "Ability to take multiple forms",
                  "Binding data and functions together"
                ],
                "correctAnswer": 2
              },
              {
                "id": 5,
                "text": "What is the purpose of the 'virtual' keyword in C++?",
                "options": [
                  "To hide implementation details",
                  "To create static functions",
                  "To overload operators",
                  "To enable dynamic binding"
                ],
                "correctAnswer": 3
              },
              {
                "id": 6,
                "text": "What is a destructor in C++?",
                "options": [
                  "A function to overload operators",
                  "A special function to clean up resources",
                  "A function to initialize objects",
                  "A function to inherit properties"
                ],
                "correctAnswer": 1
              },
              {
                "id": 7,
                "text": "What is function overloading in C++?",
                "options": [
                  "Defining a function with a virtual keyword",
                  "Defining a function in a derived class",
                  "Defining multiple functions with the same name but different parameters",
                  "Defining a function in a base class"
                ],
                "correctAnswer": 2
              },
              {
                "id": 8,
                "text": "What is operator overloading in C++?",
                "options": [
                  "Defining a function in a derived class",
                  "Defining custom behavior for operators",
                  "Defining multiple functions with the same name",
                  "Defining a function in a base class"
                ],
                "correctAnswer": 1
              },
              {
                "id": 9,
                "text": "What is a friend function in C++?",
                "options": [
                  "A function that is overloaded",
                  "A function that is inherited from a base class",
                  "A function that is defined inside a class",
                  "A function that can access private and protected members of a class"
                ],
                "correctAnswer": 3
              },
              {
                "id": 10,
                "text": "What is the 'this' pointer in C++?",
                "options": [
                  "A pointer to a friend function",
                  "A pointer to the derived class",
                  "A pointer to the base class",
                  "A pointer to the current object"
                ],
                "correctAnswer": 3
              },
              {
                "id": 11,
                "text": "What is a pure virtual function in C++?",
                "options": [
                  "A function with no implementation in the base class",
                  "A function that is inherited",
                  "A function that is overloaded",
                  "A function with implementation in the base class"
                ],
                "correctAnswer": 0
              },
              {
                "id": 12,
                "text": "What is an abstract class in C++?",
                "options": [
                  "A class with only static functions",
                  "A class with at least one pure virtual function",
                  "A class with no functions",
                  "A class with only friend functions"
                ],
                "correctAnswer": 1
              },
              {
                "id": 13,
                "text": "What is the purpose of the 'static' keyword in C++?",
                "options": [
                  "To define friend functions",
                  "To define instance-level members",
                  "To define virtual functions",
                  "To define class-level members"
                ],
                "correctAnswer": 3
              },
              {
                "id": 14,
                "text": "What is a template in C++?",
                "options": [
                  "A function that is inherited",
                  "A function that is virtual",
                  "A blueprint for creating generic functions or classes",
                  "A function that is overloaded"
                ],
                "correctAnswer": 2
              },
              {
                "id": 15,
                "text": "What is the purpose of the 'namespace' keyword in C++?",
                "options": [
                  "To define virtual functions",
                  "To define class-level members",
                  "To define instance-level members",
                  "To organize code and avoid name conflicts"
                ],
                "correctAnswer": 3
              },
              {
                "id": 16,
                "text": "What is the difference between 'public', 'private', and 'protected' access specifiers in C++?",
                "options": [
                  "They define the type of inheritance",
                  "They control the visibility of class members",
                  "They define the type of functions",
                  "They define the type of variables"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17,
                "text": "What is the purpose of the 'const' keyword in C++?",
                "options": [
                  "To define variables",
                  "To define classes",
                  "To define constants and prevent modification",
                  "To define functions"
                ],
                "correctAnswer": 2
              },
              {
                "id": 18,
                "text": "What is the purpose of the 'new' operator in C++?",
                "options": [
                  "To delete memory",
                  "To define constants",
                  "To dynamically allocate memory",
                  "To define functions"
                ],
                "correctAnswer": 2
              },
              {
                "id": 19,
                "text": "What is the purpose of the 'delete' operator in C++?",
                "options": [
                  "To deallocate dynamically allocated memory",
                  "To define constants",
                  "To allocate memory",
                  "To define functions"
                ],
                "correctAnswer": 0
              },
              {
                "id": 20,
                "text": "What is the purpose of the 'inline' keyword in C++?",
                "options": [
                  "To define a static function",
                  "To define a virtual function",
                  "To suggest inlining a function to reduce overhead",
                  "To define a friend function"
                ],
                "correctAnswer": 2
              }
            ]
          },

          {
            "id": 23,
            "title": "Python (Advanced)",
            "subject": "Programming Languages",
            "duration": 60,
            "passingScore": 70,
            "questions": [
              {
                "id": 1,
                "text": "What is a decorator in Python?",
                "options": [
                  "A function that modifies the behavior of another function",
                  "A function that creates classes",
                  "A built-in function that handles exceptions",
                  "A function that defines static methods"
                ],
                "correctAnswer": 0
              },
              {
                "id": 2,
                "text": "What does the 'yield' keyword do in Python?",
                "options": [
                  "It pauses the function and returns a generator",
                  "It makes a function return a boolean value",
                  "It forces the function to stop immediately",
                  "It is used for memory allocation in lists"
                ],
                "correctAnswer": 0
              },
              {
                "id": 3,
                "text": "Which Python data type is immutable?",
                "options": [
                  "List",
                  "Set",
                  "Dictionary",
                  "Tuple"
                ],
                "correctAnswer": 3
              },
              {
                "id": 4,
                "text": "What is the purpose of the 'self' keyword in Python?",
                "options": [
                  "It refers to the instance of the class",
                  "It is used to define variables",
                  "It refers to the parent class",
                  "It is used to declare functions"
                ],
                "correctAnswer": 0
              },
              {
                "id": 5,
                "text": "What is the difference between 'deepcopy' and 'copy' in Python?",
                "options": [
                  "Deepcopy creates a new copy of the original object, while copy creates a reference",
                  "Copy makes a copy of only the object's values, while deepcopy makes a reference",
                  "Copy works only with lists, while deepcopy works with dictionaries",
                  "There is no difference"
                ],
                "correctAnswer": 0
              },
              {
                "id": 6,
                "text": "What is a lambda function in Python?",
                "options": [
                  "A function defined using a special syntax to create anonymous functions",
                  "A function that is used to create classes",
                  "A function that converts variables into lambdas",
                  "A function that handles exceptions"
                ],
                "correctAnswer": 0
              },
              {
                "id": 7,
                "text": "What is a metaclass in Python?",
                "options": [
                  "A class of a class, responsible for creating classes",
                  "A class that contains both data and methods",
                  "A function that defines class properties",
                  "A built-in function to handle exceptions"
                ],
                "correctAnswer": 0
              },
              {
                "id": 8,
                "text": "How can you define a class in Python?",
                "options": [
                  "class ClassName:",
                  "def ClassName():",
                  "create ClassName():",
                  "ClassName = create_class()"
                ],
                "correctAnswer": 0
              },
              {
                "id": 9,
                "text": "Which Python method is used to close a file?",
                "options": [
                  "file.close()",
                  "file.end()",
                  "file.finish()",
                  "file.terminate()"
                ],
                "correctAnswer": 0
              },
              {
                "id": 10,
                "text": "What is the purpose of the '__init__' method in Python?",
                "options": [
                  "It is used to initialize the attributes of a class",
                  "It is used to define a static method",
                  "It is used to create new instances of the class",
                  "It is used to delete objects"
                ],
                "correctAnswer": 0
              },
              {
                "id": 11,
                "text": "What is the 'with' statement used for in Python?",
                "options": [
                  "It is used to simplify file operations",
                  "It defines an alias for an imported module",
                  "It is used to handle exceptions",
                  "It defines a function"
                ],
                "correctAnswer": 0
              },
              {
                "id": 12,
                "text": "How can you create a virtual environment in Python?",
                "options": [
                  "python -m venv env_name",
                  "python -env env_name",
                  "create venv env_name",
                  "python create -v env_name"
                ],
                "correctAnswer": 0
              },
              {
                "id": 13,
                "text": "What is the 'map()' function used for in Python?",
                "options": [
                  "It applies a function to every item in an iterable",
                  "It creates a dictionary from a list",
                  "It generates a random number",
                  "It maps keys to values in a dictionary"
                ],
                "correctAnswer": 0
              },
              {
                "id": 14,
                "text": "What is the 'filter()' function used for in Python?",
                "options": [
                  "It filters out elements from an iterable based on a function",
                  "It converts an iterable to a set",
                  "It applies a function to elements of a list",
                  "It generates a list from a tuple"
                ],
                "correctAnswer": 0
              },
              {
                "id": 15,
                "text": "What does the 'try-except' block do in Python?",
                "options": [
                  "It handles exceptions during program execution",
                  "It runs the program as a function",
                  "It skips errors in code execution",
                  "It prints all errors"
                ],
                "correctAnswer": 0
              },
              {
                "id": 16,
                "text": "What is the purpose of the 'pass' keyword in Python?",
                "options": [
                  "It does nothing and is used as a placeholder",
                  "It ends the program immediately",
                  "It is used to jump to a different part of the code",
                  "It is used to return a value from a function"
                ],
                "correctAnswer": 0
              },
              {
                "id": 17,
                "text": "Which of the following is the correct way to define an instance variable in Python?",
                "options": [
                  "self.variable_name",
                  "variable_name = self",
                  "self::variable_name",
                  "self.variable"
                ],
                "correctAnswer": 0
              },
              {
                "id": 18,
                "text": "What is the difference between 'is' and '==' in Python?",
                "options": [
                  "'is' checks if two objects are the same, '==' checks if they are equal",
                  "'is' checks if two variables are equal, '==' checks if they are the same object",
                  "'is' checks the identity, '==' checks the value",
                  "'is' compares values, '==' compares objects"
                ],
                "correctAnswer": 0
              },
              {
                "id": 19,
                "text": "How do you check if a key exists in a dictionary in Python?",
                "options": [
                  "'key' in dictionary",
                  "dictionary.contains('key')",
                  "dictionary.has('key')",
                  "dictionary.get('key')"
                ],
                "correctAnswer": 0
              },
              {
                "id": 20,
                "text": "Which of the following is true about Python's garbage collection?",
                "options": [
                  "Python uses reference counting and cyclic garbage collection",
                  "Python only uses reference counting",
                  "Python uses manual memory management",
                  "Python does not have garbage collection"
                ],
                "correctAnswer": 0
              }
            ]
          },

          {
            "id": 24,
            "title": "Java (Advanced)",
            "subject": "Programming Languages",
            "duration": 60,
            "passingScore": 70,
            "questions": [
              {
                "id": 1,
                "text": "What is a Java Lambda Expression?",
                "options": [
                  "A function that is executed in the main thread",
                  "A method that returns a function",
                  "An anonymous function that can be treated as an object",
                  "A function that handles exceptions"
                ],
                "correctAnswer": 2
              },
              {
                "id": 2,
                "text": "What is the purpose of the 'final' keyword in Java?",
                "options": [
                  "To define a variable that cannot be reassigned",
                  "To prevent a class from being subclassed",
                  "To prevent method overriding",
                  "All of the above"
                ],
                "correctAnswer": 3
              },
              {
                "id": 3,
                "text": "What is the difference between '== ' and 'equals()' in Java?",
                "options": [
                  "'==' checks for reference equality, 'equals()' checks for object equality",
                  "'==' checks for object equality, 'equals()' checks for reference equality",
                  "'==' is used only for primitives",
                  "'==' and 'equals()' are the same"
                ],
                "correctAnswer": 0
              },
              {
                "id": 4,
                "text": "What is the purpose of the 'transient' keyword in Java?",
                "options": [
                  "To prevent a field from being garbage collected",
                  "To indicate a constant value",
                  "To mark fields that should not be serialized",
                  "To indicate that a method is private"
                ],
                "correctAnswer": 2
              },
              {
                "id": 5,
                "text": "What is the difference between 'ArrayList' and 'LinkedList' in Java?",
                "options": [
                  "ArrayList is slower for insertions, LinkedList is faster for random access",
                  "ArrayList uses a doubly linked list, LinkedList uses an array",
                  "ArrayList is faster for random access, LinkedList is faster for insertions and deletions",
                  "Both ArrayList and LinkedList perform the same"
                ],
                "correctAnswer": 2
              },
              {
                "id": 6,
                "text": "What does the 'super' keyword do in Java?",
                "options": [
                  "Refers to the parent class of the current object",
                  "Refers to the child class object",
                  "Refers to the current class object",
                  "Refers to the instance variable"
                ],
                "correctAnswer": 0
              },
              {
                "id": 7,
                "text": "What is the purpose of the 'synchronized' keyword in Java?",
                "options": [
                  "To allow multiple threads to run concurrently",
                  "To control access to a method or block of code by multiple threads",
                  "To make a class immutable",
                  "To mark a method as thread-safe"
                ],
                "correctAnswer": 1
              },
              {
                "id": 8,
                "text": "What is the difference between 'throw' and 'throws' in Java?",
                "options": [
                  "'throw' is used to declare an exception, 'throws' is used to throw an exception",
                  "'throw' is used to throw an exception, 'throws' is used to declare an exception",
                  "'throw' and 'throws' are the same",
                  "'throw' is used only for runtime exceptions"
                ],
                "correctAnswer": 1
              },
              {
                "id": 9,
                "text": "What is the purpose of the 'volatile' keyword in Java?",
                "options": [
                  "To mark methods as synchronized",
                  "To ensure visibility of changes to a variable across threads",
                  "To prevent garbage collection of variables",
                  "To prevent methods from being overridden"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10,
                "text": "What is the difference between 'StringBuilder' and 'StringBuffer' in Java?",
                "options": [
                  "StringBuffer is slower than StringBuilder",
                  "StringBuilder is not synchronized, while StringBuffer is synchronized",
                  "StringBuffer can be used in multithreaded applications, StringBuilder cannot",
                  "There is no difference between StringBuilder and StringBuffer"
                ],
                "correctAnswer": 1
              },
              {
                "id": 11,
                "text": "What is the 'clone()' method used for in Java?",
                "options": [
                  "To create a copy of an object",
                  "To compare two objects",
                  "To serialize an object",
                  "To delete an object"
                ],
                "correctAnswer": 0
              },
              {
                "id": 12,
                "text": "What is the 'instanceof' operator used for in Java?",
                "options": [
                  "To create an instance of a class",
                  "To compare two objects",
                  "To check if an object is an instance of a specific class",
                  "To throw exceptions"
                ],
                "correctAnswer": 2
              },
              {
                "id": 13,
                "text": "What is the purpose of the 'static' keyword in Java?",
                "options": [
                  "To define class-level members",
                  "To define methods that can be called without creating an instance of a class",
                  "To define instance-level members",
                  "Both 1 and 2"
                ],
                "correctAnswer": 3
              },
              {
                "id": 14,
                "text": "What is a 'deadlock' in Java?",
                "options": [
                  "A situation where a thread finishes its execution",
                  "A situation where the main thread is interrupted",
                  "A situation where two or more threads are blocked forever",
                  "A situation where a thread is waiting for a signal"
                ],
                "correctAnswer": 2
              },
              {
                "id": 15,
                "text": "What is the 'finalize()' method used for in Java?",
                "options": [
                  "To mark a class as immutable",
                  "To perform cleanup before an object is garbage collected",
                  "To declare constants",
                  "To start a thread"
                ],
                "correctAnswer": 1
              },
              {
                "id": 16,
                "text": "What does the 'hashCode()' method do in Java?",
                "options": [
                  "It returns a unique integer representing an object",
                  "It compares two objects for equality",
                  "It serializes an object",
                  "It is used to create a copy of an object"
                ],
                "correctAnswer": 0
              },
              {
                "id": 17,
                "text": "What is the purpose of 'Stream API' in Java?",
                "options": [
                  "To process sequences of elements in a functional style",
                  "To create custom collections",
                  "To handle IO operations",
                  "To manage memory allocation"
                ],
                "correctAnswer": 0
              },
              {
                "id": 18,
                "text": "What is the 'Collections' class used for in Java?",
                "options": [
                  "To define custom collections",
                  "To manage multithreading in collections",
                  "To provide static methods to operate on or return collections",
                  "To handle memory management in collections"
                ],
                "correctAnswer": 2
              },
              {
                "id": 19,
                "text": "What is the 'Serializable' interface used for in Java?",
                "options": [
                  "To create an object in memory",
                  "To mark a class as capable of being serialized",
                  "To define constant values",
                  "To manage exceptions"
                ],
                "correctAnswer": 1
              },
              {
                "id": 20,
                "text": "What is the difference between 'checked' and 'unchecked' exceptions in Java?",
                "options": [
                  "Checked exceptions must be declared or handled, unchecked exceptions do not",
                  "Checked exceptions occur during runtime, unchecked exceptions occur during compile-time",
                  "Checked exceptions are runtime exceptions, unchecked exceptions are compile-time exceptions",
                  "Both are handled the same way"
                ],
                "correctAnswer": 0
              }
            ]
          },

          {
            "id": 25,
            "title": "JavaScript (Advanced)",
            "subject": "Programming Languages",
            "duration": 60,
            "passingScore": 70,
            "questions": [
              {
                "id": 1,
                "text": "What is the difference between 'null' and 'undefined' in JavaScript?",
                "options": [
                  "'null' is used to represent an uninitialized variable, 'undefined' is a valid type",
                  "'null' is an assigned value, 'undefined' means a variable has been declared but not assigned a value",
                  "'null' means a variable has no value, 'undefined' means the variable has no function",
                  "'null' is a type of object, 'undefined' is a type of function"
                ],
                "correctAnswer": 1
              },
              {
                "id": 2,
                "text": "What is the purpose of 'bind()' method in JavaScript?",
                "options": [
                  "To call a function with a specific set of arguments",
                  "To set the value of 'this' in a function",
                  "To prevent the use of a function",
                  "To declare a function that cannot be overridden"
                ],
                "correctAnswer": 1
              },
              {
                "id": 3,
                "text": "What is the difference between 'let' and 'var' in JavaScript?",
                "options": [
                  "'let' creates a global variable, while 'var' creates a local variable",
                  "'let' is not hoisted, while 'var' is hoisted",
                  "'let' is block-scoped, while 'var' is function-scoped",
                  "'let' is used for functions, while 'var' is used for objects"
                ],
                "correctAnswer": 2
              },
              {
                "id": 4,
                "text": "What is a closure in JavaScript?",
                "options": [
                  "A function that has access to its own scope, the outer function's scope, and the global scope",
                  "A function that is used to handle asynchronous code",
                  "A function that calls another function indefinitely",
                  "A function that can access only its own scope"
                ],
                "correctAnswer": 0
              },
              {
                "id": 5,
                "text": "What is the purpose of the 'this' keyword in JavaScript?",
                "options": [
                  "It refers to the global object",
                  "It refers to a parent object",
                  "It refers to the current object",
                  "It is used to define a function"
                ],
                "correctAnswer": 2
              },
              {
                "id": 6,
                "text": "What is event delegation in JavaScript?",
                "options": [
                  "Attaching multiple event listeners to each child element",
                  "Attaching a single event listener to a parent element to handle events for child elements",
                  "Assigning a default event to a function",
                  "Assigning an event listener to the DOM root"
                ],
                "correctAnswer": 1
              },
              {
                "id": 7,
                "text": "What is a 'Promise' in JavaScript?",
                "options": [
                  "A method to handle errors in JavaScript",
                  "A data structure used to store async tasks",
                  "An object representing the eventual completion or failure of an asynchronous operation",
                  "A function that runs asynchronously"
                ],
                "correctAnswer": 2
              },
              {
                "id": 8,
                "text": "What is the 'async/await' pattern used for in JavaScript?",
                "options": [
                  "To declare variables",
                  "To create anonymous functions",
                  "To define synchronous functions",
                  "To handle asynchronous code in a more readable manner"
                ],
                "correctAnswer": 3
              },
              {
                "id": 9,
                "text": "What is the difference between 'call()', 'apply()', and 'bind()' in JavaScript?",
                "options": [
                  "'call()' and 'apply()' invoke the function immediately, 'bind()' creates a new function",
                  "'call()' and 'bind()' are used for setting 'this', 'apply()' sets arguments",
                  "'bind()' can only be used with objects, 'call()' and 'apply()' are used with functions",
                  "'call()' is used for asynchronous functions, 'bind()' is used for synchronous functions"
                ],
                "correctAnswer": 0
              },
              {
                "id": 10,
                "text": "What is the purpose of 'localStorage' in JavaScript?",
                "options": [
                  "To store data persistently on the client-side",
                  "To store data in cookies",
                  "To store data on the server-side",
                  "To store data in the session only"
                ],
                "correctAnswer": 0
              },
              {
                "id": 11,
                "text": "What is the difference between '==' and '===' in JavaScript?",
                "options": [
                  "'==' compares both values and types, '===' compares values only",
                  "'==' compares values only, '===' compares both values and types",
                  "'==' is used only for arrays, '===' is used for objects",
                  "'==' is used only for objects, '===' is used for primitives"
                ],
                "correctAnswer": 1
              },
              {
                "id": 12,
                "text": "What is the purpose of 'bind()' method in JavaScript?",
                "options": [
                  "To link a function with a promise",
                  "To set the value of 'this' for a function",
                  "To create a new array",
                  "To bind two objects together"
                ],
                "correctAnswer": 1
              },
              {
                "id": 13,
                "text": "What is the 'setTimeout()' method used for in JavaScript?",
                "options": [
                  "To remove an event listener after a certain time",
                  "To delay the execution of a function",
                  "To create a time-based event listener",
                  "To execute a function immediately"
                ],
                "correctAnswer": 1
              },
              {
                "id": 14,
                "text": "What is a 'debounce' function in JavaScript?",
                "options": [
                  "A function that handles asynchronous operations",
                  "A function that limits the rate at which a function is executed",
                  "A function that immediately executes when an event is triggered",
                  "A function that delays the execution of a function until after a certain period"
                ],
                "correctAnswer": 1
              },
              {
                "id": 15,
                "text": "What is the purpose of 'Object.freeze()' in JavaScript?",
                "options": [
                  "To delete an object",
                  "To create a new object",
                  "To copy an object",
                  "To prevent an object from being modified"
                ],
                "correctAnswer": 3
              },
              {
                "id": 16,
                "text": "What is 'destructuring' in JavaScript?",
                "options": [
                  "Renaming variables in a function",
                  "Breaking down a function into smaller functions",
                  "Extracting values from arrays or objects into distinct variables",
                  "Converting a function into an object"
                ],
                "correctAnswer": 2
              },
              {
                "id": 17,
                "text": "What is the 'spread operator' in JavaScript?",
                "options": [
                  "It spreads the contents of a function",
                  "It is used to create a new object",
                  "It allows iterable objects to be expanded into individual elements",
                  "It is used to create arrays from objects"
                ],
                "correctAnswer": 2
              },
              {
                "id": 18,
                "text": "What is the difference between 'forEach()' and 'map()' in JavaScript?",
                "options": [
                  "'forEach()' creates a new array, 'map()' modifies the original array",
                  "'forEach()' executes a function for each array element, 'map()' creates a new array with results",
                  "'map()' can be used with promises, 'forEach()' cannot",
                  "'forEach()' is used for objects, 'map()' is used for arrays"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19,
                "text": "What is the 'reduce()' method in JavaScript?",
                "options": [
                  "It removes elements from an array based on a condition",
                  "It sorts an array in ascending order",
                  "It creates a new array based on existing values",
                  "It applies a function against an accumulator and each element in the array to reduce it to a single value"
                ],
                "correctAnswer": 3
              },
              {
                "id": 20,
                "text": "What is 'Hoisting' in JavaScript?",
                "options": [
                  "The process of moving variable and function declarations to the top of their containing scope",
                  "The process of handling asynchronous operations",
                  "The process of creating closures in JavaScript",
                  "The process of creating functions at the top of the file"
                ],
                "correctAnswer": 0
              }
            ]
          },
          
          {
            "id": 26,
            "title": "C Programming (Advanced)",
            "subject": "Programming Languages",
            "duration": 60,
            "passingScore": 70,
            "questions": [
              {
                "id": 1,
                "text": "What is the difference between 'malloc()' and 'calloc()' in C?",
                "options": [
                  "'malloc()' initializes memory, 'calloc()' does not",
                  "'calloc()' allocates memory and initializes it to zero, 'malloc()' does not initialize",
                  "'malloc()' is used for dynamic arrays, 'calloc()' is used for dynamic memory blocks",
                  "'calloc()' allocates memory for a single element, 'malloc()' allocates memory for multiple elements"
                ],
                "correctAnswer": 1
              },
              {
                "id": 2,
                "text": "What is a pointer in C?",
                "options": [
                  "A pointer is a variable that stores the address of another variable",
                  "A pointer stores data in a specific memory location",
                  "A pointer is a type of array",
                  "A pointer is a special variable that holds a function address"
                ],
                "correctAnswer": 0
              },
              {
                "id": 3,
                "text": "What does the 'sizeof()' operator do in C?",
                "options": [
                  "It returns the size of the pointer variable",
                  "It returns the size of the data type or variable in bytes",
                  "It returns the number of elements in an array",
                  "It calculates the memory address of a variable"
                ],
                "correctAnswer": 1
              },
              {
                "id": 4,
                "text": "What is the purpose of the 'const' keyword in C?",
                "options": [
                  "To make a variable constant and unmodifiable",
                  "To declare a constant pointer",
                  "To prevent a function from being used in multiple files",
                  "To define a global constant"
                ],
                "correctAnswer": 0
              },
              {
                "id": 5,
                "text": "What is a segmentation fault in C?",
                "options": [
                  "An error that occurs when the program tries to access a restricted memory location",
                  "A runtime error caused by uninitialized variables",
                  "An error in accessing array elements out of bounds",
                  "An error that occurs when a pointer is assigned a value incorrectly"
                ],
                "correctAnswer": 0
              },
              {
                "id": 6,
                "text": "What is the difference between 'struct' and 'union' in C?",
                "options": [
                  "In a struct, all members are allocated memory separately; in a union, all members share the same memory location",
                  "Structs can hold more types of data than unions",
                  "A union can hold multiple values at the same time, while a struct can hold only one value",
                  "A union is used for function definition, while a struct is used for object-oriented programming"
                ],
                "correctAnswer": 0
              },
              {
                "id": 7,
                "text": "What does the 'break' statement do in C?",
                "options": [
                  "It causes the program to exit immediately",
                  "It terminates the loop and transfers control to the next statement",
                  "It breaks the program into multiple sections",
                  "It transfers control to the next iteration of a loop"
                ],
                "correctAnswer": 1
              },
              {
                "id": 8,
                "text": "What is the purpose of the 'void' keyword in C?",
                "options": [
                  "To declare a function that does not return any value",
                  "To define a pointer type",
                  "To create a variable of an unknown data type",
                  "To indicate an empty function parameter list"
                ],
                "correctAnswer": 0
              },
              {
                "id": 9,
                "text": "What is the 'typedef' keyword used for in C?",
                "options": [
                  "To create an alias for an existing data type",
                  "To declare a pointer to a function",
                  "To define a new variable type",
                  "To create an anonymous function"
                ],
                "correctAnswer": 0
              },
              {
                "id": 10,
                "text": "What is a macro in C?",
                "options": [
                  "A type of function that is pre-defined",
                  "A function that generates machine code directly",
                  "A preprocessor directive used to define constants or functions",
                  "A function that uses recursion"
                ],
                "correctAnswer": 2
              },
              {
                "id": 11,
                "text": "What is the output of the following code?\nint a = 5, b = 10;\nprintf('%d', a+++b);",
                "options": [
                  "Error due to incorrect syntax",
                  "The output is 15",
                  "The output is 10",
                  "The output is 5"
                ],
                "correctAnswer": 1
              },
              {
                "id": 12,
                "text": "Which of the following is true about memory management in C?",
                "options": [
                  "C automatically handles memory allocation and deallocation",
                  "In C, memory must be explicitly managed using malloc(), calloc(), and free()",
                  "C uses garbage collection for memory management",
                  "C does not support dynamic memory allocation"
                ],
                "correctAnswer": 1
              },
              {
                "id": 13,
                "text": "What is a function pointer in C?",
                "options": [
                  "A pointer that holds the memory address of another function",
                  "A pointer to an array of integers",
                  "A pointer that returns the type of a function",
                  "A pointer to an object in a class"
                ],
                "correctAnswer": 0
              },
              {
                "id": 14,
                "text": "What does the 'continue' statement do in C?",
                "options": [
                  "It breaks out of the loop completely",
                  "It skips the current iteration and jumps to the next iteration of the loop",
                  "It causes the program to terminate immediately",
                  "It terminates the current function"
                ],
                "correctAnswer": 1
              },
              {
                "id": 15,
                "text": "What is a 'global variable' in C?",
                "options": [
                  "A variable declared outside of any function and accessible to all functions",
                  "A variable declared inside a function and visible only to that function",
                  "A variable passed as an argument to a function",
                  "A variable that is only accessible in the main function"
                ],
                "correctAnswer": 0
              },
              {
                "id": 16,
                "text": "Which of the following is used to include a standard library header in C?",
                "options": [
                  "#import",
                  "#include",
                  "#library",
                  "#define"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17,
                "text": "What is the role of the 'return' statement in C?",
                "options": [
                  "It ends the current function and returns a value to the calling function",
                  "It terminates the entire program",
                  "It halts the execution of a loop",
                  "It returns control to the operating system"
                ],
                "correctAnswer": 0
              },
              {
                "id": 18,
                "text": "What does the 'strcpy()' function do in C?",
                "options": [
                  "It concatenates two strings",
                  "It copies one string into another",
                  "It compares two strings",
                  "It checks the length of a string"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19,
                "text": "What does the 'fopen()' function do in C?",
                "options": [
                  "It opens a file for reading, writing, or appending",
                  "It closes a file",
                  "It creates a new file",
                  "It reads the contents of a file into a string"
                ],
                "correctAnswer": 0
              },
              {
                "id": 20,
                "text": "What is the output of the following code?\nint a = 5, b = 10;\nprintf('%d', ++a * b);",
                "options": [
                  "The output is 50",
                  "The output is 55",
                  "The output is 60",
                  "Error due to incorrect syntax"
                ],
                "correctAnswer": 1
              }
            ]
          },

          
          

          
          
          
    ]
}