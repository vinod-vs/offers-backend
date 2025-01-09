# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

# Fix certificate issues
RUN npm config set strict-ssl false

# Install dependencies with peer dependencies ignored
RUN npm install --legacy-peer-deps

# Copy application source code
COPY . .

# Expose port
EXPOSE 3000
EXPOSE 3001

# Run the app
CMD ["node", "app.js"]
