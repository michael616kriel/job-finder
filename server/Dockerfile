FROM node:latest
# Create app directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3005
CMD [ "npm", "run", "start:prod" ]