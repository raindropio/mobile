import Immutable from 'seamless-immutable'
import { 
    APP_BASE_URL,
    THUMB_URL,
    SCREENSHOT_URL
} from '../constants/app'

export const normalizeURL = (s='')=>{
    try{s = s.trim();} catch(e) {if(e)s='';}

    if (s.indexOf('data:')==0)
        return ''

    if (s.indexOf('//')==0)
        return 'http:'+s;
    else if (s.indexOf('/')==0)
        return APP_BASE_URL+s;
    else
        return s;
}

export const normalizeDomain = (s='')=>{
    try{s = s.trim();} catch(e) {if(e)s='';}
    return s.replace(/^www\./, '')
}

export const getScreenshotURL = (url='', width=460)=>{
    const finalURL = normalizeURL(url)
    if (!finalURL)
        return ''

    return SCREENSHOT_URL+encodeURIComponent(finalURL)+`&width=${width}`
}

export const getThumbImgURL = (imgSrc='', width=230)=>{
    const finalURL = normalizeURL(imgSrc)
    if (!finalURL)
        return ''

    if (finalURL.includes('stella.raindrop.io'))
        return finalURL
    
    return THUMB_URL+encodeURIComponent(finalURL)+'&width='+width
}

export const getFavIcon = (domain='', width=50)=>{
    if (!domain)
        return ''

    return 'https://logo.clearbit.com/'+domain+'?size='+width
}

export const normalizeCoverURL = (cover, domain)=>{
    if (typeof cover == 'object')
        return cover

    return {
        'favicon': getFavIcon(domain, 60),
        'small': getThumbImgURL(cover, 100)||getFavIcon(domain, 100),
        'medium': getThumbImgURL(cover, 230)||getFavIcon(domain, 230),
        'big': getThumbImgURL(cover, 460)
    }
}

export const swapArrayElements = (a,x,y)=>{
    if (!a[x] || !a[y])
        return a

    return a.map((v, k) => {
        switch (k) {
            case x: return a[y];
            case y: return a[x];
            default: return v;
        }
    })
}

export const appendAfterArray = (a, val, index)=>{
    return [
        ...a.slice(0, index),
        val,
        ...a.slice(index)
    ]
}