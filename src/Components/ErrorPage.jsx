import React from 'react';

export default () => (
  <div className="col justify-content-center align-content-center d-flex flex-column h-100">
    <p className="text-muted text-center">страница не найдена</p>
    <p className="text-center" style={{ fontSize: '72px' }}>
      404
    </p>
    <a className="text-center" href="/login">на главную</a>
  </div>
);
