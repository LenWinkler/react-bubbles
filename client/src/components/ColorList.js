import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newName, setNewName] = useState('');
  const [newHex, setNewHex] =useState('');

  const newNameHandler = e => {
    setNewName(e.target.value)
  };

  const newHexHandler = e => {
    setNewHex(e.target.value)
  };

  const newColorSubmit = e => {
    e.preventDefault();
    let newColor = {
      color: newName,
      code: { hex: newHex }
    }

    axiosWithAuth()
    .post('/api/colors', newColor)
    .then(res => axiosUpdateColors())
    .catch(err => console.log('newColor post error', err))

    setNewName('');
    setNewHex('');
  }

  const axiosUpdateColors = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        updateColors(res.data)
        })
      .catch(err => console.log('get error', err))
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => axiosUpdateColors())
    .catch(err => console.log('put error', err))

    setEditing(false);

  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => updateColors(colors.filter(color => {
      return color.id !== res.data
    })))
    .catch(err => console.log('delete error', err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={newColorSubmit}>
        <input type="text" value={newName} onChange={newNameHandler} placeholder="New Color Name" />
        <input type="text" value={newHex} onChange={newHexHandler} placeholder="New Color Hex Code" />
        <button>Submit New Color</button>
      </form>
    </div>
  );
};

export default ColorList;
