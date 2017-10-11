/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

import homeBackground from './assets/home-back.jpg';

import {createStructuredSelector} from 'reselect';
import {makeSelectUser, makeSelectIsAuthenticated} from './selectors';
import {connect} from 'react-redux';

import {signOut, signOutSuccess, signOutError } from './actions';


const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const childrenStyle = {minHeight: '100vh', /*background: `url(${homeBackground})`*/};

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Header signOut={props.onSignOut} user={props.user} isAuthenticated={props.isAuthenticated} />
      <div style={childrenStyle}>
        {React.Children.toArray(React.cloneElement(props.children, {isAuthenticated: props.isAuthenticated, user: props.user}))}
        {/*{React.Children.toArray(props.children)}*/}
      </div>
      <Footer />
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  isAuthenticated: makeSelectIsAuthenticated()
});

export function mapDispatchToProps (dispatch) {
  return {
    onSignOut: (evt) => dispatch(signOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));

// export default withProgressBar(App);
