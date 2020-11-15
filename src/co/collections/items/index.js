import React from 'react'
import Shadow from 'co/list/helpers/shadow'
import { Wrap, Footer } from './style'
import Tree from './tree'

export default function CollectionsWrap(props) {
    return (
        <Wrap>
            <Shadow>{onScroll=>
                <Tree
                    {...props} 
                    onScroll={onScroll}
                    ListFooterComponent={Footer} />
            }</Shadow>
        </Wrap>
    )
}