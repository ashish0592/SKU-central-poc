FROM node:10 AS ui-build
WORKDIR /usr/src/
COPY src/ ./src/
RUN mkdir -p public
COPY public/ /usr/src/public
RUN pwd
RUN mkdir -p api
COPY package*.json /usr/src/
RUN npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/ /usr/src
# RUN MKDIR -p api
# COPY package*.json ./api/
RUN ls
RUN cd /usr/src/api && npm install
COPY src/serviceWorker.js ./api/

EXPOSE 8080

CMD ["node", "./api/serviceWorker.js"]
