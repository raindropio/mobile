import React from 'react'
import Removed from './removed'
import Broken from './broken'
import Duplicate from './duplicate'

export default function BookmarkEditIndicators(props) {
    return (
        <>
            <Removed {...props} />
            <Broken {...props} />
            <Duplicate {...props} />
        </>
    )
}