# Use Node.js v23.1.0 as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all application files into the container
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Set the environment to development
ENV NODE_ENV=development

# Install additional development dependencies (if needed)
RUN npm install --only=dev

# Command to run the development server
CMD ["npm", "run", "dev"]