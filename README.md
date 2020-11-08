# Express Sanitzier Middleware

This middleware will enable _sanitizing_ requests on a _route-scope_, with minimum addition of code.

The main goal is to eliminate attemps to exploit XSS flaws on our express web server in order to keep sensitive back-end services working as usual.

The package uses minimal dependencies in order to simulate the browser's DOM and sanitize all requested data.
Packages: **DOMPurify, JSDom, Canvas**.

## Installation

1. `npm i express-route-sanitizer-middleware`

2. import into your Express app main file.

3. use as a middle-ware on a specific route/controller

### Example

```sh
const app = express();
import sanitizer from "express-sanitizer-middleware";
// Requests to this route will first go through the sanitizer
app.use('/users', sanitizer, require('./controllers/users-api'));

app.listen(port);
```

## That's it! The 'Users' controller will be now guarded by the sanitizer middleware.
