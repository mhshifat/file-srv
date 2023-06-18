import { Modal } from './components/ui';
import { BrowserRouter } from 'react-router-dom';
import { FileUploadBlock } from './components/partials';
import { useState } from 'react';
import { FileList, FileMapperBlock } from './components/modules';

export default function App() {
  const [showFileList, setShowFileList] = useState(false);

  return (
    <BrowserRouter>
      <Modal
        identifier='Files Upload'
        content={(
          <>
            {!showFileList && <FileUploadBlock onSuccess={(results) => setShowFileList(!!results.length)} />}
            {showFileList && <FileList />}
            <Modal
              identifier='Import File Data'
              content={(
                <>
                  <FileMapperBlock
                    fileId='64847d42d32dd3af71c2f8fe'
                  />
                </>
              )}
            >
              <button>Select</button>
            </Modal>
          </>
        )}
      >
        <button>Click Me</button>
      </Modal>
    </BrowserRouter>
  )
}
