# Base Docker image
FROM openjdk:21-slim

# Working directory
WORKDIR /NbeSwad

# JAR file
COPY target/backend-0.0.1-SNAPSHOT.jar /Nbe/backend.jar

# Run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "backend.jar"]

##################################################################################################

###Stage 1: Build the application
## Base Docker image
#FROM openjdk:21-slim as build
#
## Working directory
#WORKDIR /bitebooking
#
## Copy maven executable to the image
#COPY mvnw .
#COPY .mvn .mvn
#
##Copy the pom.xml file
#COPY pom.xml .
#
## Build all the dependencies in preparation to go offline.
## This is a separate step so the dependencies will be cached unless
## the pom.xml file has changed.
#RUN ./mvnw dependency:go-offline -B
#
##Copy the project source
#COPY src src
#
##Package the application
#RUN ./mvnw package -DskipTests
#RUN mkdir -p target/dependency && (cd/target/dependency; jar -xf ../*.jar)
#
##Stage 2: docker image with command to run the app
#FROM openjdk:21-slim
#
#ARG DEPENDENCY=/bitebooking/target/dependency
#
##Copy project dependencies from the build stage
#COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /bitebooking/lib
#COPY --from=build ${DEPENDENCY}/META-INF /bitebooking/META-INF
#COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /bitebooking
#
## Run the JAR file when the container starts
#ENTRYPOINT ["java", "-cp", "bitebooking:bitebooking/lib/*", "com.example.cms.backend.BackendApplication"]
