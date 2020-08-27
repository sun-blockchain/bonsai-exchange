<h1 align="center">Bonsai Exchange👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

## Setup Environment

```bash
./start.sh
```

```bash
mkdir keystores
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
tbears deploy bonsai -k keystores/keystore1.json -c config/tbears_cli_config_testnet.json
```

### Deploy SunCoin Contract

```bash
tbears deploy suncoin -k keystores/keystore1.json -c config/deploy_suncoin_testnet.json
```

### Update Bonsai contract

```bash
tbears deploy bonsai -m update -o [address contract] -k keystores/keystore2.json -c config/tbears_cli_config_testnet.json
```

### Check transaction

```bash
tbears txresult txnhash -c config/tbears_cli_config_testnet.json
```

**Testnet tracker**: https://bicon.tracker.solidwallet.io/ put the score address
