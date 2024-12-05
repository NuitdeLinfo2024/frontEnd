# Stage 1: Build the application with Vite
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# # Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
EXPOSE 80

# # Start NGINX
CMD ["nginx", "-g", "daemon off;"]