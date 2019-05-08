import t from 't'
import prettyBytes from 'pretty-bytes'

export const size = (num=0)=>{
    return prettyBytes(num, {locale: t.locale})
}