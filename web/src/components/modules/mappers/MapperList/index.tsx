import { IMapper } from '../../../../typings';
import { Label } from '../../../partials';
import { Button } from '../../../ui';
import classes from './MapperList.module.scss';

interface MapperListProps {
  mappers: IMapper[];
  onCreateNew: () => void;
}

export default function MapperList({ mappers, onCreateNew }: MapperListProps) {
  return (
    <div className={classes.MapperList}>
      <Label as='h3'>Mapper List</Label>
      
      {mappers.map(mapper => (
        <div key={mapper.id} className={classes.MapperList__Item}>
          <span>{mapper.name || 'No Name Found'}</span>

          <span>
            <Button variant='secondary'>Select</Button>
          </span>
        </div>
      ))}

      <div>
        <Button variant='primary' onClick={onCreateNew}>+ Create New</Button>
      </div>
    </div>
  )
}