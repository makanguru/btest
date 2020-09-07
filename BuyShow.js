class BuyShow extends Component {

  state = {
    selectAdvert: null,
    havUpdate: true,
    isLoading: true,
  };

  static async getInitialProps({store, query, asPath, isServer, res, req}) {
    const advert = isServer ? query.advert : asPath.split('/').reverse()[0];

    if (isServer) {
      await store.dispatch(advertShowFetchData(advert));
    }

    return {
      advert,
      currentAdvert: store.getState().advertShow[0],
      host: 'https://' + (req ? req.headers.host : window.location.hostname),
    };
  }

  componentDidMount() {

    const selectAdvert = _.find(this.props.advertShow, (advert) => advert.advert_link_id === this.props.advert);
    if (typeof selectAdvert === 'undefined') {
      this.props.advertShowFetchData(this.props.advert).then(() => {
        this.setState({isLoading: false})
      });
    }
    this.selectAdvert()
  }

  componentDidUpdate = () => {
    this.selectAdvert();
  };

  sendCreateOperation = (data) => {

    data.advert = this.props.advert;
    data.coin = data.you_get;
    data.currency = data.you_send;
    data.rate = this.state.selectAdvert.price_advert;

    return cabinet.createOperation(data, this.props.token)
      .then((res) => {
        if (res.status === 406) {
          toast.error(res.data.errors[0]);
          Router.push('/Verification', `${this.props.translations.language === 'ru' ? '/' : '/en/'}cabinet/verification`)
        }
        if (res.status === 400) {
          if (typeof res.data.errors === 'object') {
            res.data.errors.map((item) => {
              toast.error(item);
              return item;
            })
          }
        }
        if (res.status === 401) {
          this.props.openLogin(true);

        }
        if (res.data && res.data.redirect_link) {
          window.location.href = res.data.redirect_link
        }
        if (res.operation) {
          Router.push('/Operation', `/cabinet/operation/${res.operation.operation_link}`)
        }
        return res;
      });
  };

  selectAdvert() {
    const selAdvert = _.find(this.props.advertShow, (advert) => advert.advert_link_id === this.props.advert);
    if(selAdvert && selAdvert.type === 'buy') {
      Router.push('/SellShow', `/sell/advert/${selAdvert.advert_link_id}`)
    }
    if (this.state.selectAdvert === null && typeof selAdvert !== 'undefined') {
      this.setState({selectAdvert: selAdvert})
    }

    if (this.state.selectAdvert !== null && typeof selAdvert !== 'undefined') {
      if (this.state.selectAdvert.status !== selAdvert.status) {
        this.setState({selectAdvert: selAdvert});
      }
      if (this.state.selectAdvert.max_limit !== selAdvert.max_limit) {
        this.setState({selectAdvert: selAdvert});
      }
    }
  }

  render() {

    let {accounts, currentAdvert} = this.props;
    const {selectAdvert, isLoading} = this.state;
    let metaTitle, metaDescription;
    if (selectAdvert) currentAdvert = {...selectAdvert};



    if (currentAdvert) {
      metaTitle = counterpart
        .translate('seo.page_buy-advert_title',
          {
            coin: currentAdvert.coin.toUpperCase(),
            currency: currentAdvert.currency.toUpperCase(),
            price: currentAdvert.price_advert,
          },
        )
      ;
      metaDescription = counterpart
        .translate('seo.page_buy-advert_description',
          {
            coin: currentAdvert.coin.toUpperCase(),
            currency: currentAdvert.currency.toUpperCase(),
            user: currentAdvert.user.username,
            payments: currentAdvert.payment_name.join(', '),
            price: currentAdvert.price_advert,
            commsa: '0.2%',
          },
        )
      ;
    }
    else if(!isLoading){
      return <Error statusCode={404}/>
    }
    return (
      <div className={'ui container margin-page-top'}>
        <MetaTags metaTitle={metaTitle}
                  metaDescription={metaDescription}
                  href={`${this.props.host}/buy/advert/${this.props.advert}`}
        />
        {
          !selectAdvert ? (
            <LoaderShow/>
          ) : (
            <div>
              <BuySellTitle advert={selectAdvert} />
              <BuySellSubtitle advert={selectAdvert} />

              <div className={'margin-top-card'}>
                <Grid stackable
                      columns={2}
                >
                  <Grid.Row centered>
                    <Grid.Column className={'w-100-p'}
                                 width={5}
                    >
                      <UserCard user={selectAdvert.user}/>
                    </Grid.Column>
                    <Grid.Column className={'w-100-p'}
                                 width={11}
                    >
                      <BuyFormCard
                        advert={selectAdvert}
                        accounts={accounts}
                        sendCreateOperation={this.sendCreateOperation}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          )
        }

        <div className={'margin-top'}>
          <Grid stackable
                columns={2}
                className="byu__sell__second-grid"
          >
            <Grid.Row centered>
              <Grid.Column className={'w-100-p'}
                           width={5}
              >
                <OperationInfo/>
              </Grid.Column>
              <Grid.Column className={'w-100-p'}
                           width={11}
              >
                {
                  selectAdvert && (
                    <CommentCard comment={selectAdvert.comment}/>
                  )
                }
                <Card className={'shadow byu__sell__faq'}
                      centered
                >
                  <Card.Content extra>
                    <h3>FAQ</h3>
                    <AccordionFaq/>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    advertShowIsLoading: state.advertShowIsLoading,
    advertShow: state.advertShow,
    accounts: state.account,
    translations: state.translations,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    advertShowFetchData: (link) => dispatch(advertShowFetchData(link)),
    openLogin: (link) => dispatch(openLoginSidebar(link)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyShow);
