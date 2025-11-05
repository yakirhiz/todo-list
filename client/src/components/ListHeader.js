import { useState } from "react";
import Modal from "./Modal";

export default function ListHeader({ listName, getData }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="list-header">
      {/* <h1>{listName}</h1> */}
      <div className="button-container-top">
        <button className="create" onClick={() => setShowModal(true)}>ADD NEW</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
}