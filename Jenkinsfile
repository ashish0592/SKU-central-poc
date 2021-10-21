pipeline {
    agent any
    stages {
        stage('Submit Stack') {
            steps {
            sh "aws cloudformation create-stack --stack-name SKU-central-poc-lambda-ApiGateway --template-body file://cft-lambda-api-gateway.yml --parameters ParameterKey=ArtifactsS3BucketName,ParameterValue=dev-sku-central-poc --region 'us-west-2'"
              }
             }
            }
            }
