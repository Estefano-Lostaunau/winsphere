import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import { IntlProvider } from 'react-intl';
import messages from '../messages';

const Root = () => {
  const [locale, setLocale] = useState(navigator.language.split(/[-_]/)[0] || 'en');

  const toggleLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App toggleLocale={toggleLocale} currentLocale={locale} />
    </IntlProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);