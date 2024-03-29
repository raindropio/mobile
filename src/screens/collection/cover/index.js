import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { load } from 'data/actions/covers'

import { Wrap } from './style'
import Field from './field'
import Items from './items'

function CollectionCovers({ route: { params=[] }, navigation }) {
    const dispatch = useDispatch()
    const { query, items } = useSelector(state=>state.covers)

    //search
    const onSearch = useCallback(query=>{
        dispatch(load(query))
    }, [dispatch])

    //selection
    const onSelect = useCallback(cover=>{
        params.onChange && params.onChange({ cover: [ cover ] })
        navigation.goBack()
    }, [])

    //load on first open
    useEffect(()=>{
        onSearch(query)
    }, [])

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