const fs = require('fs');
const path = require('path');
const { generateRandomString } = require('../helpers/commonHelper');

module.exports = {
    removeFile: (filePath) => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    },
    createDirectory : (dirname) => {
        const dirPath = `public/${dirname}`;
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
          console.log(`Directory '${dirPath}' created successfully.`);
        } else {
          console.log(`Directory '${dirPath}' already exists.`);
        }
        return dirPath;
      },
    uploadFile : (image, dir) => {
        let imageName = image.name;
        let imageNameSplit = imageName.split(".");
        let updatedName = "";
        let ext;
        for (let i = 0; i < imageNameSplit.length; i++) {
            let name = imageNameSplit[i];
            if (i == (imageNameSplit.length - 1)) {
                ext = name;
            } else {
                if (i == 0) {
                    updatedName = name;
                } else {
                    updatedName = updatedName + "-" + name;
                }
            }
        }
        imageName = updatedName + "-" + generateRandomString(5);
        imageName = imageName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + "." + ext;
        image.mv(dir + imageName, function (err) {
            if (err) {
                imageName = '';
            }
        });
    
        return imageName;
    },
    mkDirByPathSync: (targetDir, {isRelativeToScript = false} = {}) => {
        const sep = path.sep;
        const initDir = path.isAbsolute(targetDir) ? sep : '';
        const baseDir = isRelativeToScript ? __dirname : '.';
    
        return targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(baseDir, parentDir, childDir);
            try {
                fs.mkdirSync(curDir);
            } catch (err) {
                if (err.code === 'EEXIST') { // curDir already exists!
                    return curDir;
                }
    
                // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }
    
                const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && targetDir === curDir) {
                    throw err; // Throw if it's just the last created dir.
                }
            }
    
            return curDir;
        }, initDir);
    }

};