# Base Docker image
FROM openjdk:21

# Working directory
WORKDIR /bitebooking

# JAR file
COPY backend/target/backend-0.0.1-SNAPSHOT.jar /biteBooking/backend.jar

# Expose port
EXPOSE 8085

# Run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "backend.jar"]
