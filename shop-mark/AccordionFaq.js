import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import TransText from "./TransText";

export default class AccordionFaq extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <TransText code={'cabinet.how-to-choose-the-amount-of-the-purchase-sale'}/>
          <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            <TransText code={'cabinet.how-to-choose-the-amount-of-the-purchase-sale-text'}/>
          </p>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <TransText code={'cabinet.you-can-trust-the-user-or-not'}/>
          <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            <TransText code={'cabinet.you-can-trust-the-user-or-not-text'}/>
          </p>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <TransText code={'cabinet.how-to-create-a-transaction-with-the-user'}/>
          <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            <TransText code={'cabinet.how-to-create-a-transaction-with-the-user-text'}/>
          </p>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
          <TransText code={'cabinet.what-is-the-deal-with-the-user'}/>
          <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>
            <TransText code={'cabinet.what-is-the-deal-with-the-user-text'}/>
          </p>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
          <TransText code={'cabinet.what-if-i-paid-and-the-seller-has-not-confirmed-the-deal'}/>
          <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <p>
            <TransText code={'cabinet.what-if-i-paid-and-the-seller-has-not-confirmed-the-deal-text'}/>
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
}
