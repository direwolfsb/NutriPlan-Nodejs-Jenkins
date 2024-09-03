

---

# NutriPlan Node.js Application

## Overview
NutriPlan is a Node.js application designed to generate daily meal plans based on a target calorie intake. The project leverages modern CI/CD practices, using Jenkins for continuous integration and deployment, Docker for containerization, and GitHub for version control. The system is triggered automatically using GitHub webhooks, ensuring that the latest code is always tested and deployed efficiently.

The application is deployed on an **EC2 Free Tier instance** and can be accessed at [http://52.14.156.105:8000/](http://52.14.156.105:8000/).

## Features
- **Node.js**: Backend application built with Express.js.
- **Docker**: Containerization of the application for consistent deployment across environments.
- **Jenkins**: Automated CI/CD pipeline that builds, tests, and deploys the application.
- **GitHub**: Source code management and version control.
- **Webhooks**: Automated triggering of Jenkins builds on code changes in the GitHub repository.
- **EC2 Deployment**: Application is deployed on an EC2 Free Tier instance for live access.

## Prerequisites
To run this project locally or contribute to its development, you need to have the following installed:
- **Node.js**: Ensure you have Node.js installed (v12.x or later).
- **Docker**: Install Docker on your system.
- **Jenkins**: Set up a Jenkins instance with the necessary plugins for GitHub integration and Docker support.

## Project Structure
```
.
├── Dockerfile               # Docker configuration file
├── app.js                   # Main Node.js application file
├── package.json             # Node.js project configuration
├── public/                  # Static files (CSS, images, etc.)
├── views/                   # EJS template files for rendering HTML
├── README.md                # Project documentation
└── .gitignore               # Git ignore file
```

## Getting Started

### 1. Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/direwolfsb/NutriPlan-Nodejs-Jenkins.git
cd NutriPlan-Nodejs-Jenkins
```

### 2. Build and Run with Docker
To build the Docker image and run the application in a container:

- **Build the Docker image:**
  ```bash
  docker build -t nutri-plan .
  ```

- **Run the Docker container:**
  ```bash
  docker run -d --name nutri-plan -p 3000:3000 nutri-plan
  ```

Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. CI/CD Pipeline with Jenkins
This project uses Jenkins for continuous integration and deployment. Jenkins is configured to automatically build and deploy the application when changes are pushed to the GitHub repository.

#### Steps to Set Up Jenkins CI/CD:
- **Install Jenkins**: Ensure Jenkins is installed and running.
- **Configure GitHub Webhook**: Set up a webhook in the GitHub repository to notify Jenkins of new commits.

#### Jenkins Job Configuration:
- **Create a Jenkins job or pipeline** that pulls the latest code from GitHub.
- The job should build the Docker image and run tests.
- On successful builds, the Docker container should be deployed automatically.

#### Add Jenkins Credentials:
Ensure Jenkins has the appropriate credentials to access your GitHub repository and Docker daemon.

#### Example Jenkins Pipeline:
Below is an example of a Jenkins Pipeline script that builds, tests, and deploys the application:

```groovy
pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/direwolfsb/NutriPlan-Nodejs-Jenkins.git', credentialsId: 'github-jenkins'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("nutri-plan:${env.BUILD_ID}")
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    dockerImage.inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    dockerImage.run("-d -p 3000:3000 --name nutri-plan")
                }
            }
        }
    }
}
```

### 4. Webhooks
GitHub webhooks are configured to trigger the Jenkins pipeline automatically when code is pushed to the repository. This ensures that the latest changes are always built, tested, and deployed without manual intervention.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions
Contributions are welcome! Whether it’s reporting a bug, suggesting an improvement, or submitting a fix, please create a pull request or raise an issue in the repository.

## Contact
For any questions, issues, or support, please contact Suyog Bam at bams@usf.edu.

Thank you for using NutriPlan! We hope this application helps you achieve your health and nutritional goals.

---

You can copy and paste this updated README.md content into your GitHub repository. This version includes the deployment information, providing users with a direct link to access your live application on the EC2 instance.

![jenskins build](https://github.com/user-attachments/assets/d3cee3de-d51d-4410-b2f6-75fb70328269)


![app](https://github.com/user-attachments/assets/8cc9bd9d-9053-484a-a3f8-db55ae666a01)
