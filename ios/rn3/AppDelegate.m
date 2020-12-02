/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h> //incoming links

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

#import "RNBootSplash.h" //react-native-bootsplash
#import <FBSDKCoreKit/FBSDKCoreKit.h> //react-native-fbsdk
#import <TwitterKit/TWTRKit.h> //react-native-twitter-signin
#import "RNTwitterSignIn.h" //react-native-twitter-signin
#import <WebKit/WebKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
  #endif
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"app"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; //react-native-bootsplash
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
  return
  //react-native-fbsdk
  [[FBSDKApplicationDelegate sharedInstance]  application:app
                                                  openURL:url
                                        sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                               annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
          ]
  ||
  //react-native-twitter-signin
  [[Twitter sharedInstance] application:app openURL:url options:options]
  ||
  //incoming links
  [RCTLinkingManager application:app openURL:url options:options];
}

//incoming links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

//storage and cookies
- (void)saveCookies {
  //persist all existing cookies to shared group
  NSArray *cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies];
  for(NSHTTPCookie* cookie in cookies)
  {
    [[NSHTTPCookieStorage sharedCookieStorageForGroupContainerIdentifier:@"group.io.raindrop.main"] setCookie:cookie];
  }
  
  //Optional for iOS>=11: Webview will have our cookies
  if (@available(iOS 11.0, *)) {
    dispatch_async( dispatch_get_main_queue(), ^{
      WKHTTPCookieStore *elevenStore = [[WKWebsiteDataStore defaultDataStore] httpCookieStore];
      
      [elevenStore getAllCookies:^(NSArray* oldCookies) {
        //remove old
        for (NSHTTPCookie *each in oldCookies) {
          [elevenStore deleteCookie:each completionHandler:nil];
        }
        
        //add new
        for (NSHTTPCookie *cookie in cookies) {
          [elevenStore setCookie:cookie completionHandler:nil];
        }
      }];
    });
  }
}

- (void)applicationWillTerminate:(UIApplication *)application {
  [self saveCookies];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  [self saveCookies];
}

@end
