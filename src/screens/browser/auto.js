import { store } from 'data'
import chrome from './chrome'
import system from './system'

export default async function({ navigation, bookmark }) {
    const { browser } = store.getState().local

    switch (browser) {
        case 'chrome':  return chrome({bookmark})
        case 'system':  return system({bookmark})
        default:        navigation.navigate('browser/internal', { bookmark })
    }
}