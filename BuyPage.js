
class BuyPage extends Component {
  static async getInitialProps({store, isServer, req}) {
    if (isServer) {
      await Promise.all([
        store.dispatch(getAdverts('sell')),
      ]);
    }
    return {host: 'https://' + (req ? req.headers.host : window.location.hostname)};
  }

  componentDidMount() {
    const { currency, paymentMethod } = this.props.filterAdvert;
    this.props.coins.forEach(coin => (
      this.props.getAdverts({ type: 'sell', coin, currency, paymentMethod })
    ));

    if (this.props.adverts.sell.length === 0) {

      this.props.cryptoCoinFilter([]);
    }
  }

  wasChanged = prevFilter => {
    return (this.props.filterAdvert.coin.length !== prevFilter.coin.length)
      || (this.props.filterAdvert.currency !== prevFilter.currency)
      || (this.props.filterAdvert.paymentMethod.length !== prevFilter.paymentMethod.length)
  }
  forAllCoins = coinList => coinList.length === 0;
  findCoinById = coinId => this.props.coins.find(coin => coin.value === coinId);

  componentDidUpdate(prevProps) {
    if (this.wasChanged(prevProps.filterAdvert)) {
      const { coin, currency, paymentMethod } = this.props.filterAdvert;
      if (this.forAllCoins(coin)) {
        this.props.coins.forEach(oneCoin => (
          this.props.getAdverts({ type: 'sell', coin: oneCoin, currency, paymentMethod })
        ));
      } else {
        coin.forEach(oneCoin => (
          this.props.getAdverts({ type: 'sell', coin: this.findCoinById(oneCoin), currency, paymentMethod })
        ));
      }
    }
  }

  getActiveCoin() {
    if (this.props.filterAdvert.coin.length > 0) {
      return this.props.adverts.coins.filter((coin) => {
        return this.props.filterAdvert.coin.includes(coin.value)
      })
    }

    return this.props.adverts.coins;
  }

  getBtcPriceBest = (adverts) => {
    const findBtcAdvert = adverts.filter((advert) => advert.coin === 'btc');

    if (findBtcAdvert.length > 0) {
      return findBtcAdvert[0].price_advert;
    }

    return '';
  };

  render() {

    let sortAdvert = [];
    const adverts = this.props.adverts.sell;


    const metaTitle = counterpart.translate('seo.page_buy_title', {price: this.getBtcPriceBest(sortAdvert)});
    const metaDescription = counterpart.translate('seo.page_buy_desc', {interpolate: false});
    return (
      <div>
        <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
        <div className={'ui container margin-page-top'}>
          <Card className={'shadow'} centered>
            <Card.Content className={'border-top-none'} extra>
              <SellBuyButtons type={BUTTON_BUY}/>
              <Divider/>
              <AdvertsFilter/>
            </Card.Content>
          </Card>
        </div>
        <div className={'ui container margin-page-top'}>
          {this.props.adverts.coinsLoading ? (
            <Loading/>
          ) : (
            this.getActiveCoin().map((coin) =>
              <AdvertList key={coin.key}
                          coin={coin}
                          advertList={sortAdvert}
                          typeAdvert={'buy'}
              />,
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adverts: state.adverts,
    coins: state.adverts.coins,
    filterAdvert: state.filterAdvert,
    paymentMethod: state.paymentMethod,
  };
};

const mapDispatchToPros = dispatch => ({
  getAdverts: params => dispatch(getAdverts(params)),
  cryptoCoinFilter: data => dispatch(cryptoCoinFilterChange(data)),
  // getCoins: () => dispatch(getCoins()),
  // paymentMethodFetchData: () => dispatch(paymentMethodFetchData()),
  // currencyFetchData: () => dispatch(currencyFetchData())
});

export default connect(mapStateToProps, mapDispatchToPros)(BuyPage);
