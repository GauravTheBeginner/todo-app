import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "../src/utils/constant";
import Popup from "./components/Popup";

interface ToDoItem {
  _id: string;
  toDo: string;
}

const App: React.FC = () => {
  const [toDos, setToDos] = useState<ToDoItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [updateUI, setUpdateUI] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupContent, setPopupContent] = useState<{ id: string; text: string }>({ id: "", text: "" });


  useEffect(() => {
    axios
      .get<ToDoItem[]>(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">ToDo App</h1>

        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo..."
          />
          <button onClick={saveToDo}>Add</button>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
