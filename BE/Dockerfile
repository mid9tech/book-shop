# Dockerfile of ./BE
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install --force


# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller Node.js runtime image for the final stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install necessary build tools for bcrypt and other native modules
RUN apk add --no-cache bash make gcc g++ python3

# Copy only the built application and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
# Copy the prisma directory

# RUN prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# Ensure bcrypt is correctly built for the container architecture
RUN npm rebuild bcrypt

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start:prod"]
