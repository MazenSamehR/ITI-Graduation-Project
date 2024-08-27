const express = require("express");
const router = express.Router();

const Platform = require("../models/Platform");

router.get("/platforms", (req, res) => {
  Platform.find()
    .then((result) => {
      res.json({
        status: "SUCCESS",
        message: "Platforms fetched successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "Error in fetching platforms",
      });
    });
});

router.post("/add-platform", (req, res) => {
  const platform = new Platform({
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    id: req.body.id,
    slug: req.body.slug,
    games_count: req.body.games_count,
    image_background: req.body.image_background,
    image: req.body.image,
    year_start: req.body.year_start,
    year_end: req.body.year_end,
    games: req.body.games,
  });

  platform
    .save()
    .then((result) => {
      res.json({
        status: "SUCCESS",
        message: "Platform added successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "Error in adding platform",
      });
    });
});

router.delete("/delete-platform/:id", async (req, res) => {
  try {
    const platform = await Platform.findByIdAndDelete(req.params.id);
    if (!platform) {
      return res.json({
        status: "FAILED",
        message: "Platform not found",
      });
    }
    res.json({
      status: "SUCCESS",
      message: "Platform deleted successfully",
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: "Error in deleting platform",
    });
  }
});

module.exports = router;
