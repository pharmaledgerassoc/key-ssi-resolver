const KeySSIMixin = require("../KeySSIMixin");
const SZaSSI = require("./SZaSSI");
const SSITypes = require("../SSITypes");

function SReadSSI(identifier) {
    Object.assign(this, KeySSIMixin);

    if (typeof identifier !== "undefined") {
        this.autoLoad(identifier);
    }

    this.initialize = (dlDomain, vn, hint) => {
        this.dlDomain = dlDomain;
        this.vn = vn || "v0";
        this.hint = hint;
    };

    this.derive = () => {
        const sZaSSI = SZaSSI.createSZaSSI();
        const subtypeKey = '';
        const subtypeControl = this.cryptoRegistry.getHashFunction(this.vn)(this.control);
        sZaSSI.load(SSITypes.SZERO_ACCESS_SSI, this.dlDomain, subtypeKey, subtypeControl, this.vn, this.hint);
        return sZaSSI;
    };
}

function createSReadSSI(identifier) {
    return new SReadSSI(identifier)
}

module.exports = {
    createSReadSSI
};