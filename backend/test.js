const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("event", (object) => {
  console.log("event has occured", object);
});

eventEmitter.emit("event", 3);

class Person extends EventEmitter {
  constructor(name) {
    super();
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

let pedro = new Person("Pedro");

pedro.on("name", () => {
  console.log("my name is " + pedro.name);
});

pedro.emit("name");

let selector = "";

async function getDataT(filterBy, sendVar) {
  try {
    selector = 1;
    const response = await fetch(`https://poetrydb.org/${filterBy}`);
    const everything = await response.json();
    console.log(everything);
    removeCard();
    makeCards2(eval(sendVar)); //any way to shorten this function (make authors, random and titles interchangable yknow)
  } catch (error) {
    console.log(error);
  }
}

getDataT(author, "everything.titles");

let characters = [];

async function apicaller() {
  characters = [];
  for (let i = 1; i <= 42; i++) {
    let page1 = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${i}`
    );
    characters.push(page1.json());
  }
}
