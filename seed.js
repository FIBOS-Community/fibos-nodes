const fibos = require('fibos');
const fs = require("fs");
const config = require('./config');
const p2paddress = require('./p2p.json');

console.notice("start FIBOS seed node");


fibos.config_dir = config.config_dir;
fibos.data_dir = config.data_dir;

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);


fibos.load("http", {
	"http-server-address": "0.0.0.0:8870",
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true //打开报错
});


fibos.load("net", {
	"p2p-peer-address": p2paddress,
	"max-clients": 100,
	"p2p-listen-endpoint": "0.0.0.0:9870",
	"agent-name": "FIBOS Seed"
});

let chain_config = {
	"contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024,
	// "delete-all-blocks": true
};

if (!fs.exists(fibos.data_dir) && !fs.exists(fibos.config_dir)) {
	chain_config['genesis-json'] = "genesis.json";
}


fibos.load("producer", {
	// 'enable-stale-production': true,
	'max-transaction-time': 3000
});

//1.7.1.4 for eth fox
fibos.load("ethash");

fibos.load("chain", chain_config);
fibos.load("chain_api");


fibos.start();