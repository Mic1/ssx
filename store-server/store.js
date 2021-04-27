const express = require("express");
const db = require("node-localdb");
const app = (module.exports = express.Router());
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;

const configSql = {
  userName: "connect1",
  password: "connect1",
  server: "192.168.0.100", //'localhost', //
  //server: 'localhost', //'localhost', //
  //domain: 'TBC',
  options: {
    //port: 4418,
    database: "LastWord",
    encrypt: false,
    rowCollectionOnDone: true,
    rowCollectionOnRequestCompletion: true,
  },
};

// const connection1 = new Connection(configSql);

/*************************************************/

app.get("/signin/:username/cp/:password/inf/:info", (req, res) => {
  //console.info('server:store:/login/:username/:username ', req.params);
  const username = JSON.parse(req.params.username);
  const password = JSON.parse(req.params.password);
  //console.info('jstring ', username, password);

  getSignin(req, function (err, rows) {
    if (err) {
      console.log("sql2/error: ", err);
    } else if (rows) {
      //console.log("IsRows: ");
      res.status(200).json(rows);
    } else {
      return res.status(500).json({
        error: "Login NOT FOUND!",
      });
    }
  });

  function getSignin(req, callback) {
    const connection = new Connection(configSql);
    let newdata = [];
    let dataset = [];
    //let rows = [];

    connection.on("connect", function () {
      const sql = "dbo.sel_login";
      const request = new Request(sql, function (err, rowCount) {
        if (err) {
          console.log("if err: ", err);
          callback(err);
        } else {
          if (dataset.length === 0) {
            // console.log("rc<1: ", dataset.length);
            callback(null, false);
          } else {
            // console.log("thereIsDatra: ", dataset);
            //retVal = JSON.stringify(dataset[0]); // 1 row returned
            let retVal = dataset; // array returned returned
            //console.log("REQUESTED: ", retVal);
            callback(null, retVal);
          }
        }

        connection.close();
      });

      request.on("doneProc", function (rowCount, more, returnStatus, rows) {
        //console.info("DONE $$$$$: ", rowCount, more, returnStatus, rows);
      });

      request.on("row", function (columns) {
        let row = {};
        columns.forEach(function (column) {
          row[column.metadata.colName] = column.value;
        });

        dataset.push(row);
        newdata.push(dataset);
      });

      // console.log('procParm: ', req.params.gmId, req.params.currPlyr );
      // GAME_ID must be passed into proc
      request.addParameter("plyr_nm", TYPES.VarChar, username);
      request.addParameter("plyrPwrd", TYPES.VarChar, password);
      // request.addParameter('plyr_3_sub_wrd', TYPES.VarChar, 'BAI');
      // request.addParameter('plyr_4_sub_wrd', TYPES.VarChar, 'BAI');
      // request.addParameter('plyr_5_sub_wrd', TYPES.VarChar, 'BAI');

      connection.callProcedure(request);
    });
  }
});

app.get("/playersels/", (req, res) => {
  //console.log('server:store:/playersels/');
  const id = req.params.id;

  getPlayerSels(req, function (err, rows) {
    if (err) {
      console.log("sql2/error: ", err);
    } else if (rows) {
      res.status(200).json(rows);
    } else {
      return res.status(500).json({
        error: "PlayerSels NOT FOUND!",
        id,
      });
    }
  });

  function getPlayerSels(req, callback) {
    const connection = new Connection(configSql);
    let newdata = [];
    let dataset = [];
    //let rows = [];

    connection.on("connect", function () {
      const sql = "select * from plyr_typ"; // need order by???
      const request = new Request(sql, function (err, rowCount) {
        if (err) {
          callback(err);
        } else {
          if (rowCount < 1) {
            callback(null, false);
          } else {
            //retVal = JSON.stringify(dataset[0]); // 1 row returned
            let retVal = dataset; // array returned returned
            //console.log("REQUESTED: ", retVal);
            callback(null, retVal);
          }
        }

        connection.close();
      });

      request.on("row", function (columns) {
        let row = {};
        columns.forEach(function (column) {
          row[column.metadata.colName] = column.value;
        });

        dataset.push(row);
        newdata.push(dataset);
      });

      connection.execSql(request);
    });
  }
});

app.get("/plyrmv/:gm_id/gri/:gm_row_id/nl/:nxt_ltr", (req, res) => {
  console.log(
    "plyrmv: ",
    req.params.gm_id,
    req.params.nxt_ltr,
    req.params.gm_row_id
  );
  const gm_id = req.params.gm_id;
  const nxt_ltr = req.params.nxt_ltr;
  const gm_row_id = req.params.gm_row_id;

  getPlyrMv(req, function (err, rows) {
    if (err) {
      console.log("sql2/error: ", err);
    } else if (rows) {
      //console.log("IsRows: ");
      res.status(200).json(rows);
    } else {
      return res.status(500).json({
        error: "plyrmv NOT FOUND!",
      });
    }
  });

  function getPlyrMv(req, callback) {
    const connection = new Connection(configSql);
    let d1 = 0;
    let set1 = [];
    let set2 = [];
    let set3 = [];

    connection.on("connect", function () {
      const sql = "dbo.sel_plyr_mv";
      const request = new Request(sql, function (err) {
        // console.log("Request Return: ", set1);

        if (err) {
          console.log("if err: ", err);
          callback(err);
        } else {
          if (set1.length === 0) {
            console.log("set1.length === 0", set1.length);
            callback(null, false);
          } else {
            let retVal = [set1, set2, set3];
            callback(null, retVal);
          }
        }

        connection.close();
      });

      request.on("doneInProc", function (rowCount, more, rows) {
        d1 = d1 + 1;
      });

      request.on("row", function (columns) {
        console.log("ROW DEBUG: ", d1);
        let row = {};
        columns.forEach(function (column) {
          ///console.info("COLUMN: ", column.metadata.colName);
          if (column.metadata.colName === "ltr_json") {
            ///row[column.metadata.colName] = column.value.substring(1, column.value.length - 1);
            row[column.metadata.colName] = JSON.parse(column.value);
          } /// else if(column.metadata.colName === 'secondset'){
          /// console.info("secondset: ", column.metadata.colName);
          /// }
          else {
            row[column.metadata.colName] = column.value;
          }
        });

        //dataset.push(row);
        if (d1 === 5) {
          //gm_brd
          set1.push(row);
          console.log("set1: ", row);
        } else if (d1 === 6) {
          // gm_slot
          set2.push(row);
        } else if (d1 === 7) {
          // nxt_plyr_id
          set3.push(row);
        }
        //newdata.push(dataset);
      });

      request.addParameter("gm_id", TYPES.Int, gm_id);
      request.addParameter("gm_row_id", TYPES.Int, gm_row_id);
      request.addParameter("nxt_ltr", TYPES.Char, nxt_ltr);
      // console.log('DEBUG request: ', request );
      connection.callProcedure(request);
    });
  }
});

app.get("/cmptrmv/:gmId/", (req, res) => {
  const c = JSON.parse(req.params.gmId);
  const a = c.gm_id;
  // const b = c.currPlyr;
  //let procFlag = 0;
  console.info("server:store:/cmptrmv/:gmId ", a);
  getCmptrMv(req, function (err, rows) {
    if (err) {
      console.log("sql2/error: ", err);
    } else if (rows) {
      //console.log("IsRows: ");
      res.status(200).json(rows);
    } else {
      return res.status(500).json({
        error: "CmptrMv NOT FOUND!",
      });
    }
  });

  function getCmptrMv(req, callback) {
    const connection = new Connection(configSql);
    // let newdata = [];
    // let dataset = [];
    let d1 = 0;
    let set1 = [];
    let set2 = [];
    let set3 = [];

    connection.on("connect", function () {
      const sql = "dbo.sel_cmptr_mv";
      const request = new Request(sql, function (err) {
        console.log("Request Return: ", set1);

        if (err) {
          console.log("if err: ", err);
          callback(err);
        } else {
          if (set1.length === 0) {
            console.log("set1.length === 0", set1.length);
            callback(null, false);
          } else {
            let retVal = [set1, set2, set3];
            callback(null, retVal);
          }
        }

        connection.close();
      });

      request.on("doneInProc", function (rowCount, more, rows) {
        d1 = d1 + 1;
      });

      request.on("row", function (columns) {
        console.log("ROW DEBUG: ", d1);
        let row = {};
        columns.forEach(function (column) {
          ///console.info("COLUMN: ", column.metadata.colName);
          if (column.metadata.colName === "ltr_json") {
            ///row[column.metadata.colName] = column.value.substring(1, column.value.length - 1);
            row[column.metadata.colName] = JSON.parse(column.value);
          } /// else if(column.metadata.colName === 'secondset'){
          /// console.info("secondset: ", column.metadata.colName);
          /// }
          else {
            row[column.metadata.colName] = column.value;
          }
        });

        //dataset.push(row);
        if (d1 === 3) {
          //gm_brd
          set1.push(row);
          console.log("set1: ", row);
        } else if (d1 === 4) {
          // gm_slot
          set2.push(row);
        } else if (d1 === 5) {
          // nxt_plyr_id
          set3.push(row);
        }
        //newdata.push(dataset);
      });

      // console.log('procParm: ', req.params.gmId, req.params.currPlyr );
      // GAME_ID must be passed into proc
      request.addParameter("gm_id", TYPES.Int, a);
      // request.addParameter('cur_plyr', TYPES.Int, b);
      // request.addParameter('plyr_3_sub_wrd', TYPES.VarChar, 'BAI');
      // request.addParameter('plyr_4_sub_wrd', TYPES.VarChar, 'BAI');
      // request.addParameter('plyr_5_sub_wrd', TYPES.VarChar, 'BAI');

      connection.callProcedure(request);
    });
  }
});

// numPlyrs, slotString, numRows
app.get("/initgm/:numPlyrs/cp/:slotStrng/cp2/:numRows", (req, res) => {
  console.log("server:store:/initgm/: ", req.params.numPlyrs);
  const p = JSON.parse(req.params.numPlyrs);
  // console.log('p: ', p.numPlyrs);

  getInitGm(req, function (err, rows) {
    if (err) {
      console.log("sql2/error: ", err);
    } else if (rows) {
      console.log("IsRows: ");
      res.status(200).json(rows);
    } else {
      return res.status(500).json({
        error: "InitGm NOT FOUND!",
      });
    }
  });

  function getInitGm(req, callback) {
    const connection = new Connection(configSql);
    // let newdata = [];
    let dataset = [];
    let d1 = 0;
    let set1 = [];
    let set2 = [];
    let set3 = [];

    connection.on("connect", function () {
      const sql = "dbo.init_gm";
      const request = new Request(sql, function (err, rowCount) {
        if (err) {
          console.log("if err: ", err);
          callback(err);
        } else {
          if (set1.length === 0) {
            console.log("set1.length === 0", set1.length);
            callback(null, false);
          } else {
            console.log("thereAreData: ", dataset);
            //retVal = JSON.stringify(dataset[0]); // 1 row returned
            let retVal = [set1, set2, set2];
            console.log("REQUESTED: ", retVal);
            callback(null, retVal);
          }
        }

        connection.close();
      });

      request.on("doneInProc", function (rowCount, more, rows) {
        d1 = d1 + 1;
      });

      request.on("row", function (columns) {
        console.log("ROW DEBUG: ", d1);
        let row = {};
        columns.forEach(function (column) {
          ///console.info("COLUMN: ", column.metadata.colName);
          if (column.metadata.colName === "ltr_json") {
            ///row[column.metadata.colName] = column.value.substring(1, column.value.length - 1);
            row[column.metadata.colName] = JSON.parse(column.value);
          } /// else if(column.metadata.colName === 'secondset'){
          /// console.info("secondset: ", column.metadata.colName);
          /// }
          else {
            row[column.metadata.colName] = column.value;
          }
        });

        //dataset.push(row);
        if (d1 === 2) {
          //gm_brd
          set1.push(row);
          console.log("set1: ", row);
        } else if (d1 === 3) {
          // gm_slot
          set2.push(row);
        } else if (d1 === 4) {
          // gm_slot
          set3.push(row);
        }
        //newdata.push(dataset);
      });

      request.addParameter("num_plyrs", TYPES.Int, p.numPlyrs);
      request.addParameter("slot_string", TYPES.VarChar, p.slotStrng); //'1,1|2,2|3,3|4,4|5,5'
      request.addParameter("num_rows", TYPES.Int, p.numRows);
      connection.callProcedure(request);
    });
  }
});

app.get("/gmbrd/", (req, res) => {
  console.log("server:store:/gmbrd/");

  getGmBrd(req, function (err, rows) {
    if (err) {
      console.log("sql2/error: ", err);
    } else if (rows) {
      console.log("IsRows: ");
      res.status(200).json(rows);
    } else {
      return res.status(500).json({
        error: "GmBrd NOT FOUND!",
      });
    }
  });

  function getGmBrd(req, callback) {
    const connection = new Connection(configSql);
    let newdata = [];
    let dataset = [];
    //let rows = [];

    var request = new Request(
      "dbo.sel_gm_brd",
      function onRequest(err, rowCount) {
        console.log("onRequest: ", err);
        if (err) {
          console.log("if err: ", err);
          callback(err);
        } else {
          if (dataset.length === 0) {
            console.log("rc<1: ", dataset.length);
            callback(null, false);
          } else {
            console.log("thereIsDatra: ", dataset);
            //retVal = JSON.stringify(dataset[0]); // 1 row returned
            let retVal = dataset; // array returned returned
            console.log("REQUESTED: ", retVal);
            callback(null, retVal);
          }
        }

        //connection.close();
      }
    );

    //request.addParameter('Id', TYPES.BigInt, 1);
    request.on("row", function onRow(columns) {
      console.log("onRow: ", columns);

      let row = {};
      columns.forEach(function (column) {
        row[column.metadata.colName] = column.value;
      });

      dataset.push(row);
      newdata.push(dataset);
      console.log("dataset: ", dataset);
      //connection.close();
    });
    // request.on('doneProc', function(rowcount, more, returnStatus, rows){
    //   console.log('doneProc: ', rowcount);
    // });
    connection.on("connect", function onConnect() {
      connection.callProcedure(request);
    });
  }
});

app.get("/gmbrd2/", (req, res) => {
  console.log("server:store:/gmbrd2/");
  const id = req.params.id;

  getGmBrd2(req, function (err, rows) {
    if (err) {
      console.log("sql2/error: ", err);
    } else if (rows) {
      res.status(200).json(rows);
    } else {
      return res.status(500).json({
        error: "PlayerSels NOT FOUND!",
        id,
      });
    }
  });

  function getGmBrd2(req, callback) {
    const connection = new Connection(configSql);
    let newdata = [];
    let dataset = [];
    //let rows = [];

    connection.on("connect", function () {
      const sql = "dbo.sel_gm_brd"; // need order by???
      const request = new Request(sql, function (err, rowCount) {
        if (err) {
          callback(err);
        } else {
          if (rowCount < 1) {
            callback(null, false);
          } else {
            //retVal = JSON.stringify(dataset[0]); // 1 row returned
            let retVal = dataset; // array returned returned
            console.log("REQUESTED: ", retVal);
            callback(null, retVal);
          }
        }

        //connection.close();
      });

      request.on("row", function (columns) {
        let row = {};
        columns.forEach(function (column) {
          row[column.metadata.colName] = column.value;
        });

        dataset.push(row);
        newdata.push(dataset);
      });

      connection.callProcedure(request);
    });
  }
});
