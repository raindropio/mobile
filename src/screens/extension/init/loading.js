import React, { useState, useEffect } from 'react'
import { mediumFade } from 'co/style/animation'

import { View as Loading } from 'screens/overlay/loading'

export default function ExtensionLoading() {
    const [show, setShow] = useState(false)

    useEffect(()=>{
        setShow(true)
        mediumFade()
    }, [])

    return show ? <Loading /> : null
}