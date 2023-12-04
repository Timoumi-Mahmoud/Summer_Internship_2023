# Stage 1: Build the Angular application
FROM node:19-alpine AS builder

WORKDIR /ang
RUN npm install -g @angular/cli

# Copy the rest of your Dockerfile as is
COPY . .

RUN npm install
RUN ng  build

# Stage 2: Create the final image
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /ang/dist .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
