#!/bin/bash
echo "cleaning up old users:" >> /var/log/cron.log 2>&1
psql -h db -U postgres -d pizze_dalieni -c "CALL clear_old_users();" >> /var/log/cron.log 2>&1

