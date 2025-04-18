# Этап 1: Сборка
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Этап 2: Сервер
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]