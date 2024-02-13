// our-domain.com/new-meetup

import NewMeetupForm from "@/components/meetups/NewMeetupForm";

const NewMeetupPage = () => {

const addMeetuoHandler = (enteredMeetupData) => {
    console.log(enteredMeetupData)
}

    return <NewMeetupForm onAddMeetup={addMeetuoHandler}/>
}

export default NewMeetupPage;