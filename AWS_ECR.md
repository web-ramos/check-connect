## get token
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 768913852656.dkr.ecr.us-west-2.amazonaws.com

docker build -t check-connect .

## taging and push
docker tag sa_clients:check-connect 768913852656.dkr.ecr.us-west-2.amazonaws.com/check-connect:latest
docker push 768913852656.dkr.ecr.us-west-2.amazonaws.com/check-connect:latest
