const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bq2ef3t.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		const usersCollection = client.db("aircncDb").collection("users");
		const roomsCollection = client.db("aircncDb").collection("rooms");
		const bookingsCollection = client.db("aircncDb").collection("bookings");

		// User collection
		app.put("/users/:email", async (req, res) => {
			const email = req.params.email;
			const user = req.body;
			const options = { upsert: true };
			const updateDoc = {
				$set: user,
			};
			const result = await usersCollection.updateOne({ email: email }, updateDoc, options);
			console.log(result);
			res.send(result);
		});

		// Get User
		app.get("/users/:email", async (req, res) => {
			const email = req.params.email;
			const query = { email: email };
			const result = await usersCollection.findOne(query);
			res.send(result);
		});

		// Save a Room Data in Database
		app.post("/rooms", async (req, res) => {
			const room = req.body;
			const result = await roomsCollection.insertOne(room);
			res.send(result);
		});

		// Get all Rooms
		app.get("/rooms", async (req, res) => {
			const result = await roomsCollection.find().toArray();
			res.send(result);
		});

		// Get a single Room
		app.get("/room/:id", async (req, res) => {
			const id = req.params.id;
			const result = await roomsCollection.findOne({ _id: new ObjectId(id) });
			res.send(result);
		});

		// Update a Room Data in Database
		app.patch("/rooms/status/:id", async (req, res) => {
			const id = req.params.id;
			const status = req.body.status;
			const updateDoc = {
				$set: {
					booked: status,
				},
			};
			const update = await roomsCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
			res.send(update);
		});

		// Get Bookings For Gest
		app.get("/bookings", async (req, res) => {
			const email = req.query.email;

			if (!email) {
				res.send([]);
			}

			const result = await bookingsCollection.find({ "guest.email": email }).toArray();
			res.send(result);
		});

		// Save a Bookings Data in Database
		app.post("/bookings", async (req, res) => {
			const booking = req.body;
			const result = await bookingsCollection.insertOne(booking);
			res.send(result);
		});

		// Delete a Bookings Data in Database
		app.delete("/bookings/:id", async (req, res) => {
			const id = req.params.id;
			const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
			res.send(result);
		});

		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("AirCNC Server is running...");
});

app.listen(port, () => {
	console.log(`AirCNC is running on port ${port}`);
});
