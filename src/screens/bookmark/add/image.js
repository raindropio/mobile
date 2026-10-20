import t from 't'
import { Alert } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import Goto from 'co/goto'

const getUniqNameFromType = (mime)=>{
    let ext = 'jpeg'
    try{
        ext = mime.match(/\/(\w+)$/)[1]
    } catch(e){}
    return new Date().getTime()+'.'+ext
}

export default function AddImage({ navigation, collectionId, last }) {
    const onPress = async ()=>{
        let images = []
        try{
            const { didCancel, assets } = await new Promise((res,rej)=>
                launchImageLibrary({
                    mediaType: 'mixed',
                    videoQuality: 'high',
                    quality: 1,
                    includeBase64: false,
                    selectionLimit: 0
                }, ({ errorCode, ...etc })=>
                    errorCode ? rej(errorCode) : res(etc)
                )
            )

            if (didCancel)
                return

            images = assets
        }catch(error){
            Alert.alert(t.s('error'), error?.message)
        }

        navigation.replace('create', {
            type: 'file',
            values: images.map(({fileName, uri, type})=>({
                file: {
                    uri,
                    name: fileName || getUniqNameFromType(type),
                    type,
                },
                collectionId
            }))
        })
    }

    return (
        <Goto 
            last={last}
            icon='image'
            color='image'
            label={t.s('add')+' '+t.s('images').toLowerCase()}
            onPress={onPress} />
    )
}