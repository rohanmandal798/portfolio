pipeline {

    agent any

    environment {
        IMAGE_NAME = 'rohanmandal798/portfolio'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Security Audit') {
            steps {
                sh 'npm audit --audit-level=high'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh """
                    docker build \
                        -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${IMAGE_NAME}:latest \
                        .
                """
            }
        }

        stage('Docker Hub Push') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_TOKEN" | docker login \
                            --username "$DOCKER_USERNAME" \
                            --password-stdin

                        docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                        docker push ${IMAGE_NAME}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Localhost') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_TOKEN" | docker login \
                            --username "$DOCKER_USERNAME" \
                            --password-stdin

                        IMAGE_TAG=${BUILD_NUMBER} docker compose pull

                        IMAGE_TAG=${BUILD_NUMBER} docker compose up -d

                        docker logout
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Waiting for application to start..."
                    sleep 5

                    curl --fail \
                        --silent \
                        --show-error \
                        http://localhost:8080 > /dev/null

                    echo "Portfolio deployment is healthy."
                '''
            }
        }
    }

    post {

        success {
            echo '=========================================='
            echo 'CI/CD PIPELINE COMPLETED SUCCESSFULLY'
            echo '=========================================='
            echo "Build: ${BUILD_NUMBER}"
            echo "Image: ${IMAGE_NAME}:${BUILD_NUMBER}"
            echo "Application: http://localhost:8080"
        }

        failure {
            echo '=========================================='
            echo 'CI/CD PIPELINE FAILED'
            echo '=========================================='
            echo 'Check the failed stage logs.'
        }

        always {
            sh 'docker image prune -f || true'
        }
    }
}
