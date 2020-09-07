import React from 'react';
import {Line, LineChart, ResponsiveContainer} from 'recharts';

const TableMobile = ({tableData, endCurrency}) => {
  const getCurrencyIcon = (currencyIcon, currencyTitle) => {
    const baseUrl = process.env.API_GATE.replace('api/v2', '');

    return <img src={baseUrl + '/' + currencyIcon[currencyTitle.toLowerCase()]}
                alt="Currency logo"
    />;
  };

  return (
    <div className='exchange-rates__mobile'>
      {
        tableData.map((item, index) => {
          return (
            <div className="exchange-rates__item">
              <div className="exchange-rates__item-header">
                <div className="currency-title">
                  <span>{index + 1}</span>
                  {getCurrencyIcon(item.currencyIcon, item.currencyTitle)}
                  <span>{item.currencyTitle}</span>
                </div>
              </div>
              <div className="exchange-rates__item-info">
                <span>Price</span>
                <span>{item.lastPrice} {endCurrency}</span>
              </div>
              <div className="exchange-rates__item-info">
                <span>Volume (24h)</span>
                <span>{item.quoteVolume}</span>
              </div>
              <div className="exchange-rates__item-info">
                <span>Volume ({endCurrency})</span>
                <span>{item.baseVolume} {endCurrency}</span>
              </div>
              <div className="exchange-rates__item-info">
                <span>Change</span>
                <span className={
                  Math.sign(item.changes) === 1
                    ? 'positive' : Math.sign(item.changes) === -1
                    ? 'negative' : 'neutral'
                }>
                  {item.changes}%
                </span>
              </div>
              <div style={{width: '100%', height: '24px', marginTop: '16px'}}>
                <ResponsiveContainer>
                  <LineChart width={164} height={24} data={item.chartData}>
                    <Line type="monotone"
                          dataKey="value"
                          stroke={
                            Math.sign(item.changes) === 1
                              ? '#16b862' : Math.sign(item.changes) === -1
                              ? '#f54562' : '#adacb5'
                          }
                          strokeWidth='2'
                          dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )
        })
      }
    </div>
  )
};

export default TableMobile;
