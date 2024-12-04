# Use the official NGINX image as the base image
FROM nginx:alpine

# Copy the files from the dist directory to the NGINX html directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]