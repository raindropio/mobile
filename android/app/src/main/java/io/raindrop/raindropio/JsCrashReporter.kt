package io.raindrop.raindropio

import com.facebook.react.common.JavascriptException

/**
 * Surfaces the JS error message in Play Console / Android Vitals.
 * Without this, JS crashes arrive as bare JavascriptException with no
 * visible message in the crash header.
 */
object JsCrashReporter {
    fun install() {
        val previous = Thread.getDefaultUncaughtExceptionHandler()
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            val out =
                if (throwable is JavascriptException) {
                    RuntimeException(throwable.message ?: "Unknown JS error", throwable)
                } else {
                    throwable
                }
            previous?.uncaughtException(thread, out)
        }
    }
}
