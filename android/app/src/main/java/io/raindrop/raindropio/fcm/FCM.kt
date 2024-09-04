package io.raindrop.raindropio.fcm

import android.Manifest.permission.POST_NOTIFICATIONS
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging

class FCM(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        private val ignore = mutableSetOf<String>()

        @JvmStatic
        fun init(activity: Activity) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU)
                if (ContextCompat.checkSelfPermission(activity, POST_NOTIFICATIONS) == PackageManager.PERMISSION_DENIED)
                    ActivityCompat.requestPermissions(activity, arrayOf(POST_NOTIFICATIONS), 1)
        }

        @JvmStatic
        fun onIntent(intent: Intent, activity: Activity) {
            val extras = intent.extras ?: return

            when(extras.getString("type")) {
                "raindrop_reminder" -> {
                    val link = extras.getString("link") ?: return

                    if (ignore.contains(link)) return
                    ignore.add(link)

                    val browserIntent =
                        Intent(Intent.ACTION_VIEW, Uri.parse(link))
                    activity.startActivity(browserIntent)
                }
                else ->
                    Log.d("push notifications", "Unknown intent \${extras}")
            }
        }
    }

    override fun getName(): String {
        return "FCM"
    }

    @ReactMethod
    fun getToken(promise: Promise) {
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            if (!task.isSuccessful) {
                promise.reject("error", task.exception)
                return@OnCompleteListener
            }

            promise.resolve(task.result)
        })
    }
}