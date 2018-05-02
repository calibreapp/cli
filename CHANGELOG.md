### 1.0.8 - 2018-05-03

* Fixed path issue

### 1.0.7 - 2018-05-02

* Added `calibre site create <name> [options]` command.
* Added `calibre site delete` command.
* Added `calibre site create-page` command.
* Added `calibre site update-page` command.
* Added `calibre site delete-page` command.
* Added `calibre site create-test-profile` command.
* Added `calibre site update-test-profile` command.
* Added `calibre site delete-test-profile` command.
* Added `--metrics` flag to `calibre site get-pulse-metrics` command. Specify the metrics you’d like returned.
* Added Node.js example for creating a site using the new Site.create method.
* Added Node.js example that demonstrates how to create a single page test from every Calibre testing location.
* Cleaned up internal error handling.

### 1.0.6 - 2018-04-14

* The `calibre test create` command now accepts a --cookie-jar flag. It‘ll use a netscape formatted cookie-jar for a given test.
