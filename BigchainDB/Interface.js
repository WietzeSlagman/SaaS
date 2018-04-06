const driver = require('bigchaindb-driver')

const DB_ENDPOINT = '192.168.169.44:9984/api/v1/'

class BigChainDBInterface {
    constructor() {
        this.conn = new driver.Connection(DB_ENDPOINT)
    }

    createKeyPair() {
        return new driver.Ed25519Keypair()
    }


    makeSignedTx(assetdata, metadata, keypair) {
        let tx = driver.Transaction.makeCreateTransaction(
            assetdata,
            metadata,
            [
                driver.Transaction.makeOutput(
                    driver.Transaction.makeEd25519Condition(keypair.publicKey)
                )
            ],
            keypair.publicKey
        )

        return driver.Transaction.signTransaction(tx, keypair.privateKey)
    }

    postTransaction(signedTx) {
        return new Promise(function(resolve, reject) {
            this.conn.postTransaction(signedTx)
                .then(() => this.conn.pollStatusAndFetchTransaction(signedTx.id))
                .then(retrievedTx => resolve)
        });
    }
}

module.exports = new BigChainDBInterface
// export default const bla = new BigChainDBInterface
