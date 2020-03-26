#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@interface iPadDropView : UIView
@property (nonatomic, copy) RCTBubblingEventBlock onDrop;
@end
