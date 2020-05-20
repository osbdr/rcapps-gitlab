
# Tests

This directory contains a set of automated tests for the app and is used by the GitHub Action as well.

## How does it work?

- The scripts use the docker-compose to start a preconfigured rocketchat instance and then wait until it started. 
- deploy the app to the instance (rc-apps)
- run the `jest` test suite with `npm test`

>Warning: This test suite is far from ideal. Currently it only validates that there is a `200: OK` response but does not verify the generated message within the channel.

## How to use

When you want to use the automated scripts (`run.bat` or `run.sh`) you need to have Docker and docker-compose installed.
Furthermore make sure that you have all dependencies installed. The scripts don't execute any `npm install` commands.

You can also use the tests without docker but then you will have to provide an instance of Rocket.Chat (not recommended).

### Example for Linux

#### Automated tests

```
$ (cd .. && npm install)
$ (cd app && npm install)
$ ./run.sh
```

#### Manual tests

> Make sure to edit the test suite to match your configuration!

```
$ (cd .. && npm install)
$ (cd app && npm install)
$ (cd app && npm test)
```