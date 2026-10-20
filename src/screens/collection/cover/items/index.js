import { getListViewParams } from 'modules/view'

import { itemHeight } from '../config'
import { Wrap, Grid } from './style.js'
import Item from '../item'
import Empty from './empty'

const keyExtractor = ({ png })=>png

const getItemLayout = (data, index)=>({
    length: itemHeight, offset: itemHeight * index, index
})

export default function CollectionCoverItems({ items, onSelect }) {
    let data = []

    for(const { icons } of items)
        data.push(...icons)

    if (data.length)
        data.unshift({ png: '' })

    const renderItem = ({ item })=>(
        <Item 
            {...item}
            onSelect={onSelect} />
    )

    return (
        <Wrap>
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
                getItemLayout={getItemLayout} />
        </Wrap>
    )
}