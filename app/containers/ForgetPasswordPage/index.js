/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import 'semantic-ui-css/semantic.min.css';
import {Link} from 'react-router';

import {makeSelectRepos} from 'containers/App/selectors';
import H2 from 'components/H2';
import H3 from 'components/H3'
import H4 from 'components/H4'
import CenteredSection from './CenteredSection';
import messages from './messages';
import {
  clearLoading,
  changeEmail,
  forgetPassword,
  clearMessages,
  forgetPasswordError,
  forgetPasswordSuccess
} from './actions';
import {
  makeSelectEmail,
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess
} from './selectors';

import {
  Button, Card, Checkbox, Container, Divider, Dropdown, Form, Grid, Header, Icon, Label, Message, Popup, Radio,
  TextArea
} from 'semantic-ui-react';


const mainStyle = {padding: '2% 4%'};
const loginFormContainerStyle = {/*background: 'rgba(255, 213, 79,0.9)', border: 'solid 1px rgba(255, 213, 79,1.0)', borderRadius: '3px'*/}
const loginFormStyle = {padding: '10px', textAlign: 'center'}
const signupLinkStyle = {color: 'rgba(255, 179, 0,1.0)'}


export class ForgetPasswordPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  state = {
    email: ''
  }

  componentDidMount() {
    this.props.clearLoading()
    this.props.clearMessages()
  }

  render() {
    const {loading, error, repos} = this.props;

    return (<article>
      <Helmet
        title="فراموشی رمز عبور"
        meta={[
          {name: 'description', content: 'BallyhooAwards-ForgetPassword'}
        ]}
      />
      <div style={mainStyle}>
        <CenteredSection>
          <div style={{paddingBottom: '20px'}}>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
          </div>
          <Grid centered doubling>
            <Grid.Row>
              <Grid.Column mobile={12} computer={8} style={loginFormContainerStyle}>
                <Form loading={this.props.loading} onSubmit={this.props.onSubmitForm} style={loginFormStyle}>
                  <Form.Field>
                    <label>ایمیل</label>
                    <input required value={this.props.email} style={{direction: 'ltr'}} placeholder='ایمیل' onChange={this.props.onChangeEmail}/>
                  </Form.Field>
                  <Button color="green">فراموشی رمز عبور</Button>
                </Form>{this.props.error && this.props.error !== false ? (
                <Message negative>
                  <Message.Header>خطا!</Message.Header>
                  <p><FormattedMessage {...messages[this.props.error]} /></p>
                </Message>) : (null)}
                {this.props.success && this.props.success !== false ? (
                  <Message positive>
                    <Message.Header>درخواست شما ثبت شد!</Message.Header>
                    <p><FormattedMessage {...messages[this.props.success]} /></p>
                  </Message>) : (null)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </CenteredSection>
      </div>
    </article>)
  }
}

ForgetPasswordPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.any,
  onSubmitForm: React.PropTypes.func,
  onChangeEmail: React.PropTypes.func
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onSubmitForm: () => {
      dispatch(forgetPassword());
    },
    clearLoading: () => {
      dispatch(clearLoading())
    },
    clearMessages: () => {
      dispatch(clearMessages())
    }
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
  email: makeSelectEmail()
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ForgetPasswordPage));
