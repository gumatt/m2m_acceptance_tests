# M2M Acceptance Tests

This project contains acceptance tests for the Powerhouse M2M project.  

I plan to write acceptance tests for cards, as I create them and add them to this repository. 

## Pre-requisites/Setup

install testcafe (I installed locally to the project not globally on my machine)

```
yarn add testcafe
```

or

```
npm install -S testcafe
```

## Running Tests

From the acceptance_tests directory you can execute all tests.

```
testcafe [browser_list] **/*tests.js
```

other command line options are available in the [cli docs for testcafe](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-t-pattern---test-grep-pattern)
