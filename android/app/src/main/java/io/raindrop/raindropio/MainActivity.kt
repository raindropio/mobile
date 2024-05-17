package io.raindrop.raindropio

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.content.Intent
import android.os.Bundle

import io.raindrop.raindropio.pushes.Pushes

class MainActivity : ReactActivity() {
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "app"

    // react-native-screens
    override fun onCreate(savedInstanceState: Bundle?) {
        Pushes.init(this)
        super.onCreate(null) // or super.onCreate(null) with react-native-screens
    }

    /**
     * Returns the instance of the [ReactActivityDelegate]. Here we use a util class [DefaultReactActivityDelegate]
     * which allows you to easily enable Fabric and Concurrent React (aka React 18) with two boolean flags.
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onStart() {
        super.onStart()
        Pushes.onIntent(intent, this)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        Pushes.onIntent(intent, this)
    }

    override fun onResume() {
        super.onResume()
        Pushes.onResume(this)
    }
}