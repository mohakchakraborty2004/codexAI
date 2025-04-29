"use client"

import React, { useEffect, useState } from "react";
import { checkConnection, retrievePublicKey } from "./freighter";
//import { fetchFeedback } from "./SmartContractInteraction";

const Header = ({ setPubKey  } : {setPubKey : any}) => {
  const [connect, getConnected] = useState("Connect");
  const [publickey, getPublicKey] = useState();
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => setOpen(!open);

  useEffect(() => {
    if (publickey !== "") {
      getConnected("Connected!");
      setPubKey(publickey);
     // fetchFeedback(publickey, 1);
    }
  }, [publickey]);

  const connectWallet = async () => {
    if (await checkConnection()) {
      const key = await retrievePublicKey() as string
      console.log(key)
      //@ts-ignore
      getPublicKey(key.address);
    }
  };

  // Format the public key with ellipsis in the middle
  const formatPublicKey = () => {
    //@ts-ignore
    if (!publickey || publickey.length === 0) {
    console.log("error 1")
      return "";
    }
    //@ts-ignore
    if (publickey.length <= 8) {
      return publickey;
    }
    //@ts-ignore
    return `${publickey.substring(0, 4)}...${publickey.substring(publickey.length - 4)}`;
  };

  return (
    <div className="bg-slate-400 flex md:flex-row shadow-slate-500 shadow-lg justify-between items-center px-10 py-4">
      <div
        className="text-2xl sm:text-
      3xl lg:text-3xl font-semibold text-black flex items-center gap-5"
      >
        <span className="text">Anonymous Feedback dApp</span>
      </div>

      <div
        onClick={() => handleOpenMenu()}
        className="text-4xl absolute top-4 right-3 md:hidden cursor-pointer"
      >

      </div>

      <div>
        <ul
          className={`${
            open ? "top-20 left-0" : "top-[-496px]"
          } flex flex-col md:flex-row md:justify-around items-center text-nowrap md:pb-0 py-3 absolute md:static bg-white md:bg-[transparent] gap-5 w-full md:w-auto pl-3 md:border-none border-2 border-blue-400 rounded-b-2xl transition-all duration-500 ease-in-out z-10`}
        >
          <li>
            {publickey && (
              <div className="p-1 bg-gray-50 border-2 max-w-max rounded-md">
                <span className="p-1 px-2 bg-violet-700 text-white h-full rounded-md">
                  Address
                </span>
                <span className="px-2">{publickey}</span>
              </div>
            )}
          </li>
          <li>
            <button
              className="text-xl w-52 hover:bg-blue-500 bg-blue-400 rounded-md p-4 font-bold text-white border-4"
              onClick={connectWallet}
            >
              {connect}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;