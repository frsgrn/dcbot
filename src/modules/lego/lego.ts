const urle = require('promised-url-exists')

export default class Lego {
    legosetId: string
    constructor(legosetId: string) {
        this.legosetId = legosetId
    }
 
    getImageUrl() {
        return "https://images.brickset.com/sets/images/" + this.legosetId + "-1" + ".jpg"
    }

    exists() {
        return urle(this.getImageUrl())
    }
}