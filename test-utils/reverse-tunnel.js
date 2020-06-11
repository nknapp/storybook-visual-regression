const chisel = require.resolve("./chisel_1.5.2_linux_amd64");
const ChildService = require("child-service");
const debug = require("debug")("test-react-app:run-storybook");

const seleniumhost = process.env.SELENIUM_HOST || 'localhost'

const chiselService = new ChildService({
  name: "reverse-tunnel",
  command: chisel,
  args: [
    "client",
    seleniumhost + ":2222",
    "R:6006:localhost:6006",
  ],
  readyRegex: / Connected /,
});

module.exports = {
  async createTunnel() {
    debug("Creating tunnel");
    await chiselService.start();
    debug("Tunnel created");
  },
  async closeTunnel() {
    debug("Closing tunnel");
    await chiselService.stop();
    debug("Tunnel closed");
  },
};
