import React, { useState, useEffect } from "react";
import "./index.css";
import List from "./components/List";
import Alert from "./components/Alert";

/////////////////////////////// Storing the data in local storage ////////////////////////////////////

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};


function App() {
  
  /////////////////////////////// different states /////////////////////////////////////////////////////////
  
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIdEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  
  ////////////////////////////////////////// handleSubmit function //////////////////////////////////////////////
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIdEditing(false);
      showAlert(true, "success", "Value changed");
    } else {
      showAlert(true, "success", "Item Added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  
  /////////////////////////////////////////// showAlert function //////////////////////////////////////////////
  
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  
  ///////////////////////////////////////// removeItem function /////////////////////////////////////
  
  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed");
    setList(list.filter((item) => item.id !== id));
  };
  
  /////////////////////////////////// editItem function //////////////////////////////////////////
  
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIdEditing(true);
    setEditId(id);
    setName(editItem.title);
  };
  
  ////////////////////////////////////////// clearList function ////////////////////////////////////////////
  
  const clearList = () => {
    showAlert(true, "danger", "Empty list");
    setList([]);
  };

  //////////////////////////////////// UI Part /////////////////////////////////////
  
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          To-Do App
        </h3>
        <div className="mb-3 form">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Study"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          &nbsp;
          <button type="submit" className="btn btn-info">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <div className="text-center">
            <button className="btn btn-info" onClick={clearList}>
              Clear items
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
