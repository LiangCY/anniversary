import React from "react";
import { Grid, Card, Space } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { Anniversary } from "./types";

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
            <Card
              title={anniversary.title}
              onClick={() => navigate(`/anniversary-detail/${anniversary.id}`)}
              style={{
                height: "160px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                backgroundColor: anniversary.color,
              }}
            >
              <Space block justify="between">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {Math.abs(dayjs().diff(anniversary.date, "day"))}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      textAlign: "right",
                      marginTop: "auto",
                      paddingTop: "4px",
                    }}
                  >
                    {dayjs(anniversary.date).format("YYYY-MM-DD dddd")}
                  </div>
                </div>
              </Space>
            </Card>
          </Grid.Item>
        ))}

        <Grid.Item>
          <Card
            onClick={() => navigate("/anniversary-detail")}
            style={{
              height: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f580",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AddCircleOutline fontSize={32} color="var(--adm-color-primary)" />
          </Card>
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default AnniversaryList;
