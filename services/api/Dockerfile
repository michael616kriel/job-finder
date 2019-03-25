FROM node:10-alpine
# Create app directory
WORKDIR /app
# Install app dependencies
RUN npm install pm2 -g

COPY package*.json ./
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]