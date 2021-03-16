var Parser = function() {};

function getMeta() {
    const elem = document.querySelector(
        [...arguments]
            .map(key=>`meta[name="${key}"], meta[property="${key}"]`)
            .join(', ')
    )
    if (!elem) return null

    const value = elem.value || elem.content
    return String(value).trim().substr(0, 10000)
}

function similarURL(url) {
    const { pathname, search } = new URL(url)
    if (search && search != location.search)
        return false
    if (pathname != location.pathname)
        return false
    return true
}

function getItem() {
    const original = getMeta('twitter:url', 'og:url')
    const ajax = (window.history.state && window.history.length>1)

    if ((original && !similarURL(original)) ||
        (!original && ajax))
        throw new Error(`probably this page is SPA, so data can be out of date: ${original} != ${location.href} or ajax:${ajax?'yes':'no'}`)

    const item = {
        link: location.href,
        title: getMeta('twitter:title', 'og:key') || getMeta('title') || document.title,
        excerpt: getMeta('twitter:description', 'og:description') || getMeta('description'),
        cover: getMeta('twitter:image', 'og:image'),
        coverId: 0
    }

    if (item.cover)
        item.media = [{
            type: 'image',
            link: item.cover
        }]

    //remove empty keys
    for(const i in item)
        if(!item[i])
            delete item[i]

    //validate cover url
    if (item.cover)
        try{
            new URL(item.cover)
        } catch(e) {
            delete item.cover
        }

    return item
}
 
Parser.prototype = {
    run: function(arguments) {
        let item = {
            link: location.href,
            title: document.title
        }

        try{
            item = getItem()
        } catch(e) {
            console.log(e)
        }

        arguments.completionFunction(item)
    }
}
 
var ExtensionPreprocessingJS = new Parser;

//ExtensionPreprocessingJS.run({completionFunction: console.log})