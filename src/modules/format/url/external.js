export default async function external(link) {
    if (!link.includes('raindrop.io'))
        return link

    const res = await fetch(link, {
        method: 'HEAD',
        credentials: 'include',
    })
    return res.url
}