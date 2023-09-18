# syntax = docker/dockerfile:1

ARG NODE_VERSION=16.13.0

### BUILD

FROM node:${NODE_VERSION}-slim as build
# LABEL fly_launch_runtime="Node.js"

WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install packages needed to build node modules
RUN apt-get update -qq && \
  apt-get install -y build-essential pkg-config python

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link *.js .
COPY --link src src
COPY --link public public

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev


### FINAL

FROM pierrezemb/gostatic as final

COPY --from=build /app/build/ /srv/http/
