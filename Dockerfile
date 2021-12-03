FROM node:10 AS ui-build
WORKDIR /usr/src/
COPY src /usr/src
ADD src /usr/src/src
RUN mkdir -p public
COPY public/ /usr/src/public
RUN mkdir -p api
COPY package*.json /usr/src/
#RUN chmod -R 777 /usr/
RUN pwd; ls -l
RUN npm install && npm run build

FROM node:10 AS server-build
# USER root
WORKDIR /root/
COPY --from=ui-build /usr/src/ /usr/src/
RUN pwd
RUN ls -l
# RUN MKDIR -p api
# COPY package*.json ./api/
RUN cd /usr/src/api && npm install
RUN pwd; ls -l
COPY src/*.js /usr/src/api/

EXPOSE 8080

CMD ["node", "/usr/src/api/index.js"]
