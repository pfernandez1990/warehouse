FROM node:18-alpine AS development 

WORKDIR /src

# This is separate so layers are cached nicely
COPY ./package*.json .
EXPOSE 3000

RUN npm ci
CMD [ "node", "start" ]