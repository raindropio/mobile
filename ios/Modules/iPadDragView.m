#import <React/RCTComponent.h>
#import "iPadDragView.h"

@interface iPadDragView () <UIDragInteractionDelegate>
@end

@implementation iPadDragView
{
    UIDragInteraction *_dragInteraction;
    NSArray<iPadDragItem *> *_dragItems;
    // We keep track of the React subviews ourself so we can handle the preview view ourself
    NSMutableArray<UIView *> *_reactSubviews;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _dragInteraction = [[UIDragInteraction alloc] initWithDelegate:self];
        [_dragInteraction setAllowsSimultaneousRecognitionDuringLift:YES];
        _dragItems = nil;
        _reactSubviews = [[NSMutableArray alloc] init];
        
        [self addInteraction:_dragInteraction];
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

#pragma mark - UIDragInteractionDelegate

- (NSArray<UIDragItem *> *)dragInteraction:(UIDragInteraction *)interaction itemsForBeginningSession:(id<UIDragSession>)session {
    // Shortcut if there are no drag items set
    if (!_dragItems || _dragItems.count == 0) {
        return @[];
    }
    
    // Map the MODragItems to UIDragItems
    // This allows us to store the drag items in our own format and only create the UIDragItems when needed
    NSMutableArray<UIDragItem *> *uiDragItems = [[NSMutableArray alloc] initWithCapacity:_dragItems.count];
    [_dragItems enumerateObjectsUsingBlock:^(iPadDragItem * _Nonnull dragItem, NSUInteger index, BOOL * _Nonnull stop) {
        UIDragItem *uiDragItem = dragItem.uiDragItem;
        [uiDragItems addObject:uiDragItem];
    }];
    return [[NSArray alloc] initWithArray:uiDragItems];
}

@end
