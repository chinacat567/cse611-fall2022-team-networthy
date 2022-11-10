import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientComments } from "../../redux/slices/commentSlice";

import "../../styles/comments.scss";

const Comments = ({ clientId, isOpen, onClose, goal }) => {
  const dispatch = useDispatch();
  const clientComments = useSelector((state) => state?.comment?.clientComments);

  useEffect(() => {
    dispatch(
      getClientComments({
        clientId,
      })
    );
  }, []);

  // useEffect(() => {
  //   console.log(clientComments);
  // }, [clientComments]);

  console.log(goal);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="comments">
        <Typography id="modal-modal-title" variant="h6" component="h6">
          Comments
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {goal?.goalTittle}
        </Typography>
      </Box>
    </Modal>
  );
};

export default Comments;
