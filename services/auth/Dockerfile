FROM node:10-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
    npm install --quiet node-gyp -g

RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 6000
CMD [ "npm", "run", "start" ]