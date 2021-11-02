FROM node:10 AS ui-build
WORKDIR /usr/src/
COPY src/ ./src/
RUN mkdir -p api
COPY package*.json ./api/
RUN npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/ ./usr/src
# RUN MKDIR -p api
# COPY package*.json ./api/
RUN cd api && npm install
COPY src/serviceWorker.js ./api/

EXPOSE 8080

CMD ["node", "./api/serviceWorker.js"]
