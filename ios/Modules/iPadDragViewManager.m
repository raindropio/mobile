#import <UIKit/UIKit.h>
#import <React/RCTLog.h>

#import "iPadDragViewManager.h"
#import "iPadDragView.h"

@implementation iPadDragViewManager

#pragma mark - Props

RCT_CUSTOM_VIEW_PROPERTY(dragItems, NSArray<MODragItem *>, iPadDragView)
{
    if ([json isKindOfClass:[NSArray class]]) {
        NSMutableArray<iPadDragItem *> *dragItems = [[NSMutableArray alloc] init];
        [json enumerateObjectsUsingBlock:^(id _Nonnull possibleDragItem, NSUInteger index, BOOL * _Nonnull stop) {
            // TODO: This should be able to handle more complex drag items too
            if ([possibleDragItem isKindOfClass:[NSString class]] && ![possibleDragItem isEqualToString:@""]) {
                [dragItems addObject:[[iPadDragItem alloc] initWithTitle:possibleDragItem]];
            } else {
                RCTLogWarn(@"RNDragViewManager was passed a dragItem that was not a string\n\n%@", possibleDragItem);
            }
        }];
        
        [view setDragItems:[[NSArray alloc] initWithArray:dragItems]];
    } else {
        RCTLogWarn(@"RNDragViewManager was passed a dragItems prop with the wrong format\n\n%@", json);
        [view setDragItems:nil];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(preview, RCTResponseSenderBlock, iPadDragView)
{
    NSLog(@"Incoming preview: %@", json);
}

#pragma mark - Setup and view handling

RCT_EXPORT_MODULE()

- (iPadDragView *)view {
    return [[iPadDragView alloc] init];
}

@end
  
