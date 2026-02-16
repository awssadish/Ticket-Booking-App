📌 Project Overview

This project demonstrates a complete end-to-end DevOps CI/CD pipeline deployed on an AWS EC2 instance.

It automates application build, containerization, deployment to Kubernetes (Minikube), and implements monitoring using Prometheus and Grafana.

The entire setup runs inside a single Ubuntu-based EC2 instance.

🏗️ Architecture Overview

Developer
   │
   ▼
GitHub Repository
   │
   ▼
Jenkins (Inside EC2 - Ubuntu)
   │
   ├── Pulls Code
   ├── Builds Docker Images
   ├── Pushes Images → Docker Hub
   └── Deploys to Kubernetes (Minikube)
                      │
                      ▼
            Minikube Cluster (Inside Same EC2)
                ├── Frontend Deployment
                ├── Backend Deployment
                ├── NodePort Service (Frontend)
                └── ClusterIP Service (Backend)

Monitoring (Inside Same EC2)
    ├── Prometheus (Port 9090)
    └── Grafana (Port 3000)

Users Access:
    ├── Frontend → EC2 Public IP:NodePort
    ├── Grafana → EC2 Public IP:3000
    └── Prometheus → EC2 Public IP:9090
    
🔹 High-Level Flow

Developer pushes code to GitHub.

Jenkins (running on EC2) pulls the code.

Jenkins builds Docker images.

Docker images are pushed to Docker Hub.

Jenkins deploys containers to Kubernetes (Minikube).

Prometheus monitors system and service metrics.

Grafana visualizes metrics through dashboards.

Users access the application and monitoring tools via EC2 Public IP.

🧱 Architecture Components
1️⃣ Developer Layer

Frontend & Backend application

Source code stored in GitHub

2️⃣ CI/CD Layer (Inside EC2)

AWS EC2 (Ubuntu 22.04)

Jenkins (Installed using Ansible)

Jenkins Pipeline:

Pulls code from GitHub

Builds Docker images

Pushes images to Docker Hub

Deploys to Kubernetes

3️⃣ Container Layer

Docker

Frontend Docker Image

Backend Docker Image

Images stored in Docker Hub

4️⃣ Orchestration Layer

Minikube (Single-node Kubernetes cluster)

Kubernetes Resources:

Deployments

Services (NodePort & ClusterIP)

Frontend is exposed externally using NodePort.
Backend is accessible internally within the cluster.

5️⃣ Monitoring Layer

Prometheus (Port 9090)

Collects system and service metrics

Grafana (Port 3000)

Visualizes dashboards

Displays CPU, Memory, and Service metrics

6️⃣ Access Layer

Users access services using EC2 Public IP:

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

Automated installation using Ansible

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

Opened required ports in AWS Security Group:

22 (SSH)

3000 (Grafana)

9090 (Prometheus)

NodePort range (30000–32767)

🎯 Key Features

✔ Automated CI/CD pipeline
✔ Containerized microservices architecture
✔ Kubernetes-based deployment
✔ Infrastructure automation using Ansible
✔ Monitoring with Prometheus & Grafana
✔ Single-node DevOps environment on AWS

🧠 What I Learned

End-to-end DevOps workflow

Infrastructure as Code principles

CI/CD automation

Kubernetes deployment strategies

Monitoring and observability implementation

Production-like environment setup on cloud



