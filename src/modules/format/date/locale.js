import t from 't'

let _cache = {}
const localCodes = {
    'pt_BR': 'ptBR',
    'zh-Hans': 'zhCN',
    'zh-Hant': 'zhTW'
}

const obj = {
    get locale() {
        if (typeof _cache[t.locale] == 'undefined')
            _cache[t.locale] = require('date-fns/locale')[localCodes[t.locale]||t.locale] || null

        return _cache[t.locale]
    }
}
const locale = obj.locale

export {
    locale
}