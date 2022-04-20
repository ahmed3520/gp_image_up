import React, { useState} from 'react'
import {ref,uploadBytes, uploadBytesResumable} from 'firebase/storage'
import { storage } from '../firebase'
const ImageUploading = () => {
    const [percentage, setPercentage] = useState()

   const handleUplaoding=(e)=>{
       e.preventDefault()
        const dragDropAreas = document.getElementsByClassName("drag-drop-area");
        console.log('llllllllol')
    
    

      
        var area = document.getElementById('dr-drop');
            console.log('accessed', area)
          let parentEl = area.parentElement.parentElement;
          let progressThumb = document.querySelector(
            ".drag-drop-progress-loader-thumb"
          );
          let uploadBtn = document.querySelector(".drag-drop-area-button");
          let fileDialog = document.querySelector(".file-dialog");
          console.log('files', fileDialog.files)
      /////////////
          const onUploadFiles = async(files) => {
            console.log(files) // FileList ? https://developer.mozilla.org/en-US/docs/Web/API/FileList
            const storageRef = ref(storage, `testing/${files[0].name}`);
            
            const uploadTask =  uploadBytesResumable(storageRef, files[0])
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPercentage(progress)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }

                    parentEl.classList.remove("dropped-anim");
            
                    // Fake upload simulation
                    let uploadProgress = 0;
          
            
                      progressThumb.style.width = progress + "%";
            
                      if (progress === 100) {
                
                        setTimeout(() => {
                          parentEl.classList.remove("dropped"); // Remove this class when uploading is finished
                        }, 400);
                      }
        
                // render progress
              });
            progressThumb.style.width = 0;

            if (parentEl.classList.contains("active")) {
              parentEl.classList.remove("active");
            }
      
            parentEl.classList.add("dropped-anim");
            parentEl.classList.add("dropped");
      
          
          }
      ///////////
          // Upload using dragging
          area.addEventListener("dragenter", (e) => {
            e.preventDefault();
            if (!parentEl.classList.contains("active")) {
              parentEl.classList.add("active");
            }
          });
          area.addEventListener("dragleave", (e) => {
            e.preventDefault();
            if (parentEl.classList.contains("active")) {
              parentEl.classList.remove("active");
            }
          });
          area.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
      
            onUploadFiles(e.dataTransfer.files);
          });
          area.addEventListener("dragover", (e) => {
            e.preventDefault();
          });
      
          // Upload using button
          uploadBtn.addEventListener("click", () => {
            fileDialog.click();
          });
          fileDialog.addEventListener("change", () => {
              console.log('files up', fileDialog)
            onUploadFiles(fileDialog.files);
          });
        
    
   }
  return (
    <div>
            <div className="drag-drop-wrapper">
        <form>
          <input type="file" className="file-dialog" multiple />
        </form>
        <div className="drag-drop">
          <div className="drag-drop-area" id="dr-drop">
            <svg width="81.823" height="71.434" viewBox="0 0 81.823 71.434">
              <g id="Folder" transform="translate(-531.896 -391)">
                <g id="folder-blank" transform="translate(531.989 391)">
                  <g>
                    <path d="M81.638,49.858V95.78a7.656,7.656,0,0,1-7.654,7.654H7.654A7.656,7.656,0,0,1,0,95.78V39.654A7.656,7.656,0,0,1,7.654,32H33.166l10.2,10.2H73.985A7.656,7.656,0,0,1,81.638,49.858Z" transform="translate(0 -32)" fill="#3b49b5"/>
                  </g>
                </g>
                <g id="Papers" transform="translate(-2 3)">
                  <rect width="43" height="57" rx="2" transform="matrix(0.998, -0.07, 0.07, 0.998, 538.872, 398.786)" fill="#d5d5d5"/>
                  <rect width="43" height="57" rx="2" transform="translate(554.329 396.131) rotate(3)" fill="#ebebeb"/>
                  <rect width="43" height="57" rx="2" transform="matrix(0.995, -0.105, 0.105, 0.995, 562.946, 400.62)" fill="#fff"/>
                </g>
                <rect width="81.823" height="55.141" rx="8" transform="translate(531.896 407.151)" fill="#4c5ff9"/>
              </g>
            </svg>
            <div className="drag-drop-area-text">
              Drag your photo here to start uploading.
            </div>
            <div className="drag-drop-area-separator">OR</div>
            <button className="drag-drop-area-button" onClick={(e)=>handleUplaoding(e)}>Browse files</button>
          </div>
        </div>
        <div className="drag-drop-progress">
          <div className="drag-drop-progress-loader">
            <div className="drag-drop-progress-loader-thumb"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUploading