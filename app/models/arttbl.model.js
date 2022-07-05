const sql = require("./db.js");

// 생성자 
const Arttbl = function(arttbl){
    this.FILE = arttbl.FILE;
    this.AUTHOR = arttbl.AUTHOR;
    this.TITLE = arttbl.TITLE;
};

// customer 튜플 추가 
Arttbl.create = (newArttbl, result)=>{
    sql.query("INSERT INTO artdb.arttbl SET ?", newArttbl, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created arttbl: ",{id:res.inseertId, ...newArttbl });
        result(null, {id: res.inseertId, ...newArttbl});
    });
};

// customer id로 조회
Arttbl.findById = (arttblId, result) => {
    sql.query(`SELECT * FROM artdb.arttbl WHERE ID = ${arttblId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found arttbl: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

// customer 전체 조회
Arttbl.getAll = result =>{
    sql.query('SELECT * FROM artdb.arttbl', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("arttbl: ", res);
        result(null, res);
    });
};

// customer id로 수정
Arttbl.updateById = (ID, arttbl, result) => {
    sql.query(
      "UPDATE artdb.arttbl SET FILE = ?, AUTHOR = ?, TITLE = ? WHERE ID = ?",
      [arttbl.FILE, arttbl.AUTHOR, arttbl.TITLE, ID],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated arttbl: ", { ID: ID, ...arttbl });
        result(null, { ID: ID, ...arttbl });
      }
    );
  };

// customer id로 삭제
Arttbl.remove = (ID, result)=>{
    sql.query('DELETE FROM artdb.arttbl WHERE ID = ?',ID, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted arttbl with id: ", ID);
        result(null, res);
    });
};

// customer 전체 삭제
Arttbl.removeAll = result =>{
    sql.query('DELETE FROM artdb.arttbl',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} arttbl`);
        result(null, res);
    });
};

module.exports = Arttbl;