import _ from 'lodash-es'

export const subscribe = (store, getFields, listenForFields, onChange)=>{
    let _fields
    const onStoreUpdate = ()=>{
        let state = store.getState()
        if (!state)
            return
        
        const nextFields = getFields(state)
        if (!_fields || listenForFields.some(name => _fields[name] != nextFields[name]))
            onChange(nextFields)

        _fields = nextFields

        state = null
    }

    store.subscribe(_.throttle(onStoreUpdate, 200))
    onStoreUpdate()
}