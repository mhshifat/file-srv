import { useState } from 'react'
import useFileUpload from './hooks/useFileUpload';
import { Modal } from './components/ui';
import { BrowserRouter } from 'react-router-dom';
import { FileUploadBlock } from './components/partials';

export default function App() {
  const [count, setCount] = useState(0);
  const { handleFileUpload } = useFileUpload('http://localhost:8000/api/v1/files/upload', {
    onProgress: (progress) => {
      console.log(progress);
    }
  });

  return (
    <BrowserRouter>
      <Modal
        identifier='Test Title'
        content={<FileUploadBlock />}
      >
        <button>Click Me</button>
      </Modal>
    </BrowserRouter>
  )
}
