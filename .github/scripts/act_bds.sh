#!/bin/bash

HOST_BD=$1 || exit 1;
USER_BD=$2 || exit 1;
PASS_BD=$3 || exit 1;
PORT_BD="5432"

APP_NAME='script_act_bds'

export PGPASSWORD=$PASS_BD
export PGAPPNAME=$APP_NAME

psql -d store -U $USER_BD -h $HOST_BD -p $PORT_BD \
--tuples-only \
--field-separator ' ' \
--no-align \
--quiet \
--pset footer=off \
-c "SELECT dominio, ROW_NUMBER() OVER(ORDER BY dominio) AS num, COUNT(1) OVER() AS tot FROM grupo_educativo WHERE id_grupo <> 0 ORDER BY dominio" |
while read colegio num tot ;
do
  database=$(echo "$colegio" | tr -d '\r');
  echo $database $num" de "$tot;
  psql -h $HOST_BD -d $database -U $USER_BD -p $PORT_BD -q -w -f act_bds_sql.sql
done