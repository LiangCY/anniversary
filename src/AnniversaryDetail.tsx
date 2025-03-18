import React from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, DatePicker, Dialog, Grid, Tag } from "antd-mobile";
import { Anniversary } from "./types";

const AnniversaryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedAnniversaries = localStorage.getItem("anniversaries");
    if (storedAnniversaries) {
      const data = JSON.parse(storedAnniversaries) as Anniversary[];
      const item = data.find((item) => item.id === id);
      if (id && item) {
        setFormData(item);
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const stored = localStorage.getItem("anniversaries") || "[]";
    const items = JSON.parse(stored);
    const index = items.findIndex((item: Anniversary) => item.id === id);
    if (index > -1) {
      const updated = [...items.slice(0, index), ...items.slice(index + 1)];
      localStorage.setItem("anniversaries", JSON.stringify(updated));
    }
    navigate("/");
  };

  const [formData, setFormData] = React.useState<Omit<Anniversary, "id">>({
    title: "",
    date: Date.now(),
    color: "#f0f9ff",
  });

  const COLOR_PRESETS = [
    "#f0f9ffa0",
    "#f0f5ffa0",
    "#f6ffeda0",
    "#fff7e6a0",
    "#fff0f6a0",
    "#f9f0ffa0",
    "#fffbe6a0",
    "#ffe4e1a0",
    "#f0fff4a0",
    "#f5f0ffa0",
    "#fff0f5a0",
    "#e6fffba0",
  ];
  const [dateVisible, setDateVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);

  const handleSubmit = () => {
    const newItem = {
      ...formData,
      id: id || Date.now().toString(),
    };

    const stored = localStorage.getItem("anniversaries") || "[]";
    const items = JSON.parse(stored);

    if (id) {
      const index = items.findIndex((item: Anniversary) => item.id === id);
      if (index > -1) items[index] = newItem;
    } else {
      items.push(newItem);
    }

    localStorage.setItem("anniversaries", JSON.stringify(items));
    navigate("/");
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>{id ? "编辑纪念日" : "新建纪念日"}</h2>
      <Input
        value={formData.title}
        onChange={(v) => setFormData((prev) => ({ ...prev, title: v }))}
        placeholder="输入纪念日名称"
        style={{ marginBottom: 16 }}
      />
      <Button onClick={() => setDateVisible(true)} style={{ marginBottom: 16 }}>
        {dayjs(formData.date).format("YYYY-MM-DD") || "选择日期"}
      </Button>
      <DatePicker
        visible={dateVisible}
        min={dayjs("1980-01-01").toDate()}
        value={new Date(formData.date)}
        onConfirm={(v) =>
          setFormData((prev) => ({ ...prev, date: v.valueOf() }))
        }
        onClose={() => setDateVisible(false)}
      />
      <div style={{ margin: "24px 0" }}>
        <div style={{ fontSize: "15px", color: "#666", marginBottom: 12 }}>
          选择颜色
        </div>
        <Grid columns={6} gap={8}>
          {COLOR_PRESETS.map((color) => (
            <Grid.Item key={color}>
              <Tag
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: color,
                  border:
                    formData.color === color
                      ? "2px solid var(--adm-color-primary)"
                      : "none",
                }}
                onClick={() => setFormData({ ...formData, color })}
              />
            </Grid.Item>
          ))}
        </Grid>
      </div>
      <Button color="primary" onClick={handleSubmit} block>
        {id ? "保存修改" : "创建纪念日"}
      </Button>
      {id && (
        <Button
          color="danger"
          onClick={() => setDeleteVisible(true)}
          style={{ marginTop: 16 }}
          block
        >
          删除纪念日
        </Button>
      )}
      <Dialog
        visible={deleteVisible}
        content="确定要删除这个纪念日吗？"
        closeOnAction
        onClose={() => setDeleteVisible(false)}
        actions={[
          {
            key: "cancel",
            text: "取消",
          },
          {
            key: "confirm",
            text: "确定",
            bold: true,
            danger: true,
            onClick: handleDelete,
          },
        ]}
      />
    </div>
  );
};

export default AnniversaryDetail;
