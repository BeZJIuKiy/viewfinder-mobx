# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
#COPY package-lock.json ./

RUN yarn install

# add app
COPY . ./

EXPOSE 8000

# start app
CMD ["yarn", "start"]
