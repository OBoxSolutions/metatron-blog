FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn; \
  elif [ -f package-lock.json ]; then npm i; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


ENV NODE_ENV production

COPY . .
COPY public ./.next/standalone/public

# Build
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY .next/static ./.next/standalone/.next/static

EXPOSE 3000
ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", ".next/standalone/server.js"] 
