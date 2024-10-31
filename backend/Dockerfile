# Use Node.js 18
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the app source (excluding code directory)
COPY . ./

# Expose port
EXPOSE 3000

# Start the app with hot reloading
CMD ["npm", "run", "dev"]
