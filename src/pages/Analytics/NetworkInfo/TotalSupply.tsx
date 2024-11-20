import React from "react";
// import {useGetCoinSupplyLimit} from "../../../api/hooks/useGetCoinSupplyLimit";
// import {getFormattedBalanceStr} from "../../../components/IndividualPageContent/ContentValue/CurrencyValue";
import MetricCard from "./MetricCard";
// import {APTOS_COIN} from "@aptos-labs/ts-sdk";

export default function TotalSupply() {
  // const totalSupply = useGetCoinSupplyLimit(APTOS_COIN);

  return (
    <MetricCard
      // data={
      //   totalSupply
      //     ? getFormattedBalanceStr(totalSupply.toString(), undefined, 0)
      //     : "-"
      // }
      data={"21,000,000"}
      label="nxBTC Supply"
      tooltip="Amount of nxBTC tokens flowing through the Aptos network."
    />
  );
}
