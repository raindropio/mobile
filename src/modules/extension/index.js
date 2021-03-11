import { NativeModules } from 'react-native'
import useData from './useData'

export const {
    data,
    close
} = NativeModules.ShareViewController

export { useData }