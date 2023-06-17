FROM --platform=linux/amd64 node:lts AS build

# Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

# Install dependencies with yarn
RUN yarn install --production=true

#### Build Time Finished ####

FROM --platform=linux/amd64 node:slim

USER node
ENV NODE_ENV production
WORKDIR /usr/src/app

ENV IN_CONTAINER=true

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . /usr/src/app

CMD [ "dumb-init", "yarn", "start" ]

EXPOSE 5000