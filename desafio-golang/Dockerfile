FROM golang:1.18-alpine AS builder

WORKDIR /hello
COPY . .

RUN go build -ldflags '-s -w' hello.go

FROM scratch

WORKDIR /
COPY --from=builder /hello /

ENTRYPOINT [ "./hello" ]
