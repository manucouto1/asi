import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import Seo from "../components/Seo";

export default function Home() {

  return (
    <BasicLayout className="home">
      <Seo/>
    </BasicLayout>
  );
}
