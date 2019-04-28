/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h> //incoming links
#import <ReactNativeNavigation/ReactNativeNavigation.h>  //react-native-navigator
#import <FBSDKCoreKit/FBSDKCoreKit.h> //react-native-fbsdk
#import <RNGoogleSignin/RNGoogleSignin.h> //react-native-google-signin
#import <TwitterKit/TWTRKit.h> //react-native-twitter-signin
#import "RNTwitterSignIn.h" //react-native-twitter-signin

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  /*
   * React-native-navigation specific
   */
  #if DEBUG
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"app.ios" fallbackResource:nil];
  #else
    NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  
  return YES;
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
  return
  //react-native-google-signin
  [RNGoogleSignin application:app
                      openURL:url
            sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                   annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ]
  ||
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

@end
