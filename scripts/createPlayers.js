'use strict';

const fs = require('fs'),
      yahooAuctionPlayers = JSON.parse(fs.readFileSync('data/auctionValues.json')),
      yahooDraftPlayers = JSON.parse(fs.readFileSync('data/draftPosition.json')),
      QB = 'QB',
      RB = 'RB',
      WR = 'WR',
      TE = 'TE',
      K = 'K',
      DST = 'DST',
      avgCost = 'Avg Cost',
      avgPick = 'Avg Pick',
      receptionPoints = 0.5,
      leagueSettings = {
        teams: 10,
        QB: 1,
        RB: 3,
        WR: 3,
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
          return Math.round(Number(auctionPlayer[avgCost]), 0);
        },
        getYahooPlayer = (array, name) => array.find(yahooPlayer => {
          return yahooPlayer.Name.indexOf(name) != -1
        }),
        getPlayerPoints = (player) => player.FPTS,
        getFlexPoints = (player) => player.FPTS + (player.REC * receptionPoints);

  for(let i = 0; i < positions.length; i++) {
    const position = positions[i],
          positionMap = positions.reduce((finalObj, currentPosition) => {
            finalObj[currentPosition] = (position === currentPosition ? 1 : 0)
            return finalObj
          }, {});

    let isDefense = position === DST,
        isKicker = position === K,
        isFlexPosition = flexPositions.includes(position),
        calculatePlayerPoints = isFlexPosition ? getFlexPoints : getPlayerPoints;

    positionMap.FLEX = isFlexPosition ? 1 : 0;
    tempPlayersArray = await JSON.parse(fs.readFileSync(`data/${positions[i]}.json`));

    tempPlayersArray = tempPlayersArray.map((player) => {
      const playerInfo = player.Player,
            name = isDefense ? playerInfo : getPlayerName(playerInfo),
            auctionPlayer = getYahooPlayer(yahooAuctionPlayers, name),
            draftPlayer = getYahooPlayer(yahooDraftPlayers, name);

      idCount++;

      return {
        ...positionMap,
        name,
        position,
        fantasyPoints: calculatePlayerPoints(player),
        id: idCount,
        avgPrice: auctionPlayer && !isKicker ? getAuctionValue(auctionPlayer) : 1,
        avgDraftPosition: draftPlayer ? draftPlayer[avgPick] : 1000
      }
    }).sort((playerA, playerB) => playerB.fantasyPoints - playerA.fantasyPoints);

    

    let positionCount = teams * leagueSettings[position],
        midPoint = positionCount / 2,
        medianPoints = (tempPlayersArray[midPoint].fantasyPoints + tempPlayersArray[midPoint - 1].fantasyPoints) / 2,
        replacementPoints = tempPlayersArray[positionCount - 1].fantasyPoints;

    tempPlayersArray.forEach(player => {
      let playerPoints = player.fantasyPoints;
      player.PAM = playerPoints - medianPoints;
      player.PAR = playerPoints - replacementPoints;
    });
    finalPlayersArray = finalPlayersArray.concat(tempPlayersArray);
  };

  const res = await fs.writeFileSync('data/players.json', JSON.stringify(finalPlayersArray, null, 2));
  console.log('Done!');
})();
