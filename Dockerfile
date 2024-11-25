# The Dockerfile is the file where you define how your Docker image is built.
# Use the official MySQL image
FROM mysql:8.0

# Set environment variables for MySQL configuration
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser

# Expose the default MySQL port
EXPOSE 3306