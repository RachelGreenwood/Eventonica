//This is the minimal express server. 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db/db-connection.js'); 

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica 2023 H2 to your Server for Eventonica");
  });


app.get('/events', async (req, res) =>{

    //real connection with the DB eventonica
    try{
        const { rows: events } = await db.query('SELECT * FROM events');
        // console.log("Get in the server", events);
        res.send(events);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});
    }

    // Create an event
app.post("/events", async (req, res) => {
  try {
    console.log("In the server", req.body);
    const { title, location, eventtime, description } = req.body;
    const result = await db.query(
      "INSERT INTO events (title, location, eventtime, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, location, eventtime, description]
    );
    let dbResponse = result.rows[0];
    console.log(dbResponse);
    res.json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
});

// delete an event
app.delete("/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const deleteOperation = await db.query("DELETE FROM events WHERE id=$1", [eventId]);
    console.log(deleteOperation);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).json({e});
  }
});

// Update an event
app.put("/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, location, eventtime, description } = req.body;
    
    const result = await db.query(
      "UPDATE events SET title = $1, location = $2, eventtime = $3, description = $4 WHERE id = $5 RETURNING *",
      [title, location, eventtime, description, eventId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    let updatedEvent = result.rows[0];
    console.log(updatedEvent);
    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ err });
  }
});  
})



app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));