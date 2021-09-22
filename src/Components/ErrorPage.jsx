import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="d-flex flex-column h-100">
    <div className="col justify-content-center align-content-center d-flex flex-column h-100">
      <p className="text-muted text-center">страница не найдена</p>
      <p className="text-center" style={{ fontSize: '72px' }}>
        404
      </p>
      <Link className="text-center" to="/">на главную</Link>
    </div>
  </div>
);
