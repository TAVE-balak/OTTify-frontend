FROM node:13.12.0-alpine
WORKDIR /react-to-do/frontend
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 3000