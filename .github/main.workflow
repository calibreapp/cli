workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "test"
}

action "Tag" {
  needs = "Test"
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Pre" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "run pre-publish"
}

action "Publish" {
  needs = "Pre"
  uses = "actions/npm@master"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}
