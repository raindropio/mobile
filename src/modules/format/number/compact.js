export function compact(val=0) {
    try{
        if (val>1000)
            return parseFloat(val/1000).toFixed(1)+'k'
    }catch(e){}

    return val
}