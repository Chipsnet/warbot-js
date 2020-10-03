const loki = require('lokijs')

module.exports = class {
    constructor(log) {
        this.log = log
        this.db = new loki('genkai.db', {autosave: true, autoload: true})
        this.odai = this.db.addCollection('odai')
        this.odai.insert({id: "HEROOO"})
        this.odai = this.db.addCollection('odai')

        console.log(this.odai);
    }

    addOdai() {

    }
}