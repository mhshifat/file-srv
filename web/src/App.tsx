import { Modal } from './components/ui';
import { BrowserRouter } from 'react-router-dom';
import { FileUploadBlock } from './components/partials';

export default function App() {
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
