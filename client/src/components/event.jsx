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
        const eventtimeString = moment(editedEvent.eventtime).format('YYYY-MM-DDTHH:mm');
        setEditedEvent({...editedEvent, eventtime: eventtimeString})
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
        <Card className='card' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{isEditing ? (<input type='text' name='title' value={editedEvent.title} onChange={(e) => handleInputChange(e)}></input>) : (editedEvent.title)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{isEditing ? (<input type='datetime-local' name='eventtime' value={moment(editedEvent.eventtime).format('YYYY-MM-DDHH:mm')} onChange={(e) => handleInputChange(e)}></input>) : (moment(editedEvent.eventtime).format('MMMM Do, YYYY'))}</Card.Subtitle>
                <Card.Text>
                    Location: {isEditing ? (<input type='text' name='location' value={editedEvent.location} onChange={(e) => handleInputChange(e)}></input>) : (editedEvent.location)}
                </Card.Text>
                <Card.Text>Description: {isEditing ? (<input type='text' name='description' value={editedEvent.description} onChange={(e) => handleInputChange(e)}></input>) : (editedEvent.description)}</Card.Text>
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
