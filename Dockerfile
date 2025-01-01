# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set npm registry and increase fetch timeout
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-timeout 60000

# Update npm to the latest version
RUN npm install -g npm@11.0.0

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install --production

# Copy the application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Set environment to production (optional)
ENV NODE_ENV=production

# Start the Node.js application
CMD ["npm", "start"]

