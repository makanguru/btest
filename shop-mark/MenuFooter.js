import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Divider, Grid, Icon, Menu} from 'semantic-ui-react';
import * as PropTypes from 'prop-types';
import {openLoginSidebar} from '../store/actions';
import TransText from './TransText';
import MultiLangLink from '../components/MultiLangLink';

class MenuFooter extends Component {

  state = {
    activeItem: 'home',
    language: 'en',
  };

  render() {

    // const {activeItem} = this.state;

    return (
      <div className={'ui container'}>
        <Grid stackable
              columns={4}
        >
          <Grid.Row centered>
            <Grid.Column className={'w-100-p'}>
              <Menu text
                    vertical
              >
                <Menu.Item header><TransText code={'site.footer-navigation'} /></Menu.Item>
                <MultiLangLink  href="/page/about">
                  <a className="item">
                    <TransText code={'site.about-us'} />
                  </a>
                </MultiLangLink >
                <MultiLangLink  href="/page/contacts">
                  <a className="item">
                    <TransText code={'site.contact'} />
                  </a>
                </MultiLangLink >
                <MultiLangLink  href="/faq">
                  <a className="item">
                    <TransText code={'site.faq'} />
                  </a>
                </MultiLangLink >
                <MultiLangLink  href="/page/referral">
                  <a className="item">
                    <TransText code={'site.referral-program'} />
                  </a>
                </MultiLangLink >
              </Menu>
            </Grid.Column>
            <Grid.Column className={'w-100-p'}>
              <Menu text
                    vertical
              >
                <Menu.Item header><TransText code={'site.footer-action'} /></Menu.Item>
                <Menu.Item as={'a'}
                           href="/cabinet/create-advert"
                >
                  <TransText code={'site.to-place-the-announcement'} />
                </Menu.Item>
                <MultiLangLink  href='/BuyPage'
                      as="/"
                >
                  <a className="item">
                    <TransText code={'site.buy'} />
                  </a>
                </MultiLangLink >
                <MultiLangLink  href='/SellPage'
                      as="/sell"
                >
                  <a className="item">
                    <TransText code={'site.sell'} />
                  </a>
                </MultiLangLink >
              </Menu>
            </Grid.Column>
            <Grid.Column className={'w-100-p'}>
              <Menu text
                    vertical
              >
                <Menu.Item header><TransText code={'site.footer-project'} /></Menu.Item>
                <Menu.Item href='https://market.bit.team'
                           target='_blank'
                ><TransText code={'site.market'} /></Menu.Item>
                <Menu.Item href='https://token.bit.team'
                           target='_blank'
                ><TransText code={'site.token'} /></Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column className={'w-100-p'}>
              <a href="https://twitter.com/Bitteam_ico"
                 target="_blank"
              >
                <Icon circular
                      size='large'
                      name='twitter'
                />
              </a>
              <a href="https://www.facebook.com/token.bit.team/"
                 target="_blank"
              >
                <Icon circular
                      size='large'
                      name='facebook'
                />
              </a>
              <a href="https://www.youtube.com/channel/UC2cHTnl8OhsKGXIiZngn6gA/videos"
                 target="_blank"
              >
                <Icon circular
                      size='large'
                      name='youtube'
                />
              </a>
              <a href="https://vk.com/bit.team"
                 target="_blank"
              >
                <Icon circular
                      size='large'
                      name='vk'
                />
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />

        <Menu text
              stackable
              className={'w-100-p footer-menu'}
        >
          <Menu.Item as={'a'}
                     href="/page/agreement"
          >
            <TransText code={'site.footer_agreement'} />
          </Menu.Item>
          <Menu.Item as={'a'}
                     href="/page/privacy"
          >
            <TransText code={'site.footer_privacy'} />
          </Menu.Item>
          <Menu.Item as={'a'}
                     href="/page/bitteamtoken"
          >
            <TransText code={'site.footer_bitteamtoken'} />
          </Menu.Item>
          <Menu.Item as={'a'}
                     href="/page/acceptance_policy"
          >
            <TransText code={'site.footer_acceptance_policy'} />
          </Menu.Item>
          <Menu.Item as={'a'}
                     href="/page/aml_policy"
          >
            <TransText code={'site.footer_aml_policy'} />
          </Menu.Item>
        </Menu>
        <p>
          v2.3.1 BIT.TEAM ©. <TransText code={'cabinet.information_is_place'} />{' '}
          <TransText code={'cabinet.is_not_public_offer'} />
        </p>
      </div>
    )
  }
}

MenuFooter.propTypes = {
  openLoginSidebar: PropTypes.func.isRequired,
};

export default connect(null, {openLoginSidebar})(MenuFooter);
