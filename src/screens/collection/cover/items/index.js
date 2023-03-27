import { useMemo, useRef } from 'react';
import Shadow from 'co/list/helpers/shadow'
import { getListViewParams } from 'modules/view'

import { itemHeight } from '../config'
import { Wrap, Grid } from './style.js'
import Item from '../item'
import Empty from './empty'

export default function CollectionCoverItems({ items, onSelect }) {
    const data = useMemo(()=>{
        let data=[]

        for(const { icons } of items)
            data.push(...icons)

        if (data.length)
            data.unshift({ png: '' })

        return data
    }, [items])

    const keyExtractor = useRef(({png})=>png).current

    const getItemLayout = useRef((data, index) => ({
        length: itemHeight, offset: itemHeight * index, index
    })).current

    const renderItem = useRef(({ item })=>(
        <Item 
            {...item}
            onSelect={onSelect} />
    )).current

    return (
        <Wrap>
            <Shadow>{onScroll=>
                <Grid
                    //columns
                    numColumns={5}

                    //items
                    data={data}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    ListEmptyComponent={Empty}

                    //optimizations
                    {...getListViewParams(itemHeight)}
                    getItemLayout={getItemLayout}
                    
                    onScroll={onScroll} />
            }</Shadow>
        </Wrap>
    )
}