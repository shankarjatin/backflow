const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron')
const dotenv = require ('dotenv');
const Insight = require('./models/Insight');
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