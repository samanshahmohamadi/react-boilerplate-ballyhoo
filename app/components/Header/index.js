import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from './A';
import Img from './Img';
import Button from '../Button';
import H3 from '../H3';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import StyledButton from '../Button/StyledButton';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static defaultProps = {
    isAuthenticated: false,
    user: {}
  };

  constructor(props) {
    super(props);
  }

  handleLogout = () => {

  }

  render() {

    return (
      <div style={{background: '#fbbd08', paddingRight: '5%', paddingLeft: '5%'}}>
        {/* <A href="https://twitter.com/mxstbr">
         <Img src={Banner} alt="react-boilerplate - Logo" />
         </A>*/}
        <NavBar>
          <HeaderLink style={{float: 'right'}} to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          {this.props.isAuthenticated === true ?
            (<div>
              <HeaderLink style={{float: 'right'}} to="/gallery">
                گالری
              </HeaderLink>
              <HeaderLink style={{float: 'left'}} onClick={this.props.signOut}>
                خروج
              </HeaderLink>
            </div>) : (null)
          }
        </NavBar>
      </div>
    );
  }
}

export default Header;
