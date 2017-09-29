'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var generatorDir = path.join(__dirname, '../generators/app');

describe('generator-django-rest-docker:app', () => {
  beforeAll(() => {
    return helpers.run(generatorDir)
      .withPrompts({
        projectName: 'test_project',
        useSentry: true,
        createDockerCompose: true,
        useLdap: true,
        useCelery: true
      });
  });

  it('creates files', () => {
    assert.file([
      'requirements.txt'
    ]);
  });

  describe('._generateSecretKey', () => {
    it('generates a secret key', () => {
      let gen = helpers.createGenerator(generatorDir, []);
      let secretKey = gen._generateSecretKey();
      console.log(secretKey);
      expect(secretKey.length).toBe(50);
    });
  });

  it('sets projectName folder', () => {
    assert.file(['test_project/__init__.py']);
  });

  it('adds raven to requirements.txt', () => {
    fs.readFile('requirements.txt', 'utf8', function (err, data) {
      if (err) {
        console.error(err);
      }
      expect(data.includes('raven==')).toBe(true);
    });
  });

  it('creates docker compose file', () => {
    assert.file(['docker-compose.yml']);
  });
});
