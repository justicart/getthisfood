import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../contexts/AppContext';

export default function PointForm() {
  const {savePoint, point, points, selectedPoint, editingPoint, setEditingPoint} = useContext(AppContext);
  const [draft, setDraft] = useState({});

  useEffect(() => {
    if (selectedPoint != null) {
      console.log(selectedPoint, points[selectedPoint])
      setDraft(points[selectedPoint]);
    }
  }, [selectedPoint]);

  const updateField = (e) => {
    e.preventDefault();
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    })
  }

  const title = draft.title || '';
  const like = draft.like || '';
  const hate = draft.hate || '';

  if (selectedPoint != null && !editingPoint) {
    return (
      <div className="pointForm">
      <div>🏚 {title}</div>
      <div>👍 {like}</div>
      <div>👎 {hate}</div>
      <button className="edit" onClick={() => setEditingPoint(true)}>Edit</button>
    </div>
    )
  }

  return (
    <div className="pointForm">
      <div className="formRow">
        <label htmlFor="name">🏚 </label>
        <div className="formRowInput">
          <input name="title" type="text" value={title} onChange={updateField} />
        </div>
      </div>
      <div className="formRow">
        <label htmlFor="like">👍 </label>
        <div className="formRowInput">
          <input name="like" type="text" value={like} onChange={updateField} />
        </div>
      </div>
      <div className="formRow">
        <label htmlFor="hate">👎 </label>
        <div className="formRowInput">
          <input name="hate" type="text" value={hate} onChange={updateField} />
        </div>
      </div>
      <div className="buttons">
        {selectedPoint != null && <button className="cancel" onClick={() => setEditingPoint(false)}>Cancel</button>}
        <button className="submit" onClick={() => savePoint(draft, selectedPoint)}>Save</button>
      </div>
    </div>
  )
}