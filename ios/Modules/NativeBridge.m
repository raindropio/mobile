#import "NativeBridge.h"
#import <UIKit/UIDevice.h>
#import <WebKit/WebKit.h>

@implementation NativeBridge
RCT_EXPORT_MODULE();

+(BOOL)requiresMainQueueSetup {
  return YES;
}

//Constants
- (NSDictionary *)constantsToExport
{
	return @{
		@"isTablet": @([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad),
		@"appVersion": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"]
	};
}

@end