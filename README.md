# Usage

```bash
npx storybook -p 6006 -s public &
yarn test
```

# Storybook visual testing 

Rational: 
* E2E-Testing: Fragile, slow, hard to maintain,
* Jest-Snapshots: Hard to read, difficult to maintain, don't cover styling
* Storybook stories cover different component states
* Why not take screenshot of storybook-stories

Requirements
* Must work on local-machine
* Must work in CI/CD
* Must work in combination of both

##  Existing solutions

* Storyshot
  * Jest-Snapshots by default
  * Add-ons for puppeteer, selenium, browserstack etc.
    * Addons for selenium is broken (does not releaes browsers)
* Chromatic (paid service)
* ...

## Self-hosted solution with storyshot

* TBD: How are different input, interaction tested with storyshot

### Puppeteer

* The "font"-problem
* Only one browser (no IE, no firefox (yet))

## Using Selenium

No interaction, just load a storybook-page an d
 
### Selenium-Server in the infrastructure

* Must be setup and maintained
* Builds don't work outside this infrastructure

## Selenium as a Service

* Browserstack
* Saucelabs

(149-300 €/month )

### Docker-compose

Why not use docker-compose to start a selenium-hub with multiple browsers

* How to access storybook-server from Selenium
  * `host.docker.internal` -> Only on Mac, not in CI/CD
  * custom network with fixed IPs (may break)
  * dynamically determine IPs to connect to host
    * complicated, hard to understand, fragile
  * All three solutions require the storybook-server to listen to other than 127.0.0.1
  * All three solutions require different setup in CI/CD and on local computer
* Access statically compiled storybook, mounted as volume in selenium-containers
  * Works on local machine (Linux at least)
  * Does this work on gitlab-ci?
* Reverse SSH-Tunnel
  * Seems overengineered, but might just work.
  * Same setup in local computer and CI/CD
  * Connection to storybook-server comes from localhost
  * Packages are available
    * Docker: panubo/sshd as entrypoint, with ssh-port exposed to docker
    * npm: `reverse-tunnel-ssh` to start tunnel before running tests
* Host networking
  * https://robotninja.com/blog/introduction-using-selenium-docker-containers-end-end-testing/
  * does not work in CI/CD
  * Not possible with multiple containers (hub + nodes)
    
* Alternative selenium images.
  * https://github.com/elgalu/docker-selenium

* Internet Explorer
  * Virtualbox Image, has selenium driver?
  


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
