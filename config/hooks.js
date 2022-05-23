export default {
  "content:file:beforeInsert": (document) => {
    if (document.extension === ".md") {
      const { text } = require("reading-time")(document.text);
      document.readingTime = text;
    }
  },
};
