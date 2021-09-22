# pull official base image
FROM node:14.17-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./

RUN npm run start

# add app
COPY . .

EXPOSE 80

# start app
CMD ["npm", "run", "start"]
