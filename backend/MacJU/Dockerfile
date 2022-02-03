FROM openjdk:11-jdk

WORKDIR /home/spring

COPY build/libs/*.jar /home/spring/application.jar

EXPOSE 8080

CMD ["java", "-jar", "/home/spring/application.jar"]