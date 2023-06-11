import { useState } from 'react'
import useFileUpload from './hooks/useFileUpload';
import { Modal } from './components/ui';
import { BrowserRouter } from 'react-router-dom';

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
        title='Test Title'
        content={(
          <div>
            <p>Welcome</p>
            <Modal
              title='Test Title 1'
              content={(
                <div>
                  <p>Welcome 1</p>
                  <Modal
                    title='Test Title 2'
                    content={(
                      <p>Welcome 2</p>
                    )}
                  >
                    <button>Click Me 2</button>
                  </Modal>
                </div>
              )}
            >
              <button>Click Me 1</button>
            </Modal>
          </div>
        )}
      >
        <button>Click Me</button>
      </Modal>
    </BrowserRouter>
  )
}
