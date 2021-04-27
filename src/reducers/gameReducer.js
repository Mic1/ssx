import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function gameReducer(state = initialState.game, action) {

  switch (action.type) {
/* NEW_GM */
    case types.NEW_GM: {
      return {
        ...state,
        gmBrd: initialState.game.gmBrd,
        currPlyr: 0,
        nxtPlyr: 1,
        mode: 'new',
        gmStatus1: 'Please select players before starting game'
      };
    }
    case types.PLAY_GM: {
      return {
        ...state,
        mode: 'play',
        gmStatus1: 'play from switch'
      };
    }
    case types.STOP_GM: {
      return {
        ...state,
        mode: 'stop',
        gmStatus1: 'stop from switch'
      };
    }
    case types.OPEN_MDL: {
      return {
        ...state,
        openMdl: true,
      };
    }
    case types.GM_OVER: {
      // MUST incr plyr for winner - currPlyr just out!
      return {
        ...state,
        currPlyr: state.nxtPlyr,
        currPlyrTyp: state.nxtPlyrTyp, //(state.sels[state.nxtPlyr-1].val.substring(0,1) === 'C')?'C':'p',
        currPlyrClr: state.nxtPlyrClr, //state.sels[state.nxtPlyr-1].plyrCol // lttrClr
        currSlot: state.nxtSlot,
      };
    }
    case types.START_CLOCK: {
      return {
        ...state,
        gmClock: {seconds: 60, paused: false}
      };
    }

/* INIT_NEW_GM */
    case types.INIT_NEW_GM: {
      return {
        ...state,
        plyrSlots: initialState.game.plyrSlots,
        gmOverFlg: 0
      };
    }

    case types.SEL_CHNG:
      return {
        ...state,
        sels: state.sels.map(selchng => selchng.id === action.id ?
          {...selchng, plyrId:action.val, val:action.val, plyrCol: action.plyrCol} :
          selchng
        )
      };


    case types.TIME_UP: {
      return {
        ...state,
        gmClock: {seconds: 0, paused: true},
        debug: 'TimeUp'
      };
    }

    case types.PAUSE_CLOCK: {
      return {
        ...state,
        gmClock: {seconds: 0, paused: true},
        debug: 'PauseClock'
      };
    }

    // new thinking: update gmBrd with dropped ltr here
    // so can display and manipulate before calling sel_plyr_mv
          // - highlight "dropped" letter etc
    // when proc comes back check for InvldLtr - shade, delay, load from tmpBrd
  //   case types.LTR_DRPD: {
  //   const ltrStrng = "['" + action.nxt_ltr + "','0','" + state.currPlyr + "']";
  //   const ltrArr = [[action.nxt_ltr, 0, state.currPlyr]];
  //   // const ltrJson
  //   return {
  //     ...state,
  //     gmBrd: state.gmBrd.map(gmRow => gmRow.gm_row_id === action.gm_row_id ?
  //       {...gmRow, gm_id:gmRow.gm_id, row_wrd:gmRow.row_wrd, is_lst_wrd: gmRow.is_lst_wrd,
  //         ltr_json: [["Z","10","6","#ff0000"]], // gmRow.ltr_json.concat(ltrArr), // function(){
  //         //
  //         //                             return  gmRow.ltr_json; // gmRow.ltr_json.push(ltrArr);
  //         //                          },
  //         plyr_stat_cd: gmRow.plyr_stat_cd,
  //         sub_wrd_clr: gmRow.sub_wrd_clr
  //       } :
  //       gmRow // function(gmRow){ return gmRow }
  //     )
  //   };
  // }


    case types.LTR_DRPD: {
      // const ltrStrng = "['" + action.nxt_ltr + "','0','" + state.currPlyr + "']";
      // const ltrArr = [[action.nxt_ltr, 0, state.currPlyr]];
      // const testArr = state.gmBrd[0].ltr_json.concat([["Z", "10", "6", "#ffffff"]]);
      // const ltrJson
      return Object.assign({}, state, {
        gmBrd: state.gmBrd.map(gmRow => {
          if (gmRow.gm_row_id === action.gm_row_id) {
            return Object.assign({}, gmRow, {
              ltr_json: gmRow.ltr_json.concat([[action.nxt_ltr, "1", "16", "#000000"]]),
              row_wrd: gmRow.row_wrd + action.nxt_ltr
            });
          }
          return gmRow;

        })
        //     gmRow.gm_row_id === action.gm_row_id ?
        //         {...gmRow, gm_id:gmRow.gm_id, row_wrd:gmRow.row_wrd, is_lst_wrd: gmRow.is_lst_wrd,
        //           ltr_json: [["Z","10","6","#ff0000"]], // gmRow.ltr_json.concat(ltrArr), // function(){
        //           //
        //           //                             return  gmRow.ltr_json; // gmRow.ltr_json.push(ltrArr);
        //           //                          },
        //           plyr_stat_cd: gmRow.plyr_stat_cd,
        //           sub_wrd_clr: gmRow.sub_wrd_clr
        //         } :
        //         gmRow
        //     } // function(gmRow){ return gmRow }
        //   )
        // };
      });
    }

    case types.INCR_PLYR: {
      // let pl = state.plyrSlots.findIndex((el) =>
      //   (el.slot_num > (state.currPlyr)) &&
      //             (el.plyr_stat_cd !== 'C') &&
      //             (el.plyr_stat_cd !== 'I')
      // );
      // if(pl === -1){
      //   pl = state.plyrSlots.findIndex((el) =>
      //     (el.plyr_stat_cd !== 'C') &&
      //     (el.plyr_stat_cd !== 'I')
      //   );
      // }
      // if(pl === -1){
      // }


      //const p = (state.currPlyr === 5) ? 1 : state.currPlyr + 1;
      //const lttrClr = state.sels[p-1].plyrCol;
      return {
        ...state,
        currPlyr: state.nxtPlyr,
        currPlyrTyp: state.nxtPlyrTyp,
        // currPlyrTyp: (state.sels[state.nxtPlyr-1].val.substring(0,1) === 'c')?'c':'p',
        // currPlyrClr: state.sels[state.nxtPlyr-1].plyrCol // lttrClr
        currPlyrClr: state.nxtPlyrClr, // lttrClr
        currSlot: state.nxtSlot,
      };
    }

    case types.READ_PLAYERSELS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case types.READ_INITGM_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case types.READ_CMPTRMV_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case types.READ_PLYRMV_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case types.READ_GMBRD_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case types.PLAYERSELS_REQUEST_SUCCESS:
      return {
        ...state,
        playerSels: action.result,
        isFetching: false
      };

    case types.SET_MD:
      return {
        ...state,
        mode: action.md
      };

    case types.UPD_GMBRD:
      return {
        ...state,
        gmBrd: state.tmpGmBrd,
        tmpGmBrd: []
      };

    // proc returns 3 datasets as arrays within action.result array
    // convert to state var when variable # of players implemented
      case types.CMPTRMV_REQUEST_SUCCESS:
        return {
          ...state,
          //gmBrd: action.result.slice( 0, 5 ),
          gmBrd: action.result[0],
          game_id: action.result[0][0].gm_id,
          //plyrSlots: action.result.slice( 5, 10 ),
          plyrSlots: action.result[1],
          nxtPlyr: action.result[2][0].nxt_plyr_id,
          nxtSlot: action.result[2][0].nxt_slot_id,
          nxtPlyrTyp: action.result[2][0].nxt_plyr_typ,
          nxtPlyrClr: action.result[2][0].nxt_plyr_clr,
          winnerPlyrId: action.result[2][0].winner_plyr_id,
          winnerSlotId: action.result[2][0].winner_slot_id,
          gmOverFlg: action.result[2][0].gm_over_flg,
          lwGuiFlg: action.result[2][0].lw_gui_flg,
          isFetching: false
        };

      case types.PLYRMV_REQUEST_SUCCESS:
        if(action.result[2][0].cell_num !== null){
          return {
            ...state,
            // if proc returns board x coord, load returned gmBrd into tempGmBrd
            tmpGmBrd: action.result[0],
            game_id: action.result[0][0].gm_id,
            //plyrSlots: action.result.slice( 5, 10 ),
            plyrSlots: action.result[1],
            nxtPlyr: action.result[2][0].nxt_plyr_id,
            nxtSlot: action.result[2][0].nxt_slot_id,
            nxtPlyrTyp: action.result[2][0].nxt_plyr_typ,
            nxtPlyrClr: action.result[2][0].nxt_plyr_clr,
            winnerPlyrId: action.result[2][0].winner_plyr_id,
            winnerSlotId: action.result[2][0].winner_slot_id,
            gmOverFlg: action.result[2][0].gm_over_flg,
            lwGuiFlg: action.result[2][0].lw_gui_flg,
            // cellStrng: action.result[2][0].cell_strng,
            isFetching: false
          };
        }else{
          return {
            ...state,
            //gmBrd: action.result.slice( 0, 5 ),
            gmBrd: action.result[0],
            game_id: action.result[0][0].gm_id,
            //plyrSlots: action.result.slice( 5, 10 ),
            plyrSlots: action.result[1],
            nxtPlyr: action.result[2][0].nxt_plyr_id,
            nxtSlot: action.result[2][0].nxt_slot_id,
            nxtPlyrTyp: action.result[2][0].nxt_plyr_typ,
            nxtPlyrClr: action.result[2][0].nxt_plyr_clr,
            winnerPlyrId: action.result[2][0].winner_plyr_id,
            winnerSlotId: action.result[2][0].winner_slot_id,
            gmOverFlg: action.result[2][0].gm_over_flg,
            lwGuiFlg: action.result[2][0].lw_gui_flg,
            // cellStrng: action.result[2][0].cell_strng,
            isFetching: false
          };
        }

    case types.RESET_GM:
      return {
        state
    };

    case types.GMBRD_REQUEST_SUCCESS:
      return {
        ...state,
        gmBrd: action.result,
        game_id: action.result[0].gm_id,
        isFetching: false
      };

    case types.INITGM_REQUEST_SUCCESS:
      return {
        ...state,
        gmBrd: action.result[0],
        game_id: action.result[0][0].gm_id,
        nxtPlyr: action.result[1][0].nxt_plyr_id,
        nxtSlot: action.result[1][0].nxt_slot_id,
        nxtPlyrTyp: action.result[1][0].nxt_plyr_typ,
        nxtPlyrClr: action.result[1][0].nxt_plyr_clr,
        gmStatus1: action.result[1][0].txt1,
        gmStatus2: action.result[1][0].txt2,
        // plyrSlots: initialState.game.plyrSlots,
        isFetching: false
      };

    case types.PLAYERSEL_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case types.CMPTRMV_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case types.GMBRD_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case types.MANAGE_EDIT:
      return {
        ...state,
        editing: {
          ...state.editing,
          ...action.editing
         }
      };
    default:
      return state;
  }
}
