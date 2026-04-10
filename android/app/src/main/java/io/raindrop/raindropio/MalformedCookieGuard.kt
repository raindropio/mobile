package io.raindrop.raindropio

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.util.Log
import com.facebook.react.modules.network.CookieJarContainer
import com.facebook.react.modules.network.OkHttpClientProvider
import java.io.File
import okhttp3.Cookie
import okhttp3.CookieJar
import okhttp3.Headers
import okhttp3.HttpUrl

/**
 * Two-layer defence against okhttp 4.x crashing on malformed (empty-name)
 * cookies that Chromium WebView occasionally writes to the shared Android
 * cookie store.
 *
 * Background: JavaNetCookieJar.decodeHeaderAsJavaNetCookies throws
 * StringIndexOutOfBoundsException on a "Cookie: =value" header. The throw
 * escapes BridgeInterceptor → AsyncCall.run → OkHttp Dispatcher worker, where
 * the default uncaught-exception handler kills the process. Android's
 * CookieManager exposes no API to enumerate or delete a single empty-name
 * cookie, so we work around it from two sides:
 *
 *  1) [sanitizeDb] — at app startup, before WebView locks the SQLite file,
 *     drop every empty-name row from Chromium's cookies database. Clears
 *     persistent rot from prior sessions so the first request never trips.
 *
 *  2) [SafeContainer] — installed as the OkHttp CookieJarContainer for RN
 *     networking. Wraps loadForRequest in try/catch so a malformed cookie
 *     written mid-session (when SQLite cleanup is too late — Chromium's
 *     in-memory cache still holds the bad row) yields an empty cookie list
 *     for that one request instead of crashing the process.
 *
 * Call [install] once from MainApplication.onCreate before loadReactNative.
 */
object MalformedCookieGuard {
    private const val TAG = "MalformedCookieGuard"

    fun install(context: Context) {
        sanitizeDb(context)
        OkHttpClientProvider.setOkHttpClientFactory {
            OkHttpClientProvider.createClientBuilder(context)
                .cookieJar(SafeContainer())
                .build()
        }
    }

    /**
     * Removes malformed cookies (rows with empty name) from Chromium's cookie
     * SQLite database. Best-effort: schema mismatch, lock contention, missing
     * table — ignored. Must run before WebView initializes (which would lock
     * the file and load rows into an in-memory cache we can't reach).
     */
    private fun sanitizeDb(context: Context) {
        val file = listOf(
            File(context.dataDir, "app_webview/Default/Cookies"),
            File(context.dataDir, "app_webview/Cookies"),
        ).firstOrNull { it.isFile } ?: return

        var db: SQLiteDatabase? = null
        try {
            db = SQLiteDatabase.openDatabase(file.absolutePath, null, SQLiteDatabase.OPEN_READWRITE)
            val deleted = db.delete("cookies", "name IS NULL OR name = ''", null)
            if (deleted > 0) Log.w(TAG, "Removed $deleted malformed cookies from ${file.path}")
        } catch (t: Throwable) {
            Log.w(TAG, "Failed to sanitize cookies db at ${file.path}", t)
        } finally {
            try { db?.close() } catch (_: Throwable) {}
        }
    }

    /**
     * Defensive replacement for ReactCookieJarContainer. Mirrors the upstream
     * impl (per-cookie validation via Headers.Builder) but additionally
     * try/catches loadForRequest so a malformed cookie in the underlying jar
     * yields an empty list instead of an uncaught exception on the OkHttp
     * dispatcher worker.
     */
    private class SafeContainer : CookieJarContainer {
        private var jar: CookieJar? = null

        override fun setCookieJar(cookieJar: CookieJar) { jar = cookieJar }
        override fun removeCookieJar() { jar = null }

        override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {
            try { jar?.saveFromResponse(url, cookies) } catch (_: Throwable) {}
        }

        override fun loadForRequest(url: HttpUrl): List<Cookie> {
            val source = try {
                jar?.loadForRequest(url) ?: return emptyList()
            } catch (t: Throwable) {
                Log.w(TAG, "loadForRequest threw, returning no cookies for $url", t)
                return emptyList()
            }
            val out = ArrayList<Cookie>(source.size)
            for (cookie in source) {
                try {
                    Headers.Builder().add(cookie.name, cookie.value)
                    out.add(cookie)
                } catch (_: IllegalArgumentException) {}
            }
            return out
        }
    }
}
