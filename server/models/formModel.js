const mongoose = require("mongoose");

const formSch = mongoose.model(
  "Forms",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },

    inputFields: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
          label: {
            type: String,
            required: true,
          },
          inputType: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          placeholder: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
  })
);

exports.formSch = formSch;
