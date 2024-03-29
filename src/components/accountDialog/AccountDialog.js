import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Box } from "@mui/system";
import sha256 from "sha256";

const AccountDialog = ({ open, onClose, updateUser, data, key }) => {
  const [checkDuplicate, setCheckDuplicate] = useState(false);
  const [user, setUser] = useState([]);
  const [updateUserInfo, setUpdateUserInfo] = useState({
    user_seq: -1,
    user_id: "",
    user_pwd: "",
    user_local: "",
    user_nm: "",
  });
  useEffect(() => {
    setUser(data);
    setUpdateUserInfo(data);
    setCheckDuplicate(false);
    return () => {
      setCheckDuplicate(false);
    };
  }, []);
  useEffect(() => {
    //setUser(data);
    setUpdateUserInfo(data);
    setCheckDuplicate(false);
  }, [data]);
  useEffect(() => {
    setUser(data);
    setUpdateUserInfo(data);
    setCheckDuplicate(false);
  }, [open]);
  const checkDuplicateId = async (checking) => {
    if (checking === data.user_id) {
      alert("중복체크 완료, 사용가능한 아이디 입니다.");
      setCheckDuplicate(true);
      return true;
    } else {
      const s = await axios.get(
        process.env.REACT_APP_API_HOST + `/user/check/id/${checking}`
      );
      if (s.data.exist) {
        alert("중복된 아이디 입니다. 다른 아이디를 사용해 주세요.");
      } else {
        alert("중복체크 완료, 사용가능한 아이디 입니다.");
      }
      setCheckDuplicate(!s.data.exist);
      return s.data.exist;
    }
  };
  const updateUserFromDialog = async (userInfo) => {
    if (!checkDuplicate) {
      alert("아이디 중복 체크를 해 주세요.");
    } else {
      if (userInfo.user_pwd === "") {
        userInfo.user_pwd = user.user_pwd;
      }

      axios
        .post(process.env.REACT_APP_API_HOST + "/user/update", userInfo, {
          headers: {
            "content-type": "text/plain",
          },
        })
        .then((e) => {
          alert("회원 정보가 변경 되었습니다. ");
          window.location.replace("/home/account_manage");
        });
    }
  };
  return (
    <Dialog open={open} onClose={onClose} key={key}>
      <DialogTitle>사용자 정보 수정</DialogTitle>
      <DialogContent>
        <DialogContentText>정보 수정 하세요.</DialogContentText>
        <TextField
          required
          autoFocus
          margin="normal"
          id="user_nm"
          label="이름"
          type="string"
          fullWidth
          defaultValue={user.user_nm}
          onChange={(e) =>
            setUpdateUserInfo({
              ...updateUserInfo,
              user_nm: e.target.value,
            })
          }
        />
        <Box>
          <TextField
            required
            autoFocus
            margin="normal"
            id="user_id"
            label="아이디"
            type="string"
            fullWidth
            defaultValue={user.user_id}
            onChange={(e) =>
              setUpdateUserInfo({
                ...updateUserInfo,
                user_id: e.target.value,
              })
            }
          />
        </Box>

        <TextField
          required
          autoFocus
          margin="normal"
          id="user_pwd"
          label="비밀번호 (변경하지 않으실거면 공란으로 두세요)"
          type="password"
          fullWidth
          defaultValue={""}
          onChange={(e) =>
            setUpdateUserInfo({
              ...updateUserInfo,
              user_pwd: sha256(e.target.value),
            })
          }
        />
        <TextField
          required
          autoFocus
          margin="normal"
          id="user_nm"
          label="권역"
          type="string"
          fullWidth
          defaultValue={user.user_local}
          onChange={(e) =>
            setUpdateUserInfo({
              ...updateUserInfo,
              user_local: e.target.value,
            })
          }
        />
      </DialogContent>
      <DialogActions>
        {checkDuplicate ? (
          <Button variant="text">중복확인완료</Button>
        ) : (
          <Button
            variant="text"
            color="error"
            onClick={async () => {
              await checkDuplicateId(updateUserInfo.user_id);
            }}
          >
            아이디 중복확인
          </Button>
        )}

        <Button
          onClick={() => {
            onClose();
            setCheckDuplicate(false);
          }}
        >
          Cancel
        </Button>
        <Button
          color="success"
          onClick={() => {
            setCheckDuplicate(false);
            updateUserFromDialog(updateUserInfo);
            updateUser();
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDialog;
