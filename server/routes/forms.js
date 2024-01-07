const express = require("express");
const router = express.Router();
const { formSch } = require("../models/formModel");


router.get("/", async (req, res) => {
  try {
    const forms = await formSch.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const form = await formSch.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {

  const form = new formSch({
        title: req.body.title,
        inputFields: req.body.inputFields,
      });

  try {
    // const found = await formSch.findOne({ title: req.body.title });  
    //   if(found) throw new Error(`Form With Title ${req.body.title} already exist`);
      const newForm = await form.save();
      res.status(201).json(newForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const form = await formSch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const form = await formSch.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json({ message: "Form deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
