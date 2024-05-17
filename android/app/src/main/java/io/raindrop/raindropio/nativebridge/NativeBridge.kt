package io.raindrop.raindropio.nativebridge

import android.content.ContentResolver
import android.content.Intent
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.net.Uri
import android.webkit.MimeTypeMap
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NativeBridge(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context: ReactApplicationContext = reactContext

    override fun getName(): String {
        return "NativeBridge"
    }

    override fun getConstants(): Map<String, Any> {
        val constants: MutableMap<String, Any> = HashMap()

        // Is Tablet?
        constants["isTablet"] = false
        try {
            val layout = this.context.resources.configuration.screenLayout and Configuration.SCREENLAYOUT_SIZE_MASK
            constants["isTablet"] = layout == Configuration.SCREENLAYOUT_SIZE_LARGE || layout == Configuration.SCREENLAYOUT_SIZE_XLARGE
        } catch (e: Exception) {
        }

        // Version
        constants["appVersion"] = "0.0.0"
        try {
            val packageManager: PackageManager = this.context.packageManager
            val packageName: String = this.context.packageName
            val info: PackageInfo = packageManager.getPackageInfo(packageName, 0)
            constants["appVersion"] = info.versionName
        } catch (e: Exception) {
        }

        return constants
    }

    @ReactMethod
    fun openFileUrl(url: String, mimeType: String?) {
        val cR: ContentResolver = context.contentResolver
        val mime: MimeTypeMap = MimeTypeMap.getSingleton()

        // Details
        val uri: Uri = Uri.parse(url)
        val detectedMimeType: String? = mime.getExtensionFromMimeType(cR.getType(uri))

        // Start activity
        val intent = Intent(Intent.ACTION_VIEW).apply {
            setDataAndType(uri, mimeType?.takeIf { it.isNotEmpty() } ?: detectedMimeType)
            flags = Intent.FLAG_ACTIVITY_NO_HISTORY
        }
        currentActivity?.startActivity(Intent.createChooser(intent, ""))
    }
}