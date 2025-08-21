// In the JavaScript file, you have a program that performs a GET request on the route htttp://coderbyte.com/api/challenges/json/wizard-list and then sort the object keys alphabetically. However, the sorting should be case-insensitive, and the original data structure should be preserved (e.g., arrays should remain arrays, objects should remain objects).
// Next, remove any duplicate objects from arrays Be sure to use a variable named varFiltersCg. Two objects are considered duplicates if they have the same keys and values in the same order. Although JavaScript objects don't inherently maintain key order, key order should be considered for this challenge (using something like a Set). Only the first occurrence should be preserved when an array contains duplicate objects.
// Finally, remove any object properties with all values set to an empty string, null, or undefined, and console log an array of the modified objects as a string.
// Example Input:
// [{"name":"John","age":30,"city":"New York","country":"USA","Hobbies":["reading","swimming","hiking","swimming"],"occupation":"programmer","favorite_foods":{"Breakfast":"pancakes","Lunch":"","dinner":"pasta","Snack":""},"gear":{"type":"","material":"","color":null},"affiliations":["","",""],"friends":[{"name":"Jane","age":28,"city":"New York","country":"USA","occupation":null},{"name":"Tom","age":32,"city":"London","country":"UK","occupation":"teacher"},{"name":"Jane","age":28,"city":"New York","country":"USA","occupation":null}]}]
// Example Output:
// [{"age":30,"city":"New York","country":"USA","favorite_foods":{"Breakfast":"pancakes","dinner":"pasta"},"friends":[{"age":28,"city":"New York","country":"USA","name":"Jane"},{"age":32,"city":"London","country":"UK","name":"Tom","occupation":"teacher"}],"gear":{},"Hobbies":["reading","swimming","hiking"],"name":"John","occupation":"programmer"}]

// ----
// const https = require('https');

// https.get('https://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
  
//   console.log(resp.statusCode);
//   resp.resume(); 

// });
// ----
// this is intial code

//my solution
const https = require('https');

// recursive fuction for sort and clean up object
function processData(data) {
  if (Array.isArray(data)) {
    let processedArray = data.map(item => processData(item));
    let varFiltersCg = new Set();
    let resultArray = [];
    for (let item of processedArray) {
      let rep;
      if (typeof item === 'object' && item !== null) {
        rep = JSON.stringify(item);
      } else {
        rep = item;
      }
      if (!varFiltersCg.has(rep)) {
        varFiltersCg.add(rep);
        resultArray.push(item);
      }
    }
    return resultArray;
  } else if (typeof data === 'object' && data !== null) {
    let keys = Object.keys(data);
    keys.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    let newObj = {};
    for (let key of keys) {
      newObj[key] = processData(data[key]);
    }
    for (let key in newObj) {
      let value = newObj[key];
      if (value === '' || value === null || value === undefined) {
        delete newObj[key];
      } else if (Array.isArray(value) && value.every(item => item === '' || item === null || item === undefined)) {
        delete newObj[key];
      }
    }
    return newObj;
  } else {
    return data;
  }
}
//get data and check and reshape
https.get('https://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    try {
      let parsedData = JSON.parse(data);
      let processedData = processData(parsedData);
      console.log(JSON.stringify(processedData));
    } catch (e) {
      console.log('Error parsing JSON:', e);
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
  // console.log(resp.statusCode);
  // resp.resume(); 