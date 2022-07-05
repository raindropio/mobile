# Raindrop.io iOS and Android app
[<img src="http://pluspng.com/img-png/get-it-on-google-play-badge-png-open-2000.png" height="48">](https://play.google.com/store/apps/details?id=io.raindrop.raindropio) [<img src="https://devimages-cdn.apple.com/app-store/marketing/guidelines/images/badge-example-alternate_2x.png" height="48">](https://itunes.apple.com/us/app/id1021913807)

Official iOS and Android client for Raindrop.io. This repository do not include any credentials or sensitive info.

I decided to open source it to be more transparent for users in terms of what app exactly do on your device, plus anyone could track development progress.

I am open to all kind of contributions. If you find a bug or have improvement feel free to submit issues or pull-requests!
Would be great if you can help with resolving known issues and planned improvements described below.

##### App features:
- One codebase for iOS and Android thanks to React Native
- Truly native look and feel, including navigation and split-view on iPad
- Share extension
- Login in with Google, Facebook, Twitter and Vkontakte
- Themes support
- Multilingual UI

##### Folders structure:
- src
    - *assets* - static files
    - *co* - common React components
    - *data* - redux store (this code is also reused on Raindrop.io Web app)
    - *local* - redux store specific to this app
    - *modules* - navigation, i18n, etc
    - *screens*

## Install
1. Rename `.env.example` to `.env`
2. `yarn`
3. `react-native run-ios` or `react-native run-android`
4. Create empty `/ios/main.jsbundle` file

## Known issues
- [ ] **No momentum scroll on Android 9**. This is React Native issue that not yet resolved