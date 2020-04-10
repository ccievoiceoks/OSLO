# Docker
docker run -i -t --name MariaDB -e MYSQL_ROOT_PASSWORD=Pass4Labo -p "3306:3306" -d mariadb:latest

docker stop MariaDB

docker run MariaDB
docker rm MariaDB

docker start MariaDB
docker exec -it MariaDB bash