import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
    <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </>
  );
};

// getStaticPaths is another important function, which you need in dynamic pages to tell NextJS
// for which dynamic parameter values this page should be pre-generated.
// getStaticProps executes for every page so for every meetup ID value allows you to fetch data
// for that meetup and allows you to return props for that meetup.
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://robertoquadraccia90:KJ6YX6atbI8065Cz@cluster0.z8a93pe.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // The first argument {} is used to filter, in our case we wanna find all so we leave it empty
  // The second argument is to define which fields should be returned, by default are all.
  // We use _id: 1 to fetch all the object but just the id
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // If you set fallback to FALSE, you say that your paths contains all supported meetup ID values.
    // It means that if the user enters anything that's not supported here, for example M3,
    // he or she would see a 404 error.
    // If you set fallback to TRUE, NextJS would try to generate a page
    // for this meetup ID dynamically on the server for the incoming request.
    // Fallback is a nice feature because it allows you to pre-generate some of your pages
    // for specific meetup ID values.

    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://robertoquadraccia90:KJ6YX6atbI8065Cz@cluster0.z8a93pe.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // The first argument {} is used to filter, in our case we wanna find all so we leave it empty
  // The second argument is to define which fields should be returned, by default are all.
  // We use _id: 1 to fetch all the object but just the id
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId), // ObjectId allows us to compare meetupId with _id
  });

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
