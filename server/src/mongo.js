const { MongoClient } = require("mongodb");
const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function run() {
    try {
      const database = client.db('dummy');
      const users = database.collection('users');
      
      // Query for a user that has the name 'Yakir'
      const query = { name: 'Yakir' };
      const movie = await users.findOne(query);

      console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

run().catch(console.dir);