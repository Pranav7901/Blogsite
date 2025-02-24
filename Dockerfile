# Use the latest stable Node.js image
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies with retry logic
RUN npm config set registry https://registry.npmjs.org && \
    npm ci --omit=dev || npm ci --omit=dev

# Copy all application files into the container
COPY . .

# Build the Next.js project
RUN npm run build

# Use a smaller base image for better security and performance
FROM node:20-alpine AS runner

# Set working directory inside the container
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public public

# Set environment to production for optimized performance
ENV NODE_ENV=production

# Expose the port Next.js will run on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start"]