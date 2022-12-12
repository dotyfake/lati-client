import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
};

const ViewImage = (props: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <img src={props.src} alt={props.alt} onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={{
          content: {
            top: "10%",
            left: "10%",
            right: "10%",
            bottom: "10%",
          },
          overlay: {
            background: "rgba(0,0,0,0.4)",
            zIndex: 1000,
          },
        }}
      >
        <Wrapper>
          <img className="image" src={props.src} alt={props.alt} />
        </Wrapper>
      </Modal>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  .image {
    height: 100%;
  }
`;

export default ViewImage;
