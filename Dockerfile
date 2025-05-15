FROM node:slim
EXPOSE 3000
COPY . ./program
WORKDIR /program
RUN npm install
RUN npm audit fix
RUN mkdir uploads
CMD ["npm", "run", "start"]