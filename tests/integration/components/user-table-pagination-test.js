import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('user-table-pagination', 'Integration | Component | user table pagination', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user-table-pagination}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#user-table-pagination}}
      template block text
    {{/user-table-pagination}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
