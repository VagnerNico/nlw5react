import { CSSProperties } from 'react';

export interface SwipeableBottomSheetProps {
  bodyStyle?: CSSProperties;
  defaultOpen?: boolean;
  fullScreen?: boolean;
  marginTop?: number;
  open?: boolean;
  onChange?: (isOpen: boolean) => void;
  overflowHeight?: number;
  overlay?: boolean;
  overlayStyle?: CSSProperties;
  scrollTopAtClose?: boolean;
  shadowTip?: boolean;
  style?: CSSProperties;
  swipeableViewsProps?: {
    containerStyle: CSSProperties;
    onTransitionEnd: () => void;
    slideStyle: CSSProperties;
    style: CSSProperties;
  };
  topShadow?: boolean;
}
