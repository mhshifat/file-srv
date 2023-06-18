import { Modal } from './components/ui';
import { BrowserRouter } from 'react-router-dom';
import { ButtonGroup, FileUploadBlock } from './components/partials';
import { useState } from 'react';
import { FileList } from './components/modules';

export default function App() {
  const [showFileList, setShowFileList] = useState(false);

  return (
    <BrowserRouter>
      <Modal
        identifier='Files Upload'
        content={(
          <>
            <ButtonGroup>
              {({ activeClassName }) => (
                <>
                  <button className={!showFileList ? activeClassName : ''} onClick={() => setShowFileList(false)}>Upload New</button>
                  <button className={showFileList ? activeClassName : ''} onClick={() => setShowFileList(true)}>Use Existing</button>
                </>
              )}
            </ButtonGroup>
            {!showFileList && <FileUploadBlock onSuccess={(results) => setShowFileList(!!results.length)} />}
            {showFileList && <FileList />}
          </>
        )}
      >
        <button>Click Me</button>
      </Modal>
    </BrowserRouter>
  )
}
