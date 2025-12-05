import React from "react";
import { useLocation, matchPath } from "react-router";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  let bgColor: string;
  const lightGreyPaths = ["/collaborations", "/services", "/profile", "/profile/:profileId", "/profile/:profileId/edit"];

  const isLightGrey = lightGreyPaths.some((path) => matchPath({ path, end: true }, location.pathname));

  if (isLightGrey) {
    bgColor = "bg-light-grey";
  } else {
    bgColor = "bg-white";
  }

  return <div className={bgColor}>{children}</div>;
}
