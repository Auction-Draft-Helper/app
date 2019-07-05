'use strict';

const fs = require('fs'),
      yahooAuctionPlayers = JSON.parse(fs.readFileSync('data/auctionValues.json')),
      QB = 'QB',
      RB = 'RB',
      WR = 'WR',
      TE = 'TE',
      K = 'K',
      DST = 'DST',
      avgCost = 'Avg Cost',
      leagueSettings = {
        teams: 10,
        QB: 1,
        RB: 2,
        WR: 2,
        TE: 1,
        FLEX: 1,
        K: 1,
        DST: 1,
        positions: [QB, RB, WR, TE, K, DST],
        flexPositions: [RB, WR, TE]
      };

(async function() {
  let finalPlayersArray = [],
      tempPlayersArray = [],
      idCount = 0;

  const { positions, flexPositions, teams } = leagueSettings,
        getPlayerName = (playerInfo) => playerInfo.split(' ').slice(0, -1).join(' '),
        getAuctionValue = (auctionPlayer) => {
          return Math.round(Number(auctionPlayer[avgCost].substring(1)));
        },
        getPlayerPoints = (player) => player.FPTS,
        getFlexPoints = (player) => player.FPTS + (player.REC * 0.5);

  for(let i = 0; i < positions.length; i++) {
    const position = positions[i],
          positionMap = positions.reduce((finalObj, currentPosition) => {
            finalObj[currentPosition] = (position === currentPosition ? 1 : 0)
            return finalObj
          }, {});

    let isDefense = position === DST,
        isKicker = position === K,
        isFlexPosition = flexPositions.includes(position),
        playerPointsFunc = isFlexPosition ? getFlexPoints : getPlayerPoints;

    positionMap.FLEX = isFlexPosition ? 1 : 0;
    tempPlayersArray = await JSON.parse(fs.readFileSync(`data/${positions[i]}.json`));

    tempPlayersArray = tempPlayersArray.map((player) => {
      const playerInfo = player.Player,
            name = isDefense ? playerInfo : getPlayerName(playerInfo),
            auctionPlayer = yahooAuctionPlayers.find((yahooPlayer) => {
              return yahooPlayer.Name.indexOf(name) != -1
            });

      idCount++;

      return {
        ...positionMap,
        name,
        position,
        fpts: playerPointsFunc(player),
        id: idCount,
        'avg. value': auctionPlayer && !isKicker ? getAuctionValue(auctionPlayer) : 1
      }
    }).sort((playerA, playerB) => playerB.fpts - playerA.fpts);

    let positionCount = teams * leagueSettings[position],
        midPoint = positionCount / 2,
        medianPoints = (tempPlayersArray[midPoint].fpts + tempPlayersArray[midPoint - 1].fpts) / 2,
        replacementPoints = tempPlayersArray[positionCount - 1].fpts;

    tempPlayersArray.forEach((player) => {
      let playerPoints = player.fpts;
      player.PAM = playerPoints - medianPoints;
      player.PAR = playerPoints - replacementPoints;
    });
    finalPlayersArray = finalPlayersArray.concat(tempPlayersArray);
  };

  const res = await fs.writeFileSync('data/players.json', JSON.stringify(finalPlayersArray, null, 2));
  console.log('Done!');
})();
