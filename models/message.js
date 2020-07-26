var connection = require("../config/orm.js");
const orm = require("../config/orm.js");

var post = {

    all: function (cb) {
        orm.all("messages", (res) => {
            cb(res)
        })
    },

    create: function (cols, values, cb) {
        orm.create("messages", cols, values, (res) => {
            cb(res)
        });
    },

    delete: function (condition, cb) {
        orm.delete("messages", condition, function(res) {
            cb(res)
        })
    },

    update: function (updatedPost, condition, cb) {
        console.log(updatedPost);
        orm.update("messages", updatedPost, condition, (res) => {
            cb(res)
        })
    }
}


module.exports = post;