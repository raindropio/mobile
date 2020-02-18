import React from 'react'
import Icon from 'co/common/icon'
import { IconTap } from './icon.style'

export default ({_id, cover=[], title, color, ...other})=>(
    <IconTap {...other}>
        <Icon collectionId={_id} src={cover[0]} size='big' />
    </IconTap>
)