import React, {Component}                                  from 'react';
import * as PropTypes                                      from 'prop-types';
import * as moment                                         from 'moment'
import {Button, Card, Grid, Icon, List, Responsive, Table} from 'semantic-ui-react';
import TransText                                           from '../../TransText';
import ResponsiveCell                                      from '../../responsiveCell';
import MultiLangLink from '../../MultiLangLink';

class AccountList extends Component {

  state = {
    paramaining: 0,
  };

  componentDidMount() {
    this.paramaining = 0;
    this.balance = 0;
    this.time = 0;
    this.interval = setInterval(this.calcParaminig, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setParaminig = (time, balance) => {
    this.balance = balance;
    this.time = time;
  };

  calcParaminig = () => {
    const x = moment.unix(this.time).utc();
    const y = moment().utc();
    const percent = (0.3 / 100) * parseFloat(this.balance).toFixed(2);
    const percentCalc = (percent / 86400).toFixed(8);
    this.setState(() => {
      return {
        paramaining: (y.diff(x, 'seconds') * percentCalc).toFixed(8),
      }
    })
    // this.paramaining = (y.diff(x, 'seconds') * percentCalc).toFixed(8)
  };

  render() {

    const {paramaining} = this.state;

    return (
      <Card className={'shadow account-list'}>
        <Card.Content className={'cabinet-header-m card-header'}>
          <Card.Header>
            <Responsive {...Responsive.onlyMobile}>
              <h3 className={'text-center'}>
                <TransText code={'cabinet.wallet_title'}/>
                </h3>
              <List>
                <List.Item>
                  <MultiLangLink  href="/Cabinet/History/tradesHistory" as={'/cabinet/trader'}>
                    <a className="ui blue large button">
                      <Icon name={'file alternate outline'}/>
                      <TransText code={'cabinet.history-trades-open'}/>
                    </a>
                  </MultiLangLink >
                </List.Item>
                <List.Item>
                  <MultiLangLink  href="/Cabinet/AdvertAction/Create" as={'/cabinet/create-advert'}>
                    <a className="ui blue large button" >
                      <Icon name={'plus'}/>
                      <TransText code={'cabinet.create-advert'}/>
                    </a>
                  </MultiLangLink >
                </List.Item>
              </List>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <List>
                <List.Item>
                  <List.Content floated='right'>
                    <MultiLangLink  href="/Cabinet/History/tradesHistory" as={'/cabinet/trader'}>
                      <a className="ui blue large button" >
                        <Icon name={'file alternate outline'}/>
                        <TransText code={'cabinet.history-trades-open'}/>
                      </a>
                    </MultiLangLink >
                    <MultiLangLink  href="/Cabinet/AdvertAction/Create" as={'/cabinet/create-advert'}>
                      <a className="ui blue large button" >
                        <Icon name={'plus'}/>
                        <TransText code={'cabinet.create-advert'}/>
                      </a>
                    </MultiLangLink >
                  </List.Content>
                  <List.Content className={'cabinet-header table-title'} verticalAlign='bottom'>
                    <TransText
                    code={'cabinet.wallet_title'}/>
                    </List.Content>
                </List.Item>
              </List>
            </Responsive>

          </Card.Header>
        </Card.Content>
        <Card.Content className={'padding-0 border-none'}>
          <Table selectable basic='very' padded className={'advert-list-table'}>
            <Table.Header >
              <Responsive as={Table.Row} minWidth={Responsive.onlyTablet.minWidth}>
                <Table.HeaderCell textAlign='left'><TransText code={'cabinet.valute'}/></Table.HeaderCell>
                <Table.HeaderCell><TransText code={'cabinet.balance'}/></Table.HeaderCell>
                <Table.HeaderCell><TransText code={'cabinet.hold'}/></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell> {} </Table.HeaderCell>
              </Responsive>
            </Table.Header>
            <Table.Body>
              {
                this.props.accounts.map((account) =>
                  <Table.Row key={account.currency}>
                    <Table.Cell textAlign='left'>
                      <ResponsiveCell
                        text={'cabinet.valute'}
                        value={account.currency.toUpperCase()}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {
                        account.currency_id !== 30 &&
                        <div>
                          <Responsive {...Responsive.onlyMobile}>
                            <Grid>
                              <Grid.Row>
                                <Grid.Column width={8} floated='left' textAlign='left'>
                                  <TransText code={'cabinet.balance'}/>
                                </Grid.Column>
                                <Grid.Column width={8} textAlign='left'>
                                  {account.balance}<br/>
                                  {
                                    account.currency_id === 31 &&
                                    typeof account.account_data.last_action !== 'undefined' &&
                                    <span>
                                                                            {this.setParaminig(account.account_data.last_action, account.balance)}
                                      ({paramaining})
                                                                        </span>
                                  }
                                  {
                                    account.currency_id === 31 &&
                                    typeof account.account_data.last_action === 'undefined' &&
                                    <span>
                                                                            (0.00000000)
                                                                        </span>
                                  }
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Responsive>
                          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                            {account.balance}<br/>
                            {
                              account.currency_id === 31 &&
                              typeof account.account_data.last_action !== 'undefined' &&
                              <span>
                                                                {this.setParaminig(account.account_data.last_action, account.balance)}
                                {paramaining}
                                                            </span>
                            }
                            {
                              account.currency_id === 31 &&
                              typeof account.account_data.last_action === 'undefined' &&
                              <span>
                                                                0.00000000
                                                            </span>
                            }
                          </Responsive>
                        </div>
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        account.currency_id !== 30 &&
                        <ResponsiveCell text={'cabinet.hold'} value={account.hold}/>
                      }
                    </Table.Cell>
                    <Table.Cell textAlign={'right'} className={'cabinet-table-button'}>

                    </Table.Cell>
                    <Table.Cell textAlign={'right'} className={'cabinet-table-button'}>
                      <Responsive {...Responsive.onlyMobile}>
                        {
                          account.currency_id !== 30 &&
                          <div>
                            <MultiLangLink  href={`/Cabinet/WalletAction/Deposit`}
                                  as={`/cabinet/wallet/deposit/${account.currency}`}
                            >
                              <a className={'ui button fluid'}><TransText code={'cabinet.deposit'}/></a>
                            </MultiLangLink >
                            <MultiLangLink  href={`/Cabinet/WalletAction/Withdraw`}
                                  as={`/cabinet/wallet/withdraw/${account.currency}`}>
                              <a className={'ui button fluid'}><TransText code={'cabinet.withdraw'}/></a>
                            </MultiLangLink >
                          </div>
                        }
                      </Responsive>
                      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                        {
                          account.currency_id !== 30 &&
                          <div>
                            <MultiLangLink  href={`/Cabinet/WalletAction/Deposit`}
                                  as={`/cabinet/wallet/deposit/${account.currency}`}
                            >
                              <a className={'ui button'}><TransText code={'cabinet.deposit'}/></a>
                            </MultiLangLink >
                            <MultiLangLink  href={`/Cabinet/WalletAction/Withdraw`}
                                  as={`/cabinet/wallet/withdraw/${account.currency}`}>
                              <a className={'ui button'}><TransText code={'cabinet.withdraw'}/></a>
                            </MultiLangLink >
                          </div>
                        }
                      </Responsive>
                    </Table.Cell>
                  </Table.Row>,
                )
              }

            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    );
  }
}

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default AccountList;
