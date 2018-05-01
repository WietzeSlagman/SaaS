#!/bin/sh

cd data/bigchaindb

screen -S SaaS-Bigchaindb -dm bash;
screen -S SaaS-Bigchaindb -X stuff 'make run^M';

sleep 10

cd ../SaaS


screen -S SaaS-Frontend -dm bash;
screen -S SaaS-Frontend -X stuff 'docker-compose up^M';
