FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV MODEL_URL='https://storage.googleapis.com/mlgc-bucket-ridwanrasyid/model-in-prod/model.json'
CMD ["npm", "run", "start"]