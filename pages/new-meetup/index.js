// our-domain.com/new-meetup

import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetupPage = () => {

const router = useRouter()

  const addMeetuoHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredMeetupData),
    });
    const data = await response.json()

    console.log(data)

    router.push('/')
  };

  return <NewMeetupForm onAddMeetup={addMeetuoHandler} />;
};

export default NewMeetupPage;
