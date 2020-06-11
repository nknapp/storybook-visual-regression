import initStoryshots from "@storybook/addon-storyshots";
import { createTunnel, closeTunnel } from "../test-utils/reverse-tunnel";
import { startStorybook, stopStorybook } from "../test-utils/storybook-service";
const { toMatchImageSnapshot } = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot });

import path from "path";

import WebDriver from "webdriver";

// Storybook must run on port 6006

const sizes = ["1280x1024", "1024x768", "800x600", "320x640"];

const browsers = [
  {
    id: "chrome",
    capabilities: {
      browserName: "chrome",
    },
  },
  {
    id: "firefox",
    capabilities: {
      browserName: "firefox",
    },
  },
];

let webdriverTargets;

beforeAll(async () => {
  await createTunnel();
  await startStorybook();

  webdriverTargets = await Promise.all(
    browsers.map(async (browser) => {
      return {
        browserId: browser.id,
        session: await WebDriver.newSession({
          hostname: process.env.SELENIUM_HOST || "localhost",
          port: 24444,
          path: "/wd/hub",
          capabilities: browser.capabilities,
        }),
      };
    })
  );
}, 60000);

afterAll(async () => {
  if (webdriverTargets != null) {
    await Promise.all(
        webdriverTargets.map(async (webdriverTarget) => {
          try {
            webdriverTarget.session.deleteSession();
          } catch (error) {
            console.error(error);
          }
        })
    );
  }
  await closeTunnel().catch(console.error);
  await stopStorybook().catch(console.error);
});

sizes.forEach((size) => {
  describe("For window size " + size, () => {
    let testMethod = async (story) => {
      await Promise.all(
        webdriverTargets.map(async ({ browserId, session }) => {
          const [width, height] = size.split("x").map(Number);
          await session.setWindowRect(0, 0, width, height);
          await session.navigateTo(
            `http://localhost:6006/iframe.html?id=${encodeURIComponent(
              story.story.id
            )}`
          );
          const screenshotData = await session.takeScreenshot();
          const screenshotBinary = Buffer.from(screenshotData, "base64");
          const directory = path.join("__image_snapshots__", story.story.id);
          expect(screenshotBinary).toMatchImageSnapshot({
            customSnapshotsDir: directory,
            customSnapshotIdentifier: `${story.story.id}-${size}-${browserId}`,
          });
        })
      );
    };
    testMethod.timeout = 10000;

    initStoryshots({
      suite: "All",
      test: testMethod,
    });
  });
});
