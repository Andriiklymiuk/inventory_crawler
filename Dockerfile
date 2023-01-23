FROM node:16-alpine3.15 as build
WORKDIR /usr/src/app

COPY . .

RUN yarn install

# Swagger Generation
RUN yarn run generate:swagger
RUN rm -rf ./dist

RUN yarn build

RUN yarn install --production

COPY --from=build /usr/src/app/dist ./dist

#Copy the swagger file from the build
COPY --from=build /usr/src/app/swagger-spec.json ./

# Entrypoint
CMD [ "yarn", "start:prod" ]
