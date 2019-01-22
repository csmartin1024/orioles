
//basically getting the data from the "database" which is really just a json file for now
//Also, in a real react app, i would have an action dispensed and that would inject the players data into
//the state, but alas prototypes gotta protoype
import dbundy from './dylanbundy.json'
import acobb from './alexcobb.json'

const pseudoPitchDataLookup = {
  '605164':dbundy,
  '502171':acobb,
}

const pseudoPitcherDataLookup = {
  '605164':{name:"Dylan Bundy"},
  '502171':{name:"Alex Cobb"},
}

const Database = 
{
  getPlayerData:(playerId) =>
  {
    const player = pseudoPitcherDataLookup[playerId];
    player.pitchData = pseudoPitchDataLookup[playerId];
    return player;
  }
}

export default Database;