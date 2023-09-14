import Card from 'react-bootstrap/Card';

const EventCard = (props) => {

    const handleDelete = () => {
        const idToDelete = props.event.id;
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
