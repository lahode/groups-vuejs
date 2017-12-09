import { expect } from 'chai';
import Component from 'vue-class-component';
import { ComponentTest } from '../../util/component-test';
import { GroupComponent } from './group';

describe('About component', () => {
  let directiveTest: ComponentTest;
  beforeEach(() => {
    directiveTest = new ComponentTest('<div><group groupID="GtAat0n1wZGF03TZ"></group></div>', { 'group': GroupComponent });
  });

  it('should contain a button "Back To Home"', async () => {
    debugger;
    directiveTest.createComponent();

    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.btn-primary').innerHTML).to.equal('Back To Home');
    });
  });

  it('should contain "Details on group \'IDEVELOP\'" as group title ', async () => {
    debugger;
    directiveTest.createComponent();

    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('h2').innerHTML).to.equal("Details on group 'IDEVELOP'");
    });
  });

});
