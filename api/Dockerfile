FROM node:18-alpine
WORKDIR /usr/src/app
COPY src/package*.json ./
RUN npm install --only=production
#COPY src/ ./
COPY . .
EXPOSE 3000
#posible error aqui?
CMD ["npm", "start"]
