import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import SellForm from '../forms/SellForm';
import TransText from '../TransText';

const SellFormCard = ({ advert, accounts, sendCreateOperation }) => {
  return (
    <Card
      className={'shadow'}
      centered
    >
      <Card.Content className={`byu__sell__form ${!advert.status ? 'error' : ''}`}>
        {
          !advert.status
            ? (
              <Header
                as='h4'
                icon
                textAlign='center'
                color={'red'}
              >
                <Icon name='warning sign' />
                <Header.Content>
                  <TransText code={'site.this_advert_is_disabled_you_can_open_deal'} />
                </Header.Content>
              </Header>)
            : (
              <SellForm
                advert={advert}
                accounts={accounts}
                createOperation={sendCreateOperation}
              />
            )
        }

      </Card.Content>
    </Card>
  );
};

export default SellFormCard;