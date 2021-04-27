import * as types from '../constants/actionTypes';

export function getPlayerSels() {
  return {
    type: types.READ_PLAYERSELS_REQUEST,
  };
}

export function sendSelChng(id, val,  plyrCol, plyrId) {
  return {
    type: types.SEL_CHNG,
    id,
    val,
    plyrCol,
    plyrId
  };
}

export function setMd(md) {
  return {
    type: types.SET_MD,
    md
  };
}

export function getInitGm(numPlyrs, slotStrng, numRows ) {
  return {
    type: types.READ_INITGM_REQUEST,
    numPlyrs,
    slotStrng,
    numRows
  };
}

export function getCmptrMv(gm_id) {
  return {
    type: types.READ_CMPTRMV_REQUEST,
    gm_id
  };
}

export function getPlyrMv(nxt_ltr, gm_row_id, ) {
  return {
    type: types.READ_PLYRMV_REQUEST,
    nxt_ltr,
    gm_row_id,
  };
}

export function getGmBrd() {
  return {
    type: types.READ_GMBRD_REQUEST,
  };
}

export function hndlNewGm() {
  return {
    type: types.NEW_GM,
  };
}

export function getInitNewGm() {
  return {
    type: types.INIT_NEW_GM,
  };
}

export function hndlPlayGm() {
  return {
    type: types.PLAY_GM
  };
}

export function hndlStopGm() {
  return {
    type: types.STOP_GM
  };
}

export function hndlOpenMdl() {
  return {
    type: types.OPEN_MDL
  };
}

export function hndlResetGm() {
  return {
    type: types.RESET_GM
  };
}

export function gmOver() {
  return {
    type: types.GM_OVER
  };
}

export function ltrDrpd(nxt_ltr, gm_row_id) {
  return {
    type: types.LTR_DRPD,
    nxt_ltr,
    gm_row_id
  };
}

export function updGmBrd() {
  return {
    type: types.UPD_GMBRD,
  };
}

export function startClock() {
  return {
    type: types.START_CLOCK
  };
}

export function gmBtnChng(btnMode) {
  return {
    type: types.GM_BTN_CHNG,
    btnMode
  };
}

export function incrPlyr() {
  return {
    type: types.INCR_PLYR
  };
}

export function timeUp() {
  return {
    type: types.TIME_UP
  };
}

export function pauseClock() {
  return {
    type: types.PAUSE_CLOCK
  };
}
