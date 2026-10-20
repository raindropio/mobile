import Button from 'co/button'
import useQuery from '../useQuery'

export default function SpaceSearchHeaderMenu({ route: { params }, navigation, inputRef }) {
    const { query, wait, setQuery } = useQuery(params, navigation)

    const onPress = ()=>{
        setQuery(wait ? query : query.trim()+' ', !wait)

        if (inputRef && inputRef.current)
            inputRef.current.focus()
    }

    if (!query) return null

    return (
        <Button
            icon='equalizer'
            color={wait ? 'color.accent' : 'text.secondary'}
            variant={wait ? 'fill' : 'line'}
            onPress={onPress} />
    )
}