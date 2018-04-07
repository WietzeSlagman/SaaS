const driver = require('bigchaindb-driver');
const WebSocket = require("ws")
const request = require('request');

const DB_ENDPOINT = require("./const.js").ws

const ws = new WebSocket("ws://" + DB_ENDPOINT + "streams/valid_transactions")

ws.on("message", (data) => {
    data = JSON.parse(data)

    // var tx = data["transaction_id"]

    // request(`http://${DB_ENDPOINT}transaction/${tx}`, (err, response, body) => {
    //     data = JSON.parse(body)
    //     console.log(data);
    //
    //     // var type = data["meta"]["data"][""]
    // })
})
