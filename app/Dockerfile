FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]