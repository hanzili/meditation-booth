# Use the official Go image as the build environment
FROM golang:1.22.4-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules manifests
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the Go application
RUN go build -o main .

# Use a minimal image for the runtime environment
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Expose the application port (replace 8080 with your application's port if different)
EXPOSE 8080

# Copy the PostgreSQL configuration file
COPY config.production.yml .

# Command to run when starting the container
CMD ["./main"]
