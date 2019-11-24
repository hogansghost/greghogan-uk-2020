import { bem } from '/helpers/bem';
import { module, test } from 'qunit';

module('Unit | Helper | format currency', () => {
  test('formats 199 with $ as currency sign', (assert) => {
    assert.equal(bem("some-class-name", { keyOne: true, keyTwo: false }), 'some-class-name some-class-name--key-one');
  });
});