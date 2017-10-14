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
import {makeSelectUser, makeSelectIsAuthenticated, makeSelectLocationState} from './selectors';
import {connect} from 'react-redux';

import {signOut} from './actions';

import {browserHistory} from 'react-router';
import {Dimmer, Loader} from "semantic-ui-react";

// import {purgeReduxState} from '../../app'

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const childrenStyle = {minHeight: '100vh', paddingTop: '25px' /*background: `url(${homeBackground})`*/};

export class App extends React.PureComponent {
// export function App(props) {
  constructor() {
    super();

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 1000);
  }


  render() {
    const {loading} = this.state;

    return (
      <AppWrapper style={{overflowX: 'hidden'}}>
        <Helmet
          titleTemplate="%s - Ballyhooawards"
          defaultTitle="Ballyhooawards"
          meta={[
            {name: 'description', content: 'Ballyhooawards'},
          ]}
        />
        {loading ? (
          <Dimmer inverted style={{background:'#fbbd08'}} active>
            <Loader style={{color:'#000'}} inverted size={'big'}>لطفا منتظر بمانید...</Loader>
          </Dimmer>
        ) : (
          <div>
            <Header signOut={this.props.onSignOut} user={this.props.user} isAuthenticated={this.props.isAuthenticated}/>
            <div style={childrenStyle}>
              {React.Children.toArray(React.cloneElement(this.props.children, {
                isAuthenticated: this.props.isAuthenticated,
                user: this.props.user
              }))}
              {/*{React.Children.toArray(this.props.children)}*/}
            </div>
            <Footer />
          </div>
        )}
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  isAuthenticated: makeSelectIsAuthenticated(),
  locationChange: makeSelectLocationState()
});

export function mapDispatchToProps(dispatch) {
  return {
    onSignOut: (evt) => {
      dispatch(signOut())
      // purgeReduxState()
      browserHistory.push('/')
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));

// export default withProgressBar(App);
