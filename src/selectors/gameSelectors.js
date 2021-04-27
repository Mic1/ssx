export const getCurrPlyr = (state) => state.game.currPlyr;
export const getGmId = (state) => state.game.game_id;
export const getCurrPlyrTyp = (state) => state.game.currPlyrTyp;
export const getNxtPlyrTyp = (state) => state.game.nxtPlyrTyp;
export const getNumPlyrs = (state) => state.game.numPlyrs;
export const getNxtPlyr = (state) => state.game.nxtPlyr;
export const getSlotStrng = (state) => state.game.slotStrng;
export const getNumRows = (state) => state.game.numRows;
export const getGmOverFlg = (state) => state.game.gmOverFlg;
export const getWinnerPlyrId = (state) => state.game.winnerPlyrId;
export const getLwGuiFlg = (state) => state.game.lwGuiFlg;
export const getOpenMdl = (state) => state.game.openMdl;

export const getNextSlot = (state) => {
  // is there a slot to the right?
  let pl = state.plyrSlots.findIndex((el) =>
   (el.slot_num > (state.currPlyr)) &&
   (el.plyr_stat_cd !== 'C') &&
   (el.plyr_stat_cd !== 'I')
 );
  if(pl === -1){
    // is there a slot at the beginning?
   pl = state.plyrSlots.findIndex((el) =>
     (el.plyr_stat_cd !== 'C') &&
     (el.plyr_stat_cd !== 'I')
   );
 }
  return pl;
};

export const getSltStrng = (state) => {
  let sltStrng = '';

  state.game.sels.forEach((el) => {
    //
    sltStrng = sltStrng + el.plyrId + ',' + el.id + '|';
  });
  sltStrng = sltStrng.substr(0,(sltStrng.length-1));

  return sltStrng; //'1,1|2,2|3,3|4,4|5,5';
};
