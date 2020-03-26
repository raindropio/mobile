#import <React/RCTComponent.h>
#import "iPadDropView.h"

@interface iPadDropView () <UIDropInteractionDelegate>
@end

@implementation iPadDropView
{
    UIDropInteraction *_dropInteraction;
    // We keep track of the React subviews ourself so we can handle the preview view ourself
    NSMutableArray<UIView *> *_reactSubviews;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _dropInteraction = [[UIDropInteraction alloc] initWithDelegate:self];
        _reactSubviews = [[NSMutableArray alloc] init];
        
        [self addInteraction:_dropInteraction];
        [self setUserInteractionEnabled:YES];
    }
    return self;
}

#pragma mark - React subviews

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-missing-super-calls"
- (void)insertReactSubview:(id<RCTComponent>)subview atIndex:(NSInteger)atIndex {
    [super insertSubview:(UIView *)subview atIndex:atIndex];
    
    // Keep track of the subviews so we can return them when required
    [_reactSubviews insertObject:(UIView *)subview atIndex:(NSUInteger)atIndex];
}

- (void)removeReactSubview:(id<RCTComponent>)subview {
    [(UIView *)subview removeFromSuperview];
    
    // Keep our array up-to-date so we can respond correctly
    [_reactSubviews removeObject:(UIView *)subview];
}

- (NSArray<id<RCTComponent>> *)reactSubviews {
    return (NSArray<id<RCTComponent>> *)_reactSubviews;
}
#pragma clang diagnostic pop

#pragma mark - UIDropInteractionDelegate
- (BOOL)dropInteraction:(UIDropInteraction *)interaction
       canHandleSession:(id<UIDropSession>)session {
  return [session canLoadObjectsOfClass:[NSURL class]];
}

- (UIDropProposal *)dropInteraction:(UIDropInteraction *)interaction
                   sessionDidUpdate:(id<UIDropSession>)session {
    
    return [[UIDropProposal alloc] initWithDropOperation:UIDropOperationCopy];
}

- (void)dropInteraction:(UIDropInteraction *)interaction
            performDrop:(id<UIDropSession>)session {
    
    UIDragItem *dropItem = session.items.lastObject;
    
    if (!dropItem) {
        
        return;
    }
    
    session.progressIndicatorStyle = UIDropSessionProgressIndicatorStyleNone;
    
    [dropItem.itemProvider loadObjectOfClass:[NSURL class]
                                           completionHandler:^(id<NSItemProviderReading>  _Nullable object, NSError * _Nullable error) {
      NSURL *url = (NSURL *)object;
      NSArray *values = @[ [url absoluteString] ];
      
      self.onDrop(@{
        @"type": @"url",
        @"values": values
      });
    }];
}

@end
