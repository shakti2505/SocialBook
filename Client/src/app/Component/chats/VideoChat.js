import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { ChatContext } from "../../../Context/ChatContext";
import CallCard from "./CallingCard";

const VideoChat = () => {
  const {modalShow} = useContext(ChatContext);

  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <CallCard />
    </Modal>
  );
};

export default VideoChat;
