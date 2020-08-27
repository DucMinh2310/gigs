const express = require("express");
const db = require("../config/database");
const Gig = require("../models/Gig");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  Gig.findAll()
    .then((gigs) => res.render("gigs", { gigs: gigs }))
    .catch((err) => {
      throw err;
    });
});

// display add gig form
router.get("/add", (req, res) => {
  res.render("add");
});

// add a gig
router.post("/", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  technologies = technologies.toLowerCase().replace(/,[ ]+/g, ",");

  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email,
  })
    .then((newlyGig) => {
      res.redirect("/gigs");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/search", (req, res) => {
  const { term } = req.query;
  Gig.findAll({
    where: {
      technologies: {
        [Op.like]: "%" + term + "%",
      },
    },
  })
    .then((gigs) => {
      res.render("gigs", { gigs: gigs });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
