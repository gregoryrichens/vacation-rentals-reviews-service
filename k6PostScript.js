/* eslint-disable import/no-unresolved */
import { Counter } from 'k6/metrics';
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  // vus: 1,
  // duration: '5s',
  vus: 10,
  duration: '30s',
  // vus: 100,
  // duration: '1m',
  // stages: [
  //   { duration: '10s', target: 10 },
  //   { duration: '30s', target: 10 },
  //   { duration: '10s', target: 100 },
  //   { duration: '30s', target: 100 },
  //   { duration: '1m', target: 1000 },
  //   { duration: '1m', target: 1000 },
  //   { duration: '30s', target: 0 },
  // ],
  thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};

const myHeartBeatErrorCounter = new Counter('heart_beat_error_counter');
const myPostErrorCounter = new Counter('post_error_counter');
const myDelErrorCounter = new Counter('del_error_counter');

const getRandom = function makeRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function () {
  const stack = [];

  const sampleReview = {
    date: '2020-01-01',
    accuracy: 5,
    avatar_url: 'http://randomuser.me/api/portraits/men/80.jpg',
    check_in: 5,
    cleanliness: 5,
    communication: 5,
    email: 'bob@yahoo.com',
    location: 5,
    name: 'Bobby',
    text: 'Look a happy review',
    user_id: 69,
    username: 'monte420',
    value: 5,
  };

  const headers = { 'Content-Type': 'application/json' };

  group('API post testing', () => {
    group('heart-beat', () => {
      const res = http.get('http://localhost:3003/');
      check(res, { 'status is 200': (r) => r.status === 200 });
      if (res.status === 404) {
        myHeartBeatErrorCounter.add(1);
      }
    });

    const review = getRandom(100000001, 100100000);

    group('create a review', () => {
      const res = http.post(`http://localhost:3003/api/listings/10/reviews/${review}`, JSON.stringify(sampleReview), { headers });
      check(res, { 'status is 200': (r) => r.status === 200 });
      if (res.status === 400) {
        myPostErrorCounter.add(1);
      } else {
        stack.push(review);
      }
    });

    group('delete a review', () => {
      const res = http.del(`http://localhost:3003/api/listings/10/reviews/${stack[stack.length - 1]}`, JSON.stringify(sampleReview), { headers });
      check(res, { 'status is 200': (r) => r.status === 200 });
      if (res.status === 400) {
        myDelErrorCounter.add(1);
      } else {
        stack.pop();
      }
    });
  });
  console.log(stack);
  sleep(1);
}
