import { useState } from 'react';

export const routerHook = {};

export const useRouterHook = () => {
  const [state, setState] = useState(null);

  routerHook.url = state;
  routerHook.routeTo = setState;

  return [state, setState];
};



// https://codesandbox.io/s/react-router-demo-hook-routing-forked-jjz7n?file=/src/index.js