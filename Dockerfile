FROM node:20.13.1-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9001
CMD ["npm", "start"]