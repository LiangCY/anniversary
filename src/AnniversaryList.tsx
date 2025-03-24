import React from "react";
import { Grid } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { Anniversary } from "./types";
import { AnniversaryCard } from "./AnniversaryCard";

dayjs.locale("zh-cn");

const AnniversaryList: React.FC = () => {
  const navigate = useNavigate();

  const [anniversaries, setAnniversaries] = React.useState<Anniversary[]>([]);
  React.useEffect(() => {
    const storedAnniversaries = localStorage.getItem("anniversaries");
    if (storedAnniversaries) {
      setAnniversaries(JSON.parse(storedAnniversaries) as Anniversary[]);
    }
  }, []);

  return (
    <div style={{ padding: "12px" }}>
      <Grid columns={2} gap={8}>
        {anniversaries.map((anniversary, index) => (
          <Grid.Item key={index}>
            <AnniversaryCard data={anniversary} />
          </Grid.Item>
        ))}

        <Grid.Item>
          <div
            className="anniversary-card flex justify-center items-center"
            onClick={() => navigate("/anniversary-detail")}
          >
            <AddCircleOutline fontSize={32} color="#fff" />
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default AnniversaryList;
