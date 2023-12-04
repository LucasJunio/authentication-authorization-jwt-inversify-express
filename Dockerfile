FROM node:18.10.0-alpine

WORKDIR /app/

COPY package*.json /app/
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . /app/
RUN npx prisma generate
RUN npx prisma migrate dev

EXPOSE 3000

CMD [ "yarn", "start" ]