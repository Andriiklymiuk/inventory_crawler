FROM node:16-alpine3.15 as image
WORKDIR /usr/src/app

COPY . .

RUN yarn install

# Swagger Generation
RUN yarn run generate:swagger
RUN rm -rf ./dist

RUN yarn build

FROM node:16-alpine3.15
COPY package*.json ./

RUN yarn install --production

COPY --from=image /usr/src/app/dist ./dist

#Copy the swagger file from the build
COPY --from=image /usr/src/app/swagger-spec.json ./

# Entrypoint
CMD [ "yarn", "start:prod" ]
