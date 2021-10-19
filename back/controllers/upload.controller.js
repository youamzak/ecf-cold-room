const fs = require("fs");

const moveFile = (oldFile, newFile) => {
  fs.rename(oldFile, newFile, (err, docs) => {
    if (!err) return "done";
    else return err.toString();
  });
};

module.exports.single = async (req, res) => {
    const path = `./uploads/${req.params.id}`;
    const fileName = req.file.filename;
    const fileNamePath = `./uploads/${fileName}`;

    fs.stat(path, (err, stats) => {
      //Control if the folder exists. Note : fs.exists is deprecated
      if (!stats) {
        fs.mkdir(path, (err, docs) => {
          if (!err) {
            moveFile(fileNamePath, `${path}/${fileName}`);
          } else res.status(400).json("File not uploded");
        });
      } else {
        moveFile(fileNamePath, `${path}/${fileName}`);
      }
    });  
};




