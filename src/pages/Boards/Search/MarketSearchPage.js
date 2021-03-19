import React from "react";
import BoardBanner from "../../../components/Boards/Layout/BoardBanner";
import SearchComponent from "../../../components/Boards/Search/SearchComponent";
import SearchListComponent from "../../../components/Boards/Search/SearchListComponent";

const MarketSearchPage = () => {
  return (
    <div>
      <BoardBanner title="Market" desc="Search"></BoardBanner>
      <SearchListComponent></SearchListComponent>
    </div>
  );
};

export default MarketSearchPage;
