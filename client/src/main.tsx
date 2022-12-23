import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import {StateContextProvider} from './context'
// import "./styles/globals.css";
import "./index.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Router>
        <StateContextProvider>
        <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
