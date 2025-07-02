// Types
export interface Unit {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
}

export interface Chapter {
  id: string;
  title: string;
  units: Unit[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  chapters: Chapter[];
}

// Sample courses data
export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack developer',
    instructor: 'Dr. Angela Yu',
    duration: '44 hours',
    students: 1250000,
    rating: 4.7,
    chapters: [
      {
        id: 'ch1',
        title: 'Introduction to Web Development',
        units: [
          {
            id: 'u1',
            title: 'Welcome to the Course',
            duration: '5:30',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Get an overview of what you\'ll learn in this comprehensive web development course.'
          },
          {
            id: 'u2',
            title: 'Setting Up Your Development Environment',
            duration: '12:45',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Install and configure all the tools you need for web development.'
          },
          {
            id: 'u3',
            title: 'How the Internet Works',
            duration: '8:20',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Understanding the fundamentals of how the web operates.'
          }
        ]
      },
      {
        id: 'ch2',
        title: 'HTML Fundamentals',
        units: [
          {
            id: 'u4',
            title: 'Introduction to HTML',
            duration: '15:10',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Learn the basics of HTML markup language.'
          },
          {
            id: 'u5',
            title: 'HTML Structure and Elements',
            duration: '18:30',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Understanding HTML document structure and common elements.'
          },
          {
            id: 'u6',
            title: 'Forms and Input Elements',
            duration: '22:15',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Creating interactive forms with various input types.'
          }
        ]
      },
      {
        id: 'ch3',
        title: 'CSS Styling',
        units: [
          {
            id: 'u7',
            title: 'Introduction to CSS',
            duration: '14:25',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Learn how to style your HTML elements with CSS.'
          },
          {
            id: 'u8',
            title: 'CSS Selectors and Properties',
            duration: '20:40',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Master CSS selectors and common styling properties.'
          },
          {
            id: 'u9',
            title: 'CSS Layout and Flexbox',
            duration: '25:15',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Create responsive layouts using CSS Flexbox.'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Master Python programming and data analysis with pandas, numpy, and matplotlib',
    instructor: 'Jose Portilla',
    duration: '32 hours',
    students: 890000,
    rating: 4.6,
    chapters: [
      {
        id: 'ch1',
        title: 'Python Basics',
        units: [
          {
            id: 'u1',
            title: 'Introduction to Python',
            duration: '10:15',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Get started with Python programming language.'
          },
          {
            id: 'u2',
            title: 'Python Variables and Data Types',
            duration: '12:30',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Learn about variables, strings, numbers, and basic data types in Python.'
          },
          {
            id: 'u3',
            title: 'Control Flow and Loops',
            duration: '18:45',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Master if statements, loops, and control flow in Python.'
          }
        ]
      },
      {
        id: 'ch2',
        title: 'Data Analysis with Pandas',
        units: [
          {
            id: 'u4',
            title: 'Introduction to Pandas',
            duration: '16:20',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Learn the basics of pandas library for data manipulation.'
          },
          {
            id: 'u5',
            title: 'Data Cleaning and Preprocessing',
            duration: '24:10',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Clean and prepare your data for analysis using pandas.'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'React.js Complete Guide',
    description: 'Build modern web applications with React.js, hooks, and advanced concepts',
    instructor: 'Maximilian Schwarzmüller',
    duration: '28 hours',
    students: 650000,
    rating: 4.8,
    chapters: [
      {
        id: 'ch1',
        title: 'React Fundamentals',
        units: [
          {
            id: 'u1',
            title: 'What is React?',
            duration: '8:45',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Understanding React and its core concepts.'
          },
          {
            id: 'u2',
            title: 'Setting Up React Development Environment',
            duration: '12:15',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Set up your development environment for React development.'
          },
          {
            id: 'u3',
            title: 'Components and JSX',
            duration: '20:30',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Learn about React components and JSX syntax.'
          }
        ]
      },
      {
        id: 'ch2',
        title: 'React Hooks',
        units: [
          {
            id: 'u4',
            title: 'useState Hook',
            duration: '18:25',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Master the useState hook for managing component state.'
          },
          {
            id: 'u5',
            title: 'useEffect Hook',
            duration: '22:40',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Learn how to handle side effects with useEffect hook.'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    description: 'Learn the basics of machine learning algorithms and implementation',
    instructor: 'Andrew Ng',
    duration: '36 hours',
    students: 450000,
    rating: 4.9,
    chapters: [
      {
        id: 'ch1',
        title: 'Introduction to Machine Learning',
        units: [
          {
            id: 'u1',
            title: 'What is Machine Learning?',
            duration: '15:30',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Understanding the fundamentals of machine learning.'
          },
          {
            id: 'u2',
            title: 'Types of Machine Learning',
            duration: '20:15',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Learn about supervised, unsupervised, and reinforcement learning.'
          }
        ]
      },
      {
        id: 'ch2',
        title: 'Linear Regression',
        units: [
          {
            id: 'u3',
            title: 'Linear Regression Basics',
            duration: '25:45',
            videoUrl: 'https://youtu.be/sqofZyBCmqk?si=EJmCzsNFuUC7VdBd',
            description: 'Understanding linear regression algorithm and implementation.'
          }
        ]
      }
    ]
  }
];

// Helper function to get course by ID
export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

// Helper function to get all courses
export const getAllCourses = (): Course[] => {
  return courses;
}; 