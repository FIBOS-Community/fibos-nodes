const fibos = require('fibos');
const fs = require("fs");
const config = require('./config');
console.notice("start FIBOS producer node");
const p2paddress = require('./p2p.json');
let keys = "";

while (true) {
	keys = console.readLine("input the  produce-rname:public-key:private-key! oooo:xxxxx:xxxx\n");
	if (keys) break;
}


let public_key = "";
let private_key = "";
keys = keys.split(":");
producername = keys[0];
public_key = keys[1];
private_key = keys[2];

fibos.config_dir = config.config_dir;
fibos.data_dir = config.data_dir;

let chain_config = {
	"contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024,
	// "delete-all-blocks": true
};

if (!fs.exists(fibos.data_dir) && !fs.exists(fibos.config_dir)) {
	chain_config['genesis-json'] = "genesis.json";
}


console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
	"http-server-address": "0.0.0.0:8870",
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true
});

fibos.load("net", {
	"max-clients": 100,
	"p2p-peer-address": p2paddress,
	"p2p-listen-endpoint": "0.0.0.0:9870",
	"agent-name": "FIBOS Bp"
});

fibos.load("producer", {
	'producer-name': producername,
	// 'enable-stale-production': true,
	'private-key': JSON.stringify([public_key, private_key])
});


fibos.load("chain", chain_config);
fibos.load("chain_api");

fibos.start();