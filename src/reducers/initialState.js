export default {
  app: {
    messages: []
  },
  auth: {
    token: '',
    username: '',
    plyrNm: '',
    plyrId: 0,
    roles: [],
    chnl2: '',
    isFetching: false
  },
  products: {
    list: [],
    filter: '',
    sortBy: 'name',
    editing: {
      modalOpen: false,
      product: {
        name: '',
        price: 0
      }
    }
  },
  cart: {
    items: [],
    products: []
  },
  game: {
    game_id: 0,
    playerSels: [],
    currPlyr: 0,
    currPlyrClr: 'black',
    currSlot: 0,
    cellStrng: '',
    currWrd: 1,
    rndmLtr: '',
    mode: 'idle',
    nxtPlyr: 1,
    nxtSlot: 0,
    nxtPlyrTyp: '',
    openMdl: false,
    currPlyrTyp: '',
    lwGuiFlg: 0,
    timeUp: 0,
    numPlyrs: 5,
    numRows: 5,
    winnerPlyrId: 0,
    winnerSlotId: 0,
    gmOverFlg: 0,
    slotStrng: '6,1|7,2|8,3|9,4|10,5',
    gmStatus1: 'Choose New GAME to set up a new game',
    gmStatus2: '...',
    sels: [
      { id: 1, val: 'N', plyrCol: '#EOEOEO', plyrId: 0},
      { id: 2, val: 'N', plyrCol: '#EOEOEO', plyrId: 0 },
      { id: 3, val: 'N', plyrCol: '#EOEOEO', plyrId: 0 },
      { id: 4, val: 'N', plyrCol: '#EOEOEO', plyrId: 0 },
      { id: 5, val: 'N', plyrCol: '#EOEOEO', plyrId: 0 },
    ],
    gmClock: {
      seconds: 0,
      paused: true
    },

    gmBrd: [
      {gm_id: 0,	row_wrd: '',	gm_row_id: 1,	is_lst_wrd: 0, ltr_json: [], plyr_stat_cd: 'N', sub_wrd_clr: '#d8d8d8' },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 2,	is_lst_wrd: 0, ltr_json: [], plyr_stat_cd: 'N', sub_wrd_clr: '#d8d8d8' },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 3,	is_lst_wrd: 0, ltr_json: [], plyr_stat_cd: 'N', sub_wrd_clr: '#d8d8d8' },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 4,	is_lst_wrd: 0, ltr_json: [], plyr_stat_cd: 'N', sub_wrd_clr: '#d8d8d8' },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 5,	is_lst_wrd: 0, ltr_json: [], plyr_stat_cd: 'N', sub_wrd_clr: '#d8d8d8' },
    ],

    tmpGmBrd: [],

    plyrSlots: [
      {gm_id: 0, slot_num: 1, plyr_id: 1, 	points: '000',	last_mv: '---', plyr_stat_cd: 'N'},
      {gm_id: 0, slot_num: 2, plyr_id: 2, 	points: '000',	last_mv: '---', plyr_stat_cd: 'N'},
      {gm_id: 0, slot_num: 3, plyr_id: 3, 	points: '000',	last_mv: '---', plyr_stat_cd: 'N'},
      {gm_id: 0, slot_num: 4, plyr_id: 4, 	points: '000',	last_mv: '---', plyr_stat_cd: 'N'},
      {gm_id: 0, slot_num: 5, plyr_id: 5, 	points: '000',	last_mv: '---', plyr_stat_cd: 'N'},
    ],

    gmBrd2: [
      {gm_id: 0,	row_wrd: '',	gm_row_id: 1,	is_lst_wrd: 0, ltr_json: [['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1]] },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 2,	is_lst_wrd: 0, ltr_json: [['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1]] },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 3,	is_lst_wrd: 0, ltr_json: [['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1]] },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 4,	is_lst_wrd: 0, ltr_json: [['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1]] },
      {gm_id: 0,	row_wrd: '',	gm_row_id: 5,	is_lst_wrd: 0, ltr_json: [['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1],['',1]] },
    ],

    debug: ''
  }
};
