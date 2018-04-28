#!/bin/sh

cd data/bigchaindb

make reset

docker rm /saas_drone -f
docker rm /saas_node  -f