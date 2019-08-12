var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * 系统家具的隔层模板
 */
exports.schema = new Schema({
    name : String, //模板名称
    age           : {type: Number , default: 0} ,
    created_at    : {type: Date , default: Date.now} ,
    updated_at    : {type: Date , default: Date.now} ,
    deleted_at    : {type: Date , default: null}
});