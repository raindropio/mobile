package io.raindrop.raindropio.Pushes;

import com.pusher.pushnotifications.auth.TokenProvider;

public class DumbTokenProvider implements TokenProvider {
    private String token = "";

    public DumbTokenProvider(String token) {
        this.token = token;
    }

    @Override
    public String fetchToken(String userId) {
        return this.token;
    }
}
