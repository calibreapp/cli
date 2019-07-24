workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Tag" {
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Build" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "install"
}

action "Pre" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "run pre-publish"
}

action "Publish" {
  needs = "Pre"
  uses = "actions/npm@master"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}
