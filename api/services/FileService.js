const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");


// Mongo Connection Details
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const connStr = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const conn = mongoose.createConnection(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

conn.once('open', () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "materials"
    });
});


const storage = new GridFsStorage({
    url: connStr,
    file: (req, file) => {
        console.log(file);
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }

                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    originalFilename: file.originalname,
                    filename: filename,
                    bucketName: "materials"
                };

                req.body["fileInfo"] = fileInfo;
                resolve(fileInfo);
            });
        });
    }
});


// GridFS Upload
const uploadFile = multer({
    storage
});


const downloadFile = (filename) => {
    return new Promise((resolve, reject) => {
        gfs.find({
            filename: filename
        })
            .toArray((err, files) => {
                if (err || files.length === 0) {
                    return reject(err);
                }

                const readstream = gfs.openDownloadStreamByName(filename);
                resolve(readstream);
            });
    });
}


const FileService = {
    uploadFile,
    downloadFile
}


module.exports = FileService;