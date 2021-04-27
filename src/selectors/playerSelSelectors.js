import { createSelector } from 'reselect';

const getPlayerSels = (state) => state.game.playerSels;
// const test2 = getPlayerSels;


export const makeGetPlayerSels = () => {
  // const test1 = getPlayerSels;

  return createSelector(
    [getPlayerSels],
    (playerSels) => {
      return playerSels;
    }
    );
};

