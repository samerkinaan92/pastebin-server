const PasteModle = require('../models/pasteModel');
const dbClient = require('../dbClient');
const crypto = require('crypto');

async function createPaste(req, res) {
    try {
        const hash = getPasteHash(req.body);
        let paste = await getPaste(hash);
        if (!paste) {
            console.log('Hash not found, creating a new paste');
            await dbClient.connect();
            paste = new PasteModle({pasteValue: req.body, hash});
            await paste.save();
            console.log('New paste was created sucssefully');
        } else {
            console.log('Hash already exists, sending existing one');
        }
        res.send(hash);
    } catch(err) {
        console.err('Error while creating a new hash', err);
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
    }
}

async function getPasteByHash(req, res) {
    try {
        const paste = await getPaste(req.params.hash);
        if (!paste) {
            console.log('Hash was not found');
            res.status(404).send("Paste not found");
        } else {
            console.log('Hash was found, send paste');
            res.send(paste);
        }
    } catch(err) {
        res.status(500).send(err);
    }
}

async function deletePasteByHash(req, res) {
    try {
        console.log(`Delete request was sent for hash: ${req.params.hash}`);
        await dbClient.connect();
        await PasteModle.deleteOne({hash: req.params.hash});
        res.status(204).send();
        console.log(`${req.params.hash} was deleted sucssfully`);
    } catch(err) {
        console.err('Error while deleting paste', err);
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
    }
}

async function getPaste(hash) {
    try {
        await dbClient.connect();
        const paste = await PasteModle.findOne({hash});
        return paste;
    } finally {
        await dbClient.disconnect();
    }
}

function getPasteHash(pasteValue) {
    return crypto.createHash('md5').update(pasteValue).digest('hex');
}

module.exports = {createPaste, getPasteByHash, deletePasteByHash};