const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

module.exports = [
  function sanitizeBodyAndQueryParameters (req, res, next) {
    // This process covers post & get requests by sanitizing its properties before moving to to the controller
    // Iterating all body properties
    let { body, query } = req;

    if (body) {
      body = iterateObject(body);
    }
    
    // Iterating all query parameters
    if (query) {
      query = iterateObject(query);
    }

    // Moving on to the next step (controller method)
    next();
  }
];

//Main iterator - diving into object parameters
const iterateObject = object => {
  for (let key in object) {
    let property = object[key];
    let clean = null;
    if(isObjectOrArray(property)){
      clean = iterateObject(property);
    }else{
      if(isBoolean(property)){
        clean = property;
      }else{
        if(isNaN(property)){
          clean = DOMPurify.sanitize(property);
        }else{
          clean = property;
        }      }
    }
    object[key] = clean;
  }
  return object;
}

// Helpers
const isObjectOrArray = value => {
  return value && (typeof value === 'object' && value.constructor === Object || Object.prototype.toString.call(value) === '[object Array]');
}

const isBoolean = value => {
  return typeof value === 'boolean';
}
