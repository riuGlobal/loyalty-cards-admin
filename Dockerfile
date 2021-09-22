FROM node:erbium-alpine
LABEL maintener='Ricardo David Ortiz'
WORKDIR /loyalty-cards
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD npm run start
