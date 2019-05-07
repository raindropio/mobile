#import "NativeBridge.h"
#import <UIKit/UIDevice.h>
#import <WebKit/WebKit.h>

@implementation NativeBridge
RCT_EXPORT_MODULE();

NSUserDefaults *sharedDefaults;

+(BOOL)requiresMainQueueSetup {
  return YES;
}

//Constants
- (NSDictionary *)constantsToExport
{
  sharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:@"group.io.raindrop.main"];//important
  
	return @{
		@"isTablet": @([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad),
		@"appVersion": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"],
    @"topBarHeight": @44
	};
}

RCT_EXPORT_METHOD(isExtension:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if ([[[NSBundle mainBundle] bundlePath] hasSuffix:@".appex"])
    resolve(@(1));
  else
    resolve(nil);
}

//Init cookies
RCT_EXPORT_METHOD(initCookie:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
  for (NSHTTPCookie *each in cookieStorage.cookies) {
    [cookieStorage deleteCookie:each];
  }
  
	NSData *cookieData = [sharedDefaults objectForKey:@"appcookie"];
	if ([cookieData length] > 0) {
		NSArray *cookies = [NSKeyedUnarchiver unarchiveObjectWithData:cookieData];
		for (NSHTTPCookie *cookie in cookies) {
			[[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
		}
	}

  resolve(@(1));
}

//Save cookies
RCT_EXPORT_METHOD(saveCookie:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSArray *cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies];
  
	NSData *archive = [NSKeyedArchiver archivedDataWithRootObject:cookies];
	[sharedDefaults setObject:archive forKey:@"appcookie"];
	[sharedDefaults synchronize];
  
  resolve(@(1));
  
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





@end
