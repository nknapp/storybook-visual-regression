const chisel = require.resolve("./chisel_1.5.2_linux_amd64");
const ChildService = require("child-service");
const debug = require("debug")("test-react-app:run-storybook");

const service = new ChildService({
  name: "storybook",
  command: process.argv0,
  args: [
    require.resolve("@storybook/react/bin/index.js"),
    "-p",
    "6006",
    "-s",
    "public",
    "--quiet",
    "--ci",
  ],
  readyRegex: /Storybook.*started/,
  spawnOptions: {
    stdio: ['pipe','pipe','inherit']
  }
});

module.exports = {
  async startStorybook() {
    if (process.env.START_STORYBOOK !== "true") {
      console.error("Not starting storybook.");
      return;
    }
    debug("Creating storybook");
    await service.start();
    debug("Storybook created");
  },
  async stopStorybook() {
    if (process.env.START_STORYBOOK !== "true") {
      console.error("Not stopping storybook.");
      return;
    }
    debug("Stopping storybook");
    await service.stop();
    debug("Storybook stopped");
  },
};
