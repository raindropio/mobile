# Raindrop.io iOS and Android app
[<img src="http://pluspng.com/img-png/get-it-on-google-play-badge-png-open-2000.png" height="48">](https://play.google.com/store/apps/details?id=io.raindrop.raindropio) [<img src="https://devimages-cdn.apple.com/app-store/marketing/guidelines/images/badge-example-alternate_2x.png" height="48">](https://itunes.apple.com/us/app/id1021913807)
Official iOS and Android client for Raindrop.io.

##### App features:
- One JS codebase for iOS and Android thanks to React Native
- Truly native look and feel, including navigation, tabbed interface and split-view on iPad
- Share extension
- Login in with Google, Facebook, Twitter and Vkontakte
- Themes support
- Multilingual UI: translate to 21 languages

## Install
1. Rename `.env_example` to `.env`
2. `yarn`
3. `react-native run-ios` or `react-native run-android`

## Known issues
- [ ] **iOS Share Extension out of memory**. iOS Extensions have very strict memory limits (120Mb max), due to this sometime it crash. Would be great if you can help with fixing this.
- [ ] **No momentum scroll on Android 9**. This is React Native issue that not yet resolved

## React Native specific developer tips
- Add new native library for Android:
    - /settings.gradle + entities to end of file
    - /app/build.gradle + entitie to dependencies
    - .../MainApplication.java + to getPackages with import on top
- React-native-navigation:
    - When upgrade, check if have new flavor that need to be changed in /app/build.gradle at "missingDimensionStrategy"
    - If flavor is changed, add old value to /build.gradle