import React, { ReactNode, createContext, useState } from "react";

export interface ModalContentProps {
  // Define props for your modal content component (optional)
}

export interface ModalContextValue {
  isOpen: boolean;
  openModal: (content: ReactNode | null) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

export const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalContent: null,
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] =
    useState<ModalContextValue["modalContent"]>(null);

  const openModal = (content: ReactNode | null) => {
    setIsOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
