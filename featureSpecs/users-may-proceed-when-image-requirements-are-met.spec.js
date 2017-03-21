import React from 'react';
import {mount, render} from 'enzyme';
import App from '../src/components/App';

jest.mock('../src/stores/UserImageStore');

describe('Feature: Users may proceed when image requirements are met', () => {
  let props = {minImages: 2}
  beforeEach(() => {
    require('../src/stores/UserImageStore').default.__reset();
  });

  describe('when the minimum number of images is NOT met', () => {
    it('disables the proceed button', () => {
      const component = render(<App {...props}/>)

      expect(component.find('.fpImageUploader-ProceedButton').first().attr('disabled')).toEqual('disabled');
    });
  });

  describe('when the minimum number of images is met', () => {
    it('enables the proceed button', () => {
      const FakeUserImageStore = require('../src/stores/UserImageStore').default;
      const component = mount(<App {...props}/>)

      FakeUserImageStore.__setNumImages(2);
      let button = component.render()
        .find('.fpImageUploader-ProceedButton').first();

      expect(button.attr('disabled')).toEqual(undefined);
    });
  });
});