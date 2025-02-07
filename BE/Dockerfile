# Dockerfile of ./BE
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install --force


# Copy the rest of the application code
COPY . .

# RUN prisma
RUN npm run prisma:generate

# Build the application
RUN npm run build

# Use a smaller Node.js runtime image for the final stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the built application and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
# Copy the prisma directory

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start:prod"]
