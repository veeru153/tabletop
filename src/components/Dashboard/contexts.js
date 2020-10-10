import React from 'react';

const WidgetContext = React.createContext();

const WidgetProvider = WidgetContext.Provider;
const WidgetConsumer = WidgetContext.Consumer;

export { WidgetProvider, WidgetConsumer }