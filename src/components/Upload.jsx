import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudBolt, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Upload.css';

// eslint-disable-next-line no-undef

const Upload = () => {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  //for uploading via click
  const handleClick = () => {
    inputRef.current.click();
  };

  //for uploading via drag and drop
  const preventBubbling = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const removeFile = (name) => {
    const newFiles = files.filter((file) => file.name !== name);
    setFiles(newFiles);
  };

  //handle files: append new files on top of already exsiting ones
  const handleFiles = (fileList, mode = 'w') => {
    if (mode === 'a') {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(fileList)]);
    } else if (mode === 'w') {
      setFiles(Array.from(fileList));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    //loop over our files
    for (const file of files) {
      formData.append(file.name, file);
    }

    try {
      axios.post('https://fakeapi.com/files', formData, {
        'Content-Type': 'multipart/form-data',
      });
      console.log(`${files.length} files uploaded!!!!`);
      setFiles([]);
    } catch (e) {
      console.error('File submission failure');
    }
  };

  return (
    <div className='Upload'>
      <div className='inner'>
        <div className='list'>
          <h4>List of files:</h4>
          {files && (
            <ul className='files'>
              {files.map((file, index) => (
                <li
                  key={index + '-' + file.name}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {index + 1}: {file.name}
                  <span onClick={() => removeFile(file.name)}>
                    <FontAwesomeIcon
                      className='trash-icon'
                      icon={faTrash}
                      color='red'
                    />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className='form'
          onDragEnter={preventBubbling}
          onDragOver={preventBubbling}
          onDrop={(e) => {
            preventBubbling(e);
            handleFiles(e.dataTransfer.files, 'a');
          }}
        >
          <FontAwesomeIcon icon={faCloudBolt} size='4x' color='white' />
          <p>Drag and drop your files or select files by yourself</p>
          <input
            ref={inputRef}
            type='file'
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files, 'a')}
          />
          <button onClick={handleClick}>Upload files</button>
        </div>
      </div>
      <button id='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

// // eslint-disable-next-line no-undef
// const CSS = css`
//   height: 100%;
//   width: 100%;
//   background: #0d1117;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 80px;
//   .inner {
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//   }
//   .list {
//     background-color: #121d2f;
//     border: 1px solid white;
//     width: 50%;
//     height: 400px;
//     padding: 15px;
//     align-self: start;
//     color: white;
//     margin-right: 80px;
//     ul.files {
//       margin-top: 20px;
//       li {
//         margin-bottom: 5px;
//       }
//       i {
//         color: #58a6ff;
//         padding-left: 8px;
//         cursor: pointer;
//       }
//     }
//   }
//   .form {
//     background-color: #121d2f;
//     width: 50%;
//     padding: 15px;
//     height: 400px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: 1px solid white;
//     flex-direction: column;
//     margin-left: 80px;
//     i,
//     p {
//       color: white;
//     }
//     button {
//       background: #58a6ff;
//       color: white;
//       border: 1px solid white;
//       padding: 2px 8px;
//     }
//   }
// `;

export default Upload;
