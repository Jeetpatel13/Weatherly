import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {

    const city = req.query.city;

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=7&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Weather fetch failed" });
    }

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});