import React, { useState } from 'react';
import {open} from '@tauri-apps/api/dialog'
import { invoke } from "@tauri-apps/api/tauri";

const FileUpload = () => {
  const [fileDoxcResponse, setFileDoxcResponse] = useState("");
  async function processFile(path) {
    setFileDoxcResponse(await invoke("parser_file", { path_file: path }));
  }

  const [uploadedFiles, setUploadedFiles] = useState('');

  const readFileContent = async () => {
    try{
      const selectedPath = await open({
        multiple: false,
        title: 'Open docx files',
      })
      if (selectedPath) {
        console.log(selectedPath)
        const fileExtension = selectedPath.toLowerCase().split(".").pop()
        const fileName = selectedPath.toLowerCase().split('\\').pop()
        const filePath = selectedPath.toLowerCase().split('\\').slice(0, -1).join('\\')
        const fileData = {extension: fileExtension,name: fileName,path: filePath}
        setUploadedFiles(fileData)

        if(fileExtension == 'docx'){
          await processFile(selectedPath)
          console.log(fileDoxcResponse)
        }else{
          setFileDoxcResponse('')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="h-2/3 min-h-fit w-full flex justify-center items-center flex-col">
    <div className='bg-red-200 min-h-20 w-4/5 flex justify-center flex-col items-center h-full border-solid border-2 border-sky-500'>
      <button onClick={readFileContent} className='bg-teal-950 text-gray-50 border-dashed border-2 border-slate-500 w-2/5 h-3/5'>Open File Explorer</button>
    </div>
    <p>click Para subir archivos Docx</p>
    <ul>
        {
          uploadedFiles.extension == 'docx' 
          && <li key={uploadedFiles.name}>{uploadedFiles.name}</li>
        }
        {
          (uploadedFiles.extension != 'docx' && uploadedFiles) &&
          <li key={uploadedFiles.name + '-'} className='text-red-600'>Sube un fichero con el formato correcto ".docx"</li>
        }
      </ul>
      <p>{fileDoxcResponse}</p>
    </section>
  );
};
export default FileUpload;