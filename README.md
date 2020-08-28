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
tbears deploy bonsai -k keystores/keystore_test1.json -c config/deploy_bonsai_local.json
```

### Deploy SunCoin Contract

```bash
tbears deploy suncoin -k keystores/keystore_test1.json -c config/deploy_oxygen_local.json
```

### Check result transaction

```bash
tbears txresult [txHASH]
```

Copy the **scoreAddress** from the result

## Deployment to testnet

### Faucet ICX testnet

- [https://faucet.sharpn.tech](https://faucet.sharpn.tech/)
- [http://icon-faucet.ibriz.ai](http://icon-faucet.ibriz.ai/)
- [https://faucet.reliantnode.com/](https://faucet.reliantnode.com/)

### Deploy Bonsai Contract

```bash
tbears deploy bonsai -k keystores/keystore1.json -c config/depoy_bonsai_testnet.json
```

### Deploy SunCoin Contract

```bash
tbears deploy suncoin -k keystores/keystore1.json -c config/deploy_oxygen_testnet.json
```

### Update Bonsai contract

```bash
tbears deploy bonsai -m update -o [address contract] -k keystores/keystore2.json -c config/depoy_bonsai_testnet.json
```

### Check transaction

```bash
tbears txresult <txhash> -c config/depoy_bonsai_testnet.json
```

**Testnet tracker**: https://bicon.tracker.solidwallet.io/ put the score address
