import React, {Component, Fragment} from 'react'
import {Button, Dropdown, Icon, Label, Loader, Menu, Responsive} from 'semantic-ui-react'
import {connect} from 'react-redux';
import counterpart from 'counterpart';
import {getAuthUser, openLoginSidebar, userAccount, userLogOut} from '../store/actions';
import TransText from './TransText';
import NotificationNew from './notificationNew';
import cabinet from '../api/cabinet';
import MultiLangLink from '../components/MultiLangLink';
import MobileMenu from './MobileMenu';
import {setLanguage} from '../store/actions/translation.actions';
import {readAllNotifications} from '../store/actions/notification.actions';
import Router from 'next/router';


class MenuHeader extends Component {
  state = {
    language: 'ru',
    isLoading: true,
    isAuth: false,
    visible: true,
    notifications: [],
    isMenuOpen: false,
  };

  setListeners = () => {
    if(window.echo && this.props.user.username) {
      window.echo.private(`user.notification.${this.props.user.username}`)
        .listen('.userNotificationUpdate' , (e) => {
          this.setState({
            notifications: [
              e.notification,
              ...this.state.notifications,
            ]
          })
        });
      window.echo.private(`user.account.${this.props.user.username}`)
        .listen('.userAccountUpdate' , ({ account }) => {
          this.props.userAccount(this.props.account.map((acc) => {
            if (acc.currency_id === account.currency_id) {
              acc.balance = account.balance;
            }
            return acc;
          }))
        });
    } else {
      setTimeout(this.setListeners, 1000);
    }
  };

  componentDidMount() {
    this.mount = true;
    this.onStart();
    if (this.props.token) {
      this.setListeners();
    }

    Router.events.on('routeChangeComplete', () => {
      setTimeout(() => {
        this.setState({
          isMenuOpen: false,
        })
      }, 2);
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.token && this.props.token) {
      this.setListeners();
    }
  }

  componentWillUnmount() {
    this.mount = false;
  }

  onLangChange = (lang) => {
    const {Router, language} = this.props;
    if (language !== lang) {
      let newAs = window.location.pathname;
      if (lang === 'ru') {
        if (newAs === '/en') {
          newAs = '/';
        } else {
          newAs = newAs.substring(3);
        }

      } else if (lang === 'en') {
        if (newAs === '/') {
          newAs = '/en';
        } else newAs = `/en${newAs}`;
      }
      Router.push(Router.router.pathname, newAs);
      this.props.setLanguage(lang);
      counterpart.setLocale(lang);
    }

  };

  onStart = () => {
    if (this.props.token) {
      this.props.getAuthUser(this.props.token)
        .then(() => {
          this.setState({isLoading: false, isAuth: true});
          cabinet.getActiveNotification(this.props.token)
            .then(res => this.setState({notifications: res.notification}));
        })
        .catch(() => {
          this.setState({isLoading: false, isAuth: false});
        })
    } else {
      this.setState({isLoading: false, isAuth: false});
    }
  };

  setReadNotify = (id) => {
    cabinet.notificationRead(id, this.props.token)
      .then((res) => {
        if (res.status) {
          const notify = this.state.notifications.filter((item) => {
            return item.id !== id;
          });

          this.setState({notifications: notify});
        }
      });
  };

  clearAll = () => {
    this.props.readAllNotifications(this.props.token);
    this.setState({notifications: []})
  };

  userMenu = () => {
    const {user} = this.props;
    const {notifications} = this.state;

    if (this.state.isLoading) {
      return <Menu.Item><Loader active
                                inline='centered'
                                size='mini'
      /></Menu.Item>
    }

    if (!this.props.token) {
      return <Menu.Item>
        <Button basic
                onClick={this.openLogin}
        ><TransText code={'site.log_in'}/></Button>
      </Menu.Item>
    }

    return <Menu.Item>
      <Menu text className={"icons-menu-header"}>
        <Menu.Item>
          <Dropdown item
                    labeled
                    icon={{name: 'credit card outline', className: 'icon-menu'}}
          >
            <Dropdown.Menu className={'balance-menu'}>
              <Dropdown.Header className={'notification-header'}
                               as='h2'
              >
                <TransText code={'cabinet.balance'}/>
              </Dropdown.Header>
              {
                this.props.account.filter((acc) => parseFloat(acc.balance) > 0).map((acc) => (
                  <Dropdown.Item key={acc.currency_id}
                                 description={acc.balance}
                                 text={acc.currency ? acc.currency.toUpperCase() : ''}
                  />
                ))
              }
              <div className={'button-dropdown'}>
                <MultiLangLink href={'/Cabinet/Wallet'}
                               as={`/cabinet/wallet`}
                >
                  <a className={'ui button fluid'}><TransText code={'cabinet.deposit_withdraw'}/></a>
                </MultiLangLink>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item className={'margin-icon'}>
          <Label floating
                 circular
                 size={'mini'}
                 color={
                   notifications.some(notification => notification.type === 'service_message')
                     ? 'yellow'
                     : 'blue'
                 }
          >
            {this.state.notifications.length}
          </Label>
          <Dropdown item
                    icon={{name: 'bell', className: 'icon-menu'}}
                    name={'icon'}
                    labeled
          >
            <Dropdown.Menu className={'notification'}>
              <Dropdown.Header className={'notification-header'}
                               as='h2'
              >
                <TransText code={'cabinet.new_notifications'}/>
              </Dropdown.Header>
              <NotificationNew
                notifications={this.state.notifications}
                setRead={this.setReadNotify}
                siteLanguage={this.props.language}
              />
              <div className={'button-dropdown'}
                   onClick={this.clearAll}
              >
                <a className={'ui button fluid'}>
                  <TransText code={'cabinet.clear_all'}/>
                </a>
              </div>
              <div className={'button-dropdown'}>
                <MultiLangLink href={'/Cabinet/Notifications'}
                               as={`/cabinet/notifications`}
                >
                  <a className={'ui button fluid'}>
                    <TransText code={'cabinet.show_all'}/>
                  </a>
                </MultiLangLink>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown item
                    icon={{name: 'user', className: 'icon-menu'}}
          >
            <Dropdown.Menu className={'user-menu'}>
              <Dropdown.Header content={user.username}/>
              <MultiLangLink href={'/Cabinet/MyAdvert'}
                             as={'/cabinet/advert'}
              >
                <a className="item" role="option">
                  <TransText code={'cabinet.my-announcements'}/>
                </a>
              </MultiLangLink>
              <MultiLangLink href={'/Cabinet/Wallet'}
                             as={'/cabinet/wallet'}
              >
                <a className="item" role="option">
                  <TransText code={'cabinet.to-fill-up-remove'}/>
                </a>
              </MultiLangLink>
              <MultiLangLink href={'/Cabinet/Archive'}
                             as={'/cabinet/archive'}
              >
                <a className="item" role="option">
                  <TransText code={'cabinet.archive-of-transactions'}/>
                </a>
              </MultiLangLink>
              <MultiLangLink href={'/Cabinet/Profile'}
                             as={'/cabinet/profile/settings'}
              >
                <a className="item" role="option">
                  <TransText code={'cabinet.profile'}/>
                </a>
              </MultiLangLink>
              <Dropdown.Divider/>
              <MultiLangLink href={'/Cabinet/Support'}
                             as={'/cabinet/support'}
              >
                <a className="item" role="option">
                  <TransText code={'cabinet.help'}/>
                </a>
              </MultiLangLink>
              <Dropdown.Item onClick={this.props.userLogOut}>
                <TransText code={'cabinet.logout-profile'}/>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Menu.Item>
      </Menu>
    </Menu.Item>
  };

  openLogin = () => {
    this.props.openLoginSidebar(true);
  };

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    })
  };

  newAdvert = () => {
    if (!this.props.token) {
      return (
        <a className="item" onClick={this.openLogin}>
          <TransText code={'site.to-place-the-announcement'}/>
        </a>
      )
    } else {
      return (
        <MultiLangLink
          href="/Cabinet/AdvertAction/Create"
          as={'/cabinet/create-advert'}
        >
          <a className="item">
            <TransText code={'site.to-place-the-announcement'}/>
          </a>
        </MultiLangLink>
      )
    }
  };

  render() {
    const {isMenuOpen} = this.state;

    return (
      <Fragment>
        <div className={'ui container main-menu'}>

          <Responsive {...Responsive.onlyMobile}>
            <Menu text>
              <Menu.Item link
                         href={'/'}
              >
                <img src={'/static/assets/logo_2.png'}
                     width="150"
                     className={'ui'}
                     alt='Bit-Team'
                />
              </Menu.Item>
              <Menu.Menu position='right'>
                {this.userMenu()}
                <Icon name={'content'}
                      size="big"
                      className="burger-trigger"
                      onClick={this.toggleMenu}
                />
              </Menu.Menu>
            </Menu>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Menu text>
              <MultiLangLink href="/BuyPage"
                             as={'/'}
              >
                <a className="item">
                  <img src={'/static/assets/logo_2.png'}
                       width="150"
                       className={'ui'}
                       alt='Bit-Team'
                  />
                </a>
              </MultiLangLink>
              { this.newAdvert() }
              <MultiLangLink href='/BuyPage'
                             as="/"
              >
                <a className="item">
                  <TransText code={'site.buy'}/>
                </a>
              </MultiLangLink>
              <MultiLangLink href='/SellPage'
                             as="/sell"
              >
                <a className="item">
                  <TransText code={'site.sell'}/>
                </a>
              </MultiLangLink>
              <Menu.Menu position='right'>
                <Menu.Item href='https://market.bit.team'
                           target='_blank'
                ><TransText code={'site.market'}/></Menu.Item>
                <Menu.Item href='https://token.bit.team'
                           target='_blank'
                ><TransText code={'site.token'}/></Menu.Item>
                <Dropdown item
                          text={this.props.language ? this.props.language.toUpperCase() : ''}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.onLangChange('en', e)}>EN</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => this.onLangChange('ru', e)}>RU</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {this.userMenu()}
              </Menu.Menu>
            </Menu>
          </Responsive>

        </div>
        {isMenuOpen && <MobileMenu token={this.props.token}
                                   openLogin={this.openLogin}
                                   logout={this.props.userLogOut}
                                   language={this.props.language}
                                   onLangChange={this.onLangChange}
                                   accounts={this.props.account}
                                   notifications={this.state.notifications}
                                   toggle={this.toggleMenu}
        />}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    account: state.account,
    language: state.translations.language
  };
};

export default connect(mapStateToProps,
  {openLoginSidebar, getAuthUser, userLogOut, userAccount, setLanguage, readAllNotifications},
)(MenuHeader);
