import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="col justify-content-center align-content-center d-flex flex-column h-100">
        <p className="text-muted text-center">{t('errorPage.pageNotFound')}</p>
        <p className="text-center" style={{ fontSize: '72px' }}>
          {t('errorPage.errCode')}
        </p>
        <Link className="text-center" to="/">{t('errorPage.toTheMain')}</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
