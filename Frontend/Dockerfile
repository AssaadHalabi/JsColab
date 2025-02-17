# Use Node.js 12.x image
FROM node:12.22.12

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy all source files
COPY . .

# Set environment variable for binding
ENV HOST=0.0.0.0

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]