pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Application') {
            steps {
                sh 'pkill node || true'
                sh 'node server.js &'
            }
        }

        stage('Build Complete') {
            steps {
                echo 'Pipeline executed successfully!'
            }
        }
    }
}
