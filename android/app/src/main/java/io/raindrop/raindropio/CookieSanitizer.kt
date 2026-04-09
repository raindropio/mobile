package io.raindrop.raindropio

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.util.Log
import java.io.File

/**
 * Removes malformed cookies (rows with an empty name) from the WebView cookie
 * database before WebView or RN networking initializes.
 *
 * Background: okhttp 4.x JavaNetCookieJar.decodeHeaderAsJavaNetCookies crashes
 * with StringIndexOutOfBoundsException(begin=1, end=0) when it parses a
 * cookie header that begins with '=' — i.e. a cookie with an empty name. The
 * RuntimeException propagates out of AsyncCall.run into the OkHttp dispatcher
 * worker, where Android's default uncaught-exception handler kills the
 * process. Every subsequent request to the affected host crashes again until
 * the bad cookie is gone.
 *
 * android.webkit.CookieManager exposes no API to enumerate cookies or to
 * remove a single empty-name entry, so we go around it and delete the
 * offending rows directly from Chromium's cookie SQLite database. The cleanup
 * is host-agnostic — every empty-name row is removed regardless of origin.
 *
 * Must run before any code touches WebView (which would lock the DB).
 */
object CookieSanitizer {
    private const val TAG = "CookieSanitizer"

    fun run(context: Context) {
        val file = findCookiesDb(context) ?: return
        var db: SQLiteDatabase? = null
        try {
            db = SQLiteDatabase.openDatabase(
                file.absolutePath,
                null,
                SQLiteDatabase.OPEN_READWRITE,
            )
            val deleted = db.delete("cookies", "name IS NULL OR name = ''", null)
            if (deleted > 0) {
                Log.w(TAG, "Removed $deleted malformed cookies from ${file.path}")
            }
        } catch (t: Throwable) {
            // Best-effort: schema mismatch, lock contention, missing table — ignore.
            Log.w(TAG, "Failed to sanitize cookies db at ${file.path}", t)
        } finally {
            try { db?.close() } catch (_: Throwable) {}
        }
    }

    private fun findCookiesDb(context: Context): File? {
        val candidates = listOf(
            File(context.dataDir, "app_webview/Default/Cookies"),
            File(context.dataDir, "app_webview/Cookies"),
        )
        return candidates.firstOrNull { it.isFile }
    }
}
