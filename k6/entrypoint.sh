#!/bin/bash

influxd &

sleep 10

grafana-server --homepath="/usr/share/grafana" &

k6 run /path/to/your_test.js
tail -f /dev/null
