#!/bin/sh

docker rm $(docker stop $(docker ps -a -q --filter ancestor=saas_node --format="{{.ID}}"))
docker rm $(docker stop $(docker ps -a -q --filter ancestor=saas_drone --format="{{.ID}}"))
pkill screen

cd data/bigchaindb

make reset