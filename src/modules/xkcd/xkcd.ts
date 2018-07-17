const request = require('request-promise-native')

export default class XKCD {
    xkcdId: string
    constructor(xkcdId: string) {
        this.xkcdId = xkcdId
    }
    
    async getXKCDJson() {
        try {
            let result = await request({uri: "http://dynamic.xkcd.com/api-0/jsonp/comic/" + this.xkcdId, json: true})
            return result
        }
        catch(e) {
            return null
        }
    }

    async exists() {
        let xkcdJson = await this.getXKCDJson()
        if (!xkcdJson) return false
        return true
    }
}