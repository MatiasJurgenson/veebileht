# https://khromov.se/dockerizing-your-sveltekit-applications-a-practical-guide

FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 80
ENV NODE_ENV=production
CMD [ "node", "build" ]