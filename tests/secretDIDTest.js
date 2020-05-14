'use strict';

require("../../../psknode/bundles/testsRuntime");
const SecretDID = require('../lib/DID/SecretDID');
const ZKDID = require('../lib/DID/ZKDID');

const dc = require("double-check");
const assert = dc.assert;


assert.callback('SecretDID Test', (done) => {
    const did = new SecretDID({
        dlDomain: 'local',
        favouriteEndpoint: 'http://localhost:8080'
    });

    const didUrl = did.toUrl();
    assert.true(typeof didUrl === 'string', 'DID url is string');
    assert.true(didUrl.length > 0, 'DID url is not empty');
    assert.true(didUrl.startsWith('did:sa:local'), 'DID url has the correct prefix');
    assert.true(didUrl.endsWith('#http://localhost:8080'), 'DID url has favourite endpoint');

    assert.true(did.getDLDomain() === 'local', 'DID has the correct DLDomain');
    assert.true(did.getFavouriteEndpoint() === 'http://localhost:8080', 'DID has the favourite endpoint');
    assert.true(did.getKey() instanceof Buffer, 'DID has generated a key');
    assert.true(did.getKey().length === did.KEY_LENGTH, 'DID key has the correct length');
    assert.true(did.getAnchorAlias().length > 0, 'DID has an anchor alias');

    assert.true(did.getZKDID() instanceof ZKDID, 'DID returns a ZKDID');


    const didFromUrl = new SecretDID(didUrl);
    assert.true(didFromUrl.getDLDomain() === did.getDLDomain(), 'Restored DID has correct DLDomain');
    assert.true(didFromUrl.getFavouriteEndpoint() === did.getFavouriteEndpoint(), 'Restored DID has correct favourite endpoint');
    assert.true(didFromUrl.getKey().toString('hex') === did.getKey().toString('hex'), 'Restored DID has correct key');
    assert.true(didFromUrl.getAnchorAlias() === did.getAnchorAlias(), 'Restored DID has correct anchor alias');
    done();
})