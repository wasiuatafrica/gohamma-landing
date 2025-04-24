# Stage 1: Builder
FROM node:20-slim AS builder

WORKDIR /app

# Upgrade npm to 11.3.0
RUN npm install -g npm@11.3.0

# Install build dependencies for canvas
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    build-essential \
    pkg-config \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    libpixman-1-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Debug - show where the files are (optional, can be removed later)
RUN find . -name "index.html" | grep -v "node_modules"

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
RUN echo "Final directory structure