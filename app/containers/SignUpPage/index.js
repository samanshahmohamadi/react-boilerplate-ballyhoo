import React from 'react';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import 'semantic-ui-css/semantic.min.css';
import {Link} from 'react-router';

import {makeSelectError} from './selectors';
import {makeSelectLoading} from 'containers/App/selectors'
import H2 from 'components/H2';
import H3 from 'components/H3'
import H4 from 'components/H4'
import CenteredSection from './CenteredSection';
// import Input from './Input';
import Section from './Section';
import messages from './messages';
import {signUp} from './actions';

import {getCompanyActivity} from './dataHelper'


import {Button, Checkbox, Form, Grid, Dropdown, Input, Message, Divider} from 'semantic-ui-react';

const mainStyle = {padding: '2% 4%'};
const loginFormStyle = {padding: '10px'}
const signinLinkStyle = {color: 'rgba(255, 179, 0,1.0)'}

import {getCountries} from '../../utils/country'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  state = {formData: {email: '', password: ''}, countries: [], companyActivities: []}

  componentDidMount () {
    let countries = getCountries(true)
    let companyActivities = getCompanyActivity()
    this.setState({countries: countries, companyActivities: companyActivities})
  }

  handleInputChange = (e) => {
    this.setState({
      formData: {...this.state.formData, ...{[e.target.name]: e.target.value}}
    }, () => {
    })
  }

  handleDropdownChange = (e, data) => {
    const {name, value} = data
    this.setState({
      formData: {...this.state.formData, ...{[name]: value}}
    }, () => {
    })
  }

  handleSubmit = () => {
    // const {email, password, submittedEmail, submittedPassword} = this.state
    // this.setState({submittedEmail: email, submittedPassword: password})
    this.props.onSubmitForm(this.state.formData)
  }

  render () {
    const {email, password} = this.state
    const {loading, error, repos} = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };
    return (<article>
      <Helmet
        title="SignUp"
        meta={[
          {name: 'description', content: 'Ballyhooawards'}
        ]}
      />
      <div style={mainStyle}>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <H4>
            <Link style={signinLinkStyle} to="/"><FormattedMessage {...messages.alreadyHaveAccount} /></Link>
          </H4>
          <Divider/>
          <Form onSubmit={this.handleSubmit} style={loginFormStyle}>
            <Grid>
              <Grid.Row>

                <Grid.Column width={5}>
                  <H3><FormattedMessage {...messages.accountInfo}/></H3>
                  <Form.Field>
                    <label>ایمیل</label>
                    <input required={true} name="email" placeholder='ایمیل' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>نام</label>
                    <input required={true} name="name" placeholder='نام' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>نام خانوادگی</label>
                    <input required={true} name="lastName" placeholder='نام خانوادگی'
                                               onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>سمت</label>
                    <input required={true} name="job" placeholder='سمت' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>شماره تلفن</label>
                    <input required={true} name="phone" placeholder='شماره تلفن' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>رمز عبور</label>
                    <input required={true} type="password" name="password" placeholder='رمز عبور'
                                               onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>تکرار رمز عبور</label>
                    <input required={true} type="password" name="confirmPassword" placeholder='تکرار رمز عبور'
                                               onChange={this.handleInputChange}/>
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={5}>
                  <H3><FormattedMessage {...messages.companyInfo}/></H3>
                  <Form.Field>
                    <label>کشور</label>
                    <Dropdown style={{direction:'ltr'}} name="companyCountry" onChange={this.handleDropdownChange} placeholder='کشور' fluid
                              search selection options={this.state.countries}/>
                  </Form.Field>
                  <Form.Field>
                    <label>نوع فعالیت</label>
                    <Dropdown style={{direction:'ltr'}} name="companyActivity" onChange={this.handleDropdownChange} placeholder='نوع فعالیت'
                              fluid selection options={this.state.companyActivities}/>
                  </Form.Field>
                  <Form.Field>
                    <label>نام شرکت</label>
                    <input name="companyName" placeholder='نام شرکت' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>آدرس پستی</label>
                    <input name="postalAddress" placeholder='آدرس پستی' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>شهر</label>
                    <input name="city" placeholder='شهر' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>کد پستی</label>
                    <input name="postCode" placeholder='کد پستی' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>تلفن</label>
                    <input name="companyPhone" placeholder='تلفن' onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>وبسایت</label>
                    <Input style={{direction:'ltr', fontFamily:'Open Sans'}} label='http://' name="companyWebsite" placeholder='example.com'
                           onChange={this.handleInputChange}/>
                    {/*<input name="companyWebsite" placeholder='Company Website' onChange={this.handleInputChange}/>*/}
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={5}>
                  <H3><FormattedMessage {...messages.creativeDirectorInfo}/></H3>
                  <Form.Field>
                    <label>نام</label>
                    <input required={true} name="cdName" placeholder='نام'
                                               onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>نام خانوادگی</label>
                    <input required={true} name="cdLastName" placeholder='نام خانوادگی'
                                               onChange={this.handleInputChange}/>
                  </Form.Field>
                  <Button style={{bottom: '0', position: 'absolute'}} fluid color='green'>ثبت نام</Button>
                  {this.props.error && this.props.error !== false ? (<Message negative>
                    <Message.Header>Error!</Message.Header>
                    <p><FormattedMessage {...messages[this.props.error]} /></p>
                  </Message>) : (null)}
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Form>
        </CenteredSection>
      </div>
    </article>)
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.any,
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  user: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ]),
  onbackendAddr: React.PropTypes.func,
  onChangePassword: React.PropTypes.func
};

export function mapDispatchToProps (dispatch) {
  return {
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onSubmitForm: (params) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(signUp(params));
    }
  };
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
