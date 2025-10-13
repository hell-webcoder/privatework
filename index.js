import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const randomDay = random.int(0, 272); // 273 days from Jan 1 to Sep 30 (0-272)
  const randomHour = random.int(0, 23); // 0-23 hours
  const randomMinute = random.int(0, 59); // 0-59 minutes
  const randomSecond = random.int(0, 59); // 0-59 seconds
  
  const date = moment()
    .year(2020)
    .startOf('year')
    .add(randomDay, "d")
    .add(randomHour, "h")
    .add(randomMinute, "m")
    .add(randomSecond, "s")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if(n===0) return simpleGit().push();
  const randomDay = random.int(0, 364); // 273 days from Jan 1 to Sep 30 (0-272)
  const randomHour = random.int(0, 23); // 0-23 hours
  const randomMinute = random.int(0, 59); // 0-59 minutes
  const randomSecond = random.int(0, 59); // 0-59 seconds
  
  const date = moment()
    .year(2020)
    .startOf('year')
    .add(randomDay, "d")
    .add(randomHour, "h")
    .add(randomMinute, "m")
    .add(randomSecond, "s")
    .format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date },makeCommits.bind(this,--n));
  });
};

makeCommits(10000);
