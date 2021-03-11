import url from './url'
import file from './file'

//[status, items, error]
export default function useSave(type, values, options) {
    switch(type) {
        case 'url':     return url(values, options)
        case 'file':    return file(values, options)
        default:        return ['error', [], new Error('unsupported format')]
    }
}