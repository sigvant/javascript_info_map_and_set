// Filter unique array members
// importance: 5
// Let arr be an array.

// Create a function unique(arr) that should return an array with unique items of arr.

// For instance:

function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O

// #### Attempt at solution

function unique(arr) {
	return Array.from(new Set(arr)); //makes an array out of the the set that was made with the initial arr
	// this is a cool trick;
}

// #########################################################################################################

// Filter anagrams
// importance: 4
// Anagrams are words that have the same number of same letters, but in different order.

// For instance:

nap - pan
ear - are - era
cheaters - hectares - teachers
Write a function aclean(arr) that returns an array cleaned from anagrams.

// For instance:

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"

// From every anagram group should remain only one word, no matter which one.

// To find all anagrams, let's split every word to letters and sort them. When letter-sorted, all anagrams are same.
// for instance:

nap, pan -> anp
ear, era, are -> aer 
cheaters, hectares, teachers -> aceehrst
...

// we'll use the letter-sorted variants as map keys to store only one value per each key:

function aclean(arr) {
	let map = new Map();

	for (let word of arr) {
		// split the word by letters, sort them and join back
		let sorted = word.toLowerCase().split('').sort().join(''); // (*)
		// makes all letters lowercase, split them, sorts them and join in a long string
		map.set(sorted, word);
	}

	return Array.from(map.values()); // makes an array out of the map
}

let arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares'];

alert( aclean(arr) );

// letter-sorting is done by the chain of calls in the line (*). For convenience, let's split it into multiple lines

let sorted = word // PAN
	.toLowerCase() // pan
	.split('') // ['p', 'a', 'n']
	.sort() // ['a', 'n', 'p']
	.join(''); // anp

// Two different words 'PAN' and 'nap' receive the same letter-sorted form 'anp'.
// The next line put the word into the map:

map.set(sorted, word);

// if we ever meet a word the same letter-sorted form again, then it would overwrite the previous value with the same key
// in the map. So we'll always have at maximum one word per letter-form. At the end Array.from(map.values()) takes an 
// iterable over map values (we don't need keys in the result) and returns an array of them.

// here we could also use a plain object instead of the Map, because keys are strings. that's how the solution can look:

function aclean(arr) {
	let obj = {};

	for (let i = 0; i < arr.length; i++) {
		let sorted = arr[i].toLowerCase().split('').sort().join('');
		obj[sorted] = arr[i];
	}

	return Object.values(obj);
}

let arr = ['nap', 'teachers', 'cheaters', 'pan', 'ear', 'era', 'hectares'];

alert( aclean(arr) );

// #########################################################################################################

// Iterable keys
// importance: 5
// We’d like to get an array of map.keys() in a variable and then apply array-specific methods to it, e.g. .push.

// But that doesn’t work:

let map = new Map();

map.set("name", "John");

let keys = map.keys(); // this is an iterable, not an array

// Error: keys.push is not a function, because map.keys() returns an iterable, but not an array.

keys.push("more");

// we can convert it into an array using Array.from:

let keys = Array.from(map.keys()); // now we have an array

// #########################################################################################################

// Store "unread" flags
// importance: 5
// There’s an array of messages:

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

// Your code can access it, but the messages are managed by someone else’s code. 
// New messages are added, old ones are removed regularly by that code, 
// nd you don’t know the exact moments when it happens.

// Now, which data structure could you use to store information about whether 
// the message “has been read”? The structure must be well-suited to give 
// the answer “was it read?” for the given message object.

// P.S. When a message is removed from messages, it should disappear from 
// your structure as well.

// P.P.S. We shouldn’t modify message objects, add our properties to them. 
// As they are managed by someone else’s code, that may lead to bad consequences.

// #################### Attempt at Solution

#
let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);

// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
#

// The WeakSet allows to store a set of messages and easily check for the existence of a
// message in it. It cleans up itself automatically. The tradeoff is that we can't iterate
// over it, can't get 'all read messages' from it directly. But we can do it by iterating
// over all messages and filtering those that are in the set.

// Another different solution could be to add a property like message.isRead=true to a
// message after it's read. As messages objects are managed by another code, that's generally
// discouraged, but we can use a symbolic property to avoid conflicts.

// like this:

// the symbolic property is only known to our code
let isRead = Symbol('isRead');
messages[0][isRead] = true;

// now third-party code probably won't see our extra property

// Although symbols allow to lower the probability of prbolems, using Weakset is better 
// from the architectural point of view

// ########################################################################################

// Store read dates
// importance: 5
// There’s an array of messages as in the previous task. The situation is similar.

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

// The question now is: which data structure you’d suggest to store the information: 
// “when the message was read?”.

// In the previous task we only needed to store the “yes/no” fact. 
// Now we need to store the date, and it should only remain in memory 
// ntil the message is garbage collected.

// P.S. Dates can be stored as objects of built-in Date class, that we’ll cover later.

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Date object we'll study later

// ########################################################################################


// Sum the properties
// importance: 5
// There is a salaries object with arbitrary number of salaries.

// Write the function sumSalaries(salaries) that returns the sum of 
// all salaries using Object.values and the for..of loop.

// If salaries is empty, then the result must be 0.

// For instance:

let salaries = {
	"John": 100,
	"Pete": 150,
	"Mary": 200
};

alert( sumSalaries(salaries) ); // 650

function sumSalaries(salaries) {
	let sum = 0;

	for (let salary of Object.values(salaries)) {
		sum += salary;
	}

	return sum
}

// ########################################################################################

// Count properties
// importance: 5
// Write a function count(obj) that returns the number of properties in the object:

let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2

function count(obj) {
	return Object.keys(obj).length;
}

// here we see that the Object.keys(obj) brings back an array that we use the length to obtain
// its size

// ########################################################################################

// Destructuring assignment
// importance: 5
// We have an object:

let user = {
	name: 'John',
	years: 30
};

// Write the destructuring assignment that reads:

// name property into the variable name.
// years property into the variable age.
// isAdmin property into the variable isAdmin (false, if no such property)

// Here’s an example of the values after your assignment:

let user = { name: "John", years: 30 };

// your code to the left side:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false

// ## Attempt at Solution

let user = { name: "John", years: 30 };
let {name, years: age, isAdmin = false} = user;

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false

// ########################################################################################

// The maximal salary
// importance: 5
// There is a salaries object:

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

// Create the function topSalary(salaries) that returns the name of the top-paid person.

// If salaries is empty, it should return null.
// If there are multiple top-paid persons, return any of them.
// P.S. Use Object.entries and destructuring to iterate over key/value pairs.

function topSalary(salaries) {

	let maxSalary = 0;
	let maxName = null;

	for(const [name, salary] of Object.entries(salaries)) {
		// Object.entries makes an array out of the object's keys:value
		// the for of loop takes every pair of keys:value and iterates over it
		// in this case we named it [name, salary] because of the object, but
		// could actually be anything we wanted to;
		if (maxSalary < salary) {
			maxSalary = salary;
			maxName = name;
		}
	}

	return maxName;

}

