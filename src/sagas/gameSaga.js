import { takeEvery } from 'redux-saga';
import { put, call, select, take } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/appActions';
import * as gmActions from '../actions/gameActions';
import {
  getGmId, getNumPlyrs, getNumRows, getGmOverFlg, getCurrPlyrTyp, getSltStrng, getLwGuiFlg
} from '../selectors/gameSelectors';
import {getChnl2} from '../selectors/authSelectors';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const tick = document.getElementById('tick');
tick.pause();
tick.setAttribute('loop', 1);
//audioTick.setAttribute('src', '../sounds/ticA.wav');
const chime = document.getElementById('chime');
const wrong = document.getElementById('wrong');
const end = document.getElementById('end');

export function* getPlayerSelsRequest() {
  let uri = '';
  const chnl2  = yield select(getChnl2);
  //const chnl2 = select(getChnl2);

  if (chnl2 ===''){
    uri = `http://localhost:5001/playerSels/`;
  }else{
    uri = `https://${chnl2}.ngrok.io/playerSels/`;
  }
  //const uri = `http://localhost:5001/playerSels/`;
  try {
    yield call(callApi, () => fetch(uri), [types.PLAYERSELS_REQUEST_SUCCESS, types.PLAYERSEL_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
  // yield put(gmActions.getGmBrd());
}

export function* getInitNewGmRequest () {
  yield put(gmActions.getPlayerSels());
  yield put(gmActions.hndlNewGm());
}

export function* ltrDrpd (p) {

  yield put(gmActions.pauseClock());

  // yield delay(10000);
  // return;
  yield put(gmActions.getPlyrMv(p.nxt_ltr, p.gm_row_id ));
}

export function* getInitGmRequest(numPlyrs, slotStrng, numRows) {

  let uri = '';
  const chnl2  = yield select(getChnl2);
  // need to pass in
  //request.addParameter('num_plyrs', TYPES.Int, 5);
  //request.addParameter('slot_string', TYPES.VarChar, '1,1|2,2|3,3|4,4|5,5');
  //request.addParameter('num_rows', TYPES.Int, 5);
  const js = JSON.stringify(numPlyrs); const js2 = JSON.stringify(slotStrng); const js3 = JSON.stringify(numRows);
  if (chnl2 ===''){
    //uri = `http://localhost:5001/initGm/`;
    uri = `http://localhost:5001/initGm/${js}/cp/${js2}/cp2/${js3}`;
  }else{
    uri = `https://${chnl2}.ngrok.io/initGm/${js}/cp/${js2}/cp2/${js3}`;
  }

  //const uri = `http://localhost:5001/initGm/`;
  try {
    yield call(callApi, () => fetch(uri, numPlyrs), [types.INITGM_REQUEST_SUCCESS, types.INITGM_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}

export function* getPlyrMvRequest(p) {
  tick.pause();
  let gm_id = yield select(getGmId);
  //gm_id = JSON.stringify(gm_id);
  //nxt_ltr = JSON.stringify(nxt_ltr);
  //p.gm_row_id = JSON.stringify(p.gm_row_id);

  //return;

  let uri = '';
  const chnl2 = yield select(getChnl2);

  // const js = JSON.stringify(gmId); //const js2 = JSON.stringify(currPlyr);
  if (chnl2 ===''){
    // uri = `http://localhost:5001/cmptrmv/${js}/cp/${js2}`;
    uri = `http://localhost:5001/plyrmv/${gm_id}/gri/${p.gm_row_id}/nl/${p.nxt_ltr}`;
  }else{
    // uri = `https://${chnl2}.ngrok.io/cmptrmv/${js}/cp/${js2}`;
    uri = `https://${chnl2}.ngrok.io/plyrmv/${gm_id}/gri/${p.gm_row_id}/nl/${p.nxt_ltr}`;
  }

  try {
    yield call(callApi, () => fetch(uri), [types.PLYRMV_REQUEST_SUCCESS, types.PLYRMV_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}



//'/api/products/' + id);
export function* getCmptrMvRequest(gmId) {
  let uri = '';
  const chnl2  = yield select(getChnl2);
  // get game_id from store!!!
  const js = JSON.stringify(gmId); //const js2 = JSON.stringify(currPlyr);
  if (chnl2 ===''){
    // uri = `http://localhost:5001/cmptrmv/${js}/cp/${js2}`;
    uri = `http://localhost:5001/cmptrmv/${js}`;
  }else{
    // uri = `https://${chnl2}.ngrok.io/cmptrmv/${js}/cp/${js2}`;
    uri = `https://${chnl2}.ngrok.io/cmptrmv/${js}`;
  }

  // const uri = `http://localhost:5001/cmptrmv/${js}/cp/3`;
  //const uri = `http://localhost:5001/cmptrmv/${js}/cp/${js2}`;

  try {
    yield call(callApi, () => fetch(uri), [types.CMPTRMV_REQUEST_SUCCESS, types.CMPTRMV_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}

// export function* getGmBrdRequest() {
//   const uri = `http://localhost:5001/gmbrd/`;
//   try {
//     yield call(callApi, () => fetch(uri), [types.GMBRD_REQUEST_SUCCESS, types.GMBRD_REQUEST_FAILURE]);
//   } catch(error) {
//     yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
//   }
// }

export function* getPlyrMvSuccess (p) {

  // yield delay(10000);
  yield tick.pause();
  yield put(gmActions.pauseClock());
  const lwGuiFlg = yield select(getLwGuiFlg);
  // for illegal ltr proc returns x/y for gmBrd
  if(p.result[2][0].cell_num !== null){
    // var element = document.getElementById('box-table-b').rows[0].cells[5].firstChild;
    const element = document.getElementById('box-table-b').rows[p.result[2][0].row_num].cells[p.result[2][0].cell_num].firstChild;

    // return;
    element.className = "ScrabbleBlockOff";
    //return;
    yield delay(1000);
    element.className = "ScrabbleBlock3";
    yield wrong.play();
    yield put(gmActions.updGmBrd());
  }

  if(lwGuiFlg===0){
    yield chime.play();
  }else{
    yield wrong.play();
  }

  const gmOverFlg = yield select(getGmOverFlg);
  if(gmOverFlg === 1){
    //game over, somebody won
    yield put(gmActions.gmOver());
    yield put(appActions.showToast('', 'Game OVER', 'success'));
    // yield put(gmActions.incrPlyr());
    // const winnerPlyId = yield select(getWinnerPlyrId);
    yield put(gmActions.setMd('plyover'));
  }else{
    yield put(gmActions.incrPlyr());
  }
}
export function* getCmptrMvSuccess () {
  yield put(gmActions.pauseClock());
  yield tick.pause();
  const lwGuiFlg = yield select(getLwGuiFlg);
  if(lwGuiFlg===0){
    yield chime.play();
  }else{
    yield wrong.play();
  }
  yield delay(2000);
  const gmOverFlg = yield select(getGmOverFlg);
  if(gmOverFlg === 1){
    //game over, somebody won
    yield end.play();
    yield put(gmActions.gmOver());
    yield put(appActions.showToast('', 'Game OVER', 'success'));
    // yield put(gmActions.incrPlyr());
    // const winnerPlyId = yield select(getWinnerPlyrId);
    yield put(gmActions.setMd('plyover'));
  }else{
    yield put(gmActions.incrPlyr());
  }
}

export function* playGame() {
  const numPlyrs = yield select(getNumPlyrs);
  const numRows = yield select(getNumRows);
  // const slotStrng = yield select(getSlotStrng);
  const sltStrng = yield select(getSltStrng);
  yield put(gmActions.getInitGm(numPlyrs, sltStrng, numRows));
  yield take(types.INITGM_REQUEST_SUCCESS);
  // gameReducer fires first: moves nxt into curr
  yield put(gmActions.incrPlyr());
}

export function* incrPlyr() {
  const gmOverFlg = yield select(getGmOverFlg);
  if(gmOverFlg === 0) {
    // tick.play();

    const gmId = yield select(getGmId); // grabs game_id from store NOT backend
    const currPlyrTyp = yield select(getCurrPlyrTyp);
    // const nxtPlyrTyp = yield select(getNxtPlyrTyp);
    if (currPlyrTyp === 'C') {
      tick.play();
      yield put(gmActions.startClock());
      yield put(gmActions.getCmptrMv(gmId));
    } else {
      tick.play();
      yield put(gmActions.startClock());
    }
  }
}

export function* timeUp() {
  // have to go to server so it can register plyrOut
  // Can we call sel_plyr_mv with "" ltr? Or send a flag?

  const currPlyrTyp = yield select(getCurrPlyrTyp);

  if (currPlyrTyp === 'P') { // what about 'C' timeout???
    console.log('timeUp Plyr: ', currPlyrTyp);
    yield put(gmActions.getPlyrMv('Z', 0)); // ltrDrpd='1', gmRowId=1
  }

  // const gmOverFlg = yield select(getGmOverFlg);
  // if(gmOverFlg === 1){
  //   //game over, somebody won
  //   yield put(gmActions.gmOver()); // partial of incrPlyr()
  //   // const winnerPlyId = yield select(getWinnerPlyrId);
  //   yield put(gmActions.setMd('plyover'));
  // }else{
  //   yield put(gmActions.incrPlyr());
  // }

}

// active
export function* watchReadPlayerSelsRequest() {
  yield* takeEvery(types.READ_PLAYERSELS_REQUEST, getPlayerSelsRequest);
}

export function* watchInitGmRequest() {
  yield* takeEvery(types.READ_INITGM_REQUEST, getInitGmRequest);
}

// active
export function* watchInitNewGmRequest() {
  yield* takeEvery(types.INIT_NEW_GM, getInitNewGmRequest);
}

// export function* watchReadGmBrdRequest() {
//   yield* takeEvery(types.READ_GMBRD_REQUEST, getGmBrdRequest);
// }

export function* watchReadCmptrMvRequest() {
  yield* takeEvery(types.READ_CMPTRMV_REQUEST, getCmptrMvRequest);
}

export function* watchReadPlyrMvRequest() {
  yield* takeEvery(types.READ_PLYRMV_REQUEST, getPlyrMvRequest);
}

export function* watchCmptrMvSuccess() {
  yield* takeEvery(types.CMPTRMV_REQUEST_SUCCESS, getCmptrMvSuccess);
}

export function* watchPlyrMvSuccess() {
  yield* takeEvery(types.PLYRMV_REQUEST_SUCCESS, getPlyrMvSuccess);
}

export function* watchTimeUp() {
  yield* takeEvery(types.TIME_UP, timeUp);
}

// export function* watchSelChng() {
//   yield* takeEvery(types.SEL_CHNG, selChng());
// }

export function* watchIncrPlyr() {
  yield* takeEvery(types.INCR_PLYR, incrPlyr);

}

export function* watchLtrDrpd() {
  yield* takeEvery(types.LTR_DRPD, ltrDrpd);

}

export function* watchPlayGame() {
  yield* takeEvery(types.PLAY_GM, playGame);
}

// function isDef(obj) {
//   return typeof obj !== "undefined";
// }
