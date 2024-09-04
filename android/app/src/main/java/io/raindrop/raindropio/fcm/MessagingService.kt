package io.raindrop.raindropio.fcm

import android.content.Intent
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        if (remoteMessage.data.isNotEmpty()) {
            //send message data as intent to application itself
            val launchIntent = packageManager.getLaunchIntentForPackage(packageName)?.apply {
                remoteMessage.data?.let { data ->
                    for ((key, value) in data) {
                        putExtra(key, value)
                    }
                }
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }

            launchIntent?.let { startActivity(it) }
        }
    }

    override fun onNewToken(token: String) {}
}