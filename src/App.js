import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import "./styles/partials/_center.scss";
// import Chip from './components/common/Chip';
// import Input from './components/Input/Input';
import TextArea from './components/textarea';
import SearchInput from './components/SearchInput/';
// import Text/


function App() {
  const [text, setText] = useState("test value test value test value test value test value test value test value test value test value test value test value test value")

  const handleChange = useCallback(
    (e) => {
      if (e.persist) e.persist()
      console.log('change', e.target.value);
      setText(e.target.value);
    }
    ,[setText]
  )
  return (
    <div className="center" >
      <div style={{width: ""}}>
        <SearchInput
          handleChange={handleChange}
          value={text}
          placeholder="Search..."
        />
        <TextArea
          label="Text Area"
          handleChange={handleChange}
          value={text}
          placeholder="Enter message..."
        />
      </div>
    </div>
  );
}

export default App;
