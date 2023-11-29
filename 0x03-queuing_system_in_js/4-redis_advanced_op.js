// Import the Redis module
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

/**
 * Set data for cities in the 'HolbertonSchools' hash using HSET.
 * @param {string} city - The name of the city.
 * @param {number} data - The data for the city.
 */
function setData(city, data) {
  // HSET command: Set the data for the specified city in the hash.
  // Callback function (redis.print) logs the result to the console.
  client.hset('HolbertonSchools', city, data, redis.print);
}

/**
 * Retrieve and display all data for cities in the 'HolbertonSchools' hash using HGETALL.
 */
function displayObject() {
  // HGETALL command: Retrieve object from the hash.
  // Callback function handles the result or any potential errors.
  client.hgetall('HolbertonSchools', (err, result) => {
    if (err) {
      // Log an error message if there is an issue retrieving the hash values.
      console.error(`Error getting hash values: ${err.message}`);
    } else {
      // Log the retrieved hash values to the console.
      console.log(result);
    }
  });
}

// Example Usage:

// Set data for various cities using HSET
setData('Portland', 50);
setData('Seattle', 80);
setData('New York', 20);
setData('Bogota', 20);
setData('Cali', 40);
setData('Paris', 2);

// Display Object using HGETALL
displayObject();

