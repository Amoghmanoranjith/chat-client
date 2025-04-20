import React from "react";
import "./TextContainer.css";

function TextContainer({ users, userName }) {
  return (
    <div className="textContainer">
      <div>
        {users ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    {name}
                    {name === userName ? " 🔵" : " 🟢"}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TextContainer;
