#!/usr/bin/env node

const { Socket } = require("net");

const host = process.argv[2];
const ports = process.argv.slice(3);
const maxWaitTime = 60 * 1000;
const retryInterval = 2000;

Promise.all(ports.map((port) => waitForPort(host, port))).then(
  () => console.log("All ports open"),
  (error) => console.error(error.message + error.stack)
);

async function waitForPort(host, port) {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitTime) {
    try {
      await checkPort(host, port);
      return;
    } catch (error) {
      if (error.code ==='ENOTFOUND') {
        throw error;
      }
      console.log(error);
      await delay(retryInterval)
    }
  }
  console.error(`Stop trying after ${maxWaitTime} ms.`)
}

async function checkPort(host, port) {
  const hostPort = `${host}:${port}`;
  console.log(`Checking ${hostPort}`);
  return new Promise((resolve, reject) => {
    const socket = new Socket();

    socket.on("timeout", () => {
      reject(new Error(`Timeout while waiting for ${hostPort}`));
    });

    socket.on("error", (error) => {
      reject(error);
    });

    socket.on("connect", () => {
      socket.destroy();
      resolve();
    });

    socket.connect(port, host);
  });
}

async function delay(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
