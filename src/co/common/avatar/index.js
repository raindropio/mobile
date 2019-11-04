import React from 'react'
import { Image } from './style'

export default ({ email_MD5, width=28 })=>(
    <Image 
        source={{uri: `https://www.gravatar.com/avatar/${email_MD5}?d=mm&s=${width*3}`}}
        width={width} />
)