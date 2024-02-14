import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";

// Static Generation - By default, your page is not pre-rendered
// on the fly on the server when a request reaches the server but instead,
// it is pre-rendered when you as a developer build your site for production.
// It means that after it was deployed, that pre-rendered page does not change, at least not by default.

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// The function below only works in the page component files, not in other component files.
// Only in component files inside of the pages folder.
// In there, the function must be called getStaticProps because this is a reserved name.
// NextJS will look for a function with that name and if it finds it,
// it executes this function during this pre-rendering process.

// IMPORTANT: getStaticProps is useful because is allowed to be asynchronous.
// We can return a promise there and then, NextJS will wait for this promise to resolve,
// which means it waits until your data is loaded and then we return the props for this component function.
// Therefore, we are able to load dat before this component function is executed,
// so that the HomePage can be rendered with the required data.

export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://robertoquadraccia90:KJ6YX6atbI8065Cz@cluster0.z8a93pe.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      // as to be named props, it will be the props passed to HomePage above
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
    // 10 - number of seconds NextJS will wait until it regenerates this page
    // (on the server after deployment) for an incoming request (if any)
  };
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   // The difference to getStaticProps is that this function will now not run
//   // during the build process, but instead always on the server after deployment.

//   // IMPORTANT: Now if you don't have data that changes all the time,
//   // meaning that it changes multiple times every second,
//   // and if you don't need access to the request object, let's say for authentication,
//   // getStaticProps is actually better.
//   // Because there you pre-generate an HTML file, that file can then be stored and served by a CDN.
//   // That is faster than regenerating and fetching that data for every incoming request.
//   // So the page will be faster when working with getStaticProps, because then it can be cached
//   // and reused, instead of regenerated all the time.
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   }; // no need to revalidate any 'x' seconds
// };

export default HomePage;
