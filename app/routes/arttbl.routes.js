module.exports = app =>{
    const arttbl = require("../controllers/arttbl.controller.js");

    // 튜플 생성
    app.post("/arttbl", arttbl.create);

    // 전체 조회 
    app.get("/arttbl", arttbl.findAll);

    // id로 조회
    app.get("/arttbl/:arttblId", arttbl.findOne);

    // id로 수정
    app.put("/arttbl/:arttblId", arttbl.update);

    // id로 삭제
    app.delete("/arttbl/:arttblId", arttbl.delete);

    // 전체 삭제
    app.delete("/arttbl", arttbl.deleteAll);

};