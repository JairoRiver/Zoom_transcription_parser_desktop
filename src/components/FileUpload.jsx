import React, { useState } from 'react';
import {open} from '@tauri-apps/api/dialog'
import { invoke } from "@tauri-apps/api/tauri";
import { TailSpin } from "react-loader-spinner";
import FileIcon from "./FileIcon"
import CardFile from "./CardFile"

const FileUpload = () => {
  const [fileDoxcResponse, setFileDoxcResponse] = useState("");
  async function processFile(path) {
    setFileDoxcResponse(await invoke("parser_file", { path_file: path }));
  }

  const [uploadedFiles, setUploadedFiles] = useState('');
  const [loading, setLoading] = useState(false);
  const [folderPath, setFolderPath] = useState('')

  const readFileContent = async () => {
    try{
      setFileDoxcResponse('')
      const selectedPath = await open({
        multiple: false,
        title: 'Open docx files',
      })
      if (selectedPath) {
        setLoading(true);

        const fileExtension = selectedPath.toLowerCase().split(".").pop()
        const fileName = selectedPath.toLowerCase().split('\\').pop()
        const filePath = selectedPath.toLowerCase().split('\\').slice(0, -1).join('\\')
        const fileData = {extension: fileExtension,name: fileName,path: filePath}
        setUploadedFiles(fileData)
        setFolderPath(filePath)

        if(fileExtension == 'docx'){
          await processFile(selectedPath)
        }else{
          setFileDoxcResponse('')
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <section className="h-2/3 min-h-fit w-full flex justify-center items-center flex-col">
    <div className='min-h-40 w-full flex justify-center flex-col items-center h-full'>
      <button onClick={readFileContent} className='bg-teal-950 max-w-80 text-gray-50  w-3/5 h-3/5 min-h-14 rounded-lg flex justify-center items-center'><FileIcon/> Subir Archivo</button>
    </div>

    {loading &&
      <div className='flex justify-center items-center flex-col'>
        <p className='text-3xl text-slate-500 my-2.5'>ya casi casi ...</p>
        <TailSpin visible={true}
                  height="40"
                  width="40"
                  color="#1691C5"
                  ariaLabel="tail-spin-loading"
                  radius="10"
        />
      </div>
    }

    </section>
    <div>
        {
          (uploadedFiles.extension != 'docx' && uploadedFiles) &&
          <p key={uploadedFiles.name + '-'} className='text-red-600 text-center'>Sube un fichero con el formato correcto ".docx"</p>
        }
    </div>
    <section>
      {fileDoxcResponse &&
      <div>
        <CardFile fileName={fileDoxcResponse} fileStatus='procesado correctamente'/>
        <p className='mt-6 text-center'><span className='text-slate-500 font-medium'>Puedes encontrar el archivo en: </span>{folderPath}</p>
      </div>
      }
    </section>
    </>
  );
};
export default FileUpload;