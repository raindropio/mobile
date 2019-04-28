# Known issues
[ ] **iOS Share Extension out of memory**. iOS Extensions have very strict memory limits (120Mb max), due to this sometime it crash. Would be great if you can help with fixing this.
[ ] **No momentum scroll on Android 9**. This is React Native issue that not yet resolved

# Prerequisites
Create `.env` file with content:
```
APP_VERSION_CODE=111
APP_VERSION=1.1.1

# Enter credentials to build production Android app
ANDROID_SIGN_PASSWORD=
ANDROID_SIGN_KEY_ALIAS=
ANDROID_SIGN_KEY_PASSWORD=
RNB_GOOGLE_PLAY_LICENSE_KEY=

# Social login credentials
FB_APP_ID=
FB_URL_SCHEME=fb

GOOGLE_CLIENT_ID_IOS=
GOOGLE_CLIENT_ID_ANDROID=
GOOGLE_URL_SCHEME=com.googleusercontent.apps.

TWITTER_KEY=
TWITTER_SECRET=
TWITTER_URL_SCHEME=twitterkit-

VK_CLIENT_ID=
VK_URL_SCHEME=vk
```

# React Native specific tips
- Add new native library for Android:
    - /settings.gradle + entities to end of file
    - /app/build.gradle + entitie to dependencies
    - .../MainApplication.java + to getPackages with import on top
- React-native-navigation:
    - When upgrade, check if have new flavor that need to be changed in /app/build.gradle at "missingDimensionStrategy"
    - If flavor is changed, add old value to /build.gradle