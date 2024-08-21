import http from 'k6/http';
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate('errors');

export let options = {
  stages: [
      { duration: "2s", target: 5 },
      { duration: "10s", target: 1000 },
      { duration: "1s", target: 0 }
  ],
  thresholds: {
    'errors': ['rate<0.1'], 
    'http_req_duration': ['p(95)<500'], 
  }
};

export default function () {
  const response = http.get("http://85.209.92.61:3000/health", { headers: { Accepts: "application/json" } });

  const checkResult = check(response, {
    "status is 200": (r) => r.status === 200
  });

  errorRate.add(!checkResult);
  sleep(1);
}

export function handleSummary(data) {
  console.log('Test complete. Writing results to file...');

  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), 
    'results/performance.json': JSON.stringify(data),
    'results/summary.txt': textSummary(data, { indent: ' ', enableColors: false }), 
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
