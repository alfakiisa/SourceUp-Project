const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //testIsolation: false, // Add this line to disable test isolation
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
  },
});
