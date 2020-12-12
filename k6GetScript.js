/* eslint-disable import/no-unresolved */
/* eslint-disable func-names */
import { Counter } from 'k6/metrics';
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  // vus: 1,
  // duration: '30s',
  // vus: 10,
  // duration: '30s',
  // vus: 100,
  // duration: '1m',
  stages: [
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 1000 },
    { duration: '30s', target: 1500 },
    { duration: '1m', target: 1500 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};

const myHeartBeatErrorCounter = new Counter('heart_beat_error_counter');
const myGetErrorCounter = new Counter('get_error_counter');
// const myPostErrorCounter = new Counter('post_error_counter');

const getRandom = function makeRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function () {
  group('v1 API testing', () => {
    group('heart-beat', () => {
      const res = http.get('http://localhost:3003/');
      check(res, { 'status is 200': (r) => r.status === 200 });
      if (res.status === 404) {
        myHeartBeatErrorCounter.add(1);
      }
    });

    group('access a review', () => {
      // set a random review for access
      const res = http.get(`http://localhost:3003/api/listings/10/reviews/${getRandom(1, 1000000)}`);
      check(res, { 'status is 200': (r) => r.status === 200 });
      if (res.status === 404) {
        myGetErrorCounter.add(1);
      }
    });

    // group('create a review', () => {
    //   const res = http.get('http://localhost:3003/');
    //   check(res, { 'status is 200': (r) => r.status === 200 });
    //   check(res, {
    //     'status is 404': (r) => {
    //       if (r.status === 404) {
    //         myHeartBeatErrorCounter.add(1);
    //       }
    //     },
    //   });
    // });

    // group('delete a review', () => {
    //   const res = http.get('http://localhost:3003/');
    //   check(res, { 'status is 200': (r) => r.status === 200 });
    //   check(res, {
    //     'status is 404': (r) => {
    //       if (r.status === 404) {
    //         myHeartBeatErrorCounter.add(1);
    //       }
    //     },
    //   });
    // });
  });
  sleep(1);
}

// write a scenario that includes setup and takedown
