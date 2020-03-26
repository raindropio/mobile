#import <UIKit/UIKit.h>
#import <React/RCTLog.h>

#import "iPadDropViewManager.h"
#import "iPadDropView.h"

@implementation iPadDropViewManager

#pragma mark - Props


#pragma mark - Setup and view handling

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onDrop, RCTBubblingEventBlock)

- (iPadDropView *)view {
    return [[iPadDropView alloc] init];
}

@end
  
