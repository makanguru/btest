import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import {Checkbox, Divider, Form, Icon, Message, Segment} from 'semantic-ui-react';
import counterpart from 'counterpart';
import {connect} from 'react-redux';
import cabinet from '../api/cabinet';
import TransText from './TransText';
import DropdownElement from './forms/elements/DropdownElement';

class PaymentsSell extends Component {

  state = {
    openForm: false,
    loadingForm: false,
    loading: true,
    payment: [],
    paymentSelect: [],
    systems: [],
    newPayment: {
      systems: null,
      details: '',
    },
    newPaymentError: '',
    delPaymentError: '',
  };

  componentDidMount() {
    this.loadPayment();
  }

  loadPayment = () => {
    if (this.props.advert.coin_id !== 28) {
      cabinet.getPaymentSystem(undefined, this.props.token)
        .then((res) => {
          const paymentSelect = {};
          res.details.forEach((item) => {
            if (_.includes(this.props.advert.payment_id, item.payment_method_id)) {
              paymentSelect[item.id] = false;
            }
          });
          this.setState((state) => {
            return {
              loading: !state.loading,
              payment: res.details.filter((det) => _.includes(this.props.advert.payment_id, det.payment_method_id)),
              systems: res.systems.filter((det) => _.includes(this.props.advert.payment_id, det.key)),
              paymentSelect,
            }
          });
        });
    }

  };

  openFormAdd = () => {
    this.setState((state) => {
      return {
        openForm: !state.openForm,
      }
    })
  };

  changeSystem = (data) => {
    this.setState(() => {
      return {
        newPayment: {...this.state.newPayment, systems: data},
      }
    })
  };

  changeDetails = e => {
    this.setState({
      newPayment: {...this.state.newPayment, details: e.target.value},
    })
  };


  addPayment = () => {
    this.setState(() => {
      return {
        loadingForm: true,
        newPaymentError: '',
      }
    });
    cabinet.addPaymentSystem(this.state.newPayment, this.props.token)
      .then((res) => {
        if (res.status) {
          this.openFormAdd();
          this.setState(() => {
            return {
              payment: res.data.filter((det) => _.includes(this.props.advert.payment_id, det.payment_method_id)),
              loadingForm: false,
              newPayment: {
                systems: null,
                details: '',
              },
            }
          });
          const paymentSelect = {};

          res.data.forEach((item) => {
            if (_.includes(this.props.advert.payment_id, item.payment_method_id)) {
              paymentSelect[item.id] = false;
            }
          });
        } else {
          this.setState(() => {
            return {
              newPaymentError: res.error,
              loadingForm: false,
            }
          })
        }
      });
  };


  deletePayment = (id) => {
    this.setState(() => {
      return {
        loading: true,
        delPaymentError: '',
      }
    });
    cabinet.delPaymentSystem(id, this.props.token)
      .then((res) => {
        if (res.status) {
          this.setState(() => {
            return {
              payment: res.data.filter((det) => _.includes(this.props.advert.payment_id, det.payment_method_id)),
              loading: false,
            }
          })
        } else {
          this.setState(() => {
            return {
              delPaymentError: res.error,
            }
          })
        }
      });
  };

  changeSelectPayment = (e, {value}) => {
    const oldSelect = this.state.paymentSelect;
    oldSelect[value] = !oldSelect[value];
    this.props.onChange({name: 'payments', data: oldSelect});
    this.setState({paymentSelect: oldSelect});
  };

  render() {

    const {
      loading,
      payment,
      paymentSelect,
      openForm,
      systems,
      newPayment,
      newPaymentError,
      delPaymentError,
      loadingForm,
    } = this.state;

    if (this.props.advert.coin_id === 28) {
      return (
        <div>
          <h3 className={'text-center'}>
            <TransText code={'cabinet.this_coin_is_not_need_payment'} />
          </h3>
        </div>
      )
    }

    return (
      <div className={"payments-sell"}>
        <Segment basic
                 loading={loading}
                 className={'block-comp'}
        >
          <h3 className={'text-center title'}>
            <TransText code={'cabinet.your_payment_systems'} />
          </h3>
          <h4 className="text-center"
              style={{color: 'rgba(17, 15, 38, 0.8)'}}
          >
            <TransText code={'cabinet.suitable_requisites'} />
          </h4>
          {delPaymentError && <Message negative>
            <TransText code={delPaymentError} />
          </Message>}
          <div className={'payment-item'}>
            {
              payment.map((item) => {
                return <div key={item.id}
                            className={'margin-bottom-10'}
                >
                  <Segment className={'payment-profile'}
                           padded
                  >
                    <Checkbox
                      name={`payment_${item.id}`}
                      value={item.id}
                      checked={paymentSelect[item.id]}
                      onClick={this.changeSelectPayment}
                      label={`${item.payment.toUpperCase()} ${item.details}`}
                    />
                    <Segment basic
                             floated='right'
                             className={'delete-payment'}
                    >
                      <Icon name={'delete'}
                            link
                            onClick={() => this.deletePayment(item.id)}
                      />
                    </Segment>
                  </Segment>
                </div>
              })
            }
          </div>
        </Segment>
        <Divider horizontal
                 className={'no-border'}
        >
          <TransText code={'cabinet.or_divider'} />
        </Divider>
        <div className={'block-comp'}>
          <h3
            className={'text-center'}
            onClick={this.openFormAdd}
          >
            <TransText code={'cabinet.form_for_add_new_payments'} />
          </h3>
          {
            openForm &&
            <Form className={'payment-add-form text-center max-text-desc'}>
              {newPaymentError && <Message negative>
                <TransText code={newPaymentError} />
              </Message>}
              <div className={'margin-bottom-10'}>

                <h4><TransText code={'site.choose-the-system-of-payment'} /></h4>
                <div className={'filter-select'}>
                  <DropdownElement
                    name={'payment'}
                    defaultValue={0}
                    items={systems}
                    multiple={false}
                    valueChange={this.changeSystem}
                    isLoading={false}
                    withSearch={false}
                  />
                </div>
              </div>
              <Form.Field className={'input-add text-center'}>
                <h4><TransText code={'cabinet.payment_action_enter'} /></h4>
                <div className="ui input">
                  <input
                    name="password"
                    type={'text'}
                    value={newPayment.details}
                    onChange={this.changeDetails}
                    placeholder={counterpart.translate('site.enter_details_payment')}
                    className="styled-input"
                  />
                </div>
                <h4><TransText code={'cabinet.press_add'} /></h4>
                <button className="ui icon button "
                        onClick={this.addPayment}
                >
                  <TransText code={'cabinet.add'} />
                </button>
              </Form.Field>
              <p className={'w-100-p text-center max-text-desc text-desc'}>
                <TransText code={'cabinet.description_create_new_requisite'}
                           html
                />
              </p>
            </Form>
          }
        </div>
      </div>
    );
  }
}

PaymentsSell.propTypes = {
  onChange: PropTypes.func.isRequired,
  advert: PropTypes.object.isRequired,
};

export default connect(({token}) => ({token}))(PaymentsSell);
