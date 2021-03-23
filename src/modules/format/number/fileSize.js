export function fileSize(_val=0) {
    if (!_val)
        return 0

    let style = '', val = parseInt(_val)
    if (val < 1000){
        style = 'byte'
    }
    if (val < 1000000){
        style = 'kilobyte'
        val = val / 1000
    }
    else if (val < 1000000000){
        style = 'megabyte'
        val = val / 1000000
    }
    else{
        style = 'gigabyte'
        val = val / 1000000000
    }

    return parseInt(val) + 
        (style[0]!='b' ? ' '+style[0].toUpperCase()+'b' : '') //for non bytes show kb,mb,gb...
}