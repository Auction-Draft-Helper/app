const puppeteer = require("puppeteer");
const fs = require("fs");
const { scraperFunc, writeFiles } = require("./scraper.js");

const yahooUrls = [
  "https://football.fantasysports.yahoo.com/f1/draftanalysis?tab=AD&pos=ALL&sort=DA_AP",
  "https://football.fantasysports.yahoo.com/f1/draftanalysis?tab=AD&pos=ALL&sort=DA_AP&count=50",
  "https://football.fantasysports.yahoo.com/f1/draftanalysis?tab=AD&pos=ALL&sort=DA_AP&count=100",
  "https://football.fantasysports.yahoo.com/f1/draftanalysis?tab=AD&pos=ALL&sort=DA_AP&count=150"
];

const yahooCallback = () => {
  let table = document.getElementById("draftanalysis");
  let playerNames = [];
  let playerCosts = [];
  let playerObj = [];
  Array.from(table.getElementsByClassName("name")).forEach(element => {
    playerNames.push(element.innerText);
  });
  Array.from(table.getElementsByClassName("Alt Last")).forEach(element => {
    let text = element.firstChild.innerText;
    if (text.indexOf("$") !== -1) {
      playerCosts.push(text);
    }
  });
  for (let i = 0; i < playerNames.length; i++) {
    playerObj.push({
      name: playerNames[i],
      val: playerCosts[i]
    });
  }
  return playerObj;
};

const createYahooObj = async arr => {
  let finalObj = [];
  for (let i = 0; i < arr.length; i++) {
    let holder = await scraperFunc(yahooCallback, arr[i]);
    for (let j = 0; j < holder.length; j++) {
      let value = Math.round(Number(holder[j].val.substr(1)));
      finalObj.push({ name: holder[j].name, val: value });
    }
  }
  return finalObj;
};

writeFiles(createYahooObj, yahooUrls, "./data/yahoo.json");
