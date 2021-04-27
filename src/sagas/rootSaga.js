import { watchLogin, watchSignin } from "./authSaga";
import { watchToast } from "./toastSaga";

import {
  watchReadPlayerSelsRequest,
  watchPlayGame,
  watchTimeUp,
  watchLtrDrpd,
  watchReadCmptrMvRequest,
  watchReadPlyrMvRequest,
  watchInitGmRequest,
  watchInitNewGmRequest,
  watchCmptrMvSuccess,
  watchPlyrMvSuccess,
  watchIncrPlyr,
} from "./gameSaga";

export default function* rootSaga() {
  yield [
    watchLogin(),
    watchSignin(),
    watchToast(),
    watchReadPlayerSelsRequest(),
    watchPlayGame(),
    watchTimeUp(),
    watchLtrDrpd(),
    watchReadCmptrMvRequest(),
    watchReadPlyrMvRequest(),
    watchInitGmRequest(),
    watchInitNewGmRequest(),
    watchCmptrMvSuccess(),
    watchPlyrMvSuccess(),
    watchIncrPlyr(),
  ];
}
