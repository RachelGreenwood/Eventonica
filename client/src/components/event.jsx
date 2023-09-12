import Card from 'react-bootstrap/Card';

const EventCard = (props) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {props.time ? props.time : "TBD"}</Card.Subtitle>
                <Card.Text>
                    Location: {props.location}
                </Card.Text>
                <Card.Text>Description: {props.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default EventCard;
