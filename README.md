
## Usage

Install dependencies:

```
npm i
```

Now, you can start a local web server by running:

```
npm start
```

And then open http://localhost:3000 to view it in the browser.

#### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                         |
| ------------- | --------------------------------------------------- |
| npm run dev   | Runs the app in the development mode.               |
| npm run build | Builds the app for production to the `dist` folder. |
| npm run serve | Serves the production build from the `dist` folder. |

## Credits

This project was built using Vite Template React which is built and maintained by [Safdar Jamal](https://safdarjamal.github.io).

# Component Architecture
*The following snippets are basic examples for each category of components, they are not to be considered production ready components.

## Design System Components
### Primitive Components
These are the most basic building blocks of your application and are often styled versions of basic HTML elements. Examples include `Button`, `Input`, `Image`, `Text`, etc. They usually don't have any business logic and are purely presentational.
```jsx
// Button.js
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Base Components:
These are slightly more complex components that may be composed of one or multiple primitive components. They might include some basic interactivity or state, but are still mostly presentational. Examples include `Card`, `Modal`, `Dropdown`, etc. 
```jsx
// Card.js
import { Button } from './Button';

export function Card({ title, content, buttonLabel, onButtonClick }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
      <Button onClick={onButtonClick}>{buttonLabel}</Button>
    </div>
  );
}
```

### Pattern Components (or Composite Components)
These are more complex components that encapsulate specific UI patterns. They are usually composed of multiple base components and can include more complex interactivity and state. Examples include `Accordion`, `Tabs`, `Carousel`, etc.
```jsx
// Accordion.js
import { useState } from 'react';

export function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setActiveIndex(index)}>{item.title}</button>
          {index === activeIndex && <div>{item.content}</div>}
        </div>
      ))}
    </div>
  );
}
```

*We are considering only shipping base components and pattern components in the design system. The primitives will be coming from a primitive library(probably Radix-ui) and wrapped into base components. The other components are considered application components and are not part of the design system.

--- 

## Application Components

### Layout Components
These components are responsible for the layout and positioning of other components on the page. They might include components like `Grid`, `Stack`, `Container`, etc.
```jsx
// Grid.js
export function Grid({ children }) {
  return <div className="grid">{children}</div>;
}
```

### Smart Components (or Container Components)
These components are concerned with how things work. They include business logic, manage state, fetch data, and generally serve as the glue that connects the presentational components to the rest of your application. They don't include any HTML or CSS, but instead render other components.
```jsx
// UserList.js
import { useEffect, useState } from 'react';
import { UserCard } from './UserCard';

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```



### Template Components
These components define a reusable layout that can be used by multiple pages. For example, you might have a `MainLayout` component that includes a header, a footer, and a slot for the main content.
```jsx
// MainLayout.js
    //TODO: Maybe concrete components go in the directory they are used in?
    // ie. ../layouts/MainLayout/Header 
import { Header } from '../concrete/Header'; 
export function MainLayout({ children }) {
  return (
    <div>
      <Header />
        <main>{children}</main>
      <Footer />
    </div>
  );
}
```

### Page Components
These components represent entire pages in your application. They are usually composed of multiple smart and presentational components. They might correspond directly to a route in a single-page application.
```jsx
// HomePage.js
import { MainLayout } from '../templates/MainLayout';
import { UserList } from './UserList';
import {Grid} from './Grid';
export function HomePage() {
  return (
    <MainLayout>
      <Grid>
          <h1>Welcome to our site!</h1>
          <UserList />
      </Grid>
    </MainLayout>
  );
}
```

### Concrete Components

Concrete components are specific implementations tailored for individual applications. While they leverage the base, pattern, and layout components provided by the design system, they also encapsulate the unique branding, functionality, and requirements of the consuming application. These components often represent distinct sections or features within an application, such as headers, footers, or custom navigation bars.

Unlike the more generic components, concrete components are closely tied to the application's context, ensuring that the UI aligns with the application's specific needs and user expectations.

```jsx
// Header.js
import { NavigationMenu, Button, Logo } from 'design-system-components';
import { Flex } from '../layout/Flex';
import { UserDropdown } from './SmartComponents/UserDropdown';

export function Header() {
  return (
    <Flex className="header">
      <Logo />
      <NavigationMenu />
      <Button variant="primary">Sign Up</Button>
      <UserDropdown />
    </Flex>
  );
}
```

In the example above, the `Header` component is a concrete component for a specific application. It's composed of base components (`Logo`, `Button`) and a pattern component (`NavigationMenu`) from the design system. Additionally, it integrates a smart component (`UserDropdown`) to handle user-specific functionality.
