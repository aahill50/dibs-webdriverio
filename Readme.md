
## Install the selenium jar

```sh
$ cd ~/projects
$ curl -O http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar
$ ln -s selenium-server-standalone-2.43.1.jar /usr/local/bin/selenium-server-standalone.jar
```

add this to your `.bash_profile` (or equivalent)

    export SELENIUM_JAR=/usr/local/bin/selenium-server-standalone.jar

then

```sh
$ source ~/.bash_profile
$ java -jar $SELENIUM_JAR
```

more info:
http://webdriver.io/guide.html

## Clone Repo, install and run test suite
```sh
$ git clone git@github.com:aahill50/dibs-webdriverio.git
$ cd dibs-webdriverio
$ npm install
$ npm start
```

