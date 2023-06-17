import { useEffect, useState } from 'react';
import { Label, Scrollable } from '../../../partials';
import { Box, Button } from '../../../ui';
import classes from './FileList.module.scss';
import { IFile } from '../../../../typings';

export default function FileList() {
  const [files, setFiles] = useState<IFile[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch('http://localhost:8000/api/v1/files', {
      signal: controller.signal
    }).then((res) => res.json()).then(({data}) => {
      setFiles(data);
    });

    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div className={classes.FileList}>
      <Label as='h3'>File Lists</Label>

      <Scrollable height='200px'>
        <Box display='flex' direction='column' gap='10px'>
          {files.map((file) => (
            <div className={classes.FileList__Item}>
              <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
                <path fill="#231F20" d="M56,0H8C5.789,0,4,1.789,4,4v56c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4V4C60,1.789,58.211,0,56,0z
          M24,20h8c2.211,0,4,1.789,4,4s-1.789,4-4,4h-8c-2.211,0-4-1.789-4-4S21.789,20,24,20z M40,44H24c-2.211,0-4-1.789-4-4s1.789-4,4-4
          h16c2.211,0,4,1.789,4,4S42.211,44,40,44z" />
              </svg>

              <h3>{file.original_name}</h3>

              <Button variant='secondary'>Select</Button>
            </div>
          ))}
        </Box>
      </Scrollable>
    </div>
  )
}