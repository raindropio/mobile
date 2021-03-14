var Parser = function() {};

function getOg(key){
    const elem = document.querySelector(`meta[property="twitter:${key}"], meta[name="twitter:${key}"], meta[property="og:${key}"], meta[name="og:${key}"]`)
    if (!elem) return null
    return elem.value || elem.content || null
}

function getMeta(key) {
    const elem = document.querySelector(`meta[name="${key}"], meta[property="${key}"]`)
    if (!elem) return null
    return elem.value || elem.content || null
}

function getItem() {
    const item = {
        link: location.href,
        title: getOg('title') || document.title,
        excerpt: getOg('description') || getMeta('description'),
        cover: getOg('image')
    }

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