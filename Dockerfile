# Stage 2: Runtime
FROM node:20-slim

WORKDIR /app

# Upgrade npm to 11.3.0
RUN npm install -g npm@11.3.0

# Install runtime dependencies for canvas
RUN apt-get update && apt-get install -y --no-install-recommends \
    libcairo2 \
    libjpeg62-turbo \
    libpango1.0-0 \
    libgif7 \
    libpixman-1-0 \
    pkg-config \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Clean up unnecessary build tools to reduce image size
RUN apt-get purge -y --auto-remove \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Expose port
EXPOSE 5000

# Display final directory structure (optional, for debugging)
RUN echo "Final directory structure:" && ls -la dist/

# Start the application
CMD ["npm", "run", "start"]