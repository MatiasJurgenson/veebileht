# https://khromov.se/dockerizing-your-sveltekit-applications-a-practical-guide

FROM --platform=linux/amd64/v8 node:22-alpine AS builder
WORKDIR /
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine
WORKDIR /
COPY --from=builder /build build/
COPY --from=builder /node_modules node_modules/
COPY package.json .
EXPOSE 80
ENV NODE_ENV=production
CMD [ "node", "build" ]