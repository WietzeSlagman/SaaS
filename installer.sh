#!/bin/sh

cd ./data

sudo rm -r *

git clone https://github.com/bigchaindb/bigchaindb.git

cd bigchaindb

sed -i '1s/.*/FROM python:3.6/' Dockerfile-dev
sed -i '2s/.*//' Dockerfile-dev

docker build -f Dockerfile-dev .

cd ..

git clone https://github.com/WietzeSlagman/SaaS.git

cd SaaS
sudo git checkout docker

docker build -f Backend/DockerfileDrone Backend/ -t saas_drone
docker build -f Frontend/DockerfileNode Frontend/ -t saas_node

