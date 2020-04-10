// Write CRUD endpoints for the `accounts` resource. Use the `db` object imported from `data/dbConfig.js` for database access via `knex`.
// Manually test your endpoints with a REST client like `Insomnia` or `Postman` to check they are working as expected.
const express = require('express');

// DB access using knex
const db = require('../data/dbConfig.js'); // connection to the DB

const router = express.Router();

// Read of CRUD 
// Implement a GET request to pull in all of the accounts and budgets
// router.get('/', (req, res) => {
//   // get the data from the db
//   // select * from accounts;
//   db.select('*')
//     .from('accounts') // returns a promise
//     .then(rows => {
//       res.status(200).json({ data: rows }); // Worked on Postman
//     })
//     .catch(error => {
//       res.status(500).json({ message: 'Sorry, could Not pull in your accounts and budgets from the table' });
//     });
// });

// Read of CRUD
router.get('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first() // the library knows we always want the first element of the array
    .then(account => { // I will get a collection/array back because it's relational db
      if (account) {
        res.status(200).json({ data: account }); // returns an obj instead of an array - Worked on Postman
      } else {
        res.status(404).json({ message: "Account Not Found" }); // always show the right message
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Sorry, ran into an error" }); 
    });
});

// Create of CRUD - Add some data with insert
router.post('/', (req, res) => {
  db('accounts')
    .insert(req.body, "id") // second argument for postgress - it doesn't return an id automatically
    .then(ids => {
    res.status(201).json({ newID: ids }) // SQLite3 will return an array of ids - Worked on Postman
  }) 
  .catch(error => {
    res.status(500).json({ message: "Sorry, could Not add the new data to the table" });
  });
});

// Update of CRUD - Filter with update - PATCH or PUT
router.put('/:id', (req, res) => {
  const changes = req.body;

  db("accounts")
    .where({ id: req.params.id }) // Will not delete unless there's a value.
    .update(changes) // You gotta tell it what to do - return, update or delete it. Update the records - Magic line
    .then((count) => {
      if (count > 0) {
        // If you can't update the record, it's going to return 0 - falsy - don't rely on it.
        res.status(200).json({ message: "record updated successfully" }); // I only want to change the account or budget - Worked on Postman
      } else {
        res.status(400).json({ message: "Account Not Updated" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Sorry, ran into an error" }); // Always catch it.
    });
});

// Delete of CRUD - del - filter with ID so that it doesn't delete everything. 
router.delete('/:id', (req, res) => {
  db("accounts")
    .where({ id: req.params.id }) // Will not delete unless there's a value.
    .del() // You gotta tell it what to do - return, update or delete it. Delete the records - Magic line
    .then((count) => {
      if (count > 0) { // If you can't find the record, it's going to return 0 - falsy - don't rely on it.
        res.status(200).json({ message: "record deleted successfully" }); // Worked on Postman
      } else {
        res.status(400).json({ message: "Account Not Found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Sorry, ran into an error" }); // Always catch it. 
    })
});

/* Stretch Problems 
- Add a `query string` option to your `GET /api/accounts` endpoint. The `query string` may contain `limit`, `sortby` and `sortdir` keys. If these keys are provided, use these values to limit and sort the `accounts` which are selected from the database. Reference the docs for sorting and limiting in `knex`.

```js
// sample req.query object
{
  limit: 5,
  sortby: 'id',
  sortdir: 'desc'
}
```
*/
// Pull in the limit (5) and sorted accounts that were selected from the db. 
// queryString
router.get('/', (req, res) => {
  console.log('get /')
  console.log(req.query)
  const orderby = req.query.orderby || 'id';
  const limit = req.query.limit || -1;
  const sortdir = req.query.sortdir || 'asc';

  db('accounts')
    .limit(limit)
    .orderBy(orderby, sortdir)
    .then(account => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(400).json({ message: "accounts not found" })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'error fetching budget', err });
    });
});

module.exports = router;

