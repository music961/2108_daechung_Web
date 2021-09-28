import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

const Type = ({setting}) => {
  const [type, setType] = useState("전체");

  const handleChange = (event) => {
    setType(event.target.value);
    setting(event.target.value);
  };
  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">항목</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={type}
          onChange={handleChange}
        >
          <MenuItem value="전체">
            <em>전체</em>
          </MenuItem>
          <MenuItem value={"녹조"}>녹조</MenuItem>
          <MenuItem value={"부유물"}>부유물</MenuItem>
          <MenuItem value={"방치 쓰레기"}>방치 쓰레기</MenuItem>
          <MenuItem value={"낚시/행랑객 계도"}>낚시/행랑객 계도</MenuItem>
          <MenuItem value={"기타사항"}>기타사항</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Type;
