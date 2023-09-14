import Card from 'react-bootstrap/Card';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';

const EventCard = (props) => {

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
                <Card.Title>{props.event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {props.event.time ? props.event.time : "TBD"}</Card.Subtitle>
                <Card.Text>
                    Location: {props.event.location}
                </Card.Text>
                <Card.Text>Description: {props.event.description}</Card.Text>
                <button onClick={handleDelete}>Delete</button>
                <button>Edit</button>
            </Card.Body>
        </Card>
    )
}

export default EventCard;
