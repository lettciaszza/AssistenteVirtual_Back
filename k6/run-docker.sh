#!bin/bash

docker build -t k6-tester .
docker run  k6-tester  