FROM node:14

RUN mkdir -p /home/node/app/node_modules

RUN npm install -g ts-node typescript

WORKDIR /home/node/app

COPY package.json yarn.* ./

#RUN chown -R node:node /home/node

#RUN apk add --no-cache git

COPY . /home/node/app/

RUN yarn

#RUN chown -R node:node /home/node

RUN npm config set unsafe-perm true

USER node

EXPOSE 3000

ENTRYPOINT ["yarn","start:dev"]