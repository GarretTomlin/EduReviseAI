# Stage 1: Build the app
FROM node:16 AS builder

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Create a lightweight runtime image
FROM node:16-slim

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY package*.json yarn.lock ./
RUN yarn install --production

# Install PM2 globally
RUN yarn global add pm2

# Expose the port your app runs on
EXPOSE 4000

# Use PM2 to start the app
CMD ["pm2-runtime", "dist/src/main.js", "--name", "edu-revise"]
