import MeetupDetail from "@/components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://greatruns.com/wp-content/uploads/2018/04/Kata-Beach-Michael-T.jpg"
      title="First Meetup"
      address="Some address 5, 12345 Some City"
      description="This is a first meetup!"
    />
  );
};

// getStaticPaths is another important function, which you need in dynamic pages to tell NextJS
// for which dynamic parameter values this page should be pre-generated.
// getStaticProps executes for every page so for every meetup ID value allows you to fetch data
// for that meetup and allows you to return props for that meetup.
export const getStaticPaths = async () => {
  return {
    // If you set fallback to FALSE, you say that your paths contains all supported meetup ID values.
    // It means that if the user enters anything that's not supported here, for example M3,
    // he or she would see a 404 error.
    // If you set fallback to TRUE, NextJS would try to generate a page
    // for this meetup ID dynamically on the server for the incoming request.
    // Fallback is a nice feature because it allows you to pre-generate some of your pages
    // for specific meetup ID values.

    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        image:
          "https://greatruns.com/wp-content/uploads/2018/04/Kata-Beach-Michael-T.jpg",
        id: meetupId,
        title: "First Meetup",
        address: "Some address 5, 12345 Some City",
        description: "This is a first meetup!",
      },
    },
  };
};

export default MeetupDetails;
