'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./json-reactform.cjs.prod.js");
} else {
  module.exports = require("./json-reactform.cjs.dev.js");
}
