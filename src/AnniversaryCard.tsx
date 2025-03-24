import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { Anniversary } from "./types";

export const AnniversaryCard: React.FC<{ data: Anniversary }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="anniversary-card flex flex-col items-center"
      onClick={() => navigate(`/anniversary-detail/${data.id}`)}
    >
      <div className="anniversary-card-title py-4 text-base">{data.title}</div>
      <div className="anniversary-card-number flex-1 text-5xl">
        {Math.abs(dayjs().diff(data.date, "day"))}
      </div>
      <div className="anniversary-card-date py-4 text-sm">
        {dayjs(data.date).format("YYYY-MM-DD dddd")}
      </div>
    </div>
  );
};
