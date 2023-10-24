FROM node:18-alpine

ENV WORKDIR=/app

WORKDIR ${WORKDIR}

COPY tsconfig.json package.json next.config.js ${WORKDIR}/

RUN yarn install

COPY src ${WORKDIR}/src

COPY public ${WORKDIR}/public

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c", "yarn dev"]