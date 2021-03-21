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
        
        return humanizeString(part)
    }catch(e){
        console.log(e)
        return ''
    }
}