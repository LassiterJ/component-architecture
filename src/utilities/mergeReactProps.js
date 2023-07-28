/*
With render delegation, props and event handlers can be defined in two locations — on the parent component and on the child component.
Therefore, we have to define rules that make the process of merging parent and child props predictable and intuitive. To summarize:

*if a prop exists on both, the child prop overrides the parent prop
*if an event handler exists on both, both handlers are called with the child handler being called before the parent handler.
*if a class or className prop exists on both, both class lists are joined.
*if a style prop exists on both, they are merged with the child styles overriding the parent styles.
*DOM node references are provided to both the user and the parent component’s internal handlers in the form of React’s callback refs.
 */

export const mergeReactProps = (parentProps, childProps) => {
  // All child props should override.
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const parentPropValue = parentProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    // If it's a handler, modify the override by composing the base handler.
    if (isHandler) {
      // Only compose the handlers if both exist.
      if (childPropValue && parentPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue?.(...args);
          parentPropValue?.(...args);
        };
        // Otherwise, avoid creating an unnecessary callback.
      } else if (parentPropValue) {
        overrideProps[propName] = parentPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...parentPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [parentPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...parentProps, ...overrideProps };
};
