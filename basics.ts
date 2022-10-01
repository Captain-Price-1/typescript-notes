function printNames(person: { first: string; last: string }): void {
  console.log(`${person.first} says hello to ${person.last}`);
}

printName({ first: "Anas", last: "Muhammad" });

let coordinatess: { x: number; y: number } = { x: 34, y: 2 };

function randomCoordinates(): { x: number; y: number } {
  //must return an object of the type annotated
  return { x: Math.random(), y: Math.random() };
}

printName({ first: "anas", last: "parwez" });

/* TYPE ALIAS ------------------------------------------------------------------------------------------------------- */

// without type alias
function doublePoints(point: { x: number; y: number }): {
  x: number;
  y: number;
} {
  return {
    x: point.x * 2,
    y: point.y * 2,
  };
}

// with type alias

type Point = {
  x: number;
  y: number;
};

function anotherPoints(point: Point): Point {
  return {
    x: point.x * 2,
    y: point.y * 2,
  };
}

/* NESTED OBJECTS --------------------------------------------------------------------------------------------------- */

type Lecture = {
  title: string;
  artist: string;
  numStreams: number;
  credits: { producer: string; writer: string };
};

function printLectureDetailss(song: Lecture): number {
  return song.numStreams * 0.11;
}

const myLectures = {
  title: "The affairs of the Hereafter",
  artist: "Abu Khadeejah Abdul Wahid",
  numStreams: 123,
  credits: {
    producer: "Salafi publications",
    writer: "Abu Khadeejah",
  },
};

printLectureDetails(myLecture);

/* READONLY PROPERTIES ---------------------------------------------------------------------------------------------- */

// in this you can initialize the property once once and cannot change it later because
// its readonly

type User = {
  readonly id: number;
  username: string;
};
const user: User = {
  id: 123,
  username: "example",
};

/* INTERSECTION TYPES ----------------------------------------------------------------------------------------------- */

type Circle = {
  radius: number;
};
type Colorful = {
  color: string;
};

type ColorfulCircle = Circle & Colorful;

const happyFace: ColorfulCircle = {
  radius: 4,
  color: "yellow",
};

// we can also add a property by using another example

type Cat = {
  numLives: number;
};
type Dog = {
  breed: string;
};

type CatDog = Cat &
  Dog & {
    age: number;
  };

const christy: CatDog = {
  numLives: 9,
  breed: "husky",
  age: 9,
};

/* EXERCISE --------------------------------------------------------------------------------------------------------- */

// write the movie type alias to make the following two variables properly typed
// make sure that "originalTitle" is optional and "title" is readOnly

type Movie = {
  readonly title: string;
  originalTitle?: string;
  director: string;
  releaseYear: number;
  boxOffice: {
    budget: number;
    grossUS: number;
    grossWorldWide: number;
  };
};

const dune: Movie = {
  title: "Dune",
  originalTitle: "Dune Part One",
  director: "Denis Villeneuve",
  releaseYear: 2021,
  boxOffice: {
    budget: 154000000,
    grossUS: 108327830,
    grossWorldWide: 400671789,
  },
};

const cats: Movie = {
  title: "Cats",
  director: "Tom Hooper",
  releaseYear: 2018,
  boxOffice: {
    budget: 95000000,
    grossUS: 27155880,
    grossWorldWide: 73833348,
  },
};

function getProfit(movie: Movie): number {
  const { grossWorldWide, budget } = movie.boxOffice;
  return grossWorldWide - budget;
}

//another way
function getProfitWay2({
  boxOffice: { grossWorldWide, budget },
}: Movie): number {
  return grossWorldWide - budget;
}

/* WORKING WITH ARRAYS ---------------------------------------------------------------------------------------------- */

const activeUsers: string[] = ["anas", "parwez"];

const ageList: number[] = [34, 54, 23];

//another way of defining an array
const bools: Array<boolean> = [false, true];
//its same as
const anotherbools: boolean[] = [false, true];

//using an object type in this

type Points = {
  x: number;
  y: number;
};

const coordinates: Points[] = [];
coordinates.push({ x: 23, y: 56 });

/* MULTIDIAMENSIONAL ARRAYS ----------------------------------------------------------------------------------------- */

const board: string[][] = [
  ["x", "o", "x"],
  ["a", "o", "y"],
];

/* EXERCISE --------------------------------------------------------------------------------------------------------- */

//create an empty array of numbers called "ages"
const ages: number[] = [];

//create a variable called gameboard that starts as an empty array.
// It should be typed to hold a 2 diamensional array of strings

const gameboard: string[][] = [];

//create a product type that contains a name and a price.
// an example product could be :
// {name:"coffee mug",price:11.50}

type Product = {
  name: string;
  price: number;
};

// write a function called getTotal that accepts an array of Product types
// it should return the sum of all the products prices

function getTotal(products: Product[]): number {
  let total = 0;
  for (let product of products) {
    total += product.price;
  }
  return total;
}

/* UNION TYPES ------------------------------------------------------------------------------------------------------ */

let age: number | string = 21;
age = 23;
age = "35";

//another example

type point = {
  x: number;
  y: number;
};

type Loc = {
  lat: number;
  long: number;
};

let coordinates1: point | Loc = { x: 1, y: 23 };
coordinates1 = { lat: 234.234, long: 23.543 };

/* TYPE NARROWING --------------------------------------------------------------------------------------------------- */

function printAge(age: number | string): void {
  console.log(`You are ${age} years old`);
}

printAge(23);
printAge("34");

function calculateTax(price: number | string, tax: number) {
  // return price*tax --> this will throw an error because the type of price could be a string
  // in that case do type narrowing as described below
  // typescript here knows that you already checked for types so in that case it
  // doesn't throw any error

  if (typeof price === "string") {
    price = price.replace("$", "");
    return parseFloat(price) * tax;
  } else {
    return price * tax;
  }
}

/* UNION TYPES AND ARRAYS ------------------------------------------------------------------------------------------- */

//array that can hold multiple types
const stuff: (number | string)[] = ["1", 2];

//example
const coords: (point | Loc)[] = [];
coords.push({ lat: 234.234, long: 23.35 });

/* LITERAL TYPES ---------------------------------------------------------------------------------------------------- */

let zero: 0 = 0;
// zero = 2 wont run because type "zero" is not assignable to type "number"

// an example where it seems useful

let mood: "Happy" | "Sad" = "Happy";
mood = "Sad";

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

let today: DayOfWeek = "Monday";

/* UNION TYPE EXERCISE ---------------------------------------------------------------------------------------------- */

//create a variable called highScore that can be a number OR a boolean

let highScore: number | boolean;
highScore = 1;
highScore = false;

//create an array called stuff
// it can be an array of number OR an array of strings
// it cannot be an array of numbers and strings (mixed together)

let stuffs: number[] | string[] = [1, 2, 3];

//create a literal type called SkillLevel
//There are 4 allowed values: "beginner","intermediate","advanced" and expert

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

// create a type called SkiSchoolStudent
// name must be string
// age must be number
// sport must be "ski" or "snowboard"
// level must be a value from the SkillLevel type (from above)

type SkiSchoolStudent = {
  name: string;
  age: number;
  sport: "ski" | "snowboard";
  level: SkillLevel;
};

// define a type to represent an RGB color
// r should be a number
// g should be a number
// b should be a number

type RGB = {
  r: number;
  g: number;
  b: number;
};

// define a type to represent an HSL color
// h should be  a number
// s should be a number
// l should be a number

type HSL = {
  h: number;
  s: number;
  l: number;
};

//create an array called colors that can hold a mixture of RGB and HSL color types

const colors: (RGB | HSL)[] = [];

// write a function called greet that accepts a single string OR an array of strings
// it should print "hello <name>: for that single person OR greet each person in the array with
// the same format

const greet = (person: string | string[]): void => {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    for (let p of person) {
      console.log(`Hello ${person}`);
    }
  }
};

/* INTRODUCTION OF TUPLES ------------------------------------------------------------------------------------------- */

//creating a tuple with its type definition

let myTuple: [number, string];

//can assign it values per its specs

myTuple = [10, "Typescript is fun !"];

//can't assign it values of a dif structure eg
// --> myTuple = ["typescript is fun !",10]   - this will throw an error

// another example

const colorful: [number, number, number] = [24, 43, 5];

type HTTPResponse = [number, string];

const goodRes: HTTPResponse = [200, "OK"];

// this is something that is very weird in typescript that it allows something pushing
// into the data although it shouldn't happen
// it fails to follow pattern anymore
goodRes.push(123);
goodRes.pop();

/* INTRODUCTION TO ENUMS -------------------------------------------------------------------------------------------- */

// enums allows us to define a set of named constants. We can give these constants numeric
// or string values.

// numeric enums

enum Responses {
  no,
  yes,
  maybe,
}

enum Responses1 {
  no = 2,
  yes,
  maybe,
}

enum Responses2 {
  no = 2,
  yes = 10,
  maybe = 24,
}

// string enums

enum Responses3 {
  no = "No",
  yes = "Yes",
  maybe = "Maybe",
}

// heterogenous enums

enum Responses4 {
  no = 0,
  yes = 1,
  maybe = "maybe",
}

// another few examples

enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  RETURNED,
}

const order_status = OrderStatus.DELIVERED;

function isDelivered(status: OrderStatus) {
  return status === OrderStatus.DELIVERED;
}

isDelivered(OrderStatus.RETURNED);

// another example

enum ArrowKeys {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

/* INTRODUCTION TO INTERFACES --------------------------------------------------------------------------------------- */

// interfaces serve almost exact same purpose as type aliases (with a slightly different syntax)
// can only be used with the objects

interface points {
  x: number;
  y: number;
}

const pt: points = { x: 12, y: 23 };

/* READONLY AND OPTIONAL INTERFACE PROPERTIES ----------------------------------------------------------------------- */

interface Person {
  first: string;
  last: string;
  nickname?: string;
  sayHi: () => string;
}

const thomas: Person = {
  first: "Thomas",
  last: "None",
  sayHi: () => {
    return "Hello";
  },
};

// another example
interface Products {
  name: string;
  price: number;
  applyDiscount(discount: number): number;
}

const shoes: Products = {
  name: "Blue Suede Shoes",
  price: 100,
  applyDiscount(amount: number) {
    const newPrice = this.price * (1 - amount);
    this.price = newPrice;
    return this.price;
  },
};

/* REOPEN INTERFACES ------------------------------------------------------------------------------------------------ */

interface Dogs {
  name: string;
  age: number;
}

interface Dogs {
  breed: string;
  bark(): string;
}

const elton: Dogs = {
  name: "elton",
  age: 0.5,
  breed: "Australian Shepherd",
  bark() {
    return "WOOF WOOF!";
  },
};

// here above you can see the interfaces extends themselves rather than overwriting it

/* EXTENDING INTERFACES --------------------------------------------------------------------------------------------- */

// here we are making use of "dogs" interface that is described above

interface ServiceDogs extends Dogs {
  job: "drug sniffer" | "bomb detection" | "guide dog";
}

const chewy: ServiceDogs = {
  name: "Chewy",
  age: 4.5,
  breed: "Lab",
  bark() {
    return "Bark!";
  },
  job: "guide dog",
};

/* INTERFACE MULTIPLE INHERITANCE ----------------------------------------------------------------------------------- */

interface Human {
  name: string;
}
interface Employee {
  readonly id: number;
  email: string;
}

interface Engineer extends Human, Employee {
  level: string;
  languages: string[];
}

const pierre: Engineer = {
  name: "Pierre",
  id: 1234,
  email: "pierre@example.com",
  level: "senior",
  languages: ["JS", "Python"],
};

/* DIFFERENCE BETWEEN INTERFACES AND TYPES -------------------------------------------------------------------------- */

// interface is only used to describe the structure of objects

// in interface you can reopen them and add on but not in types

/* SYNTACTICAL DIFFERENCE BETWEEN THEM ON EXTENDING FEATURE --------------------------------------------------------- */

type Example = {
  name: string;
};
type People = Example & {
  age: number;
};

const anotherPerson: People = {
  name: "jerry",
  age: 32,
};

interface Name {
  name: string;
}

interface addAge extends Name {
  age: number;
}

const yetanotherPerson: addAge = {
  name: "elijah",
  age: 43,
};

/* GENERICS --------------------------------------------------------------------------------------------------------- */

const nums: Array<number> = [];
const anotherNumber: Array<string> = [];

//without generics

function numberIdentity(item: number): number {
  return item;
}

function stringIdentity(item: string): string {
  return item;
}

//with generics

function identity<Type>(item: Type): Type {
  return item;
}

identity<string>("Hey"); // --> now it has a type of string
identity<boolean>(false); //--> now it has a type of boolean

/* ANOTHER GENERIC FUNCTION ----------------------------------------------------------------------------------------- */

function getRandomElement<T>(list: T[]): T {
  const randIdx = Math.floor(Math.random() * list.length);
  return list[randIdx];
}
getRandomElement<string>(["a", "b", "c"]);

/* INFERRED GENERIC TYPE --------------------------------------------------------------------------------------------- */

// in the above example we can just call the function with the required arrays
// without passing it the type for eg

getRandomElement([1, 2, 3, 4]);

// above function infer the type just so it happens with other types as well but not always!

/* ABOUT TSX ARROW FUNCTIONS ---------------------------------------------------------------------------------------- */

// you have to put a comma otherwise it's going to think that it's an HTML tag

// const getRandomElements = <T,>(list: T[]): T => {
//   const randIdx = Math.floor(Math.random() * list.length);
//   return list[randIdx];
// };

// the reason that it is commented out is because the prettier extension
// automatically removes the comma when the function is placed in .ts file
// placing that function in tsx file will be alright.

/* GENERICS WITH MULTIPLE TYPES ------------------------------------------------------------------------------------- */

function merge<T, U>(object1: T, object2: U) {
  return {
    ...object1,
    ...object2,
  };
}

const comboObj = merge({ name: "Anas" }, { pets: ["blue", "elton"] });

// here in the above code it inferred that the type returned is the intersection of
// type T and U

/* ADDING TYPE CONSTRAINTS ------------------------------------------------------------------------------------------ */

function anotherMerge<T extends object, U extends object>(
  object1: T,
  object2: U
) {
  return {
    ...object1,
    ...object2,
  };
}

// the above annotation tells us that "T" will be object doesn't matter what it contains
// same goes with "U"

// another example with interface

interface Lengthy {
  length: number;
}
function printDoubleLength<T extends Lengthy>(thing: T): number {
  return thing.length * 2;
}

printDoubleLength("233");

/* DEFAULT TYPE PARAMETER ------------------------------------------------------------------------------------------- */

function makeEmptyList<T = number>(): T[] {
  return [];
}

const strings = makeEmptyList<string>();
strings.push("string");

const whatIstheType = makeEmptyList();

/* ---------------------------------TYPE NARROWING --------------------------------------------------------------------------------------------------- */

/* TYPE OF GUARDS --------------------------------------------------------------------------------------------------- */

function triple(value: number | string) {
  if (typeof value === "string") {
    return value.repeat(3);
  }
  return value * 3;
}

/* TRUTHINESS GUARDS ------------------------------------------------------------------------------------------------ */

const el = document.getElementById("idk");
if (el) {
  console.log("its an HTMLElement");
} else {
  console.log("it is a null value");
}

// another example

const printLetters = (word?: string) => {
  if (word) {
    for (let char of word) {
      console.log(char);
    }
  } else {
    console.log("You didn't pass in a word");
  }
};

/* EQUALITY NARROWING ----------------------------------------------------------------------------------------------- */

function someDemo(x: string | number, y: string | boolean) {
  if (x === y) {
    // here typescript knows that the only way they can be equal if they are strings
    x.toUpperCase();
  }
}

/* BY USING IN OPERATOR --------------------------------------------------------------------------------------------- */

interface Movies {
  title: string;
  duration: number;
}

interface TVShow {
  title: string;
  numEpisodes: number;
  episodeDuration: number;
}

function getRuntime(media: Movies | TVShow) {
  if ("numEpisodes" in media) {
    return media.numEpisodes * media.episodeDuration;
  }
  return media.duration;
}

getRuntime({ title: "exampleMovie", duration: 160 });

/* INSTANCE OF NARROWING -------------------------------------------------------------------------------------------- */

// instanceof is a javascript operator that allows us to check if one thing is
// an instance of another
// this can help us narrow down the types

function printFullDate(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.toUTCString());
  } else {
    console.log(new Date(date).toUTCString());
  }
}

class Users {
  constructor(public username: string) {}
}

class Company {
  constructor(public name: string) {}
}

function printName(entity: Users | Company) {
  if (entity instanceof Users) {
  } else {
  }
}

/* TYPE PREDICATES -------------------------------------------------------------------------------------------------- */

// typescript allows us to write custom functions that can narrow the type of a value
// these functions have a very special return type called a type predicate.
// A predicate takes the form parameterName is Type

interface Cats {
  name: string;
  numLives: number;
}

interface Dogs {
  name: string;
  breed: string;
}

function isCat(animal: Cats | Dogs): animal is Cats {
  return (animal as Cats).numLives !== undefined;
}

function makeNoise(animal: Cats | Dogs): string {
  if (isCat(animal)) {
    animal;
    return "Meow";
  }
  animal;
}

/* DISCRIMINATED UNIONS --------------------------------------------------------------------------------------------- */

// a common pattern in Typescript involves creating a literal property that
// is common across multiple types

// we can then narrow the type using that literal property

interface Rooster {
  name: string;
  weight: number;
  age: number;
  kind: "rooster";
}

interface Cow {
  name: string;
  weight: number;
  age: number;
  kind: "cow";
}

interface Pig {
  name: string;
  weight: number;
  age: number;
  kind: "pig";
}

type FarmAnimal = Pig | Rooster | Cow;

function getFarmAnimalSound(animal: FarmAnimal) {
  switch (animal.kind) {
    case "pig":
      return "Oink!";
    case "cow":
      return "Moo";
    case "rooster":
      return "Cockadoodledoo";
    default:
    // we should never make it here ,
    // if we handled all cases correctly
  }
}

const stevie: Rooster = {
  name: "Stevie Chicks",
  weight: 2,
  age: 1.5,
  kind: "rooster",
};
