FROM node:latest


WORKDIR /
COPY package.json .
RUN npm install


WORKDIR /app

COPY . . 
CMD ["npm", "run", "dev"]

