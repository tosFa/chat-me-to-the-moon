import React from 'react';
import { shallow, mount } from 'enzyme';
import CSSModules from 'react-css-modules';
import Container
  from '../../../../../src/common/components/layout/Container';
import styles from '../../../../../src/common/components/layout/Container/styles.css';

describe("Container component", function() {

  it("Has class container", function() {
    const c = shallow(<Container/>);
    expect(c.find('.container').length).toBe(1);
  });

  it("Renders the children", function() {
    const InnerComponent = props => <div className="test"/>;
    const c = mount(<Container><InnerComponent/></Container>);

    expect(c.contains(<div className="test"/>)).toBe(true);
  });

});