FROM node:14.18.1-alpine
ENV NODE_ENV dev
ENV PORT 3001
ENV DATABASE_URL postgres://postgres:password@localhost:5432/app
WORKDIR /usr/src/app
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN npm run tsc
CMD [ "npm", "start" ]
EXPOSE 3001