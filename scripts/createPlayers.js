'use strict'

const fs = require('fs'),
      yahooAuctionPlayers = JSON.parse(fs.readFileSync('data/auctionValues.json')),
      QB = 'QB',
      RB = 'RB',
      WR = 'WR',
      TE = 'TE',
      K = 'K',
      DST = 'DST',
      avg_cost = 'Avg Cost',
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
  let playersArray = [],
      tempArray = [],
      idCount = 0;

  const { positions, flexPositions } = leagueSettings,
        getPlayerName = (playerInfo) => playerInfo.split(' ').slice(0, -1).join(' '),
        getAuctionValue = (auctionPlayer) => {
          return Math.round(Number(auctionPlayer[avg_cost].substring(1)))
        };

  for(let i = 0; i < positions.length; i++) {
    const position = positions[i],
          positionStates = positions.reduce((finalObj, currentPosition) => {
            finalObj[currentPosition] = (position === currentPosition ? 1 : 0)
            return finalObj
          }, {});

    let isDefense = position === 'DST'

    tempArray = await JSON.parse(fs.readFileSync(`data/${positions[i]}.json`));

    tempArray = tempArray.map((player) => {
        idCount++
        const playerInfo = player.Player,
              name = isDefense ? playerInfo : getPlayerName(playerInfo),
              auctionPlayer = yahooAuctionPlayers.find((yahooPlayer) => {
                return yahooPlayer.Name.indexOf(name) != -1
              });

        return {
          ...positionStates,
          name,
          position,
          fpts: player.REC ? player.FPTS + (player.REC * 0.5) : player.FPTS,
          FLEX: flexPositions.includes(position) ? 1 : 0,
          id: idCount,
          'avg. value': auctionPlayer ? getAuctionValue(auctionPlayer) : 1
        }
      }
    ).sort((playerA, playerB) => playerB.fpts - playerA.fpts)

    let midPoint = leagueSettings.teams * leagueSettings[position] / 2,
        medianPoints = (tempArray[midPoint].fpts + tempArray[midPoint - 1].fpts) / 2

    tempArray.forEach((player) => player.PAM = player.fpts - medianPoints)
    playersArray = playersArray.concat(tempArray);
  }

  await fs.writeFileSync('data/players.json', JSON.stringify(playersArray, null, 2))
  console.log('Done!')
})();
