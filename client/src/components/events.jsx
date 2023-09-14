import { useState, useEffect } from "react";
import EventCard from "./event";
import CardGroup from 'react-bootstrap/CardGroup';
import Form from './form';


function Events() {
    const [events, setEvents] = useState([]);

    const getRequest = () => {
      fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then(events => {
        setEvents(events); 
        console.log('Events fetched...', events);
        });
    }

    const handlePostRequest = (data) => {
      console.log("Inside the App", data);
    fetch("http://localhost:8080/events", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log("Inside the post line 28", data)
      setEvents([...events, data])
    })
}

const handleDeleteRequest = (id) => {
  fetch(`http://localhost:8080/events/${id}`, {
    method: "DELETE"
  }).then((response) => {
    if (response.status === 200) {
      getRequest()
    }
  })
}

    useEffect(() => {getRequest()}, []);

  return (
    <>
      <div>
      <CardGroup className="Events">
              {events.map(event =>
              <EventCard key={event.id} event={event} onDelete={handleDeleteRequest}/>
              )}
      </CardGroup>
      </div>
      <div>
        <Form submit={handlePostRequest} />
      </div>
    </>
  );
}

export default Events;
