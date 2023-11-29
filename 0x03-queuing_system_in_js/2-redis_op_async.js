// Import the necessary modules
import redis from 'redis';
import { promisify } from 'util';

/**
 * Creates a new Redis client to interact with a Redis server.
 * @type {RedisClient}
 */
const client = redis.createClient();

/**
 * Promisified version of the `client.get` function with Redis client binding.
 * @type {function}
 */
const getAsync = promisify(client.get).bind(client);

/**
 * Sets a new value for a school in Redis.
 * @param {string} schoolName - The name of the school.
 * @param {string} value - The value to set for the school.
 * @returns {Promise<void>} A promise that resolves after the operation is complete.
 */
async function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

/**
 * Retrieves and displays the value for a school using async/await.
 * @param {string} schoolName - The name of the school to retrieve the value for.
 * @returns {Promise<void>} A promise that resolves after the operation is complete.
 */
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(`Value for ${schoolName}: ${value}`);
  } catch (err) {
    console.error(`Error getting value for ${schoolName}: ${err.message}`);
  }
}



// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

