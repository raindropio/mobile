import Removed from './removed'
import Broken from './broken'
import Duplicate from './duplicate'

export default function BookmarkEditIndicators(props) {
    if (props.status != 'loaded' &&
        props.status != 'removed')
        return null

    return (
        <>
            <Removed {...props} />
            <Broken {...props} />
            <Duplicate {...props} />
        </>
    )
}