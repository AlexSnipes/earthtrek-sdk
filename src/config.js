var config = {
    api: {
        url: 'http://api.earthtrekapp.org',
        satellites: {
            endpoint: "satellites"
        },
        tle: {
            endpoint: "tles",
            fields: "tle,satId"
        }
    }
};
module.exports = config;