import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const randomDay = random.int(0, 364); // 365 days in 2025 (0-364)
  const date = moment()
    .year(2025)
    .startOf('year')
    .add(randomDay, "d")
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
  const randomDay = random.int(0, 364); // 365 days in 2025 (0-364)
  const date = moment().year(2025).startOf('year').add(randomDay, "d").format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date },makeCommits.bind(this,--n));
  });
};

makeCommits(20);
