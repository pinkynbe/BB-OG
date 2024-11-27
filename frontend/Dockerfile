# Node.js base image for your specific version
FROM node:20.17.0-alpine

# Set the working directory
WORKDIR /NbeSwad

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Build the React app for production
# RUN npm run build

# # Use Nginx to serve the built files
# FROM nginx:alpine
# COPY --from=0 /bitebooking/build /usr/share/nginx/html

# Expose port for the web server
# EXPOSE 3000

# # Start 
CMD ["npm", "start"]
