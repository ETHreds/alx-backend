import redis from 'redis';

const client = redis.createClient();

function createHash(fieldValuePairs, hashKey = 'HolbertonSchools') {
    for (const [field, value] of Object.entries(fieldValuePairs)) {
      client.hset(hashKey, field, value, redis.print);
    }
  }

function displayHash(hashKey = 'HolbertonSchools') {
    client.hgetall(hashKey, (err, result) => {
      if (err) {
        console.log(`Error getting hash value for ${hashKey}: ${err.message}`);
      } else {
        console.log(result);
      }
    });
  }

  const fieldValuePairs = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  };
  createHash(fieldValuePairs)
  displayHash();