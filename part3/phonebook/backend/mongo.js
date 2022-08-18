const mongoose = require("mongoose");

if (process.argv.length > 5 || process.argv.length < 3) {
  console.log(
    "Supported syntax: node mongo.js <yourpassword> || node mongo.js <yourpassword> <name> <number>"
  );
  return 1;
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@phonebook.jzf3lez.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    console.log("connected");

    Person.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((person) =>
        console.log(`${person.name} ${person.number}`)
      );
      mongoose.connection.close();
    });
  });
}

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log("person saved");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
