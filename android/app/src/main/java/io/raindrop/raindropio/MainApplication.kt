package io.raindrop.raindropio

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import io.raindrop.raindropio.extension.ExtensionPackage
import io.raindrop.raindropio.nativebridge.NativeBridgePackage
import io.raindrop.raindropio.fcm.FCMPackage

class MainApplication : Application(), ReactApplication {

    override val reactHost: ReactHost by lazy {
        getDefaultReactHost(
            context = applicationContext,
            packageList =
                PackageList(this).packages.apply {
                    // Packages that cannot be auto linked yet can be added manually here, for example:
                    add(ExtensionPackage())
                    add(NativeBridgePackage())
                    add(FCMPackage())
                },
        )
    }

    override fun onCreate() {
        super.onCreate()
        JsCrashReporter.install()
        MalformedCookieGuard.install(this)
        loadReactNative(this)
    }
}
