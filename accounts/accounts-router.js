const db = require("../data/dbConfig.js");
const express = require("express");

const router = express.Router();

// | field  | data type        | metadata                                            |
// | ------ | ---------------- | --------------------------------------------------- |
// | id     | unsigned integer | primary key, auto-increments, generated by database |
// | name   | string           | required, unique                                    |
// | budget | numeric          | required                                            |

router.get("/", (req, res) => {
  //   const a = await db("accounts");
  //   console.log(a);
  //   res.status(200).end();
  db("accounts").then(acc => {
    console.log(acc);
    res.status(200).json(acc);
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  db("accounts")
    .insert({ name: req.body.name, budget: req.body.budget })
    .then(account => res.status(201).json(account))
    .catch(err => console.log(err));
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(u => {
      res.status(200).json({ message: "Success", update: u });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(d => {
      res
        .status(200)
        .json({ message: "DELETED", d: d })
        .catch(err => {
          res.status(500).json({ message: "Error deleteing" });
        });
    });
});

module.exports = router;
