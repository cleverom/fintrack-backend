FROM node:14-alpine

WORKDIR /app/src

COPY . .

RUN yarn

# RUN npx tsc

EXPOSE 4000

CMD ["yarn", "start"]
