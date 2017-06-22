import path from 'path';
import pluginTester from 'babel-plugin-tester';
import babelInjectRunPlugin from '../babel-inject-run-plugin';

pluginTester({
  plugin: babelInjectRunPlugin,
  fixtures: path.join(__dirname, '__fixtures__')
})