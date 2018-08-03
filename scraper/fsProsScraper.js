const { scraperFunc, writeFiles } = require("./scraper.js");

const fsProsUrls = [
  {
    url: "https://www.fantasypros.com/nfl/projections/qb.php?week=draft",
    position: "QB"
  },
  {
    url: "https://www.fantasypros.com/nfl/projections/rb.php?week=draft",
    position: "RB"
  },
  {
    url: "https://www.fantasypros.com/nfl/projections/wr.php?week=draft",
    position: "WR"
  },
  {
    url: "https://www.fantasypros.com/nfl/projections/te.php?week=draft",
    position: "TE"
  },
  {
    url: "https://www.fantasypros.com/nfl/projections/k.php?week=draft",
    position: "K"
  },
  {
    url: "https://www.fantasypros.com/nfl/projections/dst.php?week=draft",
    position: "DST"
  }
];

const fsProsCallback = position => {
  let playersObj = [];
  let playersArr = [];
  let pointsArr = [];
  let catchesArr = [];
  let table = document.getElementById("data");
  Array.from(table.getElementsByClassName("player-name")).forEach(element => {
    playersArr.push(element.innerText);
  });
  let rows = Array.from(table.getElementsByTagName("tr"));
  for (let i = 2; i < rows.length; i++) {
    pointsArr.push(rows[i].lastChild.previousElementSibling.innerText);
  }

  if (position === "RB") {
    let catchCells = rows.map(element => element.children[5]);
    for (let i = 2; i < rows.length; i++) {
      catchesArr.push(catchCells[i].innerText);
    }
  } else if (position === "WR" || position === "TE") {
    let catchCells = rows.map(element => element.children[1]);
    for (let i = 2; i < rows.length; i++) {
      catchesArr.push(catchCells[i].innerText);
    }
  } else {
    catchesArr = new Array(pointsArr.length).fill(0);
  }

  for (let i = 0; i < playersArr.length; i++) {
    playersObj.push({
      name: playersArr[i],
      fpts: Number(pointsArr[i]),
      catches: Number(catchesArr[i])
    });
  }

  return playersObj;
};

const createFSObj = async arr => {
  let finalObj = [];
  for (let i = 0; i < arr.length; i++) {
    let holder = await scraperFunc(fsProsCallback, arr[i].url, arr[i].position);
    for (let j = 0; j < holder.length; j++) {
      finalObj.push(holder[j]);
    }
  }
  return finalObj;
};

writeFiles(createFSObj, fsProsUrls, "./data/fsPros.json");
