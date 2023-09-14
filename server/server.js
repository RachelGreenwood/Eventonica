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
// app.delete("/event/:eventid", async (req, res) => {
//   try {
//     const { eventid } = req.params;
//     const deleteEvent = await db.one(
//       "DELETE FROM events WHERE eventid = $1 RETURNING *;",
//       eventid
//     );
//     console.log(deleteEvent);
//     res.json({ success: true, message: "Event was deleted!" });
//   } catch (e) {
//     console.error(e);
//     res.status(500);
//     res.render("error", { error: e });
//   }
// });

    //hardcode the events response for testing reasons. This call has one more event that the real DB 
    // try{
    //     const events = [

    //         {id: 1, title: 'Women in Tech Techtonica Panel', location: 'Overland Park Convention Center'},
    //         {id: 2, title: 'Japanese Cultural Education', location: 'Seattle Convention Center'},
    //         {id: 3, title: "Haven 90's Party Night Club", location: 'Hilton Hotel Kansas City'},
    //         {id: 4, title: 'Comedy Night at the Station', location: 'SF Hilton Hotel'},
    //         {id: 5, title: 'A Decadent Arts Experience', location: 'West Ridge Mall'},
    //         {id: 6, title: 'Techtonica Classroom Course', location: 'Techtonica HQ'}
    //       ];
    //     res.json(events);

    // } catch(error){
    //     console.log(error);
    // }   
    
})



app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));