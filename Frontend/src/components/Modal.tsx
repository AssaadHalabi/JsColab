import { useState } from "react";


interface ModalProps{
    openModal:boolean;
    setopenModal: any;
    title: string;
    footerContent: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({children, openModal, setopenModal, title, footerContent}) => {
  return (
    <div className={`modal${openModal ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={e => {
      setopenModal(!openModal);
    }}/>
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot">
          {footerContent}
        </footer>
      </div>
    </div>
  )
}
