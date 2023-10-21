import fetch from "node-fetch";
import results from '../testGymData.js';
import { nearbyGyms } from '../testGymData.js';

export const findGyms = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    // console.log("data of gym search ", query);
    // const results = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_PLACES_KEY}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       Authorization: process.env.GOOGLE_PLACES_KEY
    //     }
    //   }
    // );

    // const data = await results.json();
    // console.log(data);
    // console.log(results);
    res.status(200).send({ results });

  } catch (err) {
    console.log(err);
    res.status(400).json({ 'error': err });
  }
};

export const getNearbyGyms = async (req, res) => {
  try {
    const latitude = req.header("latitude");
    const longitude = req.header("longitude");

    // const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=gym&location=${latitude},${longitude}&radius=1500&key=${process.env.GOOGLE_PLACES_KEY}`,{
    //   method: 'GET',
    //   headers: {
    //     latitude,
    //     longitude
    //   }
    // });

    // const data = await response.json();

    res.status(200).send({ results: nearbyGyms });
  } catch (error) {
    console.log(err);
    res.status(400).json({ 'error': err });
  }
};