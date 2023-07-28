# Component Architecture
*The following snippets are basic examples for each category of components, they are not to be considered production ready components.


### Primitive Components
   These are the most basic building blocks of your application and are often styled versions of basic HTML elements. Examples include `Button`, `Input`, `Image`, `Text`, etc. They usually don't have any business logic and are purely presentational.
```jsx
// Button.js
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Base Components:
   These are slightly more complex components that may be composed of multiple primitive components. They might include some basic interactivity or state, but are still mostly presentational. Examples include `Card`, `Modal`, `Dropdown`, etc.
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
export function MainLayout({ children }) {
  return (
    <div>
      <header>My Site</header>
      <main>{children}</main>
      <footer>© 2023 My Site</footer>
    </div>
  );
}
```

### Page Components
   These components represent entire pages in your application. They are usually composed of multiple smart and presentational components. They might correspond directly to a route in a single-page application.
```jsx
// HomePage.js
import { MainLayout } from './MainLayout';
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

