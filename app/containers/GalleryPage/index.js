import React from 'react';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import 'semantic-ui-css/semantic.min.css';
import {Link} from 'react-router';

import {makeSelectError, makeSelectLoading, makeSelectGallery} from './selectors';
import H2 from 'components/H2';
import H3 from 'components/H3'
import H4 from 'components/H4'
import CenteredSection from './CenteredSection';
import Section from './Section';
import messages from './messages';
import {resetErrorAndLoading, getGallery, downloadFile} from './actions';

import {timeToJalaliDate} from '../../utils/Utils'

import {Button, Checkbox, Form, Grid, Dropdown, Input, Message, Divider, Icon, Card} from 'semantic-ui-react';

const mainStyle = {padding: '2% 4%'};

export class GalleryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {}

  componentDidMount() {
    this.props.resetErrorAndLoading()
    this.props.getGallery()
  }

  downloadTnxFile (mediaId) {
    this.props.downloadFile(mediaId)
  }

  render() {
    const {loading, error} = this.props;
    return (<article>
      <Helmet
        title="SignUp"
        meta={[
          {name: 'description', content: 'Ballyhooawards'}
        ]}
      />
      {this.props.gallery ? (
        <div style={mainStyle}>
          <Card.Group itemsPerRow={4}>
            {Object.keys(this.props.gallery).map(function (k) {
              let item = this.props.gallery[k]
              return <Card key={k}>
                <Icon style={{margin: '10px auto 10px auto'}} color='blue' name='film' size='massive'/>
                <Card.Content>
                  <Card.Header>
                    {item.name}
                  </Card.Header>
                  <Card.Meta>
                    <span className='date faNo'>
                      {timeToJalaliDate(item.txCreatedDate)}
                    </span>
                    <span className=''>
                      {item.subject}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    {item.desc}
                  </Card.Description>
                </Card.Content>
                <Card.Content style={{textAlign: 'center'}} extra>
                  {item.fileId ? (
                    <Button onClick={() => this.downloadTnxFile(item.fileId)} basic color="blue">دانلود فایل</Button>
                  ) : (null)}
                </Card.Content>
              </Card>
            }, this)
            }
          </Card.Group>
        </div>
      ) : (null)}
    </article>)
  }
}

GalleryPage.propTypes = {
  loading: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  error: React.PropTypes.any,

  user: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    resetErrorAndLoading: () => {
      dispatch(resetErrorAndLoading())
    },
    getGallery: () => {
      dispatch(getGallery())
    },
    downloadFile: (mediaId) => {
      dispatch(downloadFile(mediaId))
    }
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  gallery: makeSelectGallery()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);
