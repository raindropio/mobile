package io.raindrop.raindropio;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
    @Override
    protected void addDefaultSplashLayout() {
        setContentView(R.layout.splash);
    }
}
