import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {Cursor} from './Cursor';
createRoot(document.getElementById('root')!).render(<React.StrictMode><Cursor/><App/></React.StrictMode>);

