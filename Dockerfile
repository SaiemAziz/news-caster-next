# Select the light base image of node
FROM node:23-alpine

# Set the working directory
WORKDIR /news-caster

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /news-caster
COPY . .

# Build the project
RUN npm run build

# Make port 5000 available to the world outside this container
EXPOSE 3000

# Run project
CMD ["npm", "start"]
