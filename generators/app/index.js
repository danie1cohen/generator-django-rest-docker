'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('generator-django-rest-docker') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?',
      default: this.appname
    }, {
      type: 'confirm',
      name: 'useSentry',
      message: 'Would you like to enable Sentry error collection?',
      default: true
    }, {
      type: 'confirm',
      name: 'createDockerCompose',
      message: 'Would you like to create a docker-compose.yml file?',
      default: true
    }, {
      type: 'confirm',
      name: 'useLdap',
      message: 'Would you like to enable LDAP authentication?',
      default: false
    }, {
      type: 'confirm',
      name: 'useCelery',
      message: 'Would you like to add a celery worker?',
      default: false
    }];

    return this.prompt(prompts).then(props => {
      props.secretKey = this._generateSecretKey();
      this.props = props;
    });
  }

  _generateSecretKey() {
    var choices = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    choices += '0123456789!#$%&()*+,-./:;<=>?@[]^_`{|}~';

    var secretKey = '';
    while (secretKey.length < 50) {
      secretKey += choices[Math.floor(Math.random() * choices.length)];
    }
    return secretKey; // .substr(0, 50);
  }

  writing() {
    var files = [
      'projectName/__init__.py',
      'projectName/settings.py',
      'projectName/urls.py',
      'projectName/wsgi.py',
      '.coveragerc.',
      '.env',
      '.travis.yml',
      'Dockerfile',
      'entrypoint.sh',
      'logging.yml',
      'manage.py',
      'README.md',
      'requirements.txt',
      'Vagrantfile',
    ];
    if (this.props.createDockerCompose === true) {
      files.push('docker-compose.yml');
    }
    for (var i = 0; i < files.length; i++) {
      var templatePath = files[i];
      var destPath = templatePath;

      if (destPath.includes('projectName') === true) {
        destPath = destPath.replace(
            'projectName', this.props.projectName
        );
      }

      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destPath),
        this.props
      );
    }
  }

  install() {
    //this.installDependencies();
  }
};
