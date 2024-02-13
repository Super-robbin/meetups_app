import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

// Component and pageProps props are passed into this MyApp component automatically by NextJS,
// since NextJS is the thing using that specific component.
// Component - Is a prop that holds the actual page contents that should be rendered,
// it will be different whenever we switch a page.
// pageProps - Are specific props our pages might be getting,
// and at the moment our pages are not getting any props at all,
// because at the moment we have no source that would provide such props,
// but that is something we're going to change.

// IMPORTANT: we can utilize this _app.js file and simply wrap this component here
// with our layout or with whichever wrapper you have.
// We then don't have to do it inside of our different page files.
// So we can remove the layout wrapper from index.js from our HomePage.

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
