import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import "../src/index.css";
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
 
const ImgIcon = () => (
  <svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M14 13l4 5H6l4-4 1.79 1.78L14 13zm-6.01-2.99A2 2 0 0 0 8 6a2 2 0 0 0-.01 4.01zM22 5v14a3 3 0 0 1-3 2.99H5c-1.64 0-3-1.36-3-3V5c0-1.64 1.36-3 3-3h14c1.65 0 3 1.36 3 3zm-2.01 0a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7v-.01h7a1 1 0 0 0 1-1V5z" />
  </svg>
);

const FileInput = ({ onChange, children }) => {
  const fileRef = useRef();
  const onPickFile = event => {
    onChange([...event.target.files]);
  };
  return (
    <div
      style={{
        width: "35px",
        height: "35px",
        borderRadius: "3px"
      }}
      onClick={() => fileRef.current.click()}
    >
      {children}
      <input
        multiple
        ref={fileRef}
        onChange={onPickFile}
        type="file"
        style={{ visibility: "hidden" }}
      />
    </div>
  );
};

const Img = ({ file, onRemove, index }) => {
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  return fileUrl ? (
    <div style={{ position: "relative", maxWidth: "230px", maxHeight: "95px" }}>
      <img
        style={{
          display: "block",
          maxWidth: "230px",
          maxHeight: "95px",
          width: "auto",
          height: "auto"
        }}
        alt="pic"
        src={fileUrl}
      />
      {onRemove && (
        <div
          onClick={() => onRemove(index)}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "black",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          
        </div>
      )}
    </div>
  ) : null;
};

const EmojiPicker = ({ onSelect }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShow(oldState => !oldState)}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "4px",
          border: "3px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent"
        }}
      >
        
      </button>
      {ReactDOM.createPortal(
        show && <Picker onSelect={onSelect} />,
        document.body
      )}
    </>
  );
};

const Tweet = ({ tweet: { text, images } ,pickeddate}) => (
  <div
    style={{
      margin: "20px",
      border: "1px solid grey",
      width: "600px",
      padding: "20px"
    }}
  >
    <div>{text}</div>
    <div>{pickeddate}</div>
    <div 
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        background: "fbfbfb"
      }}
    >
      {images.map((img, i) => (
        <Img key={i} file={img} index={i} />
      ))};
    </div>
  </div> 
);
const  {RangePicker}  = ( DatePicker)
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}




function TweetSheet() {
  const [text, setText] = useState("");
  const [pics, setPics] = useState([]);
  const [pickeddate, setDate] = useState("");
  const textAreaRef = useRef();
  const [tweets, setTweets] = useState([]); 
  const insertAtPos = value => {
    const { current: taRef } = textAreaRef;
    let startPos = taRef.selectionStart;
    let endPos = taRef.selectionEnd;
    setText(
      taRef.value.substring(0, startPos) +
        value.native +
        taRef.value.substring(endPos, taRef.value.length)
    );
  };
  const onClickTweet = () => {
    if (text) {
      setTweets(oldState => [...oldState, { text, images: [...pics] }]);
    }
    setText("");
    setPics([]);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "3px solid",
          borderRadius: "5px",
          width: "600px",
          minHeight: "200px",
          padding: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: "1px solid",
            borderRadius: "5px",
            margin: "0px"
          }}
        >
          <textarea
            ref={textAreaRef}
            value={text}
            style={{ flex: 1, border: "none", minHeight: "150px" }}
            onChange={e => setText(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              background: "fbfbfb"
            }}
          >
            {pics.map((picFile, index) => (
              <Img
                key={index}
                index={index}
                file={picFile}
                onRemove={rmIndx =>
                  setPics(pics.filter((pic, index) => index !== rmIndx))
                }
              />
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <div style={{ marginRight: "20px" }}>
            <FileInput onChange={pics => setPics(pics)}>
              <ImgIcon />
            </FileInput>
          </div>
          <EmojiPicker onSelect={insertAtPos} />
          <DatePicker
      format="DD-MM-YYYY HH:mm:ss"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
      onChange={ (date,date1)=>{console.log(date,date1)
      setDate(date1)
      } }

    />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <button onClick={onClickTweet} style={{ fontSize: "20px" }}>
              Tweet
            </button>
        

          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tweets.map(tweet => (
          <Tweet tweet={tweet} pickeddate={pickeddate}/>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifycontent: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column"
      }}
    >
      <TweetSheet />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
