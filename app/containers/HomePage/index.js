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
import HomeBackground from './assets/home-back.jpg';
import {Link} from 'react-router';

import {makeSelectRepos} from 'containers/App/selectors';
import H2 from 'components/H2';
import H3 from 'components/H3'
import H4 from 'components/H4'
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
// import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
// import {signIn} from './actions';
import {
  clearLoading,
  changeEmail,
  changePassword,
  signIn,
  createTnx,
  selectFileError,
  clearSelectFileError,
  createTnxError,
  createTnxSuccess
} from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectUser,
  makeSelectFileError,
  makeSelectLoading,
  makeSelectCreateTnxSuccess
} from './selectors';

import {
  Button, Card, Checkbox, Container, Divider, Dropdown, Form, Grid, Header, Icon, Label, Message, Popup, Radio,
  TextArea
} from 'semantic-ui-react';

import HttpRequest from '../../utils/HttpRequest';
import {numberWithCommas, bytesToMb, getVideoDuration} from '../../utils/Utils'

const mainStyle = {padding: '2% 4%'};
const loginFormContainerStyle = {/*background: 'rgba(255, 213, 79,0.9)', border: 'solid 1px rgba(255, 213, 79,1.0)', borderRadius: '3px'*/}
const loginFormStyle = {padding: '10px', textAlign: 'center'}
const signupLinkStyle = {color: 'rgba(255, 179, 0,1.0)'}
import {digestFile, makeZip} from '../../utils/crypto'
import * as _ from "lodash";


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  state = {
    email: '',
    password: '',
    fileInputCount: 1,
    selectedFilesCountByType: {pdf: 0, movie: 0, jpg: 0},
    tnxData: {server: 'um', upload: true, files: []},
    fileTmp: {},
    createTnxForm: {
      plan: [{
        text: 'کمپین پلاس',
        value: "campaignplus",
        fee: 2047000,
        filesCount: 4,
        fileTypesIcons: ['film', 'film', 'film', 'file pdf outline']
      }, {
        text: 'کمپین',
        value: 'campaign', fee: 409500, filesCount: 1, fileTypesIcons: ['file pdf outline']
      }, {
        text: 'تک فریم',
        value: 'singleframe',
        fee: 136500,
        filesCount: 1,
        fileTypesIcons: ['file image outline']
      }, {
        text: 'فیلم',
        value: 'video',
        fee: 1365000,
        filesCount: 1, fileTypesIcons: ['film']
      }]
    }
  }

  componentDidMount() {
    this.props.clearSelectFileError()
    this.props.clearLoading()
  }

  handleChange = (e) => {
    this.setState({
      tnxData: {...this.state.tnxData, ...{[e.target.name]: e.target.value}}
    }, () => {
    })
  }

  selectPlan = (e) => {
    const plan = e.target.value
    let option = _.find(this.state.createTnxForm.plan, {value: plan});
    this.setState({
      planName: option.text,
      planFee: option.fee,
      fileInputCount: option.filesCount,
      planFileTypeIcons: option.fileTypesIcons
    }, () => {
      this.setState({
        tnxData: {...this.state.tnxData, ...{'type': plan}}
      })
    })
  }

  deselectPlan = () => {
    this.props.clearSelectFileError()
    this.setState({
      planName: '',
      planFee: 0,
      fileInputCount: 1,
      planFileTypeIcons: [],
      selectedFilesCountByType: {pdf: 0, movie: 0, jpg: 0},
      fileTmp: {}
    }, () => {
      this.setState({
        tnxData: {...this.state.tnxData, ...{'type': undefined, files: []}}
      }, () => {
      })
    })
  }

  handleRadioChange = (e, {value}) => {
    let obj = {'server': value}
    // value === 'um' ? obj.upload = true : obj.upload = false
    this.setState({
      tnxData: {...this.state.tnxData, ...obj}
    }, () => {
    })
  }

  handleUploadCheckbox = (e, {value}) => {
    // ELEMENT COMMENTED, NOT WORKING NOW
    this.setState({
      tnxData: {...this.state.tnxData, ...{'upload': this.state.tnxData.upload !== true}}
    }, () => {
    })
  }


  handleLogin = () => {
    const {email, password} = this.state
    this.props.onSubmitForm(email, password)
  }

  handleCreateTnx = () => {
    this.props.onCreateTnx()
    // this.props.onSubmitCreateTnxForm(this.state.tnxData)
    if (this.state.tnxData.files.length > 1) {
      makeZip(this.props.user.userId, this.state.tnxData.files)
        .then(file => {
          this.setState({
            tnxData: {...this.state.tnxData, ...{files: file}}
          }, () => {
            digestFile(this.state.tnxData.files)
              .then(payload => {
                this.setState({
                  tnxData: {...this.state.tnxData, ...{'hash': payload}}
                }, () => {
                  let fd = new FormData();
                  fd.append("token", this.props.user.token)
                  Object.keys(this.state.tnxData).map(function (k) {
                    if (!this.state.tnxData.upload && k === 'files') {
                    } else {
                      fd.append(k, this.state.tnxData[k])
                    }
                  }, this)
                  return new HttpRequest().postFile(fd, this.state.tnxData.server)
                    .then(payload => {
                      if (payload.status !== 200) return Promise.reject(payload.status)
                      this.props.onSuccessCreateTnx()
                      this.resetState()
                    })
                    .catch(err => {
                      this.props.onErrorCreateTnx(err)
                    })
                })

              })
          })
        })
    } else {
      this.setState({
        tnxData: {...this.state.tnxData, ...{files: [this.state.tnxData.files[0]]}}
      }, () => {
        digestFile(this.state.tnxData.files[0])
          .then(payload => {
            this.setState({
              tnxData: {...this.state.tnxData, ...{'hash': payload}}
            }, () => {
              let fd = new FormData();
              fd.append("token", this.props.user.token)

              Object.keys(this.state.tnxData).map(function (k) {
                if (!this.state.tnxData.upload && k === 'files') {
                } else if (this.state.tnxData.upload && k === 'files') {
                  fd.append(k, this.state.tnxData[k][0])
                } else {
                  fd.append(k, this.state.tnxData[k])
                }
              }, this)
              return new HttpRequest().postFile(fd, this.state.tnxData.server)
                .then(payload => {
                  if (payload.status !== 200) return Promise.reject(payload.status)
                  this.props.onSuccessCreateTnx()
                  this.resetState()
                })
                .catch(err => {
                  this.props.onErrorCreateTnx(err)
                })
            })

          })
      })
    }
  }

  resetState = () => {
    this.setState({
      fileInputCount: 1,
      selectedFilesCountByType: {pdf: 0, movie: 0, jpg: 0},
      tnxData: {server: 'um', upload: true, files: []},
      fileTmp: {}
    }, () => {
    })
  }

  handleDropdownChange = (e, data) => {
    const {name, value} = data
    this.setState({
      tnxData: {...this.state.tnxData, ...{[name]: value}}
    }, () => {
      const option = _.find(this.state.createTnxForm.plan, {value})
      // console.log(`Changed to text: ${option.text}`)
      this.setState({
        planName: option.text,
        planFee: option.fee,
        planFileTypeIcons: option.fileTypesIcons
      })
    })
  }


  handleFileSelect = (e) => {
    this.props.clearSelectFileError()
    let file = e.target.files[0]
    let size = bytesToMb(file.size)
    let fileType = file.type
    let fieldType = e.target.dataset.type
    let fieldName = e.target.name
    if ((fieldType === 'film' && fileType !== 'video/mp4')
      || (fieldType === 'file pdf outline' && fileType !== 'application/pdf')
      || (fieldType === 'file image outline' && fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'application/pdf')) {
      this.props.onSelectFileError('wrong.field')
      return
    }
    if (this.state.tnxData.type === 'campaignplus') {
      if (fileType === 'application/pdf' || fileType === 'video/mp4') {
        if (fileType === 'application/pdf') {
          if (size > 20) {
            this.props.onSelectFileError('size_limit.20')
            return
          }
          if (this.state.selectedFilesCountByType.pdf > 0) {
            if (this.state.fileTmp.fieldName && this.state.fileTmp.fieldName.type === 'application/pdf') {
              this.setState({selectedFilesCountByType: {...this.state.selectedFilesCountByType, ...{'pdf': this.state.selectedFilesCountByType.pdf + 1}}})
            } else {
              this.props.onSelectFileError('enough.pdf')
              return
            }
          } else {
            this.setState({selectedFilesCountByType: {...this.state.selectedFilesCountByType, ...{'pdf': this.state.selectedFilesCountByType.pdf + 1}}})
          }
        } else if (fileType === 'video/mp4') {
          if (size > 20) {
            this.props.onSelectFileError('size_limit.20')
            return
          }
          if (this.state.selectedFilesCountByType.movie > 2) {
            if (this.state.fileTmp.fieldName && this.state.fileTmp.fieldName.type === 'video/mp4') {
              this.setState({selectedFilesCountByType: {...this.state.selectedFilesCountByType, ...{'movie': this.state.selectedFilesCountByType.movie + 1}}})
            } else {
              this.props.onSelectFileError('enough.movie')
              return
            }
          } else {
            if (size > 20) {
              this.props.onSelectFileError('size_limit.20')
              return
            }
            this.setState({selectedFilesCountByType: {...this.state.selectedFilesCountByType, ...{'movie': this.state.selectedFilesCountByType.movie + 1}}})
          }
        }
      } else {
        this.props.onSelectFileError('require.video_pdf')
        return
      }
    } else if (this.state.tnxData.type === 'campaign') {
      if (fileType === 'application/pdf') {
        if (size > 20) {
          this.props.onSelectFileError('size_limit.20')
          return
        }
        this.setState({selectedFilesCountByType: {...this.state.selectedFilesCountByType, ...{'pdf': this.state.selectedFilesCountByType.pdf + 1}}})
      } else {
        this.props.onSelectFileError('require.pdf')
        return
      }
    } else if (this.state.tnxData.type === 'singleframe') {
      if (fileType === 'application/pdf' || fileType === 'image/jpg' || fileType === 'image/jpeg') {
        if (size > 5) {
          this.props.onSelectFileError('size_limit.5')
          return
        }
        this.setState({selectedFilesCountByType: {...this.state.selectedFilesCountByType, ...{'jpg': this.state.selectedFilesCountByType.jpg + 1}}})
      } else {
        this.props.onSelectFileError('require.pdf_jpg')
        return
      }
    } else if (this.state.tnxData.type === 'film') {
      if (fileType === 'video/mp4') {
        if (size > 20) {
          this.props.onSelectFileError('size_limit.20')
          return
        }
        this.setState({selectedFilesCountByType: {...this.state.selectedFilesCountByType, ...{'movie': this.state.selectedFilesCountByType.movie + 1}}})
      } else {
        this.props.onSelectFileError('require.video')
        return
      }
    }
    this.setState({
      fileTmp: {...this.state.fileTmp, ...{[fieldName]: file}}
    }, () => {
      let files = []
      Object.keys(this.state.fileTmp).map((k) => {
        files.push(this.state.fileTmp[k])
      });
      this.setState({
        tnxData: {...this.state.tnxData, ...{'files': files}}
      })
    })


  }

  addFileInput = () => {
    //TODO Show max file number error
    if (this.state.fileInputCount > 4) return
    this.setState({
      fileInputCount: this.state.fileInputCount + 1
    })
  }

  render() {
    const {email, password} = this.state
    const {loading, error, repos} = this.props;

    return (<article>
      <Helmet
        title="Home Page"
        meta={[
          {name: 'description', content: 'BallyhooAwards'}
        ]}
      />
      <div style={mainStyle}>
        <CenteredSection>
          {this.props.isAuthenticated !== true ?
            (<div style={{paddingBottom: '20px'}}><H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
              <H4>
                <Link style={signupLinkStyle}
                      to="/signup">{this.props.intl.formatMessage({...messages.notSignedUpYetHeader})}</Link>
              </H4></div>) : (<div><H2 style={{fontSize: '36px'}}>
              اثر خود را ثبت کنید
            </H2>{this.state.tnxData.type ? <Button style={{marginBottom: '20px'}}
                                                    disabled={this.props.loading}
                                                    onClick={this.deselectPlan}
                                                    secondary={true}
                                                    color="blue">بازگشت</Button> : (null)}</div>)}
          {this.props.isAuthenticated !== true ?
            (<Grid centered doubling>
              <Grid.Row>
                <Grid.Column mobile={12} computer={8} style={loginFormContainerStyle}>
                  <div><Form loading={this.props.loading} onSubmit={this.handleLogin} style={loginFormStyle}>
                    {/*<H3 style={formTitleStyle}>Sign-up</H3>*/}
                    <Form.Field>
                      <label>ایمیل</label>
                      <input style={{direction: 'ltr'}} placeholder='ایمیل' onChange={this.props.onChangeEmail}/>
                    </Form.Field>
                    <Form.Field>
                      <label>رمز عبور</label>
                      <input style={{direction: 'ltr'}} type="password" placeholder='رمز عبور'
                             onChange={this.props.onChangePassword}/>
                    </Form.Field>
                    <Button color="green">ورود</Button>
                  </Form>{this.props.error && this.props.error !== false && this.props.error !== 208 ? (
                    <Message negative>
                      <Message.Header>خطا!</Message.Header>
                      <p><FormattedMessage {...messages['signin.' + this.props.error]} /></p>
                    </Message>) : (null)}</div>
                </Grid.Column>
              </Grid.Row>
            </Grid>) : (
              !this.state.tnxData.type ?
                (<Grid textAlign={'center'} centered={true}><Grid.Row>
                    <Grid.Column style={{textAlign:'center'}} computer={8} mobile={12}>
                      <Divider />
                      <H4>
                        لطفا با توجه به نوع اثر خود یکی از طرح‌ها را انتخاب کنید
                      </H4>
                      <Popup
                        wide
                        inverted
                        trigger={<Button style={{marginBottom: '20px'}} value="campaignplus"
                                         onClick={this.selectPlan} fluid
                                         color="yellow">
                          کمپین پلاس
                        </Button>}
                        content='۱ تا ۳ عدد فیلم mp4 هر کدام حداکثر ۱۰۰ ثانیه و حجم هر کدام حداکثر ۲۰ مگابایت + یک فایل PDF شامل ۳ تا ۵ فریم تصویر با حجم حداکثر ۲۰ مگابایت'
                      />
                      <Popup
                        wide
                        inverted
                        trigger={<Button style={{marginBottom: '20px'}} value="campaign" onClick={this.selectPlan}
                                         fluid
                                         color="yellow">
                          کمپین
                        </Button>}
                        content='یک فایل PDF شامل ۳ تا ۵ فریم تصویر با حداکثر حجم ۲۰ مگابایت'
                      />
                      <Popup
                        wide
                        inverted
                        trigger={<Button style={{marginBottom: '20px'}} value="singleframe"
                                         onClick={this.selectPlan} fluid
                                         color="yellow">
                          تک فریم
                        </Button>}
                        content='یک فایل PDF یا JPG با حداکثر حجم ۵ مگابایت'
                      />
                      <Popup
                        wide
                        inverted

                        trigger={<Button style={{marginBottom: '20px'}} value="video" onClick={this.selectPlan}
                                         fluid
                                         color="yellow">
                          فیلم
                        </Button>}
                        content='۱ عدد فیلم mp4 حداکثر ۱۰۰ ثانیه و حجم حداکثر ۲۰ مگابایت'
                      />

                      {this.props.success && this.props.success !== false ? (<Message positive>
                        <Message.Header>درخواست با موفقیت انجام شد.</Message.Header>
                        <p><FormattedMessage {...messages[this.props.success]} /></p>
                      </Message>) : (null)}</Grid.Column></Grid.Row></Grid>
                ) : (
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign="center" computer={8} mobile={16}>
                      <Container>
                        <Form loading={this.props.loading} onSubmit={this.handleCreateTnx} style={loginFormStyle}>
                          {/*<H3 style={formTitleStyle}>Sign-up</H3>*/}
                          {/*<Form.Field>
                           <label className="text-right">نوع پلن</label>
                           <Dropdown name="type" onChange={this.handleDropdownChange} placeholder='انتخاب پلن' fluid
                           selection options={_.map(this.state.createTnxForm.plan, function (o) {
                           return _.omit(o, 'fee');
                           })}/>
                           </Form.Field>*/}
                          {this.state.planFileTypeIcons.map((e, i) => {
                            return <Form.Field key={i}>
                              <div>
                                <label style={{width: '100%'}}
                                       className={this.state.fileTmp['file' + (i)] ? ((this.state.fileTmp['file' + (i)].type === 'application/pdf' && e === 'file pdf outline')
                                       || (this.state.fileTmp['file' + (i)].type === 'video/mp4' && e === 'film')
                                       || ((this.state.fileTmp['file' + (i)].type === 'image/jpg' || this.state.fileTmp['file' + (i)].type === 'image/jpeg' || this.state.fileTmp['file' + (i)].type === 'application/pdf') && e === 'file image outline')) ? 'yellow ui icon button' : 'ui icon button' : 'ui icon button'}>
                                  {this.state.tnxData.files.length > 0 ?
                                    (this.state.fileTmp['file' + (i)] && ((this.state.fileTmp['file' + (i)].type === 'application/pdf' && e === 'file pdf outline')
                                    || (this.state.fileTmp['file' + (i)].type === 'video/mp4' && e === 'film')
                                    || ((this.state.fileTmp['file' + (i)].type === 'image/jpg' || this.state.fileTmp['file' + (i)].type === 'image/jpeg' || this.state.fileTmp['file' + (i)].type === 'application/pdf') && e === 'file image outline'))
                                      ? this.state.fileTmp['file' + (i)].name :
                                      <div><i className={"icon " + e}/> انتخاب
                                        فایل {e === 'film' ? 'ویدئو' : e === 'file pdf outline' ? 'پی‌.دی.اف' : e === 'file image outline' ? 'تصویر' : ('')}
                                      </div>) : (
                                      <div><i className={"icon " + e}/> انتخاب
                                        فایل {e === 'film' ? 'ویدئو' : e === 'file pdf outline' ? 'پی‌.دی.اف' : e === 'file image outline' ? 'تصویر' : ('')}
                                      </div>)
                                  }
                                  <input type="file" data-type={e} name={"file" + i} style={{display: 'none'}}
                                         onChange={(e) => {
                                           this.handleFileSelect(e)
                                         }}/></label>
                              </div>
                            </Form.Field>
                          })}
                          {this.props.error && this.props.error !== false ? (<Message negative>
                            <Message.Header>خطا!</Message.Header>
                            <p><FormattedMessage {...messages[this.props.error]} /></p>
                          </Message>) : (null)}

                          {/*<Form.Field style={{direction: 'rtl'}}>
                           <Button disabled={this.state.fileInputCount > 4} type="button" onClick={this.addFileInput}
                           fluid
                           primary>می‌خواهید فایل‌های بیشتری آپلود
                           کنید؟</Button>
                           </Form.Field>*/}
                          <Form.Field>
                            <label>اسم اثر</label>
                            <input required={true} className={'faNo'} name="name" onChange={this.handleChange}/>
                          </Form.Field>
                          <Form.Field>
                            <label>موضوع تبلیغ</label>
                            <input required={true} className={'faNo'} name="subject" onChange={this.handleChange}/>
                          </Form.Field>
                          <Form.Field>
                            <label>ترجمه شعار/متن تبلیغ (به زبان انگلیسی)</label>
                            <input required={true} style={{direction: 'ltr'}} name="slogan"
                                   onChange={this.handleChange}/>
                          </Form.Field>
                          <Form.Field>
                            <label className="text-right">توضیحات</label>
                            <TextArea required={true} className={'iranSans'} onChange={this.handleChange} name="desc"
                                      autoHeight
                                      placeholder='توضیح کوتاهی درباره‌ی اثر خود بنویسید...'/>
                          </Form.Field>
                          <Form.Field style={{direction: 'rtl'}}>
                            <Radio
                              label='آثار ارسالی من در «ثبت شد» ثبت شود.'
                              name='server'
                              value='sabtshod'
                              checked={this.state.tnxData.server === 'sabtshod'}
                              onChange={this.handleRadioChange}
                            />
                          </Form.Field>
                          <Form.Field style={{direction: 'rtl'}}>
                            <Radio
                              label='آثار ارسالی من در «UM» ثبت شود.'
                              name='server'
                              value='um'
                              checked={this.state.tnxData.server === 'um'}
                              onChange={this.handleRadioChange}
                            />
                          </Form.Field>
                          {/*<Form.Field style={{direction: 'rtl'}}>
                            <Checkbox value="true" onChange={this.handleUploadCheckbox}
                                      disabled={this.state.tnxData.server === 'um'}
                                      checked={this.state.tnxData.upload === true}
                                      label={{children: 'فایل(ها) روی سرور آپلود شوند.'}}/>
                          </Form.Field>*/}

                          <Form.Field style={{direction: 'rtl'}}>
                            <Card style={{margin: 'auto'}}>
                              <Card.Content>
                                <Card.Header className={'iransans'}>
                                  صورت‌حساب
                                </Card.Header>
                                <Card.Meta>
                                  {/*<span className='date'>
                                   {this.state.planName}
                                   </span>*/}
                                </Card.Meta>
                                <Card.Description className={'faNo'}>

                                  <Label as='a' color='teal'
                                         tag>{numberWithCommas(this.state.tnxData.server === 'um' ? this.state.planFee : 0)}
                                    تومان</Label>
                                </Card.Description>
                              </Card.Content>
                              <Label style={{left: '-60%', width: '50%'}} as='a' color='green'
                                     ribbon>{this.state.planName}</Label>
                              <Card.Content extra>
                                <a className="faNo">
                                  تعداد کار: {this.state.tnxData ? this.state.tnxData.files.length : 0}
                                </a>
                              </Card.Content>
                            </Card>
                          </Form.Field>
                          <Button fluid color={'green'}>ارسال</Button>
                        </Form>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    {this.props.isAuthenticated === true && this.state.tnxData.type ?
                      (<Grid.Column computer={6} mobile={16}>
                        <Container textAlign={'center'}>
                          <Message style={{lineHeight: '2.5'}} info>
                            با هدف حمایت از حقوق مالکیت معنوی، و با همکاری مجموعه‌های «ثبت شد» و «UM»، امکان آن فراهم
                            آمده است تا در کنار بخش ارزیابی «Ballyhoo Awards» و به عنوان یک بخش جانبی، آثار شما در دو
                            سطح داخلی یا بین‌المللی با نام خودتان ثبت شود.
                            برای اطلاعات بیشتر و یا ثبت آثار می‌توانید از لینک‌های زیر استفاده کنید.
                          </Message>
                        </Container>
                        <a href="http://sabtshod.com"><Button color="blue" style={{margin: '20px', width: '20%'}}>ثبت
                          شد</Button></a>
                        <a style={{color: 'white!important'}} href="http://utadoc.com"><Button color="blue" style={{
                          margin: '20px',
                          width: '20%'
                        }}>UM</Button></a>
                      </Grid.Column>) : (null)}
                  </Grid.Row>
                </Grid>
              )
            )}

        </CenteredSection>
        {/*<Section>
         <H2>
         <FormattedMessage {...messages.trymeHeader} />
         </H2>
         <Form onSubmit={this.props.onSubmitForm}>
         <label htmlFor="username">
         <FormattedMessage {...messages.trymeMessage} />
         <AtPrefix>
         <FormattedMessage {...messages.trymeAtPrefix} />
         </AtPrefix>
         <Input
         id="username"
         type="text"
         placeholder="mxstbr"
         value={this.props.username}
         onChange={this.props.onChangeUsername}
         />
         </label>
         </Form>
         <ReposList {...reposListProps} />
         </Section>*/}
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

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onSubmitForm: (email, password) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(signIn());
    },
    onSubmitCreateTnxForm: (params) => {
      dispatch(createTnx(params));
    },
    onSelectFileError: (errCode) => {
      dispatch(selectFileError(errCode))
    },
    clearSelectFileError: () => {
      dispatch(clearSelectFileError())
    },
    onCreateTnx: () => {
      dispatch(createTnx())
    },
    onSuccessCreateTnx: () => {
      dispatch(createTnxSuccess())
    },
    onErrorCreateTnx: (err) => {
      dispatch(createTnxError(err))
    },
    clearLoading: () => {
      dispatch(clearLoading())
    }
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectFileError(),
  success: makeSelectCreateTnxSuccess()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomePage));
