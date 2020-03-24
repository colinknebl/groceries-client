#! /bin/zsh

CONTAINER_ID=$(docker run --rm -p 27017:27017 --name m1 -v $(pwd)/data/db:/data/db mongo) && \

docker exec -it $CONTAINER_ID bash