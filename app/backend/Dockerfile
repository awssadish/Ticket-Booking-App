# ---- Base Image ----
FROM node:18-alpine AS base

# Create app directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy source code
COPY src ./src

# Expose application port
EXPOSE 5000

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start application
CMD ["node", "src/index.js"]
