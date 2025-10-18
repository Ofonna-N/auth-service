# Development stage
FROM node:22-alpine AS development
WORKDIR /app
COPY package*.json ./
# COPY prisma ./prisma
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]