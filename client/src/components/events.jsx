import { useState, useEffect } from "react";
import EventCard from "./event";
import CardGroup from 'react-bootstrap/CardGroup';
import Form from './form';

function Events() {
    const [events, setEvents] = useState([]);
    const [data, setData] = useState("");
    const [newEvent, setNewEvent] = useState("");

    const handleInputChange = (childData) => {
      setData(childData)
    }

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
      setEvents([...events, data]);
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

const handleEditEvent = (editedEvent) => {
  fetch(`http://localhost:8080/events/${editedEvent.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedEvent)
  })
  .then((response) => response.json())
  .then(() => {
    getRequest();
  })
  .catch((error) => {
    console.error("Error updating event: ", error);
  })
}

    useEffect(() => {getRequest()}, []);

  return (
    <>
      <div data-testid='events'>
        {data}
      <CardGroup className="Events">
              {events.map((event) =>
              <EventCard key={event.id} event={event} setEvents={setEvents} handleInputChange={handleInputChange} onDelete={handleDeleteRequest} onSave={handleEditEvent}/>
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
