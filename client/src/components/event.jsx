import Card from 'react-bootstrap/Card';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';
import { useState } from 'react';
import './event.css';

const EventCard = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState({...props.event});

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelClick = () => {
        setIsEditing(false);
    }

    const handleSaveClick = () => {
        props.onSave(editedEvent);
        setIsEditing(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({...editedEvent, [name]: value})
    }

    const handleDelete = () => {
        const idToDelete = props.event.id;
        confirmAlert({
            title: "Confirm to Delete Event",
            message: `Are you sure you want to delete ${props.event.title}?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => props.onDelete(idToDelete)
                },
                {
                    label: "No",
                    onClick: () => console.log("Click no")
                }
            ]
        });
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{isEditing ? (<input type='text' name='title' value={editedEvent.title} onChange={(e) => handleInputChange(e)}></input>) : (editedEvent.title)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {props.event.eventtime ? moment(props.event.eventtime).format('MMMM Do, YYYY') : "TBD"}</Card.Subtitle>
                <Card.Text>
                    Location: {isEditing ? (<input type='text' name='location' value={props.event.location} onChange={() => handleInputChange(data)}></input>) : (props.event.location)}
                </Card.Text>
                <Card.Text>Description: {" "} {isEditing ? (<input type='text' name='description' value={props.event.description} onChange={() => handleInputChange(data)}></input>) : (props.event.description)}</Card.Text>
                {isEditing ? (<>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </>) : (
                    <button onClick={handleEditClick}>Edit</button>
                )}
                <button onClick={handleDelete}>Delete</button>
            </Card.Body>
        </Card>
    )
}

export default EventCard;
