import {useContext, useEffect, useState} from 'react';
import {useEasybase} from 'easybase-react';
import {AppContext} from '../contexts/AppContext';

export default function PointForm() {
  const {Frame, sync} = useEasybase();
  const {mapCenter, points, selectedPoint, editingPoint, setEditingPoint, setPoint, setSelectedPoint} = useContext(AppContext);
  const [draft, setDraft] = useState({});

  useEffect(() => {
    if (selectedPoint != null) {
      setDraft(points[selectedPoint]);
    } else {
      setDraft({});
    }
  }, [selectedPoint]);

  const updateField = (e) => {
    e.preventDefault();
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    })
  }

  const savePoint = () => {
    console.log(draft, mapCenter)
    if (selectedPoint != null) {
      console.log('editing!!')
    } else {
      Frame().push({
        ...draft,
        lat: mapCenter[1],
        lng: mapCenter[0],
      });
      
      sync();
    }
    
    setPoint();
    setSelectedPoint();
    setEditingPoint(false);
    setDraft({});
  }

  const title = draft.title || '';
  const like = draft.like || '';
  const dislike = draft.dislike || '';

  if (selectedPoint != null && !editingPoint) {
    return (
      <div className="pointForm">
      <div>🏚 {title}</div>
      <div>👍 {like}</div>
      <div>👎 {dislike}</div>
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
        <label htmlFor="dislike">👎 </label>
        <div className="formRowInput">
          <input name="dislike" type="text" value={dislike} onChange={updateField} />
        </div>
      </div>
      <div className="buttons">
        {selectedPoint != null && <button className="cancel" onClick={() => setEditingPoint(false)}>Cancel</button>}
        <button className="submit" onClick={savePoint}>Save</button>
      </div>
    </div>
  )
}