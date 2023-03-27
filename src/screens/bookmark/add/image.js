import t from 't'
import { PureComponent } from 'react';
import { launchImageLibrary } from 'react-native-image-picker'
import Goto from 'co/goto'

const getUniqNameFromType = (mime)=>{
    let ext = 'jpeg'
    try{
        ext = mime.match(/\/(\w+)$/)[1]
    } catch(e){}
    return new Date().getTime()+'.'+ext
}

export default class AddImage extends PureComponent {
    onPress = async ()=>{
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
            this.props.navigation.push('overlay', { screen: 'error', params: { error } })
        }

        this.props.navigation.replace('create', {
            type: 'file',
            values: images.map(({fileName, uri, type})=>({
                file: {
                    uri,
                    name: fileName || getUniqNameFromType(type),
                    type,
                },
                collectionId: this.props.collectionId
            }))
        })
    }

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon='image'
                color='image'
                label={t.s('add')+' '+t.s('images').toLowerCase()}
                onPress={this.onPress} />
        )
    }
}