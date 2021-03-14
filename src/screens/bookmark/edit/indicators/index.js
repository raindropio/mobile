import React from 'react'
import Removed from './removed'
import Broken from './broken'
import Duplicate from './duplicate'

export default function BookmarkEditIndicators(props) {
    if (props.status == 'new')
        return null

    return (
        <>
            <Removed {...props} />
            <Broken {...props} />
            <Duplicate {...props} />
        </>
    )
}