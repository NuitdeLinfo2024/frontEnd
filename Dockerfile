# Stage 1: Build the application with Vite
FROM node:lts-slim as build

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first for dependency caching
COPY package*.json ./

# Install all dependencies, including devDependencies for the build process
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copy the source code (only the necessary files, use .dockerignore to exclude others)
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# Copy the build artifacts from the build stage to the NGINX container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
