FROM ubuntu

RUN apt-get update
RUN apt-get install -y --reinstall git make docker.io curl

RUN curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

RUN echo | docker-compose --version > tmp/log3.txt

WORKDIR "/opt"
RUN git clone https://github.com/bigchaindb/bigchaindb.git
RUN ls > ../tmp/log.txt

WORKDIR "/opt/bigchaindb"

RUN ls > ../../tmp/log2.txt
# RUN echo "empty" >> ../../tmp/log2.txt


RUN make run
