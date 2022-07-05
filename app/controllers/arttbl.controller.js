const Arttbl = require("../models/arttbl.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const arttbl = new Arttbl({
        file: req.body.file,
        author: req.body.author,
        title: req.body.title
    });

    // 데이터베이스에 저장
    Arttbl.create(arttbl, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th Arttbl."
            });
        };
    })
};

// 전체 조회 
exports.findAll = (req,res)=>{
    Arttbl.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving arttbl."
          });
        else res.send(data);
      });
};

// id로 조회
exports.findOne = (req,res)=>{
    Arttbl.findById(req.params.arttblId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Arttbl with id ${req.params.arttblId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Arttbl with id " + req.params.arttblId
            });
          }
        } else res.send(data);
      });
};

// id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Arttbl.updateById(
    req.params.arttblId,
    new Arttbl(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Arttbl with id ${req.params.arttblId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Arttbl with id " + req.params.arttblId
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req,res)=>{
    Arttbl.remove(req.params.arttblId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Arttbl with id ${req.params.arttblId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Arttbl with id " + req.params.arttblId
            });
          }
        } else res.send({ message: `Arttbl was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
    Arttbl.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all arttbl."
          });
        else res.send({ message: `All Arttbl were deleted successfully!` });
      });
};