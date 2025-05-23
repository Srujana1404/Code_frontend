import React from "react";
import Instructions from "./Instruction";

interface InfoTableProps {
  totalQuestions: number;
  totalScore: number;
  contestDuration: string;
  startTime: string;
  endTime: string;
}

const InfoTable: React.FC<InfoTableProps> = ({
  totalQuestions,
  totalScore,
  contestDuration,
  startTime,
  endTime,
}) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <table
          style={{
            width: "70%",
            minWidth: "500px",
            marginTop: "30px",
            borderCollapse: "collapse",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            overflow: "hidden",
            textAlign: "left",
            backgroundColor: "#fff",
          }}
        >
          <thead style={{ backgroundColor: "#6A1B9A", color: "white" }}>
            <tr>
              <th style={{ padding: "20px 20px" }}>Total Questions</th>
              <th style={{ padding: "20px 20px" }}>Total Score</th>
              <th style={{ padding: "20px 20px" }}>Contest Duration</th>
              <th style={{ padding: "20px 20px" }}>Start Time</th>
              <th style={{ padding: "20px 20px" }}>End Time</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "20px 20px" }}>{totalQuestions}</td>
              <td style={{ padding: "20px 20px" }}>{totalScore}</td>
              <td style={{ padding: "20px 20px" }}>{contestDuration}</td>
              <td style={{ padding: "20px 20px" }}>{startTime}</td>
              <td style={{ padding: "20px 20px" }}>{endTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Instructions />
    </>
  );
};

export default InfoTable;
