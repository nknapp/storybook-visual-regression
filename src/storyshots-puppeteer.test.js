import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import path from "path";

const sizes = ["1280x1024", "1024x768", "800x600", "320x640"];

sizes.forEach((size) => {
  describe("with size " + size, () => {
    const [width, height] = size.split("x").map(Number);

    initStoryshots({
      suite: "Image storyshots",
      test: imageSnapshot({
        storybookUrl: "http://localhost:6006",
        beforeScreenshot: async (page) => {
          await page.setViewport({ width, height });
        },
        getMatchOptions: options => {
          const directory = path.join("__image_snapshots_puppeteer__", options.context.kind + "_" + options.context.story);
          return {
            customSnapshotsDir: directory
          }
        }
      }),
    });
  });
});
