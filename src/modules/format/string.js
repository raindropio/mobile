import _ from 'lodash-es'

export const cleanDomain = _.memoize((domain)=>{
	try{
        var temp = domain.split('.'), maxSize = 2;
        if (temp.length>maxSize){
            if ((temp[ temp.length-2 ] == 'org')||(temp[ temp.length-2 ] == 'net')||(temp[ temp.length-2 ] == 'com')||(temp[ temp.length-2 ] == 'co'))
                maxSize = 3;

            temp.splice(0, temp.length-maxSize );
            domain = temp.join('.');
        }
    }catch(e){console.log(e)}

    return domain;
})

export const compactNumber = (s=0)=>{
    try{
        return Math.abs(s) > 999 ? Math.sign(s)*((Math.abs(s)/1000).toFixed(1)) + 'k' : Math.sign(s)*Math.abs(s)
    }catch(e){
        return s
    }
}