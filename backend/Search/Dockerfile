FROM golang:1.17-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /macju-search-server

EXPOSE 8082

CMD [ "/macju-search-server" ]