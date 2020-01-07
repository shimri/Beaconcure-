const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const util = require('util');
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);


/* GETTERS */
router.get('/get_all_files_names', async (req, res, next) => {
    try {
        const files = await readDir(process.cwd() + '/files')
        return res.status(200).json(files)
    } catch (error) {
        return res.status(400).json(`Requst failed.`)
    }
});

router.get('/get_file_tables_by_name', async (req, res, next) => {
    try {
        const fileName = req.query.file_name
        const filesDir = `/../files/${fileName}`

        const file = await readFile(path.normalize(__dirname + filesDir))
        let fileData = file.toString();
        fileData = JSON.parse(fileData)
        
        return res.status(200).json(fileData)
    } catch (error) {
        return res.status(400).json(`Requst failed.`)
    }
});

module.exports = router;
