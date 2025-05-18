import { Subject } from '@/components/types';
export const cloudComputing: Subject = {
    id: 4,
    name: "Cloud Computing",
    description: "Master cloud platforms, serverless architecture, and cloud-native development practices.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    exams: [ 
      {
        "id": 11,
        "title": "Cloud Architecture Fundamentals",
        "subject": "Cloud Computing",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is cloud computing?",
            "options": [
              "Using local servers",
              "Delivering computing services over the internet",
              "Storing data locally",
              "Using personal computers"
            ],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "text": "What is serverless computing?",
            "options": [
              "Computing without any servers",
              "Running applications without managing infrastructure",
              "Using personal servers",
              "Offline computing"
            ],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "text": "What is a microservice architecture?",
            "options": [
              "Small computers",
              "Breaking applications into independent services",
              "Miniature servers",
              "Small databases"
            ],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "text": "What is container orchestration?",
            "options": [
              "Playing music",
              "Managing and automating container deployment",
              "Organizing storage",
              "Network management"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "What is cloud scalability?",
            "options": [
              "Cloud size",
              "Ability to handle growing workloads",
              "Weather patterns",
              "Server location"
            ],
            "correctAnswer": 1
          },
          {
            "id": 6,
            "text": "What is the purpose of the 'load balancer' in cloud computing?",
            "options": [
              "To distribute incoming network traffic across multiple servers",
              "To balance the load on a single server",
              "To balance the load on a single database",
              "To balance the load on a single application"
            ],
            "correctAnswer": 0
          },
          {
            "id": 7,
            "text": "What is the purpose of the 'auto-scaling' feature in cloud computing?",
            "options": [
              "To automatically adjust the number of compute resources based on demand",
              "To automatically adjust the number of storage resources based on demand",
              "To automatically adjust the number of network resources based on demand",
              "To automatically adjust the number of database resources based on demand"
            ],
            "correctAnswer": 0
          },
          {
            "id": 8,
            "text": "What is the purpose of the 'CDN' in cloud computing?",
            "options": [
              "To deliver content to users with high availability and performance",
              "To deliver content to users with low availability and performance",
              "To deliver content to users with high latency",
              "To deliver content to users with low latency"
            ],
            "correctAnswer": 0
          },
          {
            "id": 9,
            "text": "What is the purpose of the 'VPC' in cloud computing?",
            "options": [
              "To create a private network within the cloud",
              "To create a public network within the cloud",
              "To create a hybrid network within the cloud",
              "To create a global network within the cloud"
            ],
            "correctAnswer": 0
          },
          {
            "id": 10,
            "text": "What is the purpose of the 'IAM' in cloud computing?",
            "options": [
              "To manage access to cloud resources",
              "To manage access to local resources",
              "To manage access to hybrid resources",
              "To manage access to global resources"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "What is the primary purpose of a cloud service provider?",
            "options": [
              "To host applications on-premise",
              "To provide computing resources over the internet",
              "To store data locally",
              "To manage internal company resources"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "What is the role of a cloud architect?",
            "options": [
              "To design and implement cloud-based solutions",
              "To manage the physical hardware of cloud servers",
              "To write code for cloud applications",
              "To market cloud services"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "What is the difference between IaaS, PaaS, and SaaS?",
            "options": [
              "They differ in the level of abstraction and management of the infrastructure",
              "They refer to different types of cloud deployment models",
              "They refer to different types of cloud storage",
              "There is no difference"
            ],
            "correctAnswer": 0
          },
          {
            "id": 14,
            "text": "What does 'multi-cloud' mean?",
            "options": [
              "Using multiple cloud providers in a single architecture",
              "Using a single cloud provider for all services",
              "Storing data in multiple locations on a single cloud",
              "Using private cloud for certain applications and public cloud for others"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "What is a 'hybrid cloud'?",
            "options": [
              "A cloud infrastructure that uses both private and public clouds",
              "A cloud that uses only private clouds",
              "A cloud that uses only public clouds",
              "A cloud infrastructure that only supports remote workers"
            ],
            "correctAnswer": 0
          },
          {
            "id": 16,
            "text": "What is a cloud-based disaster recovery plan?",
            "options": [
              "A plan to back up and restore cloud data in case of failure",
              "A plan to migrate data to the cloud",
              "A plan to monitor network security",
              "A plan to build custom cloud applications"
            ],
            "correctAnswer": 0
          },
          {
            "id": 17,
            "text": "What is the role of 'cloud monitoring'?",
            "options": [
              "To track and manage the performance and availability of cloud resources",
              "To optimize cloud pricing",
              "To secure cloud data from unauthorized access",
              "To design cloud-based applications"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "What does 'serverless computing' mean?",
            "options": [
              "Running applications without the need to manage servers",
              "Running applications on physical servers",
              "Running applications on virtual machines",
              "Using cloud servers for high-performance computing"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "What is the benefit of using 'cloud storage'?",
            "options": [
              "Accessibility from anywhere with an internet connection",
              "Faster access to data stored locally",
              "Lower cost than on-premise storage",
              "No need for internet connectivity"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "What is the purpose of 'cloud networking'?",
            "options": [
              "To connect cloud resources and services across multiple locations",
              "To design user interfaces for cloud applications",
              "To store data in cloud servers",
              "To monitor the performance of cloud applications"
            ],
            "correctAnswer": 0
          },
          {
            "id": 21,
            "text": "What is the difference between 'public cloud' and 'private cloud'?",
            "options": [
              "Public cloud is shared by multiple users, while private cloud is dedicated to a single user",
              "Public cloud is used for personal computing, while private cloud is used for business purposes",
              "Private cloud is cheaper than public cloud",
              "There is no difference"
            ],
            "correctAnswer": 0
          },
          {
            "id": 22,
            "text": "What is the 'cloud service model'?",
            "options": [
              "The classification of cloud services based on levels of abstraction and management",
              "The cost structure for using cloud services",
              "The methods of deployment for cloud services",
              "The type of server used in the cloud infrastructure"
            ],
            "correctAnswer": 0
          },
          {
            "id": 23,
            "text": "What does 'cloud migration' refer to?",
            "options": [
              "The process of moving applications, data, and services from on-premises to the cloud",
              "The process of designing cloud applications",
              "The process of setting up servers in the cloud",
              "The process of transferring data between cloud providers"
            ],
            "correctAnswer": 0
          },
          {
            "id": 24,
            "text": "What is the purpose of 'cloud security'?",
            "options": [
              "To protect cloud data and resources from unauthorized access and threats",
              "To monitor the cloud infrastructure for performance",
              "To design cloud-based applications",
              "To increase cloud storage capacity"
            ],
            "correctAnswer": 0
          },
          {
            "id": 25,
            "text": "What is 'cloud elasticity'?",
            "options": [
              "The ability to scale resources up or down as needed",
              "The ability to maintain a fixed amount of resources",
              "The ability to store data securely",
              "The ability to run applications on multiple servers"
            ],
            "correctAnswer": 0
          },
          {
            "id": 26,
            "text": "What is the purpose of 'cloud billing and cost management'?",
            "options": [
              "To track and optimize costs associated with cloud usage",
              "To manage server hardware",
              "To monitor application performance",
              "To store data in the cloud"
            ],
            "correctAnswer": 0
          },
          {
            "id": 27,
            "text": "What is 'cloud governance'?",
            "options": [
              "The process of managing policies and controls in the cloud environment",
              "The process of designing cloud-based applications",
              "The process of optimizing cloud performance",
              "The process of transferring data between clouds"
            ],
            "correctAnswer": 0
          },
          {
            "id": 28,
            "text": "What is the purpose of 'multi-region deployment' in cloud computing?",
            "options": [
              "To deploy resources across different geographical locations for high availability",
              "To reduce the cost of cloud resources",
              "To reduce the number of cloud servers needed",
              "To make applications run faster"
            ],
            "correctAnswer": 0
          },
          {
            "id": 29,
            "text": "What is the 'cloud-native' approach?",
            "options": [
              "Building and running applications that are designed for the cloud environment",
              "Storing data in the cloud",
              "Running applications on physical servers",
              "Designing applications for on-premise servers"
            ],
            "correctAnswer": 0
          },
          {
            "id": 30,
            "text": "What is the 'edge computing' concept?",
            "options": [
              "Processing data closer to the source rather than in a centralized cloud",
              "Storing data at the edge of the network",
              "Running applications on personal computers",
              "Running applications in remote locations"
            ],
            "correctAnswer": 0
          }
        ]
      },

      // AWS

      {
        "id": 13,
        "title": "Amazon Web Services (AWS)",
        "subject": "Cloud Computing",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is Amazon EC2 (Elastic Compute Cloud)?",
            "options": [
              "A service for storing large amounts of data",
              "A web service for computing power in the cloud",
              "A serverless computing platform",
              "A database management service"
            ],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "text": "Which of the following services does Amazon S3 provide?",
            "options": [
              "Relational database storage",
              "Object storage for storing and retrieving data",
              "A distributed computing service",
              "A service for running machine learning models"
            ],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "text": "What is AWS Lambda?",
            "options": [
              "A service for running virtual servers",
              "A serverless computing service that runs code in response to events",
              "A managed database service",
              "A content delivery network"
            ],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "text": "Which of the following is the main use case of Amazon RDS (Relational Database Service)?",
            "options": [
              "Storing unstructured data",
              "Managing relational databases in the cloud",
              "Running machine learning models",
              "Providing content delivery networks"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "What is Amazon CloudWatch used for?",
            "options": [
              "Monitoring AWS resources and applications in real time",
              "Storing static web content",
              "Managing serverless functions",
              "Providing scalable computing resources"
            ],
            "correctAnswer": 0
          },
          {
            "id": 6,
            "text": "Which AWS service is used to store and manage machine learning models?",
            "options": [
              "AWS Sagemaker",
              "AWS EC2",
              "AWS Lambda",
              "AWS Lightsail"
            ],
            "correctAnswer": 0
          },
          {
            "id": 7,
            "text": "What is the purpose of Amazon VPC (Virtual Private Cloud)?",
            "options": [
              "To provide compute power",
              "To launch and manage database instances",
              "To create isolated networks within the AWS cloud",
              "To manage the deployment of serverless applications"
            ],
            "correctAnswer": 2
          },
          {
            "id": 8,
            "text": "Which of the following is an example of AWS's Content Delivery Network (CDN)?",
            "options": [
              "Amazon EC2",
              "Amazon S3",
              "Amazon CloudFront",
              "Amazon VPC"
            ],
            "correctAnswer": 2
          },
          {
            "id": 9,
            "text": "What is the main purpose of Amazon SQS (Simple Queue Service)?",
            "options": [
              "To manage the lifecycle of virtual servers",
              "To store and retrieve large amounts of data",
              "To enable decoupled message queues between distributed applications",
              "To provide relational database management"
            ],
            "correctAnswer": 2
          },
          {
            "id": 10,
            "text": "What does AWS CloudFormation help you with?",
            "options": [
              "Creating a serverless architecture",
              "Providing on-demand computing power",
              "Automating the setup and management of AWS resources using templates",
              "Storing large amounts of data"
            ],
            "correctAnswer": 2
          },
          {
            "id": 11,
            "text": "Which AWS service is used for scalable DNS and routing traffic to various resources?",
            "options": [
              "Amazon Route 53",
              "Amazon RDS",
              "Amazon CloudWatch",
              "AWS Lambda"
            ],
            "correctAnswer": 0
          },
          {
            "id": 12,
            "text": "Which of the following is a benefit of AWS's elasticity?",
            "options": [
              "Fixed pricing regardless of usage",
              "Automatic scaling of resources based on demand",
              "Non-scalable infrastructure",
              "Managing physical hardware for users"
            ],
            "correctAnswer": 1
          },
          {
            "id": 13,
            "text": "What is the purpose of AWS Identity and Access Management (IAM)?",
            "options": [
              "To monitor resource usage",
              "To manage access and permissions for AWS resources",
              "To store logs",
              "To manage virtual private clouds"
            ],
            "correctAnswer": 1
          },
          {
            "id": 14,
            "text": "What does Amazon Elastic Load Balancing (ELB) do?",
            "options": [
              "Distributes incoming application traffic across multiple instances",
              "Manages database instances",
              "Stores data in the cloud",
              "Creates and manages EC2 instances"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "Which of the following is a storage solution offered by AWS for block storage?",
            "options": [
              "Amazon S3",
              "Amazon Glacier",
              "Amazon EBS (Elastic Block Store)",
              "Amazon CloudFront"
            ],
            "correctAnswer": 2
          },
          {
            "id": 16,
            "text": "What is the main benefit of using Amazon Lightsail?",
            "options": [
              "It provides simple and cost-effective virtual private servers",
              "It enables large-scale enterprise application hosting",
              "It provides advanced AI tools",
              "It manages cloud storage"
            ],
            "correctAnswer": 0
          },
          {
            "id": 17,
            "text": "Which AWS service would you use to automate the deployment of applications on virtual servers?",
            "options": [
              "AWS Lambda",
              "AWS EC2",
              "AWS Elastic Beanstalk",
              "Amazon VPC"
            ],
            "correctAnswer": 2
          },
          {
            "id": 18,
            "text": "Which of the following is the purpose of AWS Elastic Beanstalk?",
            "options": [
              "It manages the lifecycle of containers",
              "It enables you to deploy, manage, and scale web applications automatically",
              "It provides a serverless architecture",
              "It provides machine learning services"
            ],
            "correctAnswer": 1
          },
          {
            "id": 19,
            "text": "What is Amazon Glacier used for?",
            "options": [
              "High-speed data access",
              "Storing data that is infrequently accessed",
              "Real-time video processing",
              "Scaling web applications automatically"
            ],
            "correctAnswer": 1
          },
          {
            "id": 20,
            "text": "Which AWS service helps you manage and monitor user and resource activity across AWS?",
            "options": [
              "AWS CloudTrail",
              "Amazon CloudWatch",
              "AWS Shield",
              "AWS IAM"
            ],
            "correctAnswer": 0
          }
        ]
      },

      //MicroServices

      {
        "id": 14,
        "title": "Microservices Architecture",
        "subject": "Software Architecture",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is a microservice?",
            "options": [
              "A large, monolithic application structure",
              "A loosely coupled, independently deployable service that performs a specific function",
              "A framework for integrating with RESTful APIs",
              "A type of service that is dependent on other services for operations"
            ],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "text": "Which of the following is a key benefit of microservices?",
            "options": [
              "It allows for scaling of applications as a single unit",
              "It simplifies the management of a large codebase",
              "It enables independent scaling of services based on demand",
              "It forces services to be tightly coupled for better consistency"
            ],
            "correctAnswer": 2
          },
          {
            "id": 3,
            "text": "What is the primary reason for splitting an application into microservices?",
            "options": [
              "To reduce database complexity",
              "To increase the speed of development by using separate codebases",
              "To improve performance by making services smaller and more modular",
              "To simplify the debugging of large monolithic applications"
            ],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "text": "Which technology is commonly used for inter-service communication in microservices?",
            "options": [
              "SQL databases",
              "RESTful APIs and HTTP/HTTPS",
              "XML data storage",
              "Message queues"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "What is the role of API Gateway in a microservices architecture?",
            "options": [
              "To monitor the performance of individual services",
              "To manage all inter-service communication",
              "To act as a reverse proxy and route requests to the appropriate microservice",
              "To store data for backup purposes"
            ],
            "correctAnswer": 2
          },
          {
            "id": 6,
            "text": "What does 'decoupling' mean in the context of microservices?",
            "options": [
              "Services are tightly bound and cannot be separated",
              "Each service depends heavily on a central database",
              "Services can be independently developed, deployed, and maintained without affecting others",
              "The services are all part of a single monolithic codebase"
            ],
            "correctAnswer": 2
          },
          {
            "id": 7,
            "text": "Which of the following is a common challenge when working with microservices?",
            "options": [
              "Handling communication between services",
              "Managing a single database for all services",
              "Scaling the entire application as a single unit",
              "Reducing the complexity of the user interface"
            ],
            "correctAnswer": 0
          },
          {
            "id": 8,
            "text": "Which architecture style is most commonly associated with microservices?",
            "options": [
              "Monolithic architecture",
              "Event-driven architecture",
              "Layered architecture",
              "Serverless architecture"
            ],
            "correctAnswer": 1
          },
          {
            "id": 9,
            "text": "How does a microservices architecture handle data consistency?",
            "options": [
              "It uses a shared database for all services to ensure consistency",
              "It relies on eventual consistency with patterns such as CQRS and Event Sourcing",
              "It doesn't handle consistency and leaves that to the client-side",
              "It requires each service to replicate all data to others to ensure consistency"
            ],
            "correctAnswer": 1
          },
          {
            "id": 10,
            "text": "What is the main advantage of using containers in microservices?",
            "options": [
              "They provide an easy way to bundle and isolate services along with their dependencies",
              "They replace the need for a load balancer",
              "They simplify inter-service communication",
              "They automatically handle inter-service data consistency"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "Which of the following is a popular container orchestration tool used in microservices?",
            "options": [
              "Docker Compose",
              "Kubernetes",
              "Apache Kafka",
              "Nginx"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "What is the concept of 'Service Discovery' in a microservices architecture?",
            "options": [
              "A method to manually register each service endpoint in the system",
              "The ability for services to dynamically discover and communicate with other services",
              "A process for backing up the microservice data",
              "A mechanism for managing inter-service load balancing"
            ],
            "correctAnswer": 1
          },
          {
            "id": 13,
            "text": "What is the primary goal of continuous integration and continuous deployment (CI/CD) in microservices?",
            "options": [
              "To deploy microservices to different servers manually",
              "To automate the testing, building, and deployment of services",
              "To make sure every service is built into a monolithic application",
              "To ensure that services communicate with each other"
            ],
            "correctAnswer": 1
          },
          {
            "id": 14,
            "text": "Which of the following best describes a 'Single Responsibility Principle' in microservices?",
            "options": [
              "Each microservice is responsible for managing multiple business domains",
              "Each microservice is responsible for a single business capability or domain",
              "A microservice can perform multiple unrelated tasks",
              "Microservices should only be responsible for data persistence"
            ],
            "correctAnswer": 1
          },
          {
            "id": 15,
            "text": "What is the role of a service mesh in a microservices architecture?",
            "options": [
              "To monitor the performance of services across multiple clusters",
              "To provide a network layer for managing and securing inter-service communication",
              "To deploy services automatically to different clouds",
              "To store data in a decentralized manner"
            ],
            "correctAnswer": 1
          },
          {
            "id": 16,
            "text": "Which of the following is a best practice for managing microservices' health and performance?",
            "options": [
              "Use a monolithic logging system",
              "Use centralized logging and monitoring tools to track service health",
              "Keep all logs within each individual microservice for better tracking",
              "Use traditional relational databases for monitoring"
            ],
            "correctAnswer": 1
          },
          {
            "id": 17,
            "text": "Which of the following is an example of an API Gateway feature in microservices?",
            "options": [
              "It is used to develop microservices from scratch",
              "It provides caching for databases",
              "It routes requests to the appropriate microservice and handles load balancing",
              "It manages data consistency across services"
            ],
            "correctAnswer": 2
          },
          {
            "id": 18,
            "text": "What is an 'event-driven' architecture in microservices?",
            "options": [
              "It relies on scheduled tasks to trigger service communication",
              "Services react to changes in the state of other services based on events",
              "Each service runs its own database independently",
              "It centralizes communication between services"
            ],
            "correctAnswer": 1
          },
          {
            "id": 19,
            "text": "What is a common pattern used for handling failures in microservices?",
            "options": [
              "Retry pattern",
              "Timeout pattern",
              "Bulkhead pattern",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 20,
            "text": "What is the concept of 'API versioning' in a microservices architecture?",
            "options": [
              "The process of updating the entire codebase with each release",
              "The practice of updating APIs without changing client code",
              "The method of having multiple versions of an API running concurrently",
              "The requirement to write separate APIs for each microservice"
            ],
            "correctAnswer": 2
          }
        ]
      },

      // Azure 

      {
        "id": 15,
        "title": "Microsoft Azure Cloud Services",
        "subject": "Cloud Computing",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is Microsoft Azure?",
            "options": [
              "A cloud computing platform and infrastructure for building, testing, deploying, and managing applications and services",
              "A type of on-premises server software",
              "A programming language",
              "An operating system"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "text": "Which of the following is a key feature of Azure's cloud computing services?",
            "options": [
              "Pre-configured virtual machines with limited scaling capabilities",
              "Elastic scalability, virtual machines, and storage on-demand",
              "Only a storage solution for large data sets",
              "Cloud services with limited geographic availability"
            ],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "text": "What is Azure Active Directory (AAD)?",
            "options": [
              "A storage solution for managing files",
              "A service for identity and access management in the cloud",
              "A tool for monitoring cloud applications",
              "A virtual machine management service"
            ],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "text": "What does Azure Blob Storage primarily store?",
            "options": [
              "Relational data in a structured format",
              "Large unstructured data like images, videos, and backups",
              "Compute instances",
              "Encrypted data storage"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "Which Azure service would you use to deploy and manage containers?",
            "options": [
              "Azure Functions",
              "Azure Kubernetes Service (AKS)",
              "Azure Virtual Machines",
              "Azure SQL Database"
            ],
            "correctAnswer": 1
          },
          {
            "id": 6,
            "text": "What is the purpose of Azure Virtual Networks (VNet)?",
            "options": [
              "To host data on physical servers",
              "To enable secure communication between different resources in Azure",
              "To manage storage capacity for virtual machines",
              "To provide global content delivery"
            ],
            "correctAnswer": 1
          },
          {
            "id": 7,
            "text": "What is Azure's compute offering that lets you run serverless code in response to events?",
            "options": [
              "Azure Virtual Machines",
              "Azure Kubernetes Service (AKS)",
              "Azure Functions",
              "Azure Blob Storage"
            ],
            "correctAnswer": 2
          },
          {
            "id": 8,
            "text": "What is the purpose of Azure Load Balancer?",
            "options": [
              "To deploy virtual machines across different regions",
              "To distribute incoming network traffic across multiple servers or resources",
              "To store large amounts of data in a scalable manner",
              "To monitor the health of virtual machines"
            ],
            "correctAnswer": 1
          },
          {
            "id": 9,
            "text": "What is the Azure Marketplace?",
            "options": [
              "A portal to purchase physical hardware for on-premises use",
              "A collection of third-party applications and services that integrate with Azure",
              "A place to view Azure's virtual machines",
              "An administrative tool for managing Azure subscriptions"
            ],
            "correctAnswer": 1
          },
          {
            "id": 10,
            "text": "What does Azure DevOps provide?",
            "options": [
              "A cloud-based application for deploying virtual machines",
              "A suite of services for developing, testing, and deploying applications",
              "A storage solution for managing cloud-based databases",
              "A management platform for monitoring user activity"
            ],
            "correctAnswer": 1
          },
          {
            "id": 11,
            "text": "What is the purpose of Azure Resource Manager (ARM)?",
            "options": [
              "To manage the virtual machines in your subscription",
              "To deploy and manage resources in Azure using templates",
              "To monitor and track the performance of cloud applications",
              "To create a backup of virtual machine data"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "What is the Azure Content Delivery Network (CDN) used for?",
            "options": [
              "To store backup data for Azure applications",
              "To deliver content to users from servers closest to them",
              "To monitor the health of all virtual machines in a region",
              "To encrypt data in transit between services"
            ],
            "correctAnswer": 1
          },
          {
            "id": 13,
            "text": "Which of the following is a feature of Azure Blob Storage?",
            "options": [
              "It only supports SQL database storage",
              "It supports scaling to store large amounts of unstructured data",
              "It provides high-performance computing capabilities",
              "It only works with video files"
            ],
            "correctAnswer": 1
          },
          {
            "id": 14,
            "text": "What is Azure SQL Database?",
            "options": [
              "A service for managing NoSQL databases",
              "A relational database service that is highly scalable and managed by Azure",
              "A file storage service for backing up SQL data",
              "A non-relational database management system"
            ],
            "correctAnswer": 1
          },
          {
            "id": 15,
            "text": "What is Azure Cosmos DB?",
            "options": [
              "A relational database management service",
              "A globally distributed, multi-model database service",
              "A tool for managing network configurations",
              "An API for container orchestration"
            ],
            "correctAnswer": 1
          },
          {
            "id": 16,
            "text": "What is Azure Key Vault used for?",
            "options": [
              "To manage the deployment of virtual machines",
              "To securely store and manage sensitive information like keys, secrets, and certificates",
              "To monitor the usage of storage accounts",
              "To deploy containerized applications"
            ],
            "correctAnswer": 1
          },
          {
            "id": 17,
            "text": "Which Azure service would you use for managing big data and analytics?",
            "options": [
              "Azure Synapse Analytics",
              "Azure Active Directory",
              "Azure App Service",
              "Azure Functions"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "Which Azure service can be used for managing and orchestrating machine learning workflows?",
            "options": [
              "Azure ML Studio",
              "Azure Data Factory",
              "Azure Kubernetes Service",
              "Azure Synapse Analytics"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "Which of the following is a feature of Azure's serverless offerings?",
            "options": [
              "Azure Functions only runs during scheduled times",
              "No infrastructure management required, billing based on usage",
              "You must provision the resources before using them",
              "Azure Functions are always running and constantly consuming resources"
            ],
            "correctAnswer": 1
          },
          {
            "id": 20,
            "text": "What is Azure Virtual Machines (VM) primarily used for?",
            "options": [
              "To store databases in a scalable way",
              "To run isolated workloads and applications in the cloud",
              "To host containerized applications",
              "To manage the health and performance of a network"
            ],
            "correctAnswer": 1
          }
        ]
      }
      
      
      
      
    ]
  };