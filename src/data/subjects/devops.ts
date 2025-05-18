import { Subject } from "@/types/types";
export const devOps: Subject ={
    id: 3,
    name: "DevOps",
    description: "Master cloud platforms, serverless architecture, and cloud-native development practices.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    exams: [
      {
        "id": 7,
        "title": "Docker Fundamentals",
        "subject": "DevOps",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is Docker?",
            "options": [
              "A cloud service provider",
              "A type of virtual machine",
              "A platform for developing, shipping, and running applications in containers",
              "A programming language"
            ],
            "correctAnswer": 2
          },
 
        ]
      },
      {
        "id": 9,
        "title": "Kubernetes Fundamentals",
        "subject": "DevOps",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is Kubernetes primarily used for?",
            "options": [
              "A cloud storage solution",
              "A virtualization software",
              "A container orchestration platform",
              "A Continuous Integration tool"
            ],
            "correctAnswer": 2
          },
          {
            "id": 2,
            "text": "Which company originally developed Kubernetes?",
            "options": [
              "Microsoft",
              "Docker",
              "Google",
              "Amazon"
            ],
            "correctAnswer": 2
          },
          {
            "id": 3,
            "text": "What is a Kubernetes pod?",
            "options": [
              "A cloud storage volume",
              "A networking component in Kubernetes",
              "A virtual machine in Kubernetes",
              "The smallest deployable unit in Kubernetes"
            ],
            "correctAnswer": 3
          },
          {
            "id": 4,
            "text": "Which component in Kubernetes is responsible for maintaining the desired state of the cluster?",
            "options": [
              "Kubelet",
              "Kube-apiserver",
              "Kube-controller-manager",
              "Kube-proxy"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "Which file format is used for defining Kubernetes configurations?",
            "options": [
              "JSON",
              "YAML",
              "INI",
              "XML"
            ],
            "correctAnswer": 1
          },
          {
            "id": 6,
            "text": "What is the purpose of a Kubernetes Deployment?",
            "options": [
              "To define how services communicate",
              "To manage networking between pods",
              "To manage the rollout and scaling of applications",
              "To define storage volumes"
            ],
            "correctAnswer": 2
          },
          {
            "id": 7,
            "text": "Which command is used to get a list of all running pods in a Kubernetes cluster?",
            "options": [
              "kubectl show pods",
              "kubectl describe pods",
              "kubectl get pods",
              "kubectl list pods"
            ],
            "correctAnswer": 2
          },
          {
            "id": 8,
            "text": "What is the function of the Kubelet in a Kubernetes cluster?",
            "options": [
              "It ensures that containers are running on a node",
              "It serves the Kubernetes dashboard",
              "It schedules pods on nodes",
              "It manages network policies"
            ],
            "correctAnswer": 0
          },
          {
            "id": 9,
            "text": "Which Kubernetes object is used for exposing a set of pods as a network service?",
            "options": [
              "Service",
              "Ingress",
              "StatefulSet",
              "Deployment"
            ],
            "correctAnswer": 0
          },
          {
            "id": 10,
            "text": "What is a Kubernetes Namespace used for?",
            "options": [
              "To provide isolated environments within a cluster",
              "To define persistent storage for pods",
              "To manage network routing between clusters",
              "To create security policies for Kubernetes objects"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "Which Kubernetes component is responsible for scheduling pods on nodes?",
            "options": [
              "Kube-proxy",
              "Kube-scheduler",
              "Kube-apiserver",
              "Kubelet"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "What is the purpose of a StatefulSet in Kubernetes?",
            "options": [
              "To manage workloads with stable identities",
              "To expose an application externally",
              "To balance load across services",
              "To schedule jobs at specific times"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "Which of the following is a core component of a Kubernetes cluster?",
            "options": [
              "Docker Daemon",
              "Kube-scheduler",
              "Redis",
              "MySQL"
            ],
            "correctAnswer": 1
          },
          {
            "id": 14,
            "text": "What is the primary function of a ConfigMap in Kubernetes?",
            "options": [
              "To provide configuration data to applications",
              "To define persistent storage for pods",
              "To define security policies",
              "To manage container networking"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "Which command is used to delete a pod in Kubernetes?",
            "options": [
              "kubectl remove pod",
              "kubectl delete pod",
              "kubectl destroy pod",
              "kubectl drop pod"
            ],
            "correctAnswer": 1
          },
          {
            "id": 16,
            "text": "Which networking model does Kubernetes use?",
            "options": [
              "Overlay networking",
              "Client-server networking",
              "Peer-to-peer networking",
              "Ring topology"
            ],
            "correctAnswer": 0
          },
          {
            "id": 17,
            "text": "How does Kubernetes manage load balancing?",
            "options": [
              "Using the Ingress controller and Services",
              "By deploying pods in different namespaces",
              "By dynamically scaling pods",
              "By assigning static IP addresses to pods"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "What is the primary role of a Kubernetes Service?",
            "options": [
              "To expose an application running on a set of pods",
              "To manage pod security",
              "To store logs for debugging",
              "To define environment variables for pods"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "Which of the following best describes a Kubernetes Volume?",
            "options": [
              "A mechanism for persisting data across container restarts",
              "A method for creating Kubernetes deployments",
              "A security feature for authentication",
              "A command for deleting Kubernetes clusters"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "What is Helm in the context of Kubernetes?",
            "options": [
              "A package manager for Kubernetes applications",
              "A built-in Kubernetes database",
              "A Kubernetes backup tool",
              "A Kubernetes security module"
            ],
            "correctAnswer": 0
          },
          {
            "id": 21,
            "text": "Which command is used to scale a deployment in Kubernetes?",
            "options": [
              "kubectl scale deployment",
              "kubectl resize deployment",
              "kubectl increase deployment",
              "kubectl set deployment"
            ],
            "correctAnswer": 0
          },
          {
            "id": 22,
            "text": "What is the primary function of a Kubernetes Ingress?",
            "options": [
              "To manage network policies",
              "To expose HTTP and HTTPS routes to services",
              "To provide persistent storage",
              "To manage role-based access control"
            ],
            "correctAnswer": 1
          },
          {
            "id": 23,
            "text": "What does RBAC stand for in Kubernetes?",
            "options": [
              "Role-Based Access Control",
              "Resource-Based Access Configuration",
              "Routing and Balancing Access Control",
              "Registry-Based Authentication Control"
            ],
            "correctAnswer": 0
          },
          {
            "id": 24,
            "text": "Which Kubernetes object ensures that a specified number of pod replicas are running?",
            "options": [
              "Service",
              "ConfigMap",
              "Deployment",
              "Pod"
            ],
            "correctAnswer": 2
          },
          {
            "id": 25,
            "text": "Which storage option is used for persistent storage in Kubernetes?",
            "options": [
              "PersistentVolumeClaim",
              "ConfigMap",
              "PodVolume",
              "ContainerStorage"
            ],
            "correctAnswer": 0
          },
          {
            "id": 26,
            "text": "Which Kubernetes resource is used to define a one-time or periodic task?",
            "options": [
              "CronJob",
              "Service",
              "DaemonSet",
              "StatefulSet"
            ],
            "correctAnswer": 0
          },
          {
            "id": 27,
            "text": "Which component serves as the control plane entry point in a Kubernetes cluster?",
            "options": [
              "Kube-apiserver",
              "Kubelet",
              "Kube-proxy",
              "Kube-scheduler"
            ],
            "correctAnswer": 0
          },
          {
            "id": 28,
            "text": "How does Kubernetes handle high availability of applications?",
            "options": [
              "By running a single instance of each pod",
              "By using multiple master nodes",
              "By automatically restarting failed pods and distributing load",
              "By creating backup nodes"
            ],
            "correctAnswer": 2
          },
          {
            "id": 29,
            "text": "Which Kubernetes object is best suited for running a background process on every node?",
            "options": [
              "Deployment",
              "DaemonSet",
              "Job",
              "CronJob"
            ],
            "correctAnswer": 1
          },
          {
            "id": 30,
            "text": "What is the function of a Kubernetes Secret?",
            "options": [
              "To store sensitive data such as passwords and API keys",
              "To define network policies",
              "To store application logs",
              "To manage role-based access control"
            ],
            "correctAnswer": 0
          }
        ]
      },
      {
        "id": 10,
        "title": "Jenkins Fundamentals",
        "subject": "DevOps",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is Jenkins primarily used for?",
            "options": [
              "A Continuous Integration/Continuous Deployment (CI/CD) tool",
              "A scripting language",
              "A tool for software configuration management",
              "A version control system"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "text": "Which language is Jenkins primarily written in?",
            "options": [
              "Java",
              "JavaScript",
              "C++",
              "Python"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "text": "Which of the following best describes a Jenkins pipeline?",
            "options": [
              "A collection of Jenkins agents",
              "A way to schedule Jenkins jobs",
              "A set of plugins to support automation of CI/CD workflows",
              "A single build process"
            ],
            "correctAnswer": 2
          },
          {
            "id": 4,
            "text": "What is a Jenkins agent?",
            "options": [
              "A Jenkins plugin for cloud deployments",
              "A built-in security mechanism in Jenkins",
              "A software that automates database administration",
              "A node that runs Jenkins jobs"
            ],
            "correctAnswer": 3
          },
          {
            "id": 5,
            "text": "How can Jenkins be extended?",
            "options": [
              "By adding Groovy scripts",
              "By using plugins",
              "By modifying the core source code",
              "By updating Java libraries"
            ],
            "correctAnswer": 1
          },
          {
            "id": 6,
            "text": "Which of the following is true about Jenkins jobs?",
            "options": [
              "They run only on the master node",
              "They can only be triggered manually",
              "They cannot include testing steps",
              "They are used to define a build process"
            ],
            "correctAnswer": 3
          },
          {
            "id": 7,
            "text": "Which plugin is required for integrating Jenkins with Git?",
            "options": [
              "Git Plugin",
              "JUnit Plugin",
              "Slack Plugin",
              "Docker Plugin"
            ],
            "correctAnswer": 0
          },
          {
            "id": 8,
            "text": "What is the default port for Jenkins?",
            "options": [
              "9090",
              "8080",
              "443",
              "80"
            ],
            "correctAnswer": 1
          },
          {
            "id": 9,
            "text": "Which file format is used for Jenkins job configurations?",
            "options": [
              "YAML",
              "INI",
              "XML",
              "JSON"
            ],
            "correctAnswer": 2
          },
          {
            "id": 10,
            "text": "Which command is used to start Jenkins on a Linux machine?",
            "options": [
              "jenkins start",
              "service start jenkins",
              "systemctl start jenkins",
              "jenkinsctl start"
            ],
            "correctAnswer": 2
          },
          {
            "id": 11,
            "text": "How can you trigger a Jenkins job?",
            "options": [
              "Only via an external API",
              "Using webhooks, polling SCM, or scheduling",
              "Only through the Jenkins UI",
              "Manually only"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "What is Jenkins Blue Ocean?",
            "options": [
              "A security plugin",
              "A Jenkins UI for visualization of pipelines",
              "A Jenkins theme",
              "A plugin for cloud deployments"
            ],
            "correctAnswer": 1
          },
          {
            "id": 13,
            "text": "Which of the following is a Jenkins environment variable?",
            "options": [
              "NODE_PATH",
              "JAVA_OPTIONS",
              "JENKINS_HOME",
              "BUILD_MEMORY"
            ],
            "correctAnswer": 2
          },
          {
            "id": 14,
            "text": "How does Jenkins support distributed builds?",
            "options": [
              "Using multiple Jenkins controllers",
              "By enabling multi-threading in Java",
              "By using Jenkins agents (nodes)",
              "By running Jenkins on Kubernetes"
            ],
            "correctAnswer": 2
          },
          {
            "id": 15,
            "text": "What is the primary function of a Jenkinsfile?",
            "options": [
              "Defines the build and deployment pipeline",
              "Defines access control in Jenkins",
              "Stores Jenkins configuration settings",
              "Acts as a log file for Jenkins jobs"
            ],
            "correctAnswer": 0
          },
          {
            "id": 16,
            "text": "Which type of pipeline syntax does Jenkins support?",
            "options": [
              "YAML",
              "Groovy",
              "Python",
              "Bash"
            ],
            "correctAnswer": 1
          },
          {
            "id": 17,
            "text": "Which Jenkins plugin helps store credentials securely?",
            "options": [
              "Pipeline Plugin",
              "Credentials Plugin",
              "Git Plugin",
              "Docker Plugin"
            ],
            "correctAnswer": 1
          },
          {
            "id": 18,
            "text": "What happens when a Jenkins job fails?",
            "options": [
              "It shuts down the Jenkins server",
              "It triggers an email notification or webhook",
              "It is removed from Jenkins",
              "It is retried automatically"
            ],
            "correctAnswer": 1
          },
          {
            "id": 19,
            "text": "What is the Jenkins workspace?",
            "options": [
              "A cloud-based storage for Jenkins logs",
              "A directory where Jenkins executes jobs",
              "A directory where Jenkins keeps backup files",
              "The main user interface of Jenkins"
            ],
            "correctAnswer": 1
          },
          {
            "id": 20,
            "text": "What is the purpose of the Jenkins 'Build Triggers' section?",
            "options": [
              "To create user permissions",
              "To specify conditions that trigger builds",
              "To store build artifacts",
              "To configure environment variables"
            ],
            "correctAnswer": 1
          }
        ]
      },

      //ansible

      {
        "id": 16,
        "title": "Ansible Automation",
        "subject": "DevOps",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is Ansible?",
            "options": [
              "A continuous integration tool for automating tests",
              "A tool for managing and automating server configurations",
              "A version control system",
              "A cloud storage solution"
            ],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "text": "Which language is primarily used to write Ansible playbooks?",
            "options": [
              "Python",
              "YAML",
              "JSON",
              "Bash"
            ],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "text": "What does Ansible use to execute tasks on remote systems?",
            "options": [
              "SSH (Secure Shell)",
              "RDP (Remote Desktop Protocol)",
              "Telnet",
              "WinRM"
            ],
            "correctAnswer": 0
          },
          {
            "id": 4,
            "text": "What is the purpose of an Ansible playbook?",
            "options": [
              "To automate the provisioning of cloud resources",
              "To define and organize tasks that Ansible will execute on remote machines",
              "To configure the hardware resources of a machine",
              "To monitor the health of servers"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "Which of the following is NOT a core concept of Ansible?",
            "options": [
              "Playbooks",
              "Inventory",
              "Roles",
              "Containers"
            ],
            "correctAnswer": 3
          },
          {
            "id": 6,
            "text": "What is the Ansible Inventory?",
            "options": [
              "A list of all tasks in a playbook",
              "A list of managed servers and groups that Ansible will operate on",
              "A file that contains Ansible modules",
              "A list of resources to be provisioned"
            ],
            "correctAnswer": 1
          },
          {
            "id": 7,
            "text": "What is an Ansible module?",
            "options": [
              "A pre-written script used to perform specific tasks like installing packages",
              "A configuration file that defines the state of a system",
              "A command-line tool for managing servers",
              "A storage solution for Ansible playbooks"
            ],
            "correctAnswer": 0
          },
          {
            "id": 8,
            "text": "How does Ansible handle state on managed nodes?",
            "options": [
              "It ensures the target machine is in a specific state after execution",
              "It uses a monitoring system to check the health of nodes",
              "It requires agents to be installed on target systems",
              "It only logs the state of a system but does not make changes"
            ],
            "correctAnswer": 0
          },
          {
            "id": 9,
            "text": "Which Ansible feature allows the reuse of common tasks across multiple playbooks?",
            "options": [
              "Modules",
              "Roles",
              "Inventory",
              "Playbook Includes"
            ],
            "correctAnswer": 1
          },
          {
            "id": 10,
            "text": "Which of the following commands is used to run an Ansible playbook?",
            "options": [
              "ansible-playbook",
              "ansible-run",
              "ansible-start",
              "ansible-deploy"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "What is the purpose of Ansible roles?",
            "options": [
              "To manage the state of virtual machines",
              "To define a set of tasks and configurations that can be reused across multiple playbooks",
              "To control how playbooks are executed on different nodes",
              "To monitor the performance of the system during playbook runs"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "Which Ansible command is used to check the connectivity and configuration of managed nodes?",
            "options": [
              "ansible",
              "ansible-playbook",
              "ansible-ping",
              "ansible-test"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "What is the purpose of the `ansible-galaxy` command?",
            "options": [
              "To create a new playbook",
              "To install, share, and manage Ansible roles from the community",
              "To deploy Ansible to remote nodes",
              "To check the syntax of Ansible playbooks"
            ],
            "correctAnswer": 1
          },
          {
            "id": 14,
            "text": "What is the main benefit of Ansible's agentless architecture?",
            "options": [
              "No need to install and maintain agents on target systems",
              "It allows faster execution of tasks on target systems",
              "It increases the number of available modules for automation",
              "It provides a web interface for configuration management"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "Which of the following can be used to secure sensitive data in Ansible playbooks?",
            "options": [
              "Ansible Vault",
              "Ansible CLI",
              "Ansible SSH",
              "Ansible Encryption"
            ],
            "correctAnswer": 0
          },
          {
            "id": 16,
            "text": "What does Ansible Vault do?",
            "options": [
              "It provides a method for storing encrypted data, such as passwords, within playbooks",
              "It monitors the performance of nodes during playbook execution",
              "It manages users and permissions for Ansible",
              "It stores configuration files for Ansible"
            ],
            "correctAnswer": 0
          },
          {
            "id": 17,
            "text": "What is the purpose of the `when` statement in Ansible?",
            "options": [
              "To ensure tasks only run when certain conditions are met",
              "To configure the state of a service",
              "To monitor the playbook execution process",
              "To encrypt sensitive data"
            ],
            "correctAnswer": 0
          },
          {
            "id": 18,
            "text": "Which Ansible component allows you to group machines logically for running tasks?",
            "options": [
              "Hosts",
              "Roles",
              "Playbooks",
              "Inventory"
            ],
            "correctAnswer": 3
          },
          {
            "id": 19,
            "text": "What is an Ansible 'handler'?",
            "options": [
              "A task that is only triggered when notified by another task",
              "A module that handles network configurations",
              "A configuration management script",
              "A tool for automating the installation of packages"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "Which of the following can Ansible manage?",
            "options": [
              "Configuration management",
              "Provisioning infrastructure",
              "Application deployment",
              "All of the above"
            ],
            "correctAnswer": 3
          }
        ]
      },


      //git advance

      {
        "id": 17,
        "title": "Advanced Git Concepts",
        "subject": "Version Control",
        "duration": 55,
        "passingScore": 70,
        "questions": [
          {
            "id": 1,
            "text": "What is the purpose of the `git rebase` command?",
            "options": [
              "To apply commits from one branch onto another as if they happened sequentially",
              "To merge changes from one branch to another while preserving the commit history",
              "To reset the current branch to a previous commit",
              "To delete commits from a branch"
            ],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "text": "What is the difference between `git merge` and `git rebase`?",
            "options": [
              "`git merge` reverts the branch to a previous commit, while `git rebase` adds new commits to the branch",
              "`git merge` preserves commit history, while `git rebase` rewrites history by reapplying commits",
              "`git merge` is used to undo changes, while `git rebase` is used to split commits",
              "`git merge` is a local operation, while `git rebase` is a remote operation"
            ],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "text": "What is a Git 'detached HEAD' state?",
            "options": [
              "It occurs when the branch name is not recognized",
              "It occurs when there are conflicts between branches",
              "It occurs when you check out a specific commit instead of a branch",
              "It occurs when you are working in a branch without a commit history"
            ],
            "correctAnswer": 2
          },
          {
            "id": 4,
            "text": "What does the `git stash` command do?",
            "options": [
              "It saves your local modifications and reverts your working directory to the state of the last commit",
              "It removes all changes from the working directory and saves them in the local repository",
              "It creates a new branch and switches to it",
              "It deletes untracked files from the working directory"
            ],
            "correctAnswer": 0
          },
          {
            "id": 5,
            "text": "How can you list all branches in a Git repository?",
            "options": [
              "git branch --list",
              "git status -b",
              "git show-branches",
              "git log --branches"
            ],
            "correctAnswer": 0
          },
          {
            "id": 6,
            "text": "What is the effect of using `git reset --hard`?",
            "options": [
              "It clears the commit history and resets the working directory",
              "It resets the staging area to match the most recent commit, discarding all local changes",
              "It resets the current branch to the previous commit, discarding all changes",
              "It forcefully merges a branch with another"
            ],
            "correctAnswer": 2
          },
          {
            "id": 7,
            "text": "How can you resolve conflicts when rebasing in Git?",
            "options": [
              "Stop the rebase with `git rebase --abort` and manually resolve the conflicts",
              "Use `git merge --resolve` to automatically fix the conflicts",
              "Manually edit the conflicted files, then run `git rebase --continue`",
              "Revert the repository to the last commit before the rebase"
            ],
            "correctAnswer": 2
          },
          {
            "id": 8,
            "text": "What is the purpose of the `git cherry-pick` command?",
            "options": [
              "It applies the changes from a single commit from one branch to another",
              "It compares the changes between two branches",
              "It merges two branches while ignoring commit history",
              "It allows you to squash multiple commits into one"
            ],
            "correctAnswer": 0
          },
          {
            "id": 9,
            "text": "What does `git bisect` command help with?",
            "options": [
              "Finding the commit that introduced a bug by using binary search",
              "Reverting back to a previous commit with minimal changes",
              "Splitting a commit into multiple smaller commits",
              "Merging different versions of the same file"
            ],
            "correctAnswer": 0
          },
          {
            "id": 10,
            "text": "What is a Git 'fork'?",
            "options": [
              "A copy of a repository that allows you to freely experiment without affecting the original project",
              "A feature used to split a branch into two separate histories",
              "A process of creating a backup of a repository",
              "A command used to duplicate a branch"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "What is the purpose of the `.gitignore` file?",
            "options": [
              "To prevent files from being pushed to the remote repository",
              "To store files that should never be committed",
              "To exclude files from being staged in Git",
              "To ignore changes in specific files or directories in a repository"
            ],
            "correctAnswer": 3
          },
          {
            "id": 12,
            "text": "How can you view the commit history of a Git repository?",
            "options": [
              "git log",
              "git commits",
              "git view",
              "git history"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "What does `git fetch` do?",
            "options": [
              "It applies changes from the remote repository to the local repository",
              "It fetches files from the local repository to the working directory",
              "It downloads changes from the remote repository but does not apply them",
              "It fetches the most recent commit to the current branch"
            ],
            "correctAnswer": 2
          },
          {
            "id": 14,
            "text": "What does `git pull` do?",
            "options": [
              "It fetches and merges changes from the remote repository into the current branch",
              "It compares the local repository with the remote repository",
              "It fetches the commit history from a remote branch",
              "It pushes the current branch to the remote repository"
            ],
            "correctAnswer": 0
          },
          {
            "id": 15,
            "text": "What is the purpose of Git tags?",
            "options": [
              "To mark specific commits in the repository, often used for releases",
              "To group branches in the repository",
              "To label changes made to files in the commit history",
              "To create new remote repositories"
            ],
            "correctAnswer": 0
          },
          {
            "id": 16,
            "text": "What does `git rebase -i` allow you to do?",
            "options": [
              "Interactively rebase your commits, allowing you to reorder, squash, or edit commits",
              "Reset the commit history of your repository to an earlier state",
              "Force a merge between branches",
              "Switch branches while keeping the changes from your current branch"
            ],
            "correctAnswer": 0
          },
          {
            "id": 17,
            "text": "How can you remove a file from the Git repository but keep it locally?",
            "options": [
              "git remove --local <file>",
              "git delete --keep <file>",
              "git ignore <file>",
              "git rm --cached <file>"
            ],
            "correctAnswer": 3
          },
          {
            "id": 18,
            "text": "What is a Git submodule?",
            "options": [
              "A separate branch that you can link to a primary repository",
              "A specific module that handles versioning of files",
              "A repository inside another repository that allows you to include external repositories in your project",
              "A clone of a repository with limited permissions"
            ],
            "correctAnswer": 2
          },
          {
            "id": 19,
            "text": "What is the Git command to undo the last commit without losing changes?",
            "options": [
              "git revert HEAD",
              "git reset --hard HEAD~1",
              "git reset --soft HEAD~1",
              "git undo last commit"
            ],
            "correctAnswer": 2
          },
          {
            "id": 20,
            "text": "What is a 'squash' in Git?",
            "options": [
              "Reverting a commit",
              "Combining multiple commits into one commit",
              "Splitting a commit into multiple smaller commits",
              "Deleting multiple commits from the commit history"
            ],
            "correctAnswer": 1
          }
        ]
      },

      //Linux

      {
        "id": 18,
        "title": "Advanced Linux Concepts",
        "subject": "Linux System Administration",
        "duration": 60,
        "passingScore": 75,
        "questions": [
          {
            "id": 1,
            "text": "What does the `chmod 755` command do in Linux?",
            "options": [
              "It grants full permissions to the owner and only read permissions to the group",
              "It sets only execute permissions for the owner",
              "It gives full permissions to the owner, and read and execute permissions to others",
              "It removes all permissions from the owner and gives full permissions to others"
            ],
            "correctAnswer": 2
          },
          {
            "id": 2,
            "text": "What is the purpose of the `grep` command?",
            "options": [
              "To display a list of all active processes",
              "To search for files by name",
              "To search for a specific pattern in files or output",
              "To view file contents line by line"
            ],
            "correctAnswer": 2
          },
          {
            "id": 3,
            "text": "Which command is used to display the current working directory in Linux?",
            "options": [
              "ls",
              "cd",
              "mkdir",
              "pwd"
            ],
            "correctAnswer": 3
          },
          {
            "id": 4,
            "text": "What is the purpose of the `top` command?",
            "options": [
              "To monitor system disk space usage",
              "To show the list of running processes and their resource usage",
              "To display system logs",
              "To view and manage disk partitions"
            ],
            "correctAnswer": 1
          },
          {
            "id": 5,
            "text": "How can you search for a specific string in all files within a directory in Linux?",
            "options": [
              "find /path/to/directory -name 'string'",
              "grep -r 'string' /path/to/directory",
              "locate -r 'string' /path/to/directory",
              "search 'string' /path/to/directory"
            ],
            "correctAnswer": 1
          },
          {
            "id": 6,
            "text": "What is the function of the `sudo` command in Linux?",
            "options": [
              "It helps in creating new users in the system",
              "It is used to stop a running process",
              "It sets the default system configuration for a specific user",
              "It allows users to execute commands with elevated privileges"
            ],
            "correctAnswer": 3
          },
          {
            "id": 7,
            "text": "Which command is used to list all active network interfaces on a Linux system?",
            "options": [
              "ifconfig",
              "ip link show",
              "netstat",
              "lshw -class network"
            ],
            "correctAnswer": 1
          },
          {
            "id": 8,
            "text": "What does the `ps aux` command display?",
            "options": [
              "The list of all users currently logged into the system",
              "All running processes with detailed information",
              "The disk usage of all mounted file systems",
              "The active processes consuming disk space"
            ],
            "correctAnswer": 1
          },
          {
            "id": 9,
            "text": "How can you change the owner of a file in Linux?",
            "options": [
              "setowner filename user",
              "chown user:group filename",
              "chmod owner filename",
              "changeowner user filename"
            ],
            "correctAnswer": 1
          },
          {
            "id": 10,
            "text": "What does the `df -h` command show?",
            "options": [
              "The status of all mounted devices",
              "The disk space usage of mounted file systems in human-readable format",
              "The list of all directories in the root file system",
              "The active processes consuming disk space"
            ],
            "correctAnswer": 1
          },
          {
            "id": 11,
            "text": "What is the difference between `soft link` and `hard link` in Linux?",
            "options": [
              "A soft link works across file systems, while a hard link only works within the same file system",
              "A soft link is a symbolic pointer to a file, while a hard link points directly to the file data",
              "A hard link cannot be deleted, while a soft link can be deleted without affecting the original file",
              "A soft link is a file backup, while a hard link is a mirror copy of the original file"
            ],
            "correctAnswer": 1
          },
          {
            "id": 12,
            "text": "What is the purpose of `iptables` in Linux?",
            "options": [
              "To monitor disk usage on the system",
              "To manage user permissions and roles",
              "To track system logs for errors",
              "To configure and manage firewall rules"
            ],
            "correctAnswer": 3
          },
          {
            "id": 13,
            "text": "How do you monitor real-time system logs in Linux?",
            "options": [
              "syslog -r",
              "cat /var/log/syslog",
              "logwatch -e",
              "tail -f /var/log/syslog"
            ],
            "correctAnswer": 3
          },
          {
            "id": 14,
            "text": "Which command is used to view the contents of a compressed tar archive?",
            "options": [
              "tar -xvzf archive.tar.gz",
              "tar -cvf archive.tar.gz",
              "gzip -d archive.tar.gz",
              "tar -tf archive.tar.gz"
            ],
            "correctAnswer": 3
          },
          {
            "id": 15,
            "text": "How can you schedule tasks to run automatically at specified times in Linux?",
            "options": [
              "Using the scheduler service",
              "Using at commands",
              "Using cron jobs",
              "Using systemd scheduler"
            ],
            "correctAnswer": 2
          },
          {
            "id": 16,
            "text": "What command is used to find files based on specific criteria in Linux?",
            "options": [
              "locate",
              "grep",
              "search",
              "find"
            ],
            "correctAnswer": 3
          },
          {
            "id": 17,
            "text": "Which Linux command is used to configure swap space?",
            "options": [
              "swapoff",
              "lsblk",
              "mkswap",
              "swapon"
            ],
            "correctAnswer": 2
          },
          {
            "id": 18,
            "text": "What does the `echo $SHELL` command display?",
            "options": [
              "The hostname of the system",
              "The current user",
              "The current working directory",
              "The path of the shell being used"
            ],
            "correctAnswer": 3
          },
          {
            "id": 19,
            "text": "What is the use of the `lsof` command?",
            "options": [
              "It monitors the network connections",
              "It lists open files and the processes that opened them",
              "It shows the current system load",
              "It lists the directories in the file system"
            ],
            "correctAnswer": 1
          },
          {
            "id": 20,
            "text": "What is the command to add a user to a group in Linux?",
            "options": [
              "groupadd username groupname",
              "useradd -g groupname username",
              "adduser username groupname",
              "usermod -aG groupname username"
            ],
            "correctAnswer": 3
          }
        ]
      },

      {
        "id": 19,
        "title": "Terraform Concepts",
        "subject": "Infrastructure as Code",
        "duration": 60,
        "passingScore": 75,
        "questions": [
          {
            "id": 1,
            "text": "What is the purpose of the `terraform init` command?",
            "options": [
              "It initializes the Terraform configuration and downloads the required providers",
              "It applies the Terraform configuration to provision resources",
              "It creates a new Terraform module for reuse",
              "It checks the syntax of the Terraform configuration files"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "text": "What is the main file used to define infrastructure in Terraform?",
            "options": [
              "main.tf",
              "config.tf",
              "terraform.config",
              "infra.tf"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "text": "How does Terraform manage state?",
            "options": [
              "It uses an external service to store state in an S3 bucket or Terraform Cloud",
              "It stores the state locally on the machine in a `.tfstate` file",
              "It does not manage state and relies on the underlying cloud provider",
              "It stores state in the metadata of resources managed by Terraform"
            ],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "text": "Which command is used to apply the changes defined in a Terraform configuration?",
            "options": [
              "terraform apply",
              "terraform validate",
              "terraform plan",
              "terraform deploy"
            ],
            "correctAnswer": 0
          },
          {
            "id": 5,
            "text": "What is a Terraform provider?",
            "options": [
              "It is a module that defines reusable infrastructure code",
              "It is an API used to manage infrastructure resources in a cloud provider",
              "It is the configuration file used to define infrastructure resources",
              "It is a tool used to validate the correctness of Terraform code"
            ],
            "correctAnswer": 1
          },
          {
            "id": 6,
            "text": "What does the `terraform plan` command do?",
            "options": [
              "It creates an execution plan showing the changes Terraform will make",
              "It applies changes to the infrastructure as defined in the configuration",
              "It checks the validity of the configuration file",
              "It initializes the Terraform environment with providers"
            ],
            "correctAnswer": 0
          },
          {
            "id": 7,
            "text": "What is the purpose of `terraform output`?",
            "options": [
              "It applies changes to infrastructure and outputs the result",
              "It displays the values of outputs defined in a Terraform configuration",
              "It validates the syntax of Terraform configuration files",
              "It initializes the state for a new infrastructure deployment"
            ],
            "correctAnswer": 1
          },
          {
            "id": 8,
            "text": "What is a `terraform module`?",
            "options": [
              "A reusable block of Terraform code that can be used across multiple configurations",
              "A script used to manage provider configurations",
              "A tool for running Terraform configurations in a distributed manner",
              "A state management file used to store configuration data"
            ],
            "correctAnswer": 0
          },
          {
            "id": 9,
            "text": "Which of the following is a valid backend for storing Terraform state?",
            "options": [
              "local",
              "S3",
              "GCS",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 10,
            "text": "What is the `terraform validate` command used for?",
            "options": [
              "It checks the syntax of the Terraform configuration files",
              "It applies the changes to the infrastructure as defined in the configuration",
              "It generates an execution plan",
              "It initializes the environment with providers and modules"
            ],
            "correctAnswer": 0
          },
          {
            "id": 11,
            "text": "What is the `terraform destroy` command used for?",
            "options": [
              "It removes resources that were previously created by Terraform",
              "It validates the Terraform configuration files",
              "It cleans up the Terraform environment",
              "It reverts any changes made to the state"
            ],
            "correctAnswer": 0
          },
          {
            "id": 12,
            "text": "Which of the following commands can be used to check the current state of infrastructure managed by Terraform?",
            "options": [
              "terraform state show",
              "terraform inspect",
              "terraform status",
              "terraform output"
            ],
            "correctAnswer": 0
          },
          {
            "id": 13,
            "text": "Which file contains the variables for a Terraform configuration?",
            "options": [
              "variables.tf",
              "input.tf",
              "config.tf",
              "main.tf"
            ],
            "correctAnswer": 0
          },
          {
            "id": 14,
            "text": "How can you override a default variable value when running Terraform?",
            "options": [
              "By setting the value in the `terraform output` command",
              "By using the `-var` flag followed by the variable name and value",
              "By modifying the default values in the `variables.tf` file",
              "By passing the value as an environment variable"
            ],
            "correctAnswer": 1
          },
          {
            "id": 15,
            "text": "Which of the following is an example of a valid Terraform provider?",
            "options": [
              "aws",
              "gcp",
              "azurerm",
              "All of the above"
            ],
            "correctAnswer": 3
          },
          {
            "id": 16,
            "text": "What happens if you run `terraform plan` and there are no changes to the configuration?",
            "options": [
              "Terraform will apply the changes anyway",
              "Terraform will display a message that no changes are required",
              "Terraform will ask for user confirmation before applying changes",
              "Terraform will update the state file without applying any changes"
            ],
            "correctAnswer": 1
          },
          {
            "id": 17,
            "text": "What is the purpose of the `terraform apply` command?",
            "options": [
              "It checks the configuration for errors",
              "It displays an execution plan for changes to the infrastructure",
              "It applies the changes to the infrastructure as defined in the configuration",
              "It generates the Terraform state file"
            ],
            "correctAnswer": 2
          },
          {
            "id": 18,
            "text": "What is the file extension for a Terraform state file?",
            "options": [
              ".tfstate",
              ".terraformstate",
              ".state",
              ".tf"
            ],
            "correctAnswer": 0
          },
          {
            "id": 19,
            "text": "What is the role of `terraform refresh`?",
            "options": [
              "It updates the Terraform state with the current infrastructure state",
              "It applies the latest configuration changes",
              "It destroys all the managed resources",
              "It generates the execution plan for the changes"
            ],
            "correctAnswer": 0
          },
          {
            "id": 20,
            "text": "How can you import existing infrastructure into Terraform management?",
            "options": [
              "By using the `terraform import` command",
              "By manually editing the `terraform.tfstate` file",
              "By defining resources in a `.tf` file and running `terraform apply`",
              "By downloading the resources directly from the cloud provider"
            ],
            "correctAnswer": 0
          }
        ]
      },
      
      
      
      
    ]
  };