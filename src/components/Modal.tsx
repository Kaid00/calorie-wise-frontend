import React, { useContext } from "react";
import { ModalContext } from "@/context"; // Adjust the path
import { Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

const Modal = () => {
  const { isOpen, closeModal, modalContent } = useContext(ModalContext);

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="z-30 absolute top-0 w-full h-full flex bg-black bg-opacity-50"
    >
      <Dialog.Panel className="w-[40vw] mx-auto my-auto bg-white p-5 rounded-md border shadow-md relative">
        {modalContent}
        <button onClick={closeModal} className="absolute top-2 right-2">
          <IoMdClose />
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default Modal;
