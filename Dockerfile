# Layer 1: Telling Docker to use the node:17-alpine image as the base image for the container.
FROM node:14

# Sets the Working Directory as "/server"
WORKDIR /server
# Copies the package.json file into "/server" and runs npm i
COPY package.json /server
RUN npm i
# Copies the entire source code into "/server"
COPY . /server

# Specifies the port the node app will be running on
EXPOSE 4000

# Runs "node server.js" after the above step is completed
CMD ["npm", "run", "dev"]