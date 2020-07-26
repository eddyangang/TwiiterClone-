// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(`${key} = '${value}'`);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    all: function (table, cb) {
        const queryString = "SELECT * FROM " + table;
        connection.query(queryString, (err, data) => {
            if (err) throw err;
            cb(data)
        })
    },

    create: function (table, cols, values, cb) {
        // const queryString = "INSERT INTO " + table + " (" + cols.toString() + ") " + "VALUES (" + printQuestionMarks(values.length) + ")"
        const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(values.length)})`

        connection.query(queryString, values, (err, data) => {
            if (err) throw err;
            cb(data)
        })
    },

    delete: function (table, condition, cb) {
        const queryString = `DELETE FROM ${table} WHERE ${condition}`;

        connection.query(queryString, (err, data) => {
            if (err) throw err;

            cb(data)
        })
    },

    update: function (table, updatedPost, condition, cb) {
        // const queryString = `UPDATE ${table} SET message = '${updatedPost.message}' WHERE (${condition});`;
        const queryString = `UPDATE ${table} SET ${objToSql(updatedPost)} WHERE (${condition});`
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results)
        })
    }
}
// // Export the orm object for the model.
module.exports = orm;