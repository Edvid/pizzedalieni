FROM ubuntu:latest

ENV TZ=Europe/Copenhagen \
DEBIAN_FRONTEND=noninteractive

ARG DB_PASSWORD

WORKDIR /cronscripts
RUN apt-get update
RUN apt-get install -y cron postgresql

RUN echo "#!/bin/bash" >> /cronscripts/clear_old_users.sh
RUN echo "echo \"cleaning up old users:\" >> /var/log/cron.log 2>&1" >> /cronscripts/clear_old_users.sh
RUN echo "PGPASSWORD=$DB_PASSWORD psql -h db -U postgres -d pizze_dalieni -c \"CALL clear_old_users();\" >> /var/log/cron.log 2>&1" >> /cronscripts/clear_old_users.sh

RUN chmod +x /cronscripts/clear_old_users.sh

RUN echo "0 * * * * /cronscripts/clear_old_users.sh" | crontab -

RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log
