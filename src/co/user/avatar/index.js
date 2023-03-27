import { Image } from './style'
import Icon from 'co/icon'

export default ({ avatar, width=24 })=>{
    if (!avatar)
        return (
            <Icon
                name='user-smile'
                variant='fill'
                size={width}
                />
        )

    return (
        <Image 
            source={{uri: avatar}}
            width={width} />
    )
}