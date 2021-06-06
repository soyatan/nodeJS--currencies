var prompt = require("prompt-sync")();

const createDates = (callback) => {
  let years = [];
  for (y = 1998; y < 2021; y++) {
    years.push(y);
  }
  const dateGroups = years.map((year) => {
    return { start: `01-01-${year}`, finish: `01-01-${year + 1}` };
  });
  callback(dateGroups);
};

const promptArray = (array, callback) => {
  var action = prompt("Please Enter Index of the Action ");
  if (action !== parseInt(action).toString()) {
    console.log("please enter a number");
    action = prompt("Please Enter Index of the Action ");
  }
  if (action > array.length - 1) {
    console.log("invalid index selection");
    action = prompt("Please Enter Index of the Action ");
  }
  if (action < 0) {
    console.log("invalid index selection");
    action = prompt("Please Enter Index of the Action ");
  }
  console.log(`preparing to retrieve data`);
  callback(action);
};

module.exports = { createDates, promptArray };
