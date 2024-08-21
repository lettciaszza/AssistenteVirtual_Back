import http from 'k6/http';
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// Create a custom metric to track the success rate
export let errorRate = new Rate('errors');

export let options = {
  stages: [
      { duration: "2s", target: 5 },
      { duration: "10s", target: 300 },
      { duration: "1s", target: 0 }
  ],
  thresholds: {
    'errors': ['rate<0.1'],  // Custom threshold for the error rate
    'http_req_duration': ['p(95)<500'],  // 95% of requests should complete within 500ms
  }
};

export default function () {
  const response = http.get("http://ip:3000/health", { headers: { Accepts: "application/json" } });

  const checkResult = check(response, {
    "status is 200": (r) => r.status === 200
  });

  // Track errors
  errorRate.add(!checkResult);

  // Simulate a small sleep to mimic real user behavior
  sleep(1);
}

// Add a custom summary function to print out the results at the end of the test
export function handleSummary(data) {
  console.log('Test complete. Writing results to file...');

  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),  // Print to stdout
    'results/performance.json': JSON.stringify(data),  // Write JSON to a file
    'results/summary.txt': textSummary(data, { indent: ' ', enableColors: false }),  // Write summary to a text file
  };
}

function textSummary(data, options) {
  return `
    Summary:
    ==========
    Duration: ${data.metrics.http_req_duration ? data.metrics.http_req_duration.avg.toFixed(2) : 'N/A'} ms
    Errors: ${data.metrics.errors ? (data.metrics.errors.rate * 100).toFixed(2) : 'N/A'}%
    Requests: ${data.metrics.http_reqs ? data.metrics.http_reqs.count : 'N/A'}
    RPS: ${data.metrics.iterations ? (data.metrics.iterations.rate).toFixed(2) : 'N/A'}
  `;
}
