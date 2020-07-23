const KeySSIMixin = require("../KeySSIMixin");
const ZaSSI = require("./ZaSSI");
const SSITypes = require("../SSITypes");

function PublicSSI(identifier) {
    Object.assign(this, KeySSIMixin);

    if (typeof identifier !== "undefined") {
        this.autoLoad(identifier);
    }

    this.derive = () => {
        const zaSSI = ZaSSI.createZaSSI();
        const subtypeKey = this.cryptoRegistry.getHashFunction(this.vn)(this.subtypeSpecificString)
        zaSSI.initialize(SSITypes.ZERO_ACCESS_SSI, this.dlDomain, subtypeKey, this.control, this.vn, this.hint);
        return zaSSI;
    };
}

function createPublicSSI(identifier) {
    return new PublicSSI(identifier);
}

module.exports = {
    createPublicSSI
};