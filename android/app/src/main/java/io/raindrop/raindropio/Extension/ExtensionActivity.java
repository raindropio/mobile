package io.raindrop.raindropio.Extension;

import com.reactnativenavigation.NavigationActivity;

import io.raindrop.raindropio.R;

public class ExtensionActivity extends NavigationActivity {
    @Override
    protected void addDefaultSplashLayout() {
        setContentView(R.layout.empty);
    }
}
