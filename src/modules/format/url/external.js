const EXTERNAL_TIMEOUT = 10000

export default async function external(link) {
    if (!link.includes('raindrop.io'))
        return link

    const abort = new AbortController()
    const timer = setTimeout(()=>abort.abort(), EXTERNAL_TIMEOUT)

    try {
        const res = await fetch(link, {
            method: 'HEAD',
            credentials: 'include',
            signal: abort.signal
        })
        return res.url
    } finally {
        clearTimeout(timer)
    }
}