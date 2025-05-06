import React from "react";
import Picker from 'emoji-picker-react';
import { useState } from 'react';
import "./Input.css";

function Input({ message, setMessage, sendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const stickers = [
    '🦄', '🐱', '🌈', '🔥', '🎉', '💖', '🍕', '🚀', '🎨', '🐶'
  ];

  const onStickerClick = (sticker) => {
    setMessage((prevMessage) => prevMessage + sticker);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImage = () => {
    if (imagePreview) {
      sendMessage({ type: 'image', content: imagePreview });
      setImagePreview(null);
    }
  };

  return (
    <div className="input-container">
      {showEmojiPicker && (
        <div className="emoji-picker">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
      {showStickerPicker && (
        <div className="sticker-picker">
          {stickers.map((sticker, index) => (
            <button
              key={index}
              className="sticker-button"
              onClick={() => onStickerClick(sticker)}
            >
              {sticker}
            </button>
          ))}
        </div>
      )}
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" />
          <button className="sendImageButton" onClick={sendImage}>Send Image</button>
        </div>
      )}
      <button
        type="button"
        className="emoji-button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        😀
      </button>
      <button
        type="button"
        className="sticker-button-toggle"
        onClick={() => setShowStickerPicker((prev) => !prev)}
      >
        🖼️
      </button>
      <input
        type="file"
        accept="image/*"
        className="image-upload"
        onChange={handleImageUpload}
      />
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a Message.."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        ></input>
        <button className="sendButton" onClick={(event) => sendMessage(event)}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Input;
