import url from './url'
import file from './file'

//[status, items, error]
export default function useSave(type, values) {
    switch(type) {
        case 'url':     return url(values)
        case 'file':    return file(values)
        default:        return ['error', [], new Error('unsupported format')]
    }
}