// Compound Component for Composability

/*
image or video: This is the main visual element of the hero section and sets the tone for the rest of the website. The image/video can be anywhere, on the left side, right side, or even in the background.
heading: This is a short and catchy phrase that conveys the main message of the website. A heading can also be placed anywhere based on where the image is placed.
subheading: This provides more information about the website or the main message. It always comes below the heading.
call-to-action (CTA) button: This is a button that encourages the user to take a specific action, such as signing up for a newsletter or making a purchase. It always comes below the heading and subheading.
Overlay: A color or pattern that overlays the background image to increase the visibility of the text and CTA button.
Additional elements such as icons, animations, or other graphics can be added to the hero section to make it more visually appealing.
* */

const Hero = ({ children }) => {
  return <div className="hero">{children}</div>;
};

const Image = ({ src, alt}) => {
  return <img className="hero-image" aria-busy={} src={src} alt={alt} />;
};

const Heading = ({ children }) => {
  return <h1 className="hero-heading">{children}</h1>;
};

const SubHeading = ({ children }) => {
  return <h2 className="hero-subheading">{children}</h2>;
};

const Overlay = ({ children }) => {
  return <div className="hero-overlay">{children}</div>;
};

const CallToAction = ({ children, onClick }) => {
  return (
    <button className="hero-cta" onClick={onClick}>
      {children}
    </button>
  );
};

Hero.Image = Image;
Hero.Heading = Heading;
Hero.SubHeading = SubHeading;
Hero.Overlay = Overlay;
Hero.CallToAction = CallToAction;

export default Hero;

const ConsumingComponent = () => {
  return(
    <Hero>
      <Hero.Image src={} alt />
      <Hero.Heading >
        Some Heading
      </Hero.Heading>
      <Hero.SubHeading />
      <div className="hero-content">
        <Hero.CallToAction />
        <Hero.CallToAction />
      </div>
    </Hero>
  )
}

// Reference
/*
https://medium.com/@bryanmylee/aschild-in-react-svelte-vue-and-solid-for-render-delegation-645c73650ced

What if we want to change the underlying component
*It isn’t enough to simply ask users to wrap the components with the desired element i.e. <section><Modal>...</Modal></section> as this introduces many issues:

certain styling frameworks may use CSS selectors that would break when the HTML structure changes,
users would have to separate and apply styles based on internal (display, padding, etc.) or external (position, margin, etc.) effects,
custom behaviors may break or behave unexpectedly when nested in other components,
certain HTML elements must be organized properly e.g. <thead> in <table>, and
wrapping components in extra elements leads to div soup.
*/
