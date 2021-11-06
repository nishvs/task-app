# task-app



## Getting started

To start locally we need docker installed.

sudo docker-compose up --build

To restart the web application
sudo docker restart webapp


## Curl Request for endpoint

## Get list of task
curl --location --request GET 'localhost:3001/api/v1/tasks'

## Create task
curl --location --request POST 'localhost:3001/api/v1/tasks' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"task1",
    "status":"completed"
}'

Filter on status

curl --location --request POST 'localhost:3001/api/v1/tasks/in-progress' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"task1",
    "status":"completed"
}'

curl --location --request POST 'localhost:3001/api/v1/tasks/completed' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"task1",
    "status":"completed"
}'

## Update task by providing taskId in param
curl --location --request PUT 'localhost:3001/api/v1/tasks/69ecb00f-9ab4-46c7-b0aa-f319c884cdc0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"task",
    "status":"completed"
}'

## Delete task
curl --location --request DELETE 'localhost:3001/api/v1/tasks/69ecb00f-9ab4-46c7-b0aa-f319c884cdc0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"task",
    "status":"completed"
}'