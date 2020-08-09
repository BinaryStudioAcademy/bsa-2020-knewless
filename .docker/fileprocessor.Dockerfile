FROM gradle:6.3.0-jdk11 as builder
USER root
WORKDIR /builder

# copy cli utility to environment for build
COPY --from=mwader/static-ffmpeg:4.3.1-1 /ffmpeg /usr/bin/
COPY --from=mwader/static-ffmpeg:4.3.1-1 /ffprobe /usr/bin/
COPY --from=mwader/static-ffmpeg:4.3.1-1 /qt-faststart /usr/bin/

# copy project dir and run build
ADD ./backend/fileprocessor /builder
RUN gradle build

# used alpine linux for small disk size
FROM openjdk:13-alpine
WORKDIR /app
EXPOSE 5010
COPY --from=builder /builder/build/libs/fileprocessor-0.0.1-SNAPSHOT.jar .

# copy cli utility to environment on this stage for run application 
COPY --from=mwader/static-ffmpeg:4.3.1-1 /ffmpeg /usr/bin/
COPY --from=mwader/static-ffmpeg:4.3.1-1 /ffprobe /usr/bin/
COPY --from=mwader/static-ffmpeg:4.3.1-1 /qt-faststart /usr/bin/

# Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

ENTRYPOINT [ "java", "-jar", "fileprocessor-0.0.1-SNAPSHOT.jar" ]
