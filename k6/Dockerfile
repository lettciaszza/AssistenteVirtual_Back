# Use the official K6 image
FROM grafana/k6:latest

# Copy your test script into the container
COPY tester.js /tester.js

# Set the entrypoint to run the K6 test
ENTRYPOINT ["k6", "run", "/tester.js"]
