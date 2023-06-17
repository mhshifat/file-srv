import { Modal } from './components/ui';
import { BrowserRouter } from 'react-router-dom';
import { FileUploadBlock } from './components/partials';
import { useState } from 'react';
import { FileList } from './components/modules';

export default function App() {
  const [showFileList, setShowFileList] = useState(false);

  return (
    <BrowserRouter>
      <Modal
        identifier='Test Title'
        content={(
          <>
            {!showFileList && <FileUploadBlock onSuccess={(results) => setShowFileList(!!results.length)} />}
            <FileList />
          </>
        )}
      >
        <button>Click Me</button>
      </Modal>
    </BrowserRouter>
  )
}
