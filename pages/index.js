import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://greatruns.com/wp-content/uploads/2018/04/Kata-Beach-Michael-T.jpg',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a first meetup!'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://greatruns.com/wp-content/uploads/2018/04/Kata-Beach-Michael-T.jpg',
        address: 'Some address 5, 39432 Some City',
        description: 'This is a second meetup!'
    },
    {
        id: 'm3',
        title: 'A Third Meetup',
        image: 'https://greatruns.com/wp-content/uploads/2018/04/Kata-Beach-Michael-T.jpg',
        address: 'Some address 5, 92843 Some City',
        description: 'This is a third meetup!'
    }
]

const HomePage = () => {
    return (
        <MeetupList meetups={DUMMY_MEETUPS} />
    )
}

export default HomePage;