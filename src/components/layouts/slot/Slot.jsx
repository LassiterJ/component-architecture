import { mergeReactProps } from '../../../utilities/mergeReactProps';
import { combinedRef } from '../../../utilities/refUtils';

export const Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (!React.isValidElement(children)) {
    return null;
  }
  return React.cloneElement(children, {
    ...mergeReactProps(slotProps, children.props),
    ref: combinedRef([forwardedRef, children.ref]),
  });
});
Slot.displayName = 'Slot';

// CREDIT https://github.com/ally-ui/ally-ui/blob/main/packages/common/react/lib/Slot.react.tsx
// which credits https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx
export const Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // The new element to render is the one passed as a child of `Slottable`
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        // because the new element will be the one rendered, we are only interested
        // in grabbing its children (`newElement.props.children`)
        if (React.Children.count(newElement) > 1)
          return React.Children.only(null);
        return React.isValidElement(newElement)
          ? newElement.props.children
          : null;
      } else {
        return child;
      }
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = 'Slot';

export const SlotClone = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    /*
    Children in React are immutable by default.
     Instead, we have to use React.cloneElement to create a mutable clone of the child element
      which lets us override props and define custom behaviors.
   */
    return React.cloneElement(children, {
      ...mergeReactProps(slotProps, children.props),
      ref: combinedRef([forwardedRef, children.ref]),
    });
  }

  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});

SlotClone.displayName = 'SlotClone';

const Slottable = ({ children }) => {
  return <>{children}</>;
};

function isSlottable(child) {
  return React.isValidElement(child) && child.type === Slottable;
}
