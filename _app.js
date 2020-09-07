import React from 'react';
import App from 'next/app';
import {connect, Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store/initializeStore';
import {Segment, Sidebar} from 'semantic-ui-react';
import axios from '../axios.instance';
import counterpart from 'counterpart'
import Router from 'next/router';
// import * as Sentry from '@sentry/browser';
import ruLangFile from '../utils/lang_ru.json';
import engLangFile from '../utils/lang_eng.json';

// Sentry.init({dsn: "https://96938c0430e54e56b4140c16b2687bb8@sentry.io/1870389"});


// import {loadReCaptcha} from 'react-recaptcha-v3';

import Head from 'next/head';


import 'react-toastify/dist/ReactToastify.css';
// import 'semantic-ui-css/semantic.min.css';
import '../theme/semantic.css';
// import '../theme/components/icon.min.css';
// import '../theme/components/icon.css';

import '../custom.css';


import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import {openForgotSidebar, openLoginSidebar, openRegisterSidebar, userLogOut, userTokenIn} from '../store/actions';
import LoginSidebar from '../components/Sidebars/LoginSidebar';
import RegisterSidebar from '../components/Sidebars/RegisterSidebar';
import ForgotSidebar from '../components/Sidebars/ForgotSidebar';
import {setLanguage, setTranslations} from '../store/actions/translation.actions';
import {parseCookies} from 'nookies';

import socketio from 'socket.io-client';
import Echo from 'laravel-echo';

import {ToastContainer, toast} from 'react-toastify';



toast.configure();

function makeAxios(dispatch, isServer) {
  axios.interceptors.request.use(function (config) {
    if (process.env.NODE_ENV === 'development') {
      config.auth = {
        username: 'qwerty123',
        password: 'oj1TooP1oo'
      };
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  axios.interceptors.response.use(
    (response) => {
      const token = response.headers.authorization ? response.headers.authorization.substr(7) : null;
      if (token) {
        dispatch(userTokenIn(token));
      }
      return response;
    },
    error => {
      if (error.response) {
        if (error.response.status === 403) {
          if ((error.response.data.type === 'ip_verification') && !isServer) {
            Router.push('/ConfirmIp', '/confirm-ip/message');
          }
          if ((error.response.data.type === 'phone_not_verified') && !isServer) {
            Router.push('/Verification', '/cabinet/verification');
            toast.error(
              <TransText code={'site.you_need_verify'}/>,
            );
          }
        }
      }
      return Promise.reject(error);
    },
  );
}

Router.events.on('routeChangeComplete', () => {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 2);
});

class MyApp extends App {

  static async getInitialProps(initial) {
    if (initial.ctx.isServer) {
      await initial.ctx.store.dispatch(setLanguage(initial.ctx.query.lang));
    }
    if (!initial.ctx.store.getState().translations.ru) {
      // await Promise.all([
      //   axios.get(`/get/language/en.json`),
      //   axios.get(`/get/language/ru.json`),
      // ]).then(responses => {


      counterpart.setLocale(initial.ctx.query.lang);

      counterpart.registerTranslations('en', engLangFile);
      await initial.ctx.store.dispatch(setTranslations(engLangFile, 'en'));
      counterpart.registerTranslations('ru', ruLangFile);
      await initial.ctx.store.dispatch(setTranslations(ruLangFile, 'ru'));

      // }).catch((error) => {
      //   if (error.message === 'Network Error') {
      //     // history.push('/teh-work');
      //   }
      //   return error;
      // });
    }
    if (initial.ctx.isServer) {
      const nookies = parseCookies(initial.ctx);
      if (nookies.token_access) {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${nookies.token_access}`;
        await initial.ctx.store.dispatch(userTokenIn(nookies.token_access))
      }
    }
    makeAxios(initial.ctx.store.dispatch, initial.ctx.isServer);
    const pageProps = initial.Component.getInitialProps ? await initial.Component.getInitialProps(initial.ctx) : {};

    return {pageProps};
  }

  loginSidebarHide = () => {
    this.props.openLoginSidebar(false);
  };

  registerSidebarHide = () => {
    this.props.openRegisterSidebar(false);
  };

  forgotSidebarHide = () => {
    this.props.openForgotSidebar(false);
  };

  isFunction = fn => typeof fn === 'function';

  componentWillMount() {
    makeAxios(this.props.dispatch, false);
    counterpart.registerTranslations('en', this.props.translations.en);
    counterpart.registerTranslations('ru', this.props.translations.ru);
    counterpart.setLocale(this.props.language || 'ru');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loginShow !== this.props.loginShow
      || prevProps.registerShow !== this.props.registerShow
      || prevProps.forgotShow !== this.props.forgotShow) {

      if (this.props.loginShow || this.props.registerShow || this.props.forgotShow) {
        document.body.style.overflow = "hidden";
      } else if (!this.props.loginShow || !this.props.registerShow || !this.props.forgotShow) {
        document.body.style.overflow = "auto";
      }
    }

    if (this.props.token && !window.echo) {
      window.io = socketio;
      window.echo = new Echo({
        host: process.env.SOCKET_GATE,
        broadcaster: 'socket.io',
        auth: {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
            Accept: 'application/json',
          },
        },
        authEndpoint: '/broadcasting/auth',
        withoutInterceptors: true,
      });
    }
  }

  componentDidMount() {

    let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    console.log(this.props);
    if (this.props.token) {
      window.io = socketio;
      window.echo = new Echo({
        host: process.env.SOCKET_GATE,
        broadcaster: 'socket.io',
        auth: {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
            Accept: 'application/json',
          },
        },
        authEndpoint: '/broadcasting/auth',
        withoutInterceptors: true,
      });
    }
  }



  render() {
    const {Component, pageProps, router, store} = this.props;

    const page = this.isFunction(Component.renderLayout) ? (
      Component.renderLayout({
        children: <Component {...pageProps} router={router}/>,
        ...pageProps,
        router,
      })
    ) : (
      <Component {...pageProps} router={router}/>
    );

    const {loginShow, registerShow, forgotShow} = this.props;

    return (
      <Provider store={store}>
        <ToastContainer/>
        <Head>
          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-55JJ3XM');`
          }}/>
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap"
                rel="stylesheet"
          />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/icon.min.css"
                rel="stylesheet"
          />
          <script src="https://api.sumsub.com/idensic/static/sumsub-kyc.js"></script>
        </Head>

        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-55JJ3XM"
                          height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }}/>
        <Sidebar.Pushable>
          <Sidebar
            as={Segment}
            animation='overlay'
            direction='right'
            icon='labeled'
            vertical
            onHide={this.loginSidebarHide}
            className={'white fixed auth-sidebar'}
            visible={loginShow}
            width='wide'
          >
            <LoginSidebar/>
          </Sidebar>
          <Sidebar
            as={Segment}
            animation='overlay'
            direction='right'
            icon='labeled'
            vertical
            onHide={this.registerSidebarHide}
            className={'white auth-sidebar'}
            visible={registerShow}
            width='wide'
          >
            <RegisterSidebar history={this.props.router}/>
          </Sidebar>
          <Sidebar
            as={Segment}
            animation='overlay'
            direction='right'
            icon='labeled'
            vertical
            onHide={this.forgotSidebarHide}
            className={'white auth-sidebar'}
            visible={forgotShow}
            width='wide'
          >
            <ForgotSidebar history={this.props.router}/>
          </Sidebar>
          <Sidebar.Pusher dimmed={loginShow || registerShow || forgotShow}>
            <div className={'white shadow'}
                 style={{padding: '1px'}}
            >
              <MenuHeader Router={Router}/>
            </div>
            {page}
            <div className={'footer-block'}>
              <MenuFooter/>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginShow: state.loginSidebar,
    registerShow: state.registerSidebar,
    forgotShow: state.forgotSidebar,
    translations: state.translations,
    token: state.token,
    language: state.translations.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLoginSidebar: (bool) => dispatch(openLoginSidebar(bool)),
    openRegisterSidebar: (bool) => dispatch(openRegisterSidebar(bool)),
    openForgotSidebar: (bool) => dispatch(openForgotSidebar(bool)),
    userLogOut: (is) => dispatch(userLogOut(is)),
    dispatch: dispatch,
  };
};

export default withRedux(initializeStore)(connect(mapStateToProps, mapDispatchToProps)(MyApp));
