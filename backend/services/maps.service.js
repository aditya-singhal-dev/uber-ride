const axios = require ('axios');


module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            console.log(response.data.results[0].geometry.location);
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error("❌ Geocoding failed:", error.message);
        throw new Error("Unable to fetch coordinates");
    }
    // console.log("Geocode API response:", response.data);
}


module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            
            if (element.status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return {
    distance: {
        text: element.distance.text,
        value: element.distance.value
    },
    duration: {
        text: element.duration.text,
        value: element.duration.value
    }
};
        } else {
            throw new Error(`API Error: ${response.data.status}`);
        }

    } catch (err) {
        console.error("❌ Distance API failed:", err.response?.data || err.message);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestion = async (query) => {
    if (!query) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

    try {
        const response = await axios.get(url, {
            params: {
                input: query,
                key: apiKey
            }
        });

        console.log("GOOGLE RESPONSE:", response.data); // 🔥 ADD THIS

        // ✅ handle all valid cases
        if (response.data.status === 'OK' || response.data.status === 'ZERO_RESULTS') {
            return response.data.predictions || [];
        }

        // ❌ show real error
        throw new Error(response.data.error_message || response.data.status);

    } catch (err) {
        console.error("❌ Autocomplete failed:", err.response?.data || err.message);
        throw err;
    }
};
