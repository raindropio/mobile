package io.raindrop.raindropio.pushes

import android.Manifest.permission.POST_NOTIFICATIONS
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.firebase.messaging.RemoteMessage
import com.pusher.pushnotifications.PushNotificationReceivedListener
import com.pusher.pushnotifications.PushNotifications
import io.raindrop.raindropio.BuildConfig
import org.json.JSONException
import org.json.JSONObject

class Pushes(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private val pushes = mutableSetOf<String>()

        @JvmStatic
        fun init(activity: Activity) {
            PushNotifications.start(activity.applicationContext, BuildConfig.PUSHER_ID)
        }

        @JvmStatic
        fun onResume(activity: Activity) {
            PushNotifications.setOnMessageReceivedListenerForVisibleActivity(activity, object: PushNotificationReceivedListener {
                override fun onMessageReceived(remoteMessage: RemoteMessage) {
                    onIntent(remoteMessage.toIntent(), activity)
                }
            })
        }

        @JvmStatic
        fun onIntent(intent: Intent, activity: Activity) {
            val extras = intent.extras ?: return

            Log.d("pushNotifications", "Received")

            val raindrop = extras.getString("raindrop") ?: return

            // prevent duplicates
            if (pushes.contains(raindrop)) return
            pushes.add(raindrop)

            try {
                val json = JSONObject(raindrop)
                val link = json.getString("link")
                val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
                activity.startActivity(browserIntent)
            } catch (_: JSONException) {
            }
        }
    }

    override fun getName(): String {
        return "Pushes"
    }

    @ReactMethod
    fun setUserId(userId: String, token: String) {
        if (Build.VERSION.SDK_INT >= 33) {
            if (ContextCompat.checkSelfPermission(reactContext, POST_NOTIFICATIONS) == PackageManager.PERMISSION_DENIED) {
                ActivityCompat.requestPermissions(currentActivity!!, arrayOf(POST_NOTIFICATIONS), 1)
            }
        }

        PushNotifications.setUserId(userId, DumbTokenProvider(token))
        Log.d("pushNotifications", "Set userId: $userId with token: $token")
    }

    @ReactMethod
    fun clear() {
        PushNotifications.clearAllState()
    }
}