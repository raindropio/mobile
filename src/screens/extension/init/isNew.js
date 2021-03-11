import useSave from 'screens/create/types'

export default function useIsNew(data) {
    //check url exists
    const [status] = useSave(
        'url', //this value can't be changed dinamicly, otherwise order of hooks change :(
        data ? data.values : [],
        { autoCreate: false }
    )

    //file always new
    if (data && data.type == 'file')
        return true

    //depending on url status decided is it new?
    switch(status) {
        case 'new':
            return true

        case 'loaded':
        case 'removed':
            return false
    }

    return null
}