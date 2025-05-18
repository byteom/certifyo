
import { Subject } from "@/types";
export const webDevelopment: Subject = {
    id: 1,
    name: "Web Development",
    description: "Master modern web development technologies including HTML, CSS, JavaScript, and popular frameworks.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",

    // JavaScript Fundamentals
    exams: [
      {
        "id": 1,
        "title": "JavaScript Fundamentals",
        "subject": "Web Development",
        "duration": 45,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is the output of typeof null?",
            "options": ["null", "undefined", "object", "number"],
            "correctAnswer": 2
          },
          {
            "id": 2,
            "text": "Which method is used to add elements to the end of an array?",
            "options": ["push()", "pop()", "shift()", "unshift()"],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "text": "What is the difference between == and === in JavaScript?",
            "options": [
              "No difference",
              "=== checks both value and type, == only checks value",
              "== is deprecated",
              "=== is faster than =="
            ],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "text": "What is closure in JavaScript?",
            "options": [
              "A way to close browser windows",
              "A function that has access to variables in its outer scope",
              "A method to end loops",
              "A way to close database connections"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "Which of these is not a JavaScript data type?",
            "options": ["undefined", "boolean", "float", "symbol"],
            "correctAnswer": 2
          },
          {
            "id": 6,
            "text": "What is the purpose of the 'use strict' directive?",
            "options": [
              "To enforce stricter type checking",
              "To enable a stricter mode of JavaScript execution",
              "To disable certain features of JavaScript",
              "To improve performance"
            ],
            "correctAnswer": 1
          },
          {
            "id": 7,
            "text": "What is the result of 2 + '2' in JavaScript?",
            "options": ["4", "22", "NaN", "Error"],
            "correctAnswer": 1
          },
          {
            "id": 8,
            "text": "What is the purpose of the 'this' keyword in JavaScript?",
            "options": [
              "To refer to the current function",
              "To refer to the global object",
              "To refer to the object that owns the current code",
              "To refer to the parent function"
            ],
            "correctAnswer": 2
          },
          {
            "id": 9,
            "text": "What is the output of console.log(typeof NaN)?",
            "options": ["number", "NaN", "undefined", "object"],
            "correctAnswer": 0
          },
          {
            "id": 10,
            "text": "What is the purpose of the 'bind' method in JavaScript?",
            "options": [
              "To bind two objects together",
              "To create a new function with a specific 'this' value",
              "To bind event listeners to elements",
              "To bind data to the DOM"
            ],
            "correctAnswer": 1
          },
          {
            "id": 11,
            "text": "What will be the output of console.log([] + []) in JavaScript?",
            "options": ["[]", "undefined", "NaN", ""],
            "correctAnswer": 3
          },
          {
            "id": 12,
            "text": "Which method removes the last element from an array?",
            "options": ["push()", "pop()", "shift()", "unshift()"],
            "correctAnswer": 1
          },
          {
            "id": 13,
            "text": "How do you declare a variable in JavaScript that is scoped only within a function?",
            "options": ["var", "let", "const", "function"],
            "correctAnswer": 1
          },
          {
            "id": 14,
            "text": "What is the output of console.log(0.1 + 0.2 === 0.3)?",
            "options": ["true", "false", "NaN", "undefined"],
            "correctAnswer": 1
          },
          {
            "id": 15,
            "text": "Which of the following is a valid way to create a function in JavaScript?",
            "options": [
              "function myFunction() {}",
              "const myFunction = () => {}",
              "const myFunction = function() {}",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 16,
            "text": "Which of these is used for creating objects in JavaScript?",
            "options": ["Object.create()", "new Object()", "{}", "All of the above"],
            "correctAnswer": 3
          },
          {
            "id": 17,
            "text": "What is the purpose of the 'new' keyword in JavaScript?",
            "options": [
              "To create a new object",
              "To create a new function",
              "To create a new string",
              "To create a new variable"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "Which of the following methods can be used to loop through an array in JavaScript?",
            "options": [
              "for()",
              "forEach()",
              "map()",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 19,
            "text": "Which of these methods is used to join all elements of an array into a string?",
            "options": ["join()", "concat()", "push()", "slice()"],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "Which of the following will not work for copying an object in JavaScript?",
            "options": [
              "Object.assign()",
              "JSON.parse(JSON.stringify())",
              "Object.clone()",
              "Spread operator"
            ],
            "correctAnswer": 2
          },
          {
            "id": 21,
            "text": "What is the correct way to add a comment in JavaScript?",
            "options": [
              "// Comment",
              "/* Comment */",
              "/* Comment",
              "# Comment"
            ],
            "correctAnswer": 0
          },
          {
            "id": 22,
            "text": "Which method is used to check if an array contains a certain element?",
            "options": ["includes()", "contains()", "find()", "indexOf()"],
            "correctAnswer": 0
          },
          {
            "id": 23,
            "text": "Which operator is used to check equality in both value and type in JavaScript?",
            "options": ["=", "==", "===", "!==" ],
            "correctAnswer": 2
          },
          {
            "id": 24,
            "text": "What does NaN represent in JavaScript?",
            "options": [
              "Not a Number",
              "Null a Number",
              "No Available Number",
              "Negative a Number"
            ],
            "correctAnswer": 0
          },
          {
            "id": 25,
            "text": "What is the output of console.log(!!'hello')?",
            "options": ["false", "true", "undefined", "NaN"],
            "correctAnswer": 1
          },
          {
            "id": 26,
            "text": "Which function is used to parse a JSON string into a JavaScript object?",
            "options": ["JSON.parse()", "JSON.stringify()", "JSON.parseTo()", "JSON.parseJson()"],
            "correctAnswer": 0
          },
          {
            "id": 27,
            "text": "Which of the following functions is used to delay execution in JavaScript?",
            "options": ["setTimeout()", "setInterval()", "delay()", "pause()"],
            "correctAnswer": 0
          },
          {
            "id": 28,
            "text": "Which event occurs when the user clicks on an element in JavaScript?",
            "options": ["onclick", "onmouseover", "onchange", "onfocus"],
            "correctAnswer": 0
          },
          {
            "id": 29,
            "text": "What is the default value of an uninitialized variable in JavaScript?",
            "options": ["undefined", "null", "NaN", "0"],
            "correctAnswer": 0
          },
          {
            "id": 30,
            "text": "Which of the following is NOT a primitive type in JavaScript?",
            "options": ["String", "Number", "Object", "Boolean"],
            "correctAnswer": 2
          }
        ]
      },


      //React Essentials
      {
        "id": 2,
        "title": "React Essentials",
        "subject": "Web Development",
        "duration": 60,
        "passingScore": 75,
        "questions": [
          {
            "id": 1,
            "text": "What hook is used for side effects in React?",
            "options": ["useState", "useEffect", "useContext", "useReducer"],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "text": "What is the virtual DOM?",
            "options": [
              "A direct copy of the real DOM",
              "A lightweight copy of the real DOM in memory",
              "A JavaScript engine",
              "A browser feature"
            ],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "text": "Which hook is used for state management in functional components?",
            "options": ["useEffect", "useState", "useRef", "useCallback"],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "text": "What is the purpose of keys in React lists?",
            "options": [
              "To style list items",
              "To help React identify which items have changed",
              "To create unique URLs",
              "To encrypt data"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "What is the correct way to update state in React?",
            "options": [
              "Directly modify the state variable",
              "Use the setState function from useState",
              "Use global variables",
              "Modify the DOM directly"
            ],
            "correctAnswer": 1
          },
          {
            "id": 6,
            "text": "What is the purpose of the 'useRef' hook?",
            "options": [
              "To manage state",
              "To create a reference to a DOM element or persist values across renders",
              "To handle side effects",
              "To manage context"
            ],
            "correctAnswer": 1
          },
          {
            "id": 7,
            "text": "What is the difference between props and state?",
            "options": [
              "Props are immutable, state is mutable",
              "State is passed from parent to child, props are internal",
              "Props are used for functional components, state for class components",
              "There is no difference"
            ],
            "correctAnswer": 0
          },
          {
            "id": 8,
            "text": "What is the purpose of React Router?",
            "options": [
              "To manage state",
              "To handle routing in a React application",
              "To manage side effects",
              "To create forms"
            ],
            "correctAnswer": 1
          },
          {
            "id": 9,
            "text": "What is the purpose of the 'useContext' hook?",
            "options": [
              "To manage state",
              "To access context values",
              "To handle side effects",
              "To create refs"
            ],
            "correctAnswer": 1
          },
          {
            "id": 10,
            "text": "What is the purpose of the 'useReducer' hook?",
            "options": [
              "To manage complex state logic",
              "To handle side effects",
              "To create refs",
              "To manage context"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "What is JSX in React?",
            "options": [
              "A JavaScript library",
              "A syntax extension for JavaScript",
              "A state management library",
              "A function"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "Which method is used to create a React element?",
            "options": [
              "React.createElement()",
              "React.render()",
              "React.addElement()",
              "React.element()"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "Which of the following is true about React components?",
            "options": [
              "They can only return a single root element",
              "They can return multiple elements without a wrapper",
              "They do not accept any props",
              "They must be written as class components"
            ],
            "correctAnswer": 0
          },
          {
            "id": 14,
            "text": "How do you bind an event handler to an element in React?",
            "options": [
              "By passing the handler function as a prop",
              "By calling the handler function directly in the JSX",
              "By using the bind() method on the handler function",
              "By using the event handler function directly"
            ],
            "correctAnswer": 2
          },
          {
            "id": 15,
            "text": "What does the 'useEffect' hook allow you to do in React?",
            "options": [
              "Manage state in functional components",
              "Perform side effects in functional components",
              "Create references to DOM elements",
              "Optimize performance"
            ],
            "correctAnswer": 1
          },
          {
            "id": 16,
            "text": "What is the default value of 'this' inside a function in React?",
            "options": [
              "The component instance",
              "The global window object",
              "null",
              "undefined"
            ],
            "correctAnswer": 1
          },
          {
            "id": 17,
            "text": "What is the purpose of the 'componentDidMount' lifecycle method in React?",
            "options": [
              "To handle errors in the component",
              "To trigger after the component is mounted to the DOM",
              "To update the component state",
              "To render the component"
            ],
            "correctAnswer": 1
          },
          {
            "id": 18,
            "text": "Which of the following is true about React context?",
            "options": [
              "It is used for passing data through the component tree without props",
              "It is used for managing state only",
              "It is used for handling side effects",
              "It is a replacement for Redux"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "What is the function of 'React.StrictMode'?",
            "options": [
              "To enable features for debugging",
              "To handle rendering logic",
              "To optimize performance",
              "To display warnings for deprecated methods"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "Which of the following is used to prevent unnecessary re-rendering in React?",
            "options": [
              "React.memo()",
              "useMemo()",
              "useCallback()",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 21,
            "text": "Which of the following is used to conditionally render components in React?",
            "options": [
              "if-else statement",
              "ternary operator",
              "switch-case",
              "All of the above"
            ],
            "correctAnswer": 1
          },
          {
            "id": 22,
            "text": "What does the 'useCallback' hook do?",
            "options": [
              "Returns a memoized version of the callback function",
              "Returns a new callback function each time",
              "Creates a new state variable",
              "Handles side effects"
            ],
            "correctAnswer": 0
          },
          {
            "id": 23,
            "text": "What happens if you don't provide a key when rendering lists in React?",
            "options": [
              "React throws an error",
              "React will automatically generate keys",
              "React uses indexes as keys by default",
              "React will not be able to re-render the list efficiently"
            ],
            "correctAnswer": 3
          },
          {
            "id": 24,
            "text": "Which React lifecycle method is used to update the DOM after component updates?",
            "options": [
              "componentDidUpdate()",
              "componentDidMount()",
              "shouldComponentUpdate()",
              "render()"
            ],
            "correctAnswer": 0
          },
          {
            "id": 25,
            "text": "What is the role of 'PropTypes' in React?",
            "options": [
              "To enforce the data types for props",
              "To validate component state",
              "To manage prop-based events",
              "To bind event handlers to elements"
            ],
            "correctAnswer": 0
          },
          {
            "id": 26,
            "text": "Which hook is used for creating and managing references to DOM elements?",
            "options": ["useState", "useRef", "useContext", "useReducer"],
            "correctAnswer": 1
          },
          {
            "id": 27,
            "text": "How do you handle form submission in React?",
            "options": [
              "By using the submit() method",
              "By handling the event with an event handler function",
              "By using the reset() method",
              "By using the action attribute in the form"
            ],
            "correctAnswer": 1
          },
          {
            "id": 28,
            "text": "What does the 'useMemo' hook do?",
            "options": [
              "Memoizes a function's return value to avoid unnecessary re-renders",
              "Caches the result of the hook for reuse",
              "Creates a memoized component",
              "Handles the memoization of state variables"
            ],
            "correctAnswer": 0
          },
          {
            "id": 29,
            "text": "What is the correct way to pass data to child components in React?",
            "options": [
              "Using props",
              "Using state",
              "Using context",
              "Using the component's constructor"
            ],
            "correctAnswer": 0
          },
          {
            "id": 30,
            "text": "Which hook is used for handling the lifecycle methods of a React component?",
            "options": [
              "useEffect",
              "useState",
              "useMemo",
              "useReducer"
            ],
            "correctAnswer": 0
          }
        ]
      },


      //TypeScript Advanced
      {
        id: 3,
        title: "TypeScript Advanced",
        subject: "Web Development",
        duration: 55,
        passingScore: 70,
        questions: [
          {
            id: 1,
            text: "What is a generic type in TypeScript?",
            options: [
              "A type that can work with multiple data types",
              "A type that only works with numbers",
              "A type for arrays only",
              "A type for strings only"
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            text: "What is the purpose of the 'keyof' operator?",
            options: [
              "To create new keys",
              "To get the union of keys from a type",
              "To delete keys",
              "To modify keys"
            ],
            correctAnswer: 1
          },
          {
            id: 3,
            text: "What is a union type?",
            options: [
              "A type that combines multiple types into one",
              "A type for unions only",
              "A type for arrays",
              "A type for objects only"
            ],
            correctAnswer: 0
          },
          {
            id: 4,
            text: "What is the 'as' keyword used for?",
            options: [
              "Loop iteration",
              "Type assertion",
              "Variable declaration",
              "Function definition"
            ],
            correctAnswer: 1
          },
          {
            id: 5,
            text: "What is an interface in TypeScript?",
            options: [
              "A class definition",
              "A type definition for object structure",
              "A function type",
              "A variable declaration"
            ],
            correctAnswer: 1
          },
          // Additional questions for TypeScript Advanced
          {
            id: 6,
            text: "What is the purpose of the 'readonly' modifier in TypeScript?",
            options: [
              "To make a property immutable",
              "To make a property optional",
              "To make a property private",
              "To make a property public"
            ],
            correctAnswer: 0
          },
          {
            id: 7,
            text: "What is the purpose of the 'never' type in TypeScript?",
            options: [
              "To represent a value that never occurs",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a number"
            ],
            correctAnswer: 0
          },
          {
            id: 8,
            text: "What is the purpose of the 'unknown' type in TypeScript?",
            options: [
              "To represent a value that is unknown at compile time",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a string"
            ],
            correctAnswer: 0
          },
          {
            id: 9,
            text: "What is the purpose of the 'any' type in TypeScript?",
            options: [
              "To represent any type of value",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a number"
            ],
            correctAnswer: 0
          },
          {
            id: 10,
            text: "What is the purpose of the 'void' type in TypeScript?",
            options: [
              "To represent a function that does not return a value",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a string"
            ],
            correctAnswer: 0
          },
          {
            "id": 11,
            "text": "How do you create a tuple in TypeScript?",
            "options": [
              "By using an array literal",
              "By using the tuple() method",
              "By using square brackets with types for each element",
              "By using an object with properties"
            ],
            "correctAnswer": 2
          },
          {
            "id": 12,
            "text": "What is the purpose of the 'infer' keyword in TypeScript?",
            "options": [
              "To infer the type of a variable from its value",
              "To infer the type of an object",
              "To infer the return type of a function",
              "To infer the type of function parameters"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "What is a mapped type in TypeScript?",
            "options": [
              "A type that represents an object with dynamically generated properties",
              "A type that maps elements in an array",
              "A type that maps values in an object",
              "A type for mapping keys to values"
            ],
            "correctAnswer": 0
          },
          {
            "id": 14,
            "text": "Which of the following is true about 'interface' and 'type' in TypeScript?",
            "options": [
              "Both 'interface' and 'type' can be used to define object shapes",
              "'type' is used for more complex types, 'interface' is simpler",
              "'interface' cannot extend other types",
              "'type' is used for class definitions"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "What is the purpose of the 'extends' keyword in TypeScript?",
            "options": [
              "To extend a class",
              "To extend an interface",
              "To extend a type",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 16,
            "text": "What is the purpose of 'const assertions' in TypeScript?",
            "options": [
              "To assert that a value is a constant",
              "To assert a value's type as readonly",
              "To assert the const keyword for variables",
              "To assert a function is constant"
            ],
            "correctAnswer": 1
          },
          {
            "id": 17,
            "text": "How do you define an index signature in TypeScript?",
            "options": [
              "By using square brackets and a string type for the key",
              "By using curly braces and a string type for the key",
              "By using the 'index' keyword",
              "By using 'object' as the type"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "What does the 'constructor' function do in TypeScript?",
            "options": [
              "It initializes a class instance",
              "It creates a new function",
              "It defines a class",
              "It defines the parameters of a class"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "Which of the following is a valid way to declare a function in TypeScript?",
            "options": [
              "function myFunction(): void {}",
              "const myFunction = () => void {}",
              "const myFunction: void = () => {}",
              "function myFunction(): null {}"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "What is the 'tuple' type in TypeScript?",
            "options": [
              "A fixed-size array with different types",
              "An object with a set of properties",
              "A type for arrays only",
              "A dynamic array with the same type"
            ],
            "correctAnswer": 0
          },
          {
            "id": 21,
            "text": "What does 'unknown' type allow you to do in TypeScript?",
            "options": [
              "Access properties of a variable",
              "Assign any type of value to a variable",
              "Use the value without any safety checks",
              "Check type before using the value"
            ],
            "correctAnswer": 3
          },
          {
            "id": 22,
            "text": "What is the default type of a function return value in TypeScript if not explicitly declared?",
            "options": [
              "any",
              "void",
              "unknown",
              "undefined"
            ],
            "correctAnswer": 1
          },
          {
            "id": 23,
            "text": "Which type is assigned by default to a function parameter in TypeScript?",
            "options": [
              "any",
              "void",
              "unknown",
              "undefined"
            ],
            "correctAnswer": 0
          },
          {
            "id": 24,
            "text": "How do you define a generic class in TypeScript?",
            "options": [
              "class MyClass<T> {}",
              "class MyClass<T extends any> {}",
              "class MyClass<T = any> {}",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 25,
            "text": "Which of the following is not a valid TypeScript type?",
            "options": [
              "string",
              "number",
              "boolean",
              "float"
            ],
            "correctAnswer": 3
          },
          {
            "id": 26,
            "text": "What does 'Partial<T>' represent in TypeScript?",
            "options": [
              "A type that makes all properties of T optional",
              "A type that makes all properties of T required",
              "A type that represents a subset of T",
              "A type that represents a combination of T and other types"
            ],
            "correctAnswer": 0
          },
          {
            "id": 27,
            "text": "What is the purpose of 'ReadonlyArray<T>' in TypeScript?",
            "options": [
              "To create an array that cannot be modified",
              "To create an array with only read-only elements",
              "To define an array with restricted types",
              "To define an immutable object"
            ],
            "correctAnswer": 0
          },
          {
            "id": 28,
            "text": "What does 'infer' keyword do in TypeScript?",
            "options": [
              "To infer the type of a variable from its value",
              "To infer the types of function parameters",
              "To infer the type of a property in an object",
              "To infer a return type"
            ],
            "correctAnswer": 0
          },
          {
            "id": 29,
            "text": "How can you create a read-only property in a TypeScript interface?",
            "options": [
              "By using the 'readonly' modifier",
              "By using the 'const' keyword",
              "By using the 'static' modifier",
              "By using the 'immutable' keyword"
            ],
            "correctAnswer": 0
          },
          {
            "id": 30,
            "text": "What is the 'Exclude<T, U>' utility type in TypeScript?",
            "options": [
              "It excludes types from T that are assignable to U",
              "It excludes types from U that are assignable to T",
              "It combines types T and U",
              "It checks if a type is excluded"
            ],
            "correctAnswer": 0
          }
          // Continue adding more questions until you reach 30
        ]
      },
      {
        id: 4,
        title: "Advance Backend",
        subject: "Web Development",
        duration: 55,
        passingScore: 70,
        questions: [
          {
            id: 1,
            text: "What is a generic type in TypeScript?",
            options: [
              "A type that can work with multiple data types",
              "A type that only works with numbers",
              "A type for arrays only",
              "A type for strings only"
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            text: "What is the purpose of the 'keyof' operator?",
            options: [
              "To create new keys",
              "To get the union of keys from a type",
              "To delete keys",
              "To modify keys"
            ],
            correctAnswer: 1
          },
          {
            id: 3,
            text: "What is a union type?",
            options: [
              "A type that combines multiple types into one",
              "A type for unions only",
              "A type for arrays",
              "A type for objects only"
            ],
            correctAnswer: 0
          },
          {
            id: 4,
            text: "What is the 'as' keyword used for?",
            options: [
              "Loop iteration",
              "Type assertion",
              "Variable declaration",
              "Function definition"
            ],
            correctAnswer: 1
          },
          {
            id: 5,
            text: "What is an interface in TypeScript?",
            options: [
              "A class definition",
              "A type definition for object structure",
              "A function type",
              "A variable declaration"
            ],
            correctAnswer: 1
          },
          // Additional questions for TypeScript Advanced
          {
            id: 6,
            text: "What is the purpose of the 'readonly' modifier in TypeScript?",
            options: [
              "To make a property immutable",
              "To make a property optional",
              "To make a property private",
              "To make a property public"
            ],
            correctAnswer: 0
          },
          {
            id: 7,
            text: "What is the purpose of the 'never' type in TypeScript?",
            options: [
              "To represent a value that never occurs",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a number"
            ],
            correctAnswer: 0
          },
          {
            id: 8,
            text: "What is the purpose of the 'unknown' type in TypeScript?",
            options: [
              "To represent a value that is unknown at compile time",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a string"
            ],
            correctAnswer: 0
          },
          {
            id: 9,
            text: "What is the purpose of the 'any' type in TypeScript?",
            options: [
              "To represent any type of value",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a number"
            ],
            correctAnswer: 0
          },
          {
            id: 10,
            text: "What is the purpose of the 'void' type in TypeScript?",
            options: [
              "To represent a function that does not return a value",
              "To represent a value that is always null",
              "To represent a value that is always undefined",
              "To represent a value that is always a string"
            ],
            correctAnswer: 0
          },
          {
            "id": 11,
            "text": "How do you create a tuple in TypeScript?",
            "options": [
              "By using an array literal",
              "By using the tuple() method",
              "By using square brackets with types for each element",
              "By using an object with properties"
            ],
            "correctAnswer": 2
          },
          {
            "id": 12,
            "text": "What is the purpose of the 'infer' keyword in TypeScript?",
            "options": [
              "To infer the type of a variable from its value",
              "To infer the type of an object",
              "To infer the return type of a function",
              "To infer the type of function parameters"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "What is a mapped type in TypeScript?",
            "options": [
              "A type that represents an object with dynamically generated properties",
              "A type that maps elements in an array",
              "A type that maps values in an object",
              "A type for mapping keys to values"
            ],
            "correctAnswer": 0
          },
          {
            "id": 14,
            "text": "Which of the following is true about 'interface' and 'type' in TypeScript?",
            "options": [
              "Both 'interface' and 'type' can be used to define object shapes",
              "'type' is used for more complex types, 'interface' is simpler",
              "'interface' cannot extend other types",
              "'type' is used for class definitions"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "What is the purpose of the 'extends' keyword in TypeScript?",
            "options": [
              "To extend a class",
              "To extend an interface",
              "To extend a type",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 16,
            "text": "What is the purpose of 'const assertions' in TypeScript?",
            "options": [
              "To assert that a value is a constant",
              "To assert a value's type as readonly",
              "To assert the const keyword for variables",
              "To assert a function is constant"
            ],
            "correctAnswer": 1
          },
          {
            "id": 17,
            "text": "How do you define an index signature in TypeScript?",
            "options": [
              "By using square brackets and a string type for the key",
              "By using curly braces and a string type for the key",
              "By using the 'index' keyword",
              "By using 'object' as the type"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "What does the 'constructor' function do in TypeScript?",
            "options": [
              "It initializes a class instance",
              "It creates a new function",
              "It defines a class",
              "It defines the parameters of a class"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "Which of the following is a valid way to declare a function in TypeScript?",
            "options": [
              "function myFunction(): void {}",
              "const myFunction = () => void {}",
              "const myFunction: void = () => {}",
              "function myFunction(): null {}"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "What is the 'tuple' type in TypeScript?",
            "options": [
              "A fixed-size array with different types",
              "An object with a set of properties",
              "A type for arrays only",
              "A dynamic array with the same type"
            ],
            "correctAnswer": 0
          },
          {
            "id": 21,
            "text": "What does 'unknown' type allow you to do in TypeScript?",
            "options": [
              "Access properties of a variable",
              "Assign any type of value to a variable",
              "Use the value without any safety checks",
              "Check type before using the value"
            ],
            "correctAnswer": 3
          },
          {
            "id": 22,
            "text": "What is the default type of a function return value in TypeScript if not explicitly declared?",
            "options": [
              "any",
              "void",
              "unknown",
              "undefined"
            ],
            "correctAnswer": 1
          },
          {
            "id": 23,
            "text": "Which type is assigned by default to a function parameter in TypeScript?",
            "options": [
              "any",
              "void",
              "unknown",
              "undefined"
            ],
            "correctAnswer": 0
          },
          {
            "id": 24,
            "text": "How do you define a generic class in TypeScript?",
            "options": [
              "class MyClass<T> {}",
              "class MyClass<T extends any> {}",
              "class MyClass<T = any> {}",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 25,
            "text": "Which of the following is not a valid TypeScript type?",
            "options": [
              "string",
              "number",
              "boolean",
              "float"
            ],
            "correctAnswer": 3
          },
          {
            "id": 26,
            "text": "What does 'Partial<T>' represent in TypeScript?",
            "options": [
              "A type that makes all properties of T optional",
              "A type that makes all properties of T required",
              "A type that represents a subset of T",
              "A type that represents a combination of T and other types"
            ],
            "correctAnswer": 0
          },
          {
            "id": 27,
            "text": "What is the purpose of 'ReadonlyArray<T>' in TypeScript?",
            "options": [
              "To create an array that cannot be modified",
              "To create an array with only read-only elements",
              "To define an array with restricted types",
              "To define an immutable object"
            ],
            "correctAnswer": 0
          },
          {
            "id": 28,
            "text": "What does 'infer' keyword do in TypeScript?",
            "options": [
              "To infer the type of a variable from its value",
              "To infer the types of function parameters",
              "To infer the type of a property in an object",
              "To infer a return type"
            ],
            "correctAnswer": 0
          },
          {
            "id": 29,
            "text": "How can you create a read-only property in a TypeScript interface?",
            "options": [
              "By using the 'readonly' modifier",
              "By using the 'const' keyword",
              "By using the 'static' modifier",
              "By using the 'immutable' keyword"
            ],
            "correctAnswer": 0
          },
          {
            "id": 30,
            "text": "What is the 'Exclude<T, U>' utility type in TypeScript?",
            "options": [
              "It excludes types from T that are assignable to U",
              "It excludes types from U that are assignable to T",
              "It combines types T and U",
              "It checks if a type is excluded"
            ],
            "correctAnswer": 0
          }
          // Continue adding more questions until you reach 30
        ]
      },


      //Node js 

      {
        "id": 20,
        "title": "Advanced Node.js",
        "subject": "Web Development",
        "duration": 60,
        "passingScore": 80,
        "questions": [
          {
            "id": 1,
            "text": "What does the `process.nextTick()` function do in Node.js?",
            "options": [
              "It schedules a callback function to be executed in the current event loop phase",
              "It schedules a callback function to be executed in the next iteration of the event loop",
              "It pauses the event loop and executes the callback immediately",
              "It schedules a callback to execute after all I/O tasks are complete"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "text": "What is the purpose of Node.js Streams?",
            "options": [
              "To handle large data chunks efficiently without consuming too much memory",
              "To manage database connections asynchronously",
              "To handle real-time HTTP requests",
              "To compress files into archives"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "text": "Which of the following is true about the `require()` function in Node.js?",
            "options": [
              "It is used to import external libraries and modules",
              "It can only import JSON files and not JavaScript modules",
              "It only supports synchronous file imports",
              "It is used to start a new server in Node.js"
            ],
            "correctAnswer": 0
          },
          {
            "id": 4,
            "text": "Which of the following tools is used to manage and bundle Node.js packages?",
            "options": [
              "npm",
              "git",
              "webpack",
              "docker"
            ],
            "correctAnswer": 0
          },
          {
            "id": 5,
            "text": "What is the significance of `EventEmitter` in Node.js?",
            "options": [
              "It allows objects to emit events and bind event listeners",
              "It is used to handle HTTP requests asynchronously",
              "It provides functionality for working with databases",
              "It is a tool for managing asynchronous callbacks"
            ],
            "correctAnswer": 0
          },
          {
            "id": 6,
            "text": "Which function is used to handle errors in asynchronous code in Node.js?",
            "options": [
              "callback()",
              "handleError()",
              "throwError()",
              "error handling in Node.js is done via the callback or Promise.catch()"
            ],
            "correctAnswer": 3
          },
          {
            "id": 7,
            "text": "Which of the following modules is used to create a server in Node.js?",
            "options": [
              "http",
              "fs",
              "os",
              "url"
            ],
            "correctAnswer": 0
          },
          {
            "id": 8,
            "text": "How does Node.js handle concurrency?",
            "options": [
              "By using an event-driven, non-blocking I/O model",
              "By using multiple threads for each request",
              "By processing requests sequentially",
              "By creating a new process for each request"
            ],
            "correctAnswer": 0
          },
          {
            "id": 9,
            "text": "What is a callback hell in Node.js?",
            "options": [
              "A state where functions are nested deeply, making the code hard to read and maintain",
              "A type of error when callbacks don't execute correctly",
              "An error in the event loop process",
              "A situation where callbacks are processed out of order"
            ],
            "correctAnswer": 0
          },
          {
            "id": 10,
            "text": "What does the `async` keyword do in Node.js?",
            "options": [
              "It marks a function as asynchronous, allowing it to use `await` within it",
              "It immediately executes the function",
              "It pauses the function execution until a result is returned",
              "It prevents the event loop from executing further code"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "Which of the following is the correct way to handle multiple promises in Node.js?",
            "options": [
              "Using `Promise.all()` or `Promise.race()`",
              "Using a callback function",
              "Using `setTimeout()`",
              "Using a `for` loop to wait for promises to resolve"
            ],
            "correctAnswer": 0
          },
          {
            "id": 12,
            "text": "What is the purpose of the `process.env` object in Node.js?",
            "options": [
              "It stores environment variables for accessing system-specific information",
              "It holds configuration data for running Node.js applications",
              "It manages the event loop",
              "It tracks the current process status"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "What is middleware in the context of Express.js?",
            "options": [
              "A function that processes the request before reaching the route handler",
              "A tool used to handle HTTP requests",
              "A way to connect Node.js with a database",
              "A process used to compile and optimize server code"
            ],
            "correctAnswer": 0
          },
          {
            "id": 14,
            "text": "What is the role of the `cluster` module in Node.js?",
            "options": [
              "It allows creating multiple processes that can share server ports",
              "It is used to manage multiple databases in a cluster configuration",
              "It enables asynchronous database transactions",
              "It is used to monitor the system load"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "Which of the following is used to manage non-blocking asynchronous I/O operations in Node.js?",
            "options": [
              "Event Loop",
              "Timers",
              "Callbacks",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 16,
            "text": "What is the primary purpose of the `fs` (File System) module in Node.js?",
            "options": [
              "To interact with the file system, such as reading and writing files",
              "To process HTTP requests",
              "To manage database connections",
              "To execute shell commands"
            ],
            "correctAnswer": 0
          },
          {
            "id": 17,
            "text": "What does the `Buffer` class in Node.js do?",
            "options": [
              "It is used to handle binary data directly in memory",
              "It is used for storing temporary data",
              "It is used to process streams asynchronously",
              "It is used to manage memory allocation in Node.js"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "What is the `require.cache` in Node.js?",
            "options": [
              "It stores cached versions of modules that are already required",
              "It manages the node process memory cache",
              "It holds environment variables for the current process",
              "It stores configurations for file systems"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "What is a key benefit of using the `async/await` pattern over promises in Node.js?",
            "options": [
              "It makes asynchronous code easier to read and maintain",
              "It automatically manages concurrency for multiple requests",
              "It executes all promises in parallel",
              "It ensures synchronous execution of code"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "What is a memory leak in Node.js?",
            "options": [
              "It occurs when memory is allocated but not properly released or freed up",
              "It happens when a request takes too long to process",
              "It occurs when callbacks are executed out of order",
              "It happens when a process crashes unexpectedly"
            ],
            "correctAnswer": 0
          }
        ]
      },

      {
        "id": 21,
        "title": "Advanced Express.js",
        "subject": "Web Development",
        "duration": 60,
        "passingScore": 80,
        "questions": [
          {
            "id": 1,
            "text": "What is middleware in Express.js?",
            "options": [
              "A function that manages database connections",
              "A function that processes the HTTP request before it reaches the route handler",
              "A function that renders views to the client",
              "A method used to handle user authentication"
            ],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "text": "How can you pass data to a view in Express.js?",
            "options": [
              "By using query parameters in the URL",
              "By passing data directly in the route handler function",
              "By using the `res.render()` method and passing an object as the second argument",
              "By using `res.send()` method with the data as an argument"
            ],
            "correctAnswer": 2
          },
          {
            "id": 3,
            "text": "Which of the following methods is used to handle HTTP GET requests in Express.js?",
            "options": [
              "app.post()",
              "app.put()",
              "app.delete()",
              "app.get()"
            ],
            "correctAnswer": 3
          },
          {
            "id": 4,
            "text": "Which of the following is true about the `app.use()` method in Express.js?",
            "options": [
              "It is used to define middleware that is executed for every HTTP request",
              "It is used to set up a route handler for GET requests",
              "It is used to handle HTTP response headers",
              "It is used to authenticate users"
            ],
            "correctAnswer": 0
          },
          {
            "id": 5,
            "text": "What is the purpose of the `express.Router()` in Express.js?",
            "options": [
              "It handles file uploads",
              "It manages HTTP request headers",
              "It allows you to modularize route handling and define a set of routes in a separate file",
              "It parses the body of requests"
            ],
            "correctAnswer": 2
          },
          {
            "id": 6,
            "text": "Which of the following methods is used to handle HTTP POST requests in Express.js?",
            "options": [
              "app.post()",
              "app.get()",
              "app.put()",
              "app.delete()"
            ],
            "correctAnswer": 0
          },
          {
            "id": 7,
            "text": "How can you handle errors in Express.js?",
            "options": [
              "By using `try-catch` blocks within route handlers",
              "By defining an error-handling middleware function with four parameters (err, req, res, next)",
              "By throwing an exception within route handlers",
              "By using `res.send()` to send error messages"
            ],
            "correctAnswer": 1
          },
          {
            "id": 8,
            "text": "What is the purpose of `res.json()` method in Express.js?",
            "options": [
              "It sends a stringified JSON object to the client",
              "It is used to handle POST data",
              "It sends a JSON response to the client",
              "It sets the Content-Type header to application/json"
            ],
            "correctAnswer": 2
          },
          {
            "id": 9,
            "text": "Which of the following is used to parse incoming request bodies in Express.js?",
            "options": [
              "express.query()",
              "express.bodyParser()",
              "express.json() and express.urlencoded()",
              "body-parser"
            ],
            "correctAnswer": 2
          },
          {
            "id": 10,
            "text": "How do you set up a custom error page for 404 errors in Express.js?",
            "options": [
              "By using `app.use()` for 404 error handling",
              "By using `app.get('/404')`",
              "By defining a middleware that checks for unhandled routes",
              "By using `res.send()` to send a custom error page"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "What does the `res.status()` method do in Express.js?",
            "options": [
              "It redirects the user to a different route",
              "It sets the HTTP status code of the response",
              "It sends a 200 OK response by default",
              "It sends a custom header"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "Which Express.js method would you use to redirect a user to a different route?",
            "options": [
              "res.redirect()",
              "res.render()",
              "res.sendFile()",
              "res.end()"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "What is the purpose of `app.all()` in Express.js?",
            "options": [
              "It processes incoming request headers",
              "It handles all HTTP methods for a specific route",
              "It is used for all middleware to process requests",
              "It is used to catch and handle errors"
            ],
            "correctAnswer": 1
          },
          {
            "id": 14,
            "text": "What is the difference between `app.use()` and `app.all()` in Express.js?",
            "options": [
              "`app.use()` handles only GET requests while `app.all()` handles all HTTP methods",
              "`app.use()` is used for middleware and `app.all()` is used for route handling",
              "`app.use()` can be used to handle errors, while `app.all()` cannot",
              "`app.all()` is used for defining the base URL, while `app.use()` defines routes"
            ],
            "correctAnswer": 1
          },
          {
            "id": 15,
            "text": "Which of the following methods would you use to send a file to the client in Express.js?",
            "options": [
              "res.send()",
              "res.render()",
              "res.json()",
              "res.sendFile()"
            ],
            "correctAnswer": 3
          },
          {
            "id": 16,
            "text": "How do you enable CORS (Cross-Origin Resource Sharing) in Express.js?",
            "options": [
              "By using `app.use()` for every request",
              "By setting the `Access-Control-Allow-Origin` header manually",
              "By using the `cors` middleware package",
              "By using `app.all()`"
            ],
            "correctAnswer": 2
          },
          {
            "id": 17,
            "text": "Which of the following methods is used to set up a static file server in Express.js?",
            "options": [
              "express.static()",
              "fs.serve()",
              "app.static()",
              "res.sendFile()"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "What is the purpose of `app.listen()` in Express.js?",
            "options": [
              "It creates a middleware function to handle all requests",
              "It binds and listens for incoming requests on a specified port",
              "It renders the views in the specified directory",
              "It parses the request bodies"
            ],
            "correctAnswer": 1
          },
          {
            "id": 19,
            "text": "How do you handle query parameters in an Express.js route?",
            "options": [
              "By using `req.params`",
              "By using `req.body`",
              "By using `req.query`",
              "By using `req.headers`"
            ],
            "correctAnswer": 2
          },
          {
            "id": 20,
            "text": "What is the purpose of `res.cookie()` in Express.js?",
            "options": [
              "It sets a cookie in the client's browser",
              "It stores session data on the server",
              "It encrypts the request body",
              "It retrieves cookies from the client"
            ],
            "correctAnswer": 0
          }
        ]
      }
      
      
    ]
  };