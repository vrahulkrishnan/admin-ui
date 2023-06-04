import React, { useEffect, useCallback } from 'react';
import { components } from 'react-select';
import { DefaultMenuCompnentProps } from './types';

const DefaultMenuCompnent = ({
  selectRef,
  menuPlacementProp,
  setMenuPlacement,
  innerProps
}: DefaultMenuCompnentProps) => {
  useEffect(() => {
    return () => {
      setMenuPlacement('auto');
    };
  }, []);
  const setMenuOverflowPlacement = useCallback(
    (menuElem: HTMLDivElement) => {
      const { height: menuHeight, bottom: menuBottom, top: menuTop } = menuElem.getBoundingClientRect();

      const bodyHeight = document.body.getBoundingClientRect().height;

      const {
        height: selectHeight = 0,
        bottom: selectBottom = 0,
        top: selectTop = 0
      } = selectRef.current?.getBoundingClientRect() || {};

      const menuParent = menuElem.parentElement;
      if (menuParent) {
        menuParent.style.zIndex = '2';
      }

      if (menuElem && menuPlacementProp === 'auto') {
        const spaceBelowSelect = bodyHeight - selectBottom;
        const spaceAbovSelect = selectTop;
        let shouldCalculate = true;
        let currentPlacement;
        if (menuBottom - bodyHeight > 0) {
          currentPlacement = 'bottom';
          if (menuTop - selectHeight - 15 > menuHeight) {
            shouldCalculate = false;
            setMenuPlacement('top');
          }
        } else if (menuTop < 0) {
          currentPlacement = 'top';
          if (bodyHeight - selectBottom - 15 > menuHeight) {
            shouldCalculate = false;
            setMenuPlacement('bottom');
          }
        }

        if (currentPlacement && shouldCalculate) {
          let maxHeight: string;
          if (spaceAbovSelect > spaceBelowSelect) {
            maxHeight = `${selectTop - 15}px`;
            if (currentPlacement === 'bottom') {
              setMenuPlacement('top');
            }
          } else {
            maxHeight = `${menuHeight - (menuBottom - bodyHeight) - 15}px`;
            if (currentPlacement === 'top') {
              setMenuPlacement('bottom');
            }
          }
          menuElem.style.height = maxHeight;
          (menuElem.firstElementChild as HTMLDivElement).style.maxHeight = '100%';
        }
      }
    },
    [menuPlacementProp, setMenuPlacement]
  );

  const menuRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setMenuOverflowPlacement(node);
    }
  }, []);
  return <components.Menu {...innerProps} innerRef={menuRef} />;
};

export default DefaultMenuCompnent;
