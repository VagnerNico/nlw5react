import React, { FC, CSSProperties, useRef, useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';

import HeightUpdater from './HeightUpdater';
import ScrollToTop from './ScrollToTop';
import { SwipeableBottomSheetProps } from './swipeable-bottom-sheet.interfaces';

const SwipeableBottomSheet: FC<SwipeableBottomSheetProps> = ({
  bodyStyle,
  children,
  defaultOpen = false,
  fullScreen = false,
  marginTop = 0,
  onChange,
  open,
  overflowHeight = 0,
  overlay = true,
  overlayStyle,
  scrollTopAtClose = true,
  shadowTip = true,
  style,
  swipeableViewsProps,
  topShadow = true,
}) => {
  const [height, setHeight] = useState(0);
  const [stateOpen, setStateOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  function onChangeIndex(index: number): void {
    const eventOpen = index === 1;
    if (open === undefined) setStateOpen(eventOpen);
    if (onChange !== undefined) onChange(eventOpen);
  }

  function onHeightChange(eventHeight: number): void {
    setHeight(eventHeight);
  }

  function onTransitionEnd(): void {
    if (overflowHeight === 0 && bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
    if (swipeableViewsProps && swipeableViewsProps.onTransitionEnd) {
      swipeableViewsProps.onTransitionEnd();
    }
  }

  const hiddenWhenClosed = overflowHeight === 0;
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : stateOpen;
  const hideShadows = hiddenWhenClosed && !isOpen;
  const index = isOpen ? 1 : 0;
  const maxHeight = height - marginTop;

  const styles: {
    overlay: CSSProperties;
    root: CSSProperties;
    shadowTip: CSSProperties;
    swiper: Record<string, CSSProperties>;
  } = {
    root: {
      height: overflowHeight,
      position: `fixed`,
      bottom: 0,
      right: 0,
      left: 0,
      ...style,
    },
    swiper: {
      root: {
        overflowY: `initial`,
        boxSizing: `border-box`,
        ...(swipeableViewsProps || {}).style,
      },
      container: {
        boxSizing: `border-box`,
        ...(topShadow &&
          !hideShadows && {
            boxShadow: `rgba(0, 0, 0, 0.156863) 0px -6px 5px`,
          }),
        ...(swipeableViewsProps || {}).containerStyle,
      },
      slide: {
        boxSizing: `border-box`,
        overflow: `visible`,
        marginBottom: -overflowHeight,
        ...(swipeableViewsProps || {}).slideStyle,
      },
      bottomSlide: {
        marginBottom: overflowHeight,
      },
      body: {
        overflow: isOpen ? `auto` : `hidden`,
        backgroundColor: `white`,
        height: fullScreen ? maxHeight : `initial`,
        maxHeight,
        ...bodyStyle,
      },
    },
    overlay: {
      position: `fixed`,
      top: 0,
      right: 0,
      left: 0,
      height,
      transition: `opacity 450ms`,
      pointerEvents: `none`,
      backgroundColor: `black`,
      opacity: 0,
      ...(isOpen && {
        opacity: 0.7,
        pointerEvents: `auto`,
      }),
      ...overlayStyle,
    },
    shadowTip: {
      position: `fixed`,
      height: 60,
      width: `200%`,
      bottom: -60,
      left: `-50%`,
      boxShadow: `rgba(0, 0, 0, 0.7) 0px 0px 30px`,
      transition: `transform 450ms`,
      transform: isOpen ? `translateY(50px)` : `translateY(0)`,
    },
  };

  useEffect(() => {
    if (window) {
      setHeight(window.innerHeight);
    }
  }, []);

  return (
    <div style={styles.root}>
      <HeightUpdater height={height} onHeightChange={onHeightChange} />
      {overlay && (
        <div
          ref={overlayRef}
          role="presentation"
          style={styles.overlay}
          onClick={(): void => onChangeIndex(0)}
        />
      )}
      <SwipeableViews
        index={index}
        axis="y"
        enableMouseEvents
        onChangeIndex={onChangeIndex}
        {...swipeableViewsProps} // eslint-disable-line
        onSwitching={(draggedPercent): void => {
          if (!overlayRef.current) return;
          overlayRef.current.style.opacity = `${draggedPercent * 0.7}`;
        }}
        onTransitionEnd={onTransitionEnd}
        style={styles.swiper.root}
        containerStyle={styles.swiper.container}
        slideStyle={styles.swiper.slide}
      >
        <div
          ref={bodyRef}
          style={styles.swiper.body}
          className={`ReactSwipeableBottomSheet--${isOpen ? `open` : `closed`}`}
        >
          {children}
        </div>
        <div style={styles.swiper.bottomSlide} />
      </SwipeableViews>
      {shadowTip && !hideShadows && <div style={styles.shadowTip} />}
      {!isOpen && scrollTopAtClose && !hiddenWhenClosed && (
        <ScrollToTop element={(): HTMLDivElement | null => bodyRef.current} />
      )}
    </div>
  );
};

export default SwipeableBottomSheet;
