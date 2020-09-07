import React from 'react';
import '../theme/pages/error.css';
import MultiLangLink from '../components/MultiLangLink';
import TransText from '../components/TransText';

const Error = () => {
  return (
    <div className="error container ui">
      <div className="error__content">
        <h1><TransText code={'site.error_page_title'}/></h1>
        <p><TransText code={'site.error_page_paragraph'}/></p>
        <MultiLangLink href='/BuyPage' as="/">
          <a><TransText code={'site.error_page_button'}/></a>
        </MultiLangLink>
      </div>
      <div className="error__image">
        <img src={'/static/assets/404.png'}
             alt="Not found"
        />
      </div>
    </div>
  );
};

export default Error;