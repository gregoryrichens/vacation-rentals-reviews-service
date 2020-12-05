/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const writeUsers = fs.createWriteStream(path.join(__dirname, '/dataHolder/users.csv'));

async function seedUsers(numRecords) {
  const numUsers = numRecords;

  for (let i = 1; i < numUsers; i += 1) {
    const id = i;
    const username = faker.internet.userName();
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const genNewPic = () => (`https://randomuser.me/api/portraits/${i % 2}/${i % 100}.jpg`);
    const avatarUrl = genNewPic();
    try {
      await writeUsers.write(`${id},${username},${name},${email},${avatarUrl}\n`);
    } catch (err) {
      console.log(err);
    }
  }

  writeUsers.end();
}

seedUsers(100);
