const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron')
const dotenv = require ('dotenv');
const Insight = require('./models/Insight');
const HotelData = require('./models/hotel')
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); 



app.get("/", async (req, res) => {
    res.status(200).json({
      message: "Hello developers from Jatin shankar",
    });
  });
  
app.post('/insights', async (req, res) => {
    try {
        const insightsData = req.body; // Assuming req.body is an array of insights JSON objects
    
        // Insert all insights data into the database
        const insertedInsights = await Insight.insertMany(insightsData);
    
        res.status(201).json(insertedInsights);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
  });

app.get('/api/insights', async (req, res) => {
  try {
    const insights = await Insight.find();
    res.json(insights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.post('/postData', async (req, res) => {
  const data = req.body;

  if (Array.isArray(data) && data.length > 0) {
      try {
          // Insert many documents into the collection
          const result = await HotelData.insertMany(data);
          res.status(200).send({ message: 'Data stored successfully', result });
      } catch (error) {
          res.status(500).send({ message: 'Error storing data', error });
      }
  } else {
      res.status(400).send({ message: 'Invalid data format. Please provide an array of objects.' });
  }
});

// Sample route to get filtered hotel data
app.get('/api/hotel-data', async (req, res) => {
  try {
    // Replace with actual data retrieval logic
    const HotelData1 = await HotelData.find(); // Assuming you use Mongoose

    // Extract query parameters from request
    const { year, month, day } = req.query;

    // Check if HotelData is an array within an object
    const dataArray = HotelData1.bookings || HotelData1.data || HotelData1.records || HotelData1; // Adjust according to your data structure

    if (!Array.isArray(dataArray)) {
      return res.status(500).send('Error: HotelData does not contain an array');
    }

    // Filter data based on the arrival date
    const filteredData = dataArray.filter(booking =>
      booking.arrival_date_year === parseInt(year) &&
      booking.arrival_date_month === month &&
      booking.arrival_date_day_of_month === parseInt(day)
    );

    // Send the filtered data as a response
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    res.status(500).send({ message: 'Error fetching data', error });
  }
});



cron.schedule('*/1 * * * * *', () => {
    console.log('This message will be printed to the console every 10 seconds');
  });
  

  const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Connected to Mongo DB"))
      .catch((err) => {
        console.error("failed to connect with mongo");
        console.error(err);
      });
  };

  const startServer = async () => {
    try {
      connectDB();
      app.listen(process.env.PORT || 8000 , () => console.log("Server started on port"));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();  