FROM node
MAINTAINER V.V. <aksenchyk.v@gmail.com>
ADD . /app
WORKDIR /app
RUN \
    #npm config set production && \
    npm install -g bower gulp typings --quiet && \
    npm install && \
    typings install && \
    bower install --config.interactive=false --allow-root
RUN gulp build
CMD ["npm","start"]