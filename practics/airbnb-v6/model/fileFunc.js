// i try for save file when user register a new home using multer i may built a save() but multer should be handle by middleware because its deals with request so multer use in a other file is not optimized
const path = require('path');
const fs = require('fs');

function deleteFile(fileUrl) {
    if(fileUrl.startsWith("http")){
        console.log("external link");
        return;
    }
    const oldFileName = path.basename(fileUrl);
    const oldFilePath = path.join(__dirname, '..', 'uploads', oldFileName);
    // fs.unlink(oldFilePath, (err) => {
    //     if(err) throw err;
    // });
    console.log(oldFileName);
    return fs.promises.unlink(oldFilePath); // makeing it async
};

module.exports = {deleteFile};