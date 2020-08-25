<h1 align="center">Bonsai Exchange👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

## Setup Environment

```bash
./start.sh
```

## Deployment to local tbears instance

### Run container

```bash
sudo chmod +x ./start.sh
./start.sh
```

### Deploy Bonsai Contract

```bash
tbears deploy bonsai -k keystores/keystore_test1.json -c config/tbears_cli_config.json
```

### Deploy SunCoin Contract

```bash
tbears deploy suncoin -k keystores/keystore_test1.json -c config/deploy_suncoin_local.json
```

note: use **test1_Account** as password

### Check result transaction

```bash
tbears txresult [txHASH]
```

Copy the **scoreAddress** from the result

### Edit file `testcmdline/send_set_treasury.json` to update **scoreAddress**

### Send 8 ICX to SCORE and check balance

```bash
tbears sendtx -k keystores/keystore_test1.json -c config/tbears_cli_config.json testcmdline/send_set_treasury.json
```

```bash
tbears balance [SCORE address]
```

### Update default_score in `/tbears/icon­dice­roll/webapp/main.py`

### Call fallback function in SCORE

Step 1: Edit to address by SCORE address

```bash
tbears sendtx -k keystores/keystore_test1.json -c config/tbears_cli_config.json testcmdline/send_bet.json
```

**Note**: Use key store of ICONex wallet

```bash
docker cp <file path> <container id>:/tbears/icon­dice roll/keystores/keystore1.json
```

## Deployment to testnet

### Faucet ICX testnet

- [https://faucet.sharpn.tech](https://faucet.sharpn.tech/)
- [http://icon-faucet.ibriz.ai](http://icon-faucet.ibriz.ai/)
- [https://faucet.reliantnode.com/](https://faucet.reliantnode.com/)

### Deploy Bonsai Contract

```bash
tbears deploy bonsai -f hxe9d75191906ccc604fc1e45a9f3c59fb856c215f -k keystores/keystore1.json -c config/tbears_cli_config_testnet.json
```

### Deploy SunCoin Contract

```bash
tbears deploy suncoin -f hxe9d75191906ccc604fc1e45a9f3c59fb856c215f -k keystores/keystore1.json -c config/deploy_suncoin_testnet.json
```

note: use **p@ssword1** as password

### Check transaction

```bash
tbears txresult txnhash -c config/tbears_cli_config_testnet.json
```

**Testnet tracker**: https://bicon.tracker.solidwallet.io/ put the score address
