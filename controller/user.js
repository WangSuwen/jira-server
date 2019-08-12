
const UserModel = require('../model/index').getModel('user');
// const mongoConnection = require('../model/index').mongoConnection;
const mongoose = require('mongoose');
const mongoSession = mongoose.startSession(/* { readPreference: { mode: "primary" } } */);
exports.save = function (req, res) {
    mongoSession.then((_session) => {
        _session.startTransaction({
            readConcern: { level: "snapshot" },
            writeConcern: { w: "majority" }
        });
        UserModel.create([{
            name: '王五',
            age: 12
        }], { session: _session }).then((err, saved) => {
            _session.commitTransaction();
            // _session.abortTransaction();
            _session.endSession();
            res.json(saved);
        }).catch(e => {
            console.error(e);
            res.json(e)
        });
    });
};