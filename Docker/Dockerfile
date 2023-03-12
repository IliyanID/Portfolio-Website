FROM node:14-alpine
RUN apk update
RUN apk add git
RUN npm install -g npm@6.14.15
RUN git clone https://github.com/IliyanID/Portfolio-Website.git
RUN cd /Portfolio-Website/client && npm install && npm run build

WORKDIR /Portfolio-Website/client/build

ENTRYPOINT npx serve --config ../serve.json -l 3000
EXPOSE 3000