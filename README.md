<h1  align="center">Bonsai Exchange👋</h1>

<p>
<img  src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"  />
</p>

![Screenshot from 2020-09-04 08-35-32](https://user-images.githubusercontent.com/52224456/92189756-b1d9e980-ee89-11ea-8469-a2b52636cbd7.png)

## Bonsai Exchange Dapp

This demonstrates the three important parts of a dapp and how they should be connected:

1.  the browser UI (ReactJS + Redux)
2.  ICON SDK for JavaScript
3.  SCORE (Python)

ICON Token Standard have used by app

1. BonSai (IRC-3): Each Bonsai has id unique, name and price.
2. Oxygen (IRC-2): Generate when user plant bonsai, use buy Bonsai.

## Functionality

Bonsai Exchange :

1.  Buy plants from stock
2.  Planting trees in the collection.

Future :

1.  The contract has the ability to update properties such as the life of a plant, which will display other forms of the plant such as sprouting, flowering, and fruiting.

![growing](https://user-images.githubusercontent.com/52224456/92190568-b43d4300-ee8b-11ea-8699-3ce18938ed26.png)

2.  It is possible to resell the trees you have planted

## How to play

**If you are beginer, you would go a tour with app**
![Screenshot from 2020-09-04 08-11-09](https://user-images.githubusercontent.com/52224456/92190970-a76d1f00-ee8c-11ea-96eb-307b7adc9f47.png)

**You would be received 30 Oxygen to buy first Bonsai**
![Screenshot from 2020-09-04 08-11-23](https://user-images.githubusercontent.com/52224456/92190981-b358e100-ee8c-11ea-86ea-5384460452dc.png)

**Let's buy**
![Screenshot from 2020-09-04 08-12-45](https://user-images.githubusercontent.com/52224456/92191017-ccfa2880-ee8c-11ea-8056-1347aa256115.png)

![Screenshot from 2020-09-04 08-16-53](https://user-images.githubusercontent.com/52224456/92190930-8dcbd780-ee8c-11ea-83ba-b182dfe9543e.png)

**Sign transaction with ICONex extension**
![Screenshot from 2020-09-04 08-18-43](https://user-images.githubusercontent.com/52224456/92192192-a7225300-ee8f-11ea-91bb-856b127467c8.png)

**Tada !**
![Screenshot from 2020-09-04 08-19-29](https://user-images.githubusercontent.com/52224456/92191059-e9966080-ee8c-11ea-9b4b-1269b4a5e45b.png)

## Setup Environment

```bash
./start.sh
```

```bash
mkdir keystores
```

## Deployment to local tbears instance

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
tbears deploy bonsai -k keystores/keystore1.json -c config/deploy_bonsai_testnet.json
```

### Deploy Oxygen Contract

```bash
tbears deploy oxygen -k keystores/keystore1.json -c config/deploy_oxygen_testnet.json
```

### Update Bonsai contract

```bash
tbears deploy bonsai -m update -o [address contract] -k keystores/keystore2.json -c config/deploy_bonsai_testnet.json
```

### Check transaction

```bash
tbears txresult <txhash> -c config/depoy_bonsai_testnet.json
```

**Testnet tracker**: https://bicon.tracker.solidwallet.io/ put the score address
