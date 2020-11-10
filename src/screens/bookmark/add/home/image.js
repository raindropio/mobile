import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Goto from 'co/common/goto'

const getUniqNameFromType = (mime)=>{
    let ext = 'jpeg'
    try{
        ext = mime.match(/\/(\w+)$/)[1]
    } catch(e){}
    return new Date().getTime()+'.'+ext
}

export default class AddImage extends React.PureComponent {
    onPress = async ()=>{
        try{
            await ImagePicker.clean()
        }catch(e){}

        let images = []
        try{
            images = await ImagePicker.openPicker({
                mediaType: 'photo',
                multiple: true,
                maxFiles: 9999,
                cropping: true,
                smartAlbums: ['PhotoStream', 'Generic', 'UserLibrary', 'Screenshots'],
                compressImageQuality: .9,
                compressImageMaxWidth: 3000,
                compressImageMaxHeight: 10000,
                loadingLabelText: t.s('loading'),
                forceJpg: true, //only ios
                cropperToolbarTitle: t.s('edit') + ' ' + t.s('imaged'),
                cropperChooseText: t.s('done'),
                cropperCancelText: t.s('cancel'),
                showsSelectedCount: false
            })
        }catch(e){}

        if (!images.length)
            return

        this.props.navigation.setParams({
            values: images.map(({filename, path, mime})=>({
                uri: path,
                name: filename || getUniqNameFromType(mime),
                type: Platform.OS == 'ios' ? 'image/jpeg' : mime
            })),
            type: 'file'
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