// Import JSON data to mock api call
import traffic_bytes from '../traffic_bytes';

export default {
  fetchTrafficData: () => {
    return traffic_bytes;
    // Uncomment if data becomes dynamic and hosted
    /* fetch('../traffic_bytes.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(trafficJson) {
      return trafficJson
    }); */
  }
};
