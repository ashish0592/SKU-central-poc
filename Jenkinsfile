pipeline {
    agent any
    stages {
        stage('Submit Stack') {
            steps {
            sh "aws cloudformation create-stack --stack-name SKU-central-poc-lambda-ApiGateway --template-body file://cft-lambda-api-gateway.yml --parameters ParameterKey=ArtifactsS3BucketName,ParameterValue=dev-sku-central-poc --region 'us-west-2' --capabilities CAPABILITY_IAM"
			sh "aws cloudformation create-stack --stack-name SKU-central-poc-RDS-ECS --template-body file://infra-deployment-cft.yml --parameters ParameterKey=DBAllocatedStorage,ParameterValue=20,ParameterKey=DBEngine,ParameterValue=postgres,ParameterKey=DBEngineVersion,ParameterValue=13.2,ParameterKey=DBInstanceClass,ParameterValue=db.t3.micro,ParameterKey=DBInstanceIdentifier,ParameterValue=sku-cntral-poc-test,ParameterKey=DBName,ParameterValue=sample,ParameterKey=DBPassword,ParameterValue=Admin123,ParameterKey=DBSourceRegion,ParameterValue=us-west-2,ParameterKey=DBStorageType,ParameterValue=gp2,ParameterKey=DBUser,ParameterValue=test,ParameterKey=EnvironmentName,ParameterValue=Development --region 'us-west-2' --capabilities CAPABILITY_IAM"
              }
             }
            }
            }
