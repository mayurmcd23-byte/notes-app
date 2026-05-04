pipeline {
    agent any

    stages {

        stage('Check Node') {
            steps {
                sh '/usr/local/bin/node -v'
                sh '/usr/local/bin/npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '/usr/local/bin/npm install'
            }
        }

        stage('Run Application') {
            steps {
                sh 'pkill node || true'
                sh '/usr/local/bin/node server.js &'
            }
        }

        stage('Build Complete') {
            steps {
                echo 'Pipeline executed successfully!'
            }
        }
    }
}
