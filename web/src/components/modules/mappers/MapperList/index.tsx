import { useCallback } from 'react';
import { IMapper } from '../../../../typings';
import { Label } from '../../../partials';
import { Button } from '../../../ui';
import classes from './MapperList.module.scss';

interface MapperListProps {
  mappers: IMapper[];
  onCreateNew: () => void;
}

export default function MapperList({ mappers, onCreateNew }: MapperListProps) {
  const handleDataImport = useCallback((mapperId: string) => {
    fetch(`http://localhost:8000/api/v1/files/mappers/${mapperId}/construct`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(console.log).catch(console.error)
  }, []);
  
  return (
    <div className={classes.MapperList}>
      <Label as='h3'>Mapper List</Label>
      
      {mappers.map(mapper => (
        <div key={mapper.id} className={classes.MapperList__Item}>
          <span>{mapper.name || 'No Name Found'}</span>

          <span>
            <Button variant='secondary' onClick={() => handleDataImport(mapper.id)}>Select</Button>
          </span>
        </div>
      ))}

      <div>
        <Button variant='primary' onClick={onCreateNew}>+ Create New</Button>
      </div>
    </div>
  )
}