import React, {Component}        from 'react';
import { Grid, Icon, Responsive, Table } from 'semantic-ui-react'
import StatusUser                from './StatusUser';
import TransText                 from './TransText';
import AdvertShowPayment         from './AdvertShowPayment';
import MultiLangLink from './MultiLangLink';


class AdvertItem extends Component {
  showRating = () => {
    const {advert, typeAdvert} = this.props;
    if(advert.user.username.toLowerCase() === 'wallbtc' || advert.user.username.toLowerCase() === 'indacoin') {
      return <Icon name="university"/>;
    }
    return advert.user.rating_user
  };
  showName = () => {
    const {advert} = this.props;
    if(advert.user.username.toLowerCase() === 'wallbtc' || advert.user.username.toLowerCase() === 'indacoin') {
      return advert.user.username.toUpperCase();
    }
    return advert.user.username;
  };
  render() {
    const {advert, typeAdvert} = this.props;
    
    return (
      <Table.Row>
        <Table.Cell>
          <Responsive {...Responsive.onlyMobile}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} floated='left' textAlign='left'>
                  <TransText code={'site.rating'}/>
                </Grid.Column>
                <Grid.Column width={8} textAlign='left'>
                  {this.showRating()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            {this.showRating()}
          </Responsive>
        </Table.Cell>
        <Table.Cell>
          <Responsive {...Responsive.onlyMobile}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} floated='left' textAlign='left'>
                  <TransText code={'site.seller'}/>
                </Grid.Column>
                <Grid.Column width={8} textAlign='left'>

                  <MultiLangLink  href="/ShowUser" as={`/info/user/${advert.user.username}`}>
                    <a>
                      <StatusUser time={advert.user.isOnlineMin}/>
                      {this.showName()}
                      </a>
                  </MultiLangLink >
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <MultiLangLink  href="/ShowUser" as={`/info/user/${advert.user.username}`}>
              <a>
                <StatusUser time={advert.user.isOnlineMin}/>
                {this.showName()}
                </a>
            </MultiLangLink >
          </Responsive>
        </Table.Cell>
        <Table.Cell>
          <Responsive {...Responsive.onlyMobile}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} floated='left' textAlign='left'>
                  <TransText code={'site.payment-method'}/>
                </Grid.Column>
                <Grid.Column width={8} textAlign='left'>
                  <AdvertShowPayment payment={advert.payment_id}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <AdvertShowPayment payment={advert.payment_id}/>
          </Responsive>
        </Table.Cell>
        <Table.Cell>
          <Responsive {...Responsive.onlyMobile}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} floated='left' textAlign='left'>
                  <TransText code={'site.price'}/>
                </Grid.Column>
                <Grid.Column width={8} textAlign='left'>
                  {advert.price_advert} {advert.currency.toUpperCase()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            {advert.price_advert} {advert.currency.toUpperCase()}
          </Responsive>
        </Table.Cell>
        <Table.Cell>
          <Responsive {...Responsive.onlyMobile}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8} floated='left' textAlign='left'>
                  <TransText code={'site.limits'}/>
                </Grid.Column>
                <Grid.Column width={8} textAlign='left'>
                  {advert.limit_min} - {advert.limit_max} {advert.currency.toUpperCase()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            {advert.limit_min} - {advert.limit_max} {advert.currency.toUpperCase()}
          </Responsive>
        </Table.Cell>
        <Table.Cell>
          <Responsive {...Responsive.onlyMobile}>
            <MultiLangLink  as={`/${typeAdvert}/advert/${advert.advert_link_id}`}
                  href={`/${typeAdvert[0].toUpperCase() +
                  typeAdvert.slice(1)}Show`}>
              <a className={'ui button blue fluid'}>
                <TransText code={`site.${typeAdvert}`}/>
              </a>
            </MultiLangLink >
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <MultiLangLink  as={`/${typeAdvert}/advert/${advert.advert_link_id}`}
                  href={`/${typeAdvert[0].toUpperCase() + typeAdvert.slice(1)}Show`}>
              <a className={'ui button blue'}>
                <TransText code={`site.${typeAdvert}`}/>
              </a>
            </MultiLangLink >
          </Responsive>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default AdvertItem;