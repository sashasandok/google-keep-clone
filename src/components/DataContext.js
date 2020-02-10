import React, { useState, useEffect } from "react";
import noteMapper from "../mappers/note";
import firebase from "../config/firebase";

export const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("notes").onSnapshot(snap => {
      const notes = snap.docs.map(doc =>
        noteMapper({ ...doc.data(), id: doc.id })
      );
      setData(notes);
    });
  }, []);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;