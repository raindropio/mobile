#import <UIKit/UIKit.h>
#import "iPadDragItem.h"

@implementation iPadDragItem

- (instancetype _Nonnull)initWithTitle:(NSString * _Nonnull)title
{
    self = [super init];
    if (self) {
        self.title = title;
    }
    return self;
}

- (UIDragItem * _Nonnull)uiDragItem {
    NSItemProvider *itemProvider = [[NSItemProvider alloc] initWithObject:self.title];
    return [[UIDragItem alloc] initWithItemProvider:itemProvider];
}

@end
