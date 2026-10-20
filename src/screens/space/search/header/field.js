import { Wrap } from './field.style'
import useQuery from '../useQuery'
import Search from 'co/form/search'

function SearchField({ route: { params }, navigation, inputRef }) {
    const { autoFocus=true } = params
    const { query, setQuery } = useQuery(params, navigation)

    //form events
    const onValueChange = value=>setQuery(value, true)
    const onValueSubmit = ()=>setQuery(query, false)

    //auto submit
    // const setQueryDebounced = useMemo(()=>
    //     _.debounce(setQuery, 350, { maxWait: 1000 }),
    //     [setQuery]
    // )

    // useEffect(()=>{
    //     setQueryDebounced.cancel()

    //     //ignore incomplete token
    //     if (query.endsWith(':'))
    //         return

    //     //submit later bounced
    //     setQueryDebounced(query, false)
    // }, [query, onValueSubmit, setQueryDebounced])

    return (
        <Wrap>
            <Search
                ref={inputRef}
                autoFocus={autoFocus}
                variant='head'
                value={query}
                onChange={onValueChange}
                onSubmit={onValueSubmit} />
        </Wrap>
    )
}

export default SearchField