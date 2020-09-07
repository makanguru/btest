import React, {Component} from 'react';
import {Grid, Icon, Image, Pagination, Responsive, Segment} from 'semantic-ui-react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import TransText from '../../components/TransText';
import config from '../../config/gateway';
import MultiLangLink from '../MultiLangLink';

class ReviewInfoUser extends Component {

  state = {
    loading: true,
    reviews: [],
    activePage: 1,
    totalPage: 0,
  };

  componentDidMount() {
    axios.get(`${config.apiGateway}/get/review/user/${this.props.username}`)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          loading: false,
          reviews: response.data,
          totalPage: response.meta.last_page,
        })
      }).catch((error) => {
      // if(error.message === 'Network Error'){
      //     history.push('/teh-work');
      // }
      return error;
    });
  }

  handlePaginationChange = (e, {activePage}) => {
    this.setState({loading: true});
    axios.get(`${config.apiGateway}/get/review/user/${this.props.username}?page=${activePage}&limit=10`)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          loading: false,
          reviews: response.data,
          totalPage: response.meta.last_page,
          activePage: response.meta.current_page,
        })
      }).catch((error) => {
      // if(error.message === 'Network Error'){
      //     history.push('/teh-work');
      // }
      return error;
    });


  };

  render() {

    const {
      loading,
      reviews,
      activePage,
      totalPage,
    } = this.state;

    return (
      <Segment basic
               loading={loading}
      >
        {
          reviews.map((item) => {
            return <Segment padded
                            key={item.created}
            >
              <Grid stackable
                    columns={3}
              >
                <Grid.Row>
                  <Grid.Column floated='left'
                               width={5}
                  >
                    <MultiLangLink href={`/info/user/${item.username}`}><a>{item.username}</a></MultiLangLink>
                  </Grid.Column>
                  <Grid.Column floated='right'
                               width={5}
                  >
                    {
                      item.rating === 5 &&
                      <Image avatar
                             src={'/static/assets/emoji/very.png'}
                             className={'review_emoji'}
                      />
                    }
                    {
                      item.rating === 4 &&
                      <Image avatar
                             src={'/static/assets/emoji/good.png'}
                             className={'review_emoji'}
                      />
                    }
                    {
                      item.rating === 3 &&
                      <Image avatar
                             src={'/static/assets/emoji/normal.png'}
                             className={'review_emoji'}
                      />
                    }
                    {
                      item.rating === 2 &&
                      <Image avatar
                             src={'/static/assets/emoji/bad.png'}
                             className={'review_emoji'}
                      />
                    }
                    {
                      item.rating === 1 &&
                      <Image avatar
                             src={'/static/assets/emoji/block.png'}
                             className={'review_emoji'}
                      />
                    }
                    <TransText code={`cabinet.rating_user_${item.rating}_star`} />
                  </Grid.Column>
                  <Grid.Column floated='right'
                               width={5}
                  >
                    {item.created}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <p className={'margin-10'}>
                {item.comment}
              </p>
            </Segment>
          })
        }
        <div className={'text-center'}>
          <Responsive {...Responsive.onlyMobile}>
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={totalPage}
              boundaryRange={0}
              ellipsisItem={false}
              firstItem={{content: <Icon name='angle double left' />, icon: true}}
              lastItem={{content: <Icon name='angle double right' />, icon: true}}
              prevItem={{content: <Icon name='angle left' />, icon: true}}
              nextItem={{content: <Icon name='angle right' />, icon: true}}
            />
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={totalPage}
              ellipsisItem={{content: <Icon name='ellipsis horizontal' />, icon: true}}
              firstItem={{content: <Icon name='angle double left' />, icon: true}}
              lastItem={{content: <Icon name='angle double right' />, icon: true}}
              prevItem={{content: <Icon name='angle left' />, icon: true}}
              nextItem={{content: <Icon name='angle right' />, icon: true}}
            />
          </Responsive>
        </div>
      </Segment>
    );
  }
}

ReviewInfoUser.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ReviewInfoUser;
