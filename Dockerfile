# Step 1: Build the React app using Node.js
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build the app for production
COPY . ./
RUN npm run build

# Step 2: Serve the app using Node.js
FROM node:18-alpine

# Install serve globally to serve static files
RUN npm install -g serve

# Copy the built files from the previous stage
COPY --from=build /app/build /app

# Expose the port serve will run on
EXPOSE 3000

# Start the static file server
CMD ["serve", "-s", "/app", "-l", "3000"]



