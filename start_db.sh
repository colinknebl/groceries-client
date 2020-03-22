#! /bin/zsh

CONTAINER_ID=$(docker run -d --rm -p 27017:27107 -v $(pwd)/data/db:/data/db mongo) && \

docker exec -it $CONTAINER_ID bash