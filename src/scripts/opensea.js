const sdk = require('api')('@opensea/v1.0#1j3wv35kyd6wqwc');
const fs = require('fs');
const { getFirestore } = require('firebase/firestore');
let times = 0;
var CronJob = require('cron').CronJob;

let limit = 300;

let offset = 0;

let maxOffset = 50000;

const runScript = () => {
  times = times - 1;
  console.log(times);
  sdk['retrieving-collections']({ offset: '0', limit: '300' })
    .then((res) => {
      console.log(true);
      if (res.collections) {
        fs.writeFileSync(
          '/Users/adrian/code/finance-steroids/src/scripts/data',
          JSON.stringify({ success: 1, num: times }),
          (err) => {
            console.log(err);
          }
        );
      } else {
        fs.writeFileSync(
          '/Users/adrian/code/finance-steroids/src/scripts/data',
          JSON.stringify({ fail: true, msg: 'throttled', num: times }, () => {})
        );
      }
    })
    .catch((err) => {
      console.log(err);
      fs.writeFileSync(
        '/Users/adrian/code/finance-steroids/src/scripts/data',
        JSON.stringify({ fail: true, msg: 'throttled', num: times })
      );
    });
};
const job = new CronJob('0 */1 * * * *', function () {
  runScript();
});
job.start();
