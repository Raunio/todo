# Todo app

## Techologies used

-   Node.js and express back end (typescript)
-   Vue3 front end
-   Docker containers for back end services

## Running the app

Getting the app up and running is simple thanks to docker. Ports 5000, 5432 and 3000 need to be available to avoid additional configuration

### Start the server

-   `cd server`
-   `docker-compose up -d`

### Start the client

-   `cd ../client`
-   `npm install`
-   `npm run dev`

## Using the app

### Getting a user name and password

1. Use your preferred method (for example docker desktop) to access todo/server container console log
2. Grab a username and a password from the log

### Log in

1. Using your favourite browser, navigate to http://localhost:3000
2. Log in using the user name and password
