import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { load } from 'data/actions/covers'

import { Wrap } from './style'
import Field from './field'
import Items from './items'

function CollectionCovers({ route: { params={} }, navigation }) {
    const dispatch = useDispatch()
    const { query, items } = useSelector(state=>state.covers)

    //search
    const onSearch = query=>{
        dispatch(load(query))
    }

    //selection
    const onSelect = cover=>{
        params.onChange && params.onChange({ cover: [ cover ] })
        navigation.goBack()
    }

    //load on first open
    const initialQuery = useRef(query)
    useEffect(()=>{
        dispatch(load(initialQuery.current))
    }, [dispatch])

    return (
        <Wrap>
            <Field
                query={query}
                onSearch={onSearch} />

            <Items
                items={items}
                onSelect={onSelect} />
        </Wrap>
    )
}

CollectionCovers.options = {
    animation: 'fade',
    title: t.s('icon')
}

CollectionCovers.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            onChange: PropTypes.func
        })
    })
}

export default CollectionCovers