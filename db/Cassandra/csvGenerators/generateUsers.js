/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const writeUsers = fs.createWriteStream(path.join(__dirname, '/dataHolder/users.csv'));
writeUsers.write('user_id,avatar_url,email,name,username\n');

function generateUsers(numRecords) {
  let userID = 1;

  function recursiveWrite() {
    if (userID === numRecords + 1) return writeUsers.end();
    const id = userID;
    const username = faker.internet.userName();
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const genNewPic = () => (`https://randomuser.me/api/portraits/${userID % 2}/${userID % 100}.jpg`);
    const avatarUrl = genNewPic();
    const andyAreYouOk = writeUsers.write(`${id},${avatarUrl},${email},${name},${username}\n`);
    userID += 1;
    if (!andyAreYouOk) writeUsers.once('drain', recursiveWrite);
    else recursiveWrite();
  }

  recursiveWrite(numRecords);
}

generateUsers(1000);

module.exports.generateUsers = generateUsers;
