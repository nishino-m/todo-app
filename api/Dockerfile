FROM oven/bun:1
WORKDIR /app

RUN apt-get update -y \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lockb* ./
COPY prisma ./prisma

RUN bun install
RUN bunx prisma generate

COPY . .

EXPOSE 3005
CMD ["bun", "run", "dev"]
