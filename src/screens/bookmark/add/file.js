import t from 't'
import { Alert } from 'react-native'
import { pick, errorCodes } from '@react-native-documents/picker'
import Goto from 'co/goto'

export default function AddFile({ navigation, collectionId, last }) {
    const onPress = async ()=>{
        let files = []
        try{
            files = await pick()
        }catch(error){
            if (error?.code != errorCodes.OPERATION_CANCELED)
                Alert.alert(t.s('error'), error?.message)
        }

        if (!files.length)
            return

        navigation.replace('create', {
            type: 'file',
            values: files.map(({name, uri, type})=>({
                file: {
                    uri,
                    name,
                    type,
                },
                collectionId
            }))
        })
    }

    return (
        <Goto 
            last={last}
            icon='file'
            color='document'
            label={t.s('add')+' '+t.s('file').toLowerCase()}
            subLabel={`PDF, Office, ${t.s('videos')}`}
            onPress={onPress} />
    )
}