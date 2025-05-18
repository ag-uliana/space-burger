import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './i18n';
import store from './services/store.ts';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DndProvider>
  </Provider>
)
