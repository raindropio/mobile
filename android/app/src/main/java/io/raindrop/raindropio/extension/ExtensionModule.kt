package io.raindrop.raindropio.extension

import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableNativeArray

import android.content.Intent
import android.net.Uri

import io.raindrop.raindropio.extension.Utils.getFileFromUri

class ExtensionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ShareViewController"
    }

    override fun getConstants(): Map<String, Any> {
        return emptyMap()
    }

    @ReactMethod
    fun close() {
        val currentActivity = currentActivity
        currentActivity?.let {
            val activityClass = it::class.java
            val activityName = activityClass.simpleName
            if (activityName == "ExtensionActivity") {
                it.finish()
            }
        }
    }

    @ReactMethod
    fun data(promise: Promise) {
        try {
            val result = Arguments.createMap()
            val values = WritableNativeArray()
            var type = ""

            val activity = currentActivity
            val intent = activity?.intent
            val intentAction = intent?.action
            val intentType = intent?.type

            if (Intent.ACTION_SEND == intentAction && intentType != null) {
                if ("text/plain" == intentType) {
                    val subject = intent.getStringExtra(Intent.EXTRA_SUBJECT) ?: ""
                    val text = intent.getStringExtra(Intent.EXTRA_TEXT) ?: ""
                    values.pushMap(Utils.extractUrl(subject, text))
                    type = "url"
                } else {
                    val uri = intent.getParcelableExtra<Uri>(Intent.EXTRA_STREAM)
                    if (uri != null) {
                        values.pushMap(getFileFromUri(uri, activity))
                        type = "file"
                    }
                }
            } else if (Intent.ACTION_SEND_MULTIPLE == intentAction && intentType != null) {
                val fileUris = intent.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)
                if (fileUris != null) {
                    fileUris.forEach { uri ->
                        values.pushMap(getFileFromUri(uri, activity))
                    }
                    type = "file"
                }
            }

            if (type.isEmpty()) throw Exception("couldn't find provider")

            result.putString("type", type)
            result.putArray("values", values)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("error", e)
        }
    }
}