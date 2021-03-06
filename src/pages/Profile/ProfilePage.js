import React from "react";
import ProfileComponent from "../../components/Profile/ProfileComponent";
import BoardBanner from "../../components/Boards/Layout/BoardBanner";
import { Helmet } from 'react-helmet';

const ProfilePage = () => {
  return (
    <>
      <Helmet>
          <title>IUAM: 프로필</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Idu Used Article Market" />
          <meta name="keywords" content="Idu Used Article Market, IUAM, 인덕대학교, 아이두마켓, Idu, 중고시장, 중고마켓, 인덕대학교중고마켓, idu-market.shop, 아이두, 인덕대, 인덕, 거래 장터, 프로필, Profile" />
      </Helmet>
      <BoardBanner title="IUAM" desc="Profile" />
      <ProfileComponent />
    </>
  );
};

export default ProfilePage;
