import { Platform } from 'react-native'
import Navigation from 'modules/navigation'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import baseStyle from 'co/screen/styles/base'
import { themed, themeIsDark } from 'co/style/colors'

export default function() {
    Navigation.setDefaultOptions(baseStyle())

    if (Platform.OS=='android' && Platform.Version >= 27)
        changeNavigationBarColor(themed.main(), !themeIsDark())
}