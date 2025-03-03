import React, { PropsWithChildren, useContext, useEffect } from "react";
import { ethers, BrowserProvider, Signer } from "ethers";
import { CharacterProvider } from "./Character";

export type Web3ContextType = {
  provider: BrowserProvider | null;
  signer: Signer | null;
  currentAccount: string;
};

export const Web3Context = React.createContext<Web3ContextType>({
  provider: null,
  signer: null,
  currentAccount: "",
});

export const Web3Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [provider, setProvider] = React.useState<BrowserProvider | null>(null);
  const [signer, setSigner] = React.useState<Signer | null>(null);
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  useEffect(() => {
    const ethereum = (window as any).ethereum;
    (async () => {
      // New metamask version
      if (typeof ethereum !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        ethereum.on("accountsChanged", function (accounts: string[]) {
          setCurrentAccount(accounts[0]);
        });
        setCurrentAccount(accounts[0]);

        const browseProvider = new ethers.BrowserProvider(ethereum);
        const provSigner = await browseProvider.getSigner();
        setProvider(browseProvider);
        setSigner(provSigner);
      }
    })();
    return () => {
      ethereum.removeListener("accountsChanged");
    };
  }, []);
  return (
    <Web3Context.Provider value={{ provider, signer, currentAccount }}>
      {provider ? (
        <CharacterProvider>{children}</CharacterProvider>
      ) : (
        "Loading cats...."
      )}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);
