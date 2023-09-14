import { useRef } from 'react';

const Form = (props) => {
    const userTitle = useRef();
    const userLocation = useRef();
    const userDate = useRef();
    const userDescription = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedDate = new Date(userDate.current?.value);
        const userEvent = {title: userTitle.current?.value, location: userLocation.current?.value, eventtime: selectedDate.toISOString(), description: userDescription.current?.value}
        console.log("Inside the component", userEvent);
        props.submit(userEvent);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add an event </h2>
                <label>Event Title</label>
                <input type='text' name='title' required placeholder='Event title' ref={userTitle}></input>
                <label>Event Location</label>
                <input type='text' name='location' required placeholder='Where will the event be held' ref={userLocation}></input>
                <label>Event Date and Time</label>
                <input type='datetime-local' name='date' ref={userDate}></input>
                {/* <label>Event Description</label> */}
                {/* <input type='text' name='description' placeholder='Add details of the event' ref={userDescription}></input> */}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Form;