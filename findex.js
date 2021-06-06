const HELPERS = require("./helperfunctions.js");
const FILESYS = require("./fileSystemFunctions.js");
const axios = require("./axios.js");
const moment = require("moment");
var LISTS = require("./lists.js");

const { CURList } = LISTS;
const { readTheFile, writeTheFile } = FILESYS;
const { createDates, promptArray } = HELPERS;

//00.CREATE DATES AND WRITE TO 00.Dates
const writeDates = (data) => {
  writeTheFile(data, "00.Date Groups.json");
};

//createDates(writeDates);

//01. READ DATES AND SHOW

const readtDates = (callback) => {
  readTheFile("00.Date Groups.json", (data) => {
    callback(data);
  });
};

//readtDates();

//02. GET XE API INFO AND SHOW

const getApiInfo = () => {
  axios.fetchFromXe("account_info", (data) => {
    console.log(data);
  });
};

//getApiInfo();

//03. GET ALL CURRENCIES AND WRITE TO 01.Currencies
const getAndWriteCurrencies = () => {
  axios.fetchFromXe("currencies.json/?obsolete=false", (data) => {
    writeTheFile(data.currencies, "01.Currencies.json");
  });
};
//getAndWriteCurrencies();

//04. CREATE THE POPULAR CURRENCY LIST

const createPopularCurrencyList = () => {
  readTheFile("01.Currencies.json", (data) => {
    const newdata = JSON.parse(JSON.stringify(data));
    let filteredList = [];
    CURList.map((item1) => {
      newdata.map((item) => {
        if (item.iso === item1) {
          filteredList.push({ currency: item.iso, name: item.currency_name });
        }
      });
    });
    writeTheFile(filteredList, "02.PopularCurrencies.json");
  });
};
//createPopularCurrencyList();

//05. UPDATE POPULAR CURRENCIES

const getPopularListsAndPutDates = () => {
  const mergeTofile = (data) => {
    console.table(data);
    promptArray(data, (index) => {
      console.table(data[index].data.date);
      promptArray(data[index].data.date, (index2) => {
        console.table(index2);
        const action = ["hmm", "mmm"];
        console.table(action);
        promptArray(action, (index3) => {
          console.log("index3", index3);
          if (index3 == 0) {
            console.log("lets update");
          } else if (index3 == 1) {
            console.log("lets just show data if available");
          }
        });
      });
    });
  };
  readTheFile("02.PopularCurrencies.json", mergeTofile);
};

//getPopularListsAndPutDates();

//06. ADD DATES TO POPULAR CURRENCIES

const mergePopularListsWithDatas = () => {
  const mergeTofile = (data) => {
    readtDates((dates) => {
      const newDates = dates.map((item) => {
        return { ...item, status: false };
      });
      const newdata = data.map((item) => {
        return { ...item, data: { date: newDates } };
      });
      writeTheFile(newdata, "02.PopularCurrencies.json");
    });
  };
  readTheFile("02.PopularCurrencies.json", mergeTofile);
};

//mergePopularListsWithDatas();

//07. SHOW POPULAR LIST

const showPopularList = (callback) => {
  readTheFile("02.PopularCurrencies.json", (data) => {
    console.table(data);
    promptArray(data, (index) => {
      console.table(data[index].data.date);
      promptArray(data[index].data.date, (index2) => {
        callback(data[index].currency, data[index].data.date[index2]);
      });
    });
  });
};
//showPopularList();

const fetchDataAndWrite = (index) => {
  showPopularList((cur, dateItem) => {
    const { start, finish } = dateItem;
    const startF = moment(start, "DD-MM-YYYY").format("YYYY-MM-DD");
    const finishF = moment(finish, "DD-MM-YYYY").format("YYYY-MM-DD");
    axios.fetchFromXe(
      `historic_rate.json/?from=${cur}&date=2011-02-11&to=EUR,CAD`,
      (data) => {
        console.log(data);
      }
    );
  });
};

fetchDataAndWrite();
