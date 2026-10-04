pipeline {

    agent any

    environment {
        IMAGE_NAME = 'rohanmandal798/portfolio'
        GIT_REPO   = 'https://github.com/rohanmandal798/portfolio.git'
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

        stage('Update GitOps Manifest') {
            steps {

                sh """
                    sed -i \
                    "s|image: ${IMAGE_NAME}:.*|image: ${IMAGE_NAME}:${BUILD_NUMBER}|" \
                    portfolio-k8s/deployment.yaml

                    echo "Updated image:"
                    grep "image:" portfolio-k8s/deployment.yaml
                """
            }
        }

        stage('Commit and Push GitOps Change') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-push',
                        usernameVariable: 'GITHUB_USERNAME',
                        passwordVariable: 'GITHUB_TOKEN'
                    )
                ]) {

                    sh '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@localhost"

                        git add portfolio-k8s/deployment.yaml

                        git commit \
                            -m "Update portfolio image to ${BUILD_NUMBER}" \
                            || echo "No changes to commit"

                        git push \
                            https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/rohanmandal798/portfolio.git \
                            HEAD:main
                    '''
                }
            }
        }

        stage('Verify GitOps Change') {
            steps {

                sh '''
                    echo "GitOps manifest:"
                    grep "image:" portfolio-k8s/deployment.yaml

                    echo "Argo CD will synchronize this change."
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
            echo "GitOps manifest updated."
            echo "Argo CD will deploy the new image."
        }

        failure {
            echo '=========================================='
            echo 'PIPELINE FAILED'
            echo '=========================================='
            echo 'Check the failed stage logs.'
        }

        always {
            sh 'docker image prune -f || true'
        }
    }
}
