// TemplateProvider.js
import React, { useState } from 'react';
import TemplateContext from './TemplateContext';

const TemplateProvider = ({ children }) => {
  const [templateName, setTemplateName] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <TemplateContext.Provider value={{ templateName, amount, setTemplateName, setAmount }}>
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
