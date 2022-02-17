FROM adoptopenjdk/openjdk11:alpine-jre

WORKDIR /home/spring

COPY build/libs/*.jar /home/spring/application.jar

EXPOSE 8888

CMD ["java", "-jar", "/home/spring/application.jar"]