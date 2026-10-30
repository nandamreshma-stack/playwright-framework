pipeline {
    agent any
    environment{
        BASE_URL= 'https://www.saucedemo.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npm test'
            }
        }
    }

post {
    always {
        archiveArtifacts artifacts: 'playwright-report/**, test-results/**',
                         allowEmptyArchive: true

        publishHTML(target: [
            reportName: 'Playwright HTML Report',
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: true
        ])
    }
}
}