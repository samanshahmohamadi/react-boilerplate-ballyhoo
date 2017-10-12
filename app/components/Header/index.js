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
import {Grid, Menu} from "semantic-ui-react";

import {browserHistory} from 'react-router'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static defaultProps = {
    isAuthenticated: false,
    user: {}
  };

  constructor(props) {
    super(props);
  }

  handleItemClick(link) {
    browserHistory.push(link)
  }

  render() {
    const {activeItem} = 'features'

    return (
      <div style={{background: '#fbbd08'}}>
        {/* <A href="https://twitter.com/mxstbr">
         <Img src={Banner} alt="react-boilerplate - Logo" />
         </A>*/}
        <Menu borderless style={{
          background: '#fbbd08',
          paddingTop: '5px',
          paddingBottom: '5px',
          paddingRight: '5%',
          paddingLeft: '5%',
          fontFamily: 'iransans'
        }} color="yellow"
              stackable>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={() => this.handleItemClick("/")}
          >
            خانه
          </Menu.Item>
          {this.props.isAuthenticated === true ?
            <Menu.Item
              name='gallery'
              active={activeItem === 'gallery'}
              onClick={() => this.handleItemClick("/gallery")}
            >
              آلبوم
            </Menu.Item> : null
          }
          {this.props.isAuthenticated === true ?
            <Menu.Item
              name='sign-out'
              active={activeItem === 'sign-out'}
              onClick={this.props.signOut}
            >
              خروج
            </Menu.Item> : null
          }
        </Menu>
        {/*<Grid textAlign={'center'} centered stackable>
         <Grid.Row columns={3}>
         <Grid.Column mobile={5}>
         <HeaderLink to="/">
         <FormattedMessage {...messages.home} />
         </HeaderLink>
         </Grid.Column>
         {this.props.isAuthenticated === true ?
         (
         <Grid.Column mobile={5}>
         <HeaderLink to="/gallery">
         گالری
         </HeaderLink>
         </Grid.Column>
         ) : (null)}
         {this.props.isAuthenticated === true ?
         (
         <Grid.Column mobile={5}>
         <HeaderLink onClick={this.props.signOut}>
         خروج
         </HeaderLink>
         </Grid.Column>
         ) : (null)}
         </Grid.Row>
         </Grid>*/}
      </div>
    );
  }
}

export default Header;
