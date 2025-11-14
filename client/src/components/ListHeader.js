import { useState } from "react";
import Modal from "./Modal";

import SearchBar from "./features/SearchBar";

import { Plus } from 'lucide-react';

export default function ListHeader({ listName, getData, searchQuery, setSearchQuery }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="list-header">
      {/* <h1>{listName}</h1> */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="button-container-top">
        <button className="create" onClick={() => setShowModal(true)} title="Add New">
          <Plus size={16} />
        </button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
}