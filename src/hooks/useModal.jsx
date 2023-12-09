import { useState } from "react";

const useModal = (initialState = false) => {
  const [isModalOpen, setModalOpen] = useState(initialState);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return { isModalOpen, openModal, closeModal };
};

export default useModal;
