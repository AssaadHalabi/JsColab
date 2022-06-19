import { useRef, useState } from "react"
import { Modal } from "../components/Modal";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const [openModal, setopenModal] = useState(false)
  
  return (
    <>
        <Navbar />
    <button className="button is-primary" aria-label="close" onClick={e => {
      setopenModal(!openModal);
    }}/>
    <Modal openModal={openModal} setopenModal={setopenModal} title={'Your JSColab Notebook'} footerContent={<button className="button is-primary">Press me</button>}> I am the content</Modal>
    
    </>
  )
}
