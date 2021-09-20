FROM node:15
WORKDIR /app  
COPY package.json . 
RUN npm install

ARG NODE_ENV
RUN echo $NODE_ENV
RUN if [ "$NODE_ENV" = "development" ] ; \ 
        then npm install echo in development; \
        else npm install --only=production ;  \ 
    fi

COPY . ./ 
ENV PORT 4000
EXPOSE $PORT
CMD ["npm", "run" , "dev"] 
