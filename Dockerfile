FROM node:20-alpine AS builder
WORKDIR /app

# Declare build-time env vars so Vite can embed them in the bundle
ARG VITE_API_BASE_URL=""
ARG VITE_SITE_URL="https://zommie.asia"
ARG VITE_APP_ENV="production"
ARG VITE_TURNSTILE_SITE_KEY=""

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve ----
FROM nginx:1.25-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# Support SPA client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
