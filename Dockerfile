FROM node:18-alpine AS base

FROM base AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./

RUN corepack enable

RUN yarn

ENV NODE_ENV=production

COPY . .

# Build
RUN yarn build

FROM base AS runner
WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
