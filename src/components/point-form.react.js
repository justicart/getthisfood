import {useContext, useEffect, useState} from 'react';
import {useEasybase} from 'easybase-react';
import {AppContext} from '../contexts/AppContext';

export default function PointForm() {
  const { db } = useEasybase();
  const {mapCenter, points, selectedPoint, editingPoint, setEditingPoint, setPoint, setSelectedPoint, mounted} = useContext(AppContext);
  const [draft, setDraft] = useState({});

  useEffect(() => {
    if (selectedPoint != null) {
      getPointData(selectedPoint);
    } else {
      setDraft({});
    }
  }, [selectedPoint]);

  const getPointData = async (_key) => {
    const data = await db('POINTS').where({_key}).one();
    setDraft({
      title: data.title,
      like: data.like,
      dislike: data.dislike,
      lng: data.lng,
      lat: data.lat,
    });
  }

  const updateField = (e) => {
    e.preventDefault();
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    })
  }

  const savePoint = async () => {
    if (selectedPoint != null) {
      await db('POINTS', true).where({_key: selectedPoint }).set({
        ...draft,
        lat: mapCenter[1],
        lng: mapCenter[0],
      }).one();
    } else {
      await db('POINTS', true).insert({
        ...draft,
        lat: mapCenter[1],
        lng: mapCenter[0],
      }).one();
    }
    
    mounted();
    clearForm();
  }

  const deletePoint = async () => {
    await db('POINTS', true).delete().where({_key: selectedPoint}).one();
    mounted();
    clearForm();
  }

  const clearForm = () => {
    setPoint();
    setSelectedPoint();
    setEditingPoint(false);
    setDraft({});
  }

  // console.log('draft', draft)
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
        {selectedPoint != null && <button className="delete" onClick={deletePoint}>Delete</button>}
        {selectedPoint != null && <button className="cancel" onClick={() => setEditingPoint(false)}>Cancel</button>}
        <button className="submit" onClick={savePoint}>Save</button>
      </div>
    </div>
  )
}