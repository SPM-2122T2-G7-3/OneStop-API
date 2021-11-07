const express = require('express');
const router = express.Router();

const FileService = require('../services/FileService');


router.get('/:filename', (req, res, next) => {
    const filename = req.params.filename;

    FileService.downloadFile(filename)
        .then(readstream => {
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            readstream.pipe(res);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


module.exports = router;