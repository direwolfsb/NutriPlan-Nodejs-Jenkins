# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install the dependencies
RUN npm install

# Expose the port that the app will run on
EXPOSE 3000

# Set environment variables
ENV API_KEY="2496f0daafc84d06881cb744e1f20f32"

# Run the application
CMD ["npm", "start"]
