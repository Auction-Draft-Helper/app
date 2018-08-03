const fs = require("fs");

let fsProsData = JSON.parse(fs.readFileSync("./data/fsPros.json"));
let yahooData = JSON.parse(fs.readFileSync("./data/yahoo.json"));
let positions = ["QB", "RB", "WR", "TE", "K", "DST"];

fsProsData.forEach((fsElement, index) => {
  fsElement.id = index + 1;

  positions.forEach(positionKey => {
    if (fsElement.position === positionKey) {
      fsElement[positionKey] = 1;
    } else {
      fsElement[positionKey] = 0;
    }
  });

  if (
    fsElement.position === "WR" ||
    fsElement.position === "RB" ||
    fsElement.position === "TE"
  ) {
    fsElement.FLEX = 1;
    fsElement.fpts = fsElement.fpts + fsElement.catches * 0.5;
  } else {
    fsElement.FLEX = 0;
  }

  yahooData.forEach(yElement => {
    if (
      fsElement.name.indexOf(yElement.name) !== -1 ||
      yElement.name.indexOf(fsElement.name) !== -1
    ) {
      fsElement["avg. value"] = yElement.val;
    }
  });
  if (!fsElement["avg. value"]) fsElement["avg. value"] = 1;
});

fs.writeFile(
  "./data/players.json",
  JSON.stringify(fsProsData, null, 2),
  "utf-8",
  function(err) {
    if (err) throw err;
    console.log("Saved!");
  }
);
