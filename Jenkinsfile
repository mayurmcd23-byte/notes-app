pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Run Application') {
            steps {
                echo 'Running application...'
                bat 'node server.js'
            }
        }

        stage('Build') {
            steps {
                echo 'Build stage completed'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                bat '''
                if exist deploy rmdir /s /q deploy
                mkdir deploy
                xcopy * deploy /E /I /Y
                '''
            }
        }
    }
}
