FROM node:16 as build
FROM nginx:1.19

WORKDIR /easy-stays-react

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build

COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /easy-stays-react/build /usr/share/nginx/html