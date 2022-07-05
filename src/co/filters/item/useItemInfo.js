import React from 'react'
import _ from 'lodash-es'
import t from 't'
import { monthDate, shortDate } from 'modules/format/date'
import { compact } from 'modules/format/number'
import CollectionIcon from 'co/collections/item/icon'

const r = /^-?([\w.]+):|(#|❤️)/

export function getTypeIcon(type) {
    switch (type) {
        case 'audio': return 'file-music';
        case 'document': return 'file-text';
        default: return type
    }
}

export default function useItemInfo({ _id, query='', count, top, ...other }) {
    const [_q, key, tag] = query.match(r)||[]
    const token = other.date ? 'recent' : key || tag

    let icon = token
    let title = _id
    let info = compact(count)
    let color = _id

    //special
    switch(token) {
        case 'created':
            icon = 'calendar'
            if (top) 
                title = t.s('createdDate')
            else
                title = monthDate(_id)
        break

        case '#':
            icon = 'hashtag'
            color = 'tag'
            if (top)
                title = _.capitalize(t.s('tag'))
        break

        case 'notag':
            icon = 'hashtag'
            title = t.s('noTags')
        break

        case 'type':
            if (top){
                title = t.s(token)
                icon = 'file-text'
            } else {
                icon = getTypeIcon(_id)
                title = t.s(_id+'s')
            }
        break

        case '❤️':
        case 'important':
            title = t.s('favorites')
            icon = 'heart-3'
        break

        case 'broken':
            icon = 'ghost'
            title = t.s(token)+' '+t.s('links').toLowerCase()
        break

        case 'duplicate':
            icon = 'file-copy'
            title = t.s(token+'s')
        break

        case 'highlights':
            icon = 'markup'
            title = t.s('highlights')
        break

        case 'collection':
            title = other.title
            info = other.path
            icon = <CollectionIcon collectionId={_id} src={other.cover && other.cover[0]} />
        break

        case 'info':
            title = `${_.capitalize(t.s('in'))} ${t.s('title').toLowerCase()}/${t.s('description').toLowerCase()}`
            icon = 'sticky-note-2'
        break

        case 'link':
            title = _.capitalize(t.s('in')) + ' URL'
        break

        case 'match':
            title = t.s('searchMatchAnyCondition')
            icon = 'duplicates'
        break

        case 'recent':
            title = query
            icon = 'search'
            info = shortDate(other.date)
        break

        default:
            title = query
            info = ''
            icon = 'search'
        break
    }

    return { icon, title, info, token, color }
}