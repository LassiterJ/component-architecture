// Compound Components with render delegation using slots, prop merging, and ref merging, for more flexibility but more complexity
import React, { createContext, useContext } from 'react';
import { Slot } from '../../layouts/slot/Slot';
/*
With render delegation, props and event handlers can be defined in two locations — on the parent component and on the child component.
Therefore, we have to define rules that make the process of merging parent and child props predictable and intuitive. To summarize:
if a prop exists on both, the child prop overrides the parent prop
if an event handler exists on both, both handlers are called with the child handler being called before the parent handler.
if a class or className prop exists on both, both class lists are joined.
if a style prop exists on both, they are merged with the child styles overriding the parent styles.
DOM node references are provided to both the user and the parent component’s internal handlers, either in the form of React’s callback refs.
 */

// const Consumer = () => {
//   return (
//     <Hero showSubtext className={"hero"} asChild>
//       <section showSubtext={false} className={"newHero")}>HEro</section>
//     </Hero>
//   )
// }
import React from 'react';

const Hero = React.forwardRef(
  ({ children, asChild, ...restProps }, forwardedRef) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp {...restProps} ref={forwardedRef} className="hero">
        {children}
      </Comp>
    );
  }
);
Hero.displayName = 'Hero.Root';

const Image = React.forwardRef(
  ({ children, asChild, ...restProps }, forwardedRef) => {
    const Comp = asChild ? Slot : 'img';
    return (
      <Comp {...restProps} ref={forwardedRef}>
        {children}
      </Comp>
    );
  }
);
Image.displayName = 'Hero.Image';

const Heading = React.forwardRef(
  ({ children, asChild, ...restProps }, forwardedRef) => {
    const Comp = asChild ? Slot : 'h1';
    return (
      <Comp {...restProps} ref={forwardedRef}>
        {children}
      </Comp>
    );
  }
);
Heading.displayName = 'Hero.Heading';

const SubHeading = React.forwardRef(
  ({ children, asChild, ...restProps }, forwardedRef) => {
    const Comp = asChild ? Slot : 'h2';
    return (
      <Comp {...restProps} ref={forwardedRef}>
        {children}
      </Comp>
    );
  }
);
SubHeading.displayName = 'Hero.SubHeading';

const Overlay = React.forwardRef(
  ({ children, asChild, ...restProps }, forwardedRef) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp {...restProps} ref={forwardedRef}>
        {children}
      </Comp>
    );
  }
);
Overlay.displayName = 'Hero.Overlay';

const CallToAction = React.forwardRef(
  ({ children, asChild, ...restProps }, forwardedRef) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp {...restProps} ref={forwardedRef}>
        {children}
      </Comp>
    );
  }
);
CallToAction.displayName = 'Hero.CallToAction';

Hero.Image = Image;
Hero.Heading = Heading;
Hero.SubHeading = SubHeading;
Hero.Overlay = Overlay;
Hero.CallToAction = CallToAction;

export default Hero;

//Usage
const ConsumingComponent = () => {
  return (
    <>
      <Hero>
        <Hero.Image />
        <Hero.Heading />
        <Hero.SubHeading />
        <Hero.CallToAction />
      </Hero>
      <Hero>
        <Hero.Image />
        <Hero.Heading></Hero.Heading>
        <Hero.SubHeading asChild className={'subheading'}>
          <h3 className={'customSubheading'}>
            Using "h3" instead of default "h2"
          </h3>
        </Hero.SubHeading>

        <Hero.CallToAction />
      </Hero>
    </>
  );
};

//Reference
/*
In a typical React application, components can be categorized based on their role and responsibility in the application. Here are some common types of components:

1. **Primitive Components:** These are the most basic building blocks of your application and are often styled versions of basic HTML elements. Examples include `Button`, `Input`, `Image`, `Text`, etc. They usually don't have any business logic and are purely presentational.

2. **Base Components:** These are slightly more complex components that may be composed of multiple primitive components. They might include some basic interactivity or state, but are still mostly presentational. Examples include `Card`, `Modal`, `Dropdown`, etc.

3. **Pattern Components (or Composite Components):** These are more complex components that encapsulate specific UI patterns. They are usually composed of multiple base components and can include more complex interactivity and state. Examples include `Accordion`, `Tabs`, `Carousel`, etc.

4. **Layout Components:** These components are responsible for the layout and positioning of other components on the page. They might include components like `Grid`, `Stack`, `Container`, etc.

5. **Smart Components (or Container Components):** These components are concerned with how things work. They include business logic, manage state, fetch data, and generally serve as the glue that connects the presentational components to the rest of your application. They don't include any HTML or CSS, but instead render other components.

6. **Template Components:** These components define a reusable layout that can be used by multiple pages. For example, you might have a `MainLayout` component that includes a header, a footer, and a slot for the main content.

7. **Page Components:** These components represent entire pages in your application. They are usually composed of multiple smart and presentational components. They might correspond directly to a route in a single-page application.



The implementation and usage of these components can vary widely based on their role and responsibility. However, the key idea is that smaller, simpler components are composed together to create larger, more complex components. This composition is a fundamental part of React's design and one of its main strengths.


Sharing behavior between components is a common problem in React. There are several ways to do this, each with their own tradeoffs. Let's look at some of the most common approaches.

1. **Higher-Order Components (HOCs):** A higher-order component is a function that takes a component and returns a new component with additional props or behavior. They are a way to reuse component logic.

2. **Render Prop Components:** These components use a function as a child or a prop to share behavior between components. They are another way to reuse component logic.

3. **Context Providers:** These components use the Context API to provide state to their descendants without having to pass props down manually at every level.

4. **Compound Components:** These components use React's children prop to share state and behavior with their descendants. They are a way to compose components together.

5. **Hooks:** Hooks are a new addition in React 16.8 that allow you to reuse stateful logic between components without changing your component hierarchy. They are a way to reuse component logic.

*/
