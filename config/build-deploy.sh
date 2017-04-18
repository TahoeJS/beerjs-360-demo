#!/bin/sh

# Example bump uses
# Patch: sh ./build/build-deploy.sh
# Minor: sh ./build/build-deploy.sh minor
# Major: sh ./build/build-deploy.sh major

date=`date +%Y-%m-%d@%H:%M`
EMAIL_ADDRESS=$(git config user.email)
USERNAME=$(git config user.name)

purge() {
  echo -e "\033[33m--------------------------"
  echo -e "\033[33mPurging...."
  npm cache clean &&
  rm -rf node_modules
}

build() {
  echo -e "\033[33m--------------------------"
  echo -e "\033[33mInstalling and Building...."

  git pull origin master &&
  npm install --only=production

  echo -e "\033[32mBuild Success"
  echo -e "\033[32m--------------------------"
}

bumpVersion() {
  echo -e "\033[33m--------------------------"
  echo -e "\033[33mBumping...."

  bumpType="patch"
  # Potential Types: [prepatch, preminor, premajor, prerelease]
  # Available Types: [patch, minor, major] patch is the default so it is not passed
  if test "$1" = "minor" || test "$1" = "major"; then
    bumpType=$1
  fi

  VERSION=$(npm version $bumpType -m "$USERNAME bumped the version to %s for deployment to production on $date")

  if [ $VERSION ]
    then
      echo -e "\033[32mVersion bumped to" $VERSION
      echo -e "\033[32m--------------------------"
    else
      echo -e "\033[32mError bumping version"
      echo -e "\033[32m--------------------------"
      exit 0
  fi
}

deploy() {
  echo -e "\033[33m--------------------------"
  echo -e "\033[33mDeploying...."

  git push origin master --tag
  git push heroku master

  echo -e "\033[32mDeploy Success"
  echo -e "\033[32m--------------------------"
}

postDeploy() {
  npm install
}

purge &&
build &&
bumpVersion $1 &&
deploy &&
postDeploy
