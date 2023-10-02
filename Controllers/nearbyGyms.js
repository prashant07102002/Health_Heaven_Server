import fetch from "node-fetch";

export const getNearbyGyms = async (req, res) => {
  try {
    const searchParams = new URLSearchParams({
      query: 'gyms',
      ll: '22.7522398,75.8812202',
      limit: 20
    });
    const results = await fetch(
      `https://api.foursquare.com/v3/places/search?${searchParams}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: process.env.GYM_SEARCH_SECRET
        }
      }
    );
    const data = await results.json();
    console.log(data);
    res.status(200).send(data);

    // const url = `https://maps.googleapis.com/maps/api/place/details/json
    // ?place_id=ChIJrTLr-GyuEmsRBfy61i59si0
    // &fields=address_components
    // &key=${process.env.GOOGLE_PLACES_KEY}`;

    // const result = await fetch(url);
    // console.log(result);

  } catch (err) {
    console.log(err);
    res.status(400).json({ 'error': err });
  }
}