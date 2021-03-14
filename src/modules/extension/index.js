import { NativeModules } from 'react-native'
import useData from './useData'

export const {
    data,
    close,
    disableDismissGesture,
    enableDismissGesture
} = NativeModules.ShareViewController

export { useData }