import Modal from "../ui/Modal";
import useModal from "../../hooks/UseModal";

const BasicModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  return (
    <div className="App">
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Modal title</h1>
        <p>Modal body</p>
      </Modal>
    </div>
  );
};

export default BasicModal;
