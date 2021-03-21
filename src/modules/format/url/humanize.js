const humanizeString = require('humanize-string')
const _ = require('lodash-es')

export default function(url) {
    if (!url)
        return ''

    try{
        const { pathname, host } = new URL(url)
        const site = host.replace('www.', '').replace(/\..*/, '')
        const temp = ((`${site}${pathname}`).replace(/\?.+/g, '')).split('/').filter(p=>p)
        const part = _.last(temp).replace(/\..*/, '')

        //last part is number, in this case send just site name
        if (!isNaN(part))
            return humanizeString(site)
        
        let humanized = humanizeString(part)
            .replace(/^\d{3,}|\d{3,}$/g, '') //remove numbers at the beginning and end
            .trim()

        //uppercase first char
        return humanized.charAt(0).toUpperCase() + humanized.slice(1)
    }catch(e){
        console.log(e)
        return ''
    }
}