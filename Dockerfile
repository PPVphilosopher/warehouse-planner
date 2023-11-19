FROM node:18.18.2-alpine3.18

COPY . .
RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]