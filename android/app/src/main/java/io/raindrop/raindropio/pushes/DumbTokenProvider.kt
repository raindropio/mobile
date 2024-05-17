package io.raindrop.raindropio.pushes

import com.pusher.pushnotifications.auth.TokenProvider

class DumbTokenProvider(private val token: String) : TokenProvider {

    override fun fetchToken(userId: String): String {
        return token
    }
}