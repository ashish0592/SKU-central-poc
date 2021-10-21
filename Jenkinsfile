pipeline {
    agent any
    stages {
        stage('Submit Stack') {
            steps {
            sh "aws cloudformation create-stack --stack-name SKU-central-poc-lambda-ApiGateway --template-body file://cft-lambda-api-gateway.yml --parameter-overrides ArtifactsS3BucketName=dev-sku-central-poc --region 'us-east-1'"
              }
             }
            }
            }
