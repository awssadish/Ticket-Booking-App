🚀 End-to-End DevOps CI/CD Pipeline on AWS EC2

📌 Project Overview

   This project demonstrates a complete end-to-end DevOps CI/CD pipeline deployed on an AWS EC2 instance.
   The pipeline automates application build, containerization, deployment to Kubernetes (Minikube), and implements monitoring and observability using Prometheus and Grafana.
   The entire setup runs on a single Ubuntu-based EC2 instance, simulating a real-world DevOps environment.

🏗️ Architecture Overview
      
      Developer
         │
         ▼
      GitHub Repository
         │
         ▼
      Jenkins (Running on AWS EC2 - Ubuntu)
         │
         ├── Pulls source code
         ├── Builds Docker images
         ├── Pushes images to Docker Hub
         └── Deploys application to Kubernetes (Minikube)
                              │
                              ▼
                  Minikube (Kubernetes Cluster on EC2)
                      ├── Frontend Deployment
                      ├── Backend Deployment
                      ├── NodePort Service (Frontend)
                      └── ClusterIP Service (Backend)
      
      Monitoring (Running on the same EC2)
          ├── Prometheus (Port 9090)
          └── Grafana (Port 3000)
      
      User Access
          ├── Frontend → EC2 Public IP : NodePort
          ├── Grafana  → EC2 Public IP : 3000
          └── Prometheus → EC2 Public IP : 9090

🔹 High-Level Workflow

   1. Developer pushes application code to GitHub.
   2. Jenkins (running on EC2) pulls the latest code.
   3. Jenkins builds Docker images for frontend and backend.
   4. Docker images are pushed to Docker Hub.
   5. Jenkins deploys the containers to Kubernetes (Minikube).
   6. Prometheus collects system and service metrics.
   7. Grafana visualizes metrics using dashboards.

   Users access the application and monitoring tools via EC2 Public IP.

🧱 Architecture Components:

1️⃣ Developer Layer

   Frontend and Backend application code
   Source code managed using GitHub

2️⃣ CI/CD Layer (Inside EC2)

   AWS EC2 (Ubuntu 22.04)
   Jenkins installed and configured using Ansible
   Jenkins Pipeline:
      Pulls code from GitHub
      Builds Docker images
      Pushes images to Docker Hub
   Deploys application to Kubernetes

3️⃣ Container Layer

   Docker
   Frontend Docker image
   Backend Docker image
   Images stored in Docker Hub

4️⃣ Orchestration Layer

   Minikube (Single-node Kubernetes cluster)
   Kubernetes resources:
      Deployments
      Services (NodePort & ClusterIP)
   
   Frontend exposed externally using NodePort
   Backend accessible internally within the cluster

5️⃣ Monitoring Layer

   Prometheus (Port 9090)
   Collects system and service metrics
   Grafana (Port 3000)
   Visualizes dashboards
   Displays CPU, memory, and service metrics

6️⃣ Access Layer
   Service	Access URL
   Frontend	http://EC2_PUBLIC_IP:NodePort
   Grafana	http://EC2_PUBLIC_IP:3000
   Prometheus	http://EC2_PUBLIC_IP:9090

🛠️ Tools & Technologies Used

      AWS EC2
      Ubuntu 22.04
      Ansible
      Jenkins
      GitHub
      Docker
      Docker Hub
      Kubernetes (Minikube)
      Prometheus
      Grafana

⚙️ Implementation Steps

Step 1: Infrastructure Setup
   Created AWS EC2 instance
   Configured Security Groups
   Installed required dependencies

Step 2: Configuration Management
   Automated installation using Ansible:
   Jenkins
   Docker
   Kubernetes (Minikube)
   Prometheus
   Grafana
   
Step 3: CI/CD Pipeline Setup
   Configured Jenkins pipeline:
   GitHub integration
   Docker build and push
   Kubernetes deployment
   
Step 4: Monitoring Setup
   Installed Prometheus
   Configured metrics scraping
   Installed Grafana
   Created dashboards for monitoring

🔐 Security Configuration

Configured AWS Security Groups to allow:
   22 – SSH
   8080-jenkins
   3000 – Grafana
   9090 – Prometheus
   30000–32767 – Kubernetes NodePort services

🎯 Key Features

✔ Fully automated CI/CD pipeline
✔ Containerized microservices architecture
✔ Kubernetes-based deployment using Minikube
✔ Infrastructure automation using Ansible
✔ Monitoring and observability with Prometheus & Grafana
✔ Single-node DevOps environment on AWS EC2

🧠 Key Learnings

End-to-end DevOps workflow implementation
Infrastructure as Code and configuration management
CI/CD pipeline automation
Kubernetes deployment strategies
Monitoring and observability concepts
Production-like DevOps setup on cloud infrastructure
