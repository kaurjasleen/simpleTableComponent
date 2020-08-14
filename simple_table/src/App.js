import React from 'react';
import './App.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.js';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table/dist/extensions/cookie/bootstrap-table-cookie.min.js'


import DataTable from './DataTable';

function App() {
  return (
<div className="body">
    <div className="App">
        <h1>Simple Table Component</h1>
        <DataTable />
    </div>
</div>
  );
}

export default App;
