import { PropsWithChildren, useEffect, useMemo, useCallback, useState, cloneElement, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import classes from './Modal.module.scss';
import { hashText } from '../../../utils';
import { motion } from 'framer-motion';

interface ModalProps {
  identifier: string;
  content: ReactElement;
}

const BACKDROP_CLASS_NAME = 'modal-backdrop';
const CONTENT_CLASS_NAME = 'modal-content';
export default function Modal({ children, identifier: uniqueTitle, content }: PropsWithChildren<ModalProps>) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [open, setOpen] = useState(false);

  const identifier = useMemo(() => {
    return hashText(uniqueTitle)
  }, [uniqueTitle]);
  const toggleModal = useCallback(() => {
    const newValue = !open;
    const urlSearchParams = new URLSearchParams(search);
    const modalStr = urlSearchParams.get('modal');
    let modalStrArr = modalStr?.split(",") || [];
    if (newValue) {
      modalStrArr.push(identifier)
    } else {
      modalStrArr = modalStrArr.filter(item => item !== identifier);
    }
    urlSearchParams.delete('modal');
    urlSearchParams.set('modal', modalStrArr.join(','));
    navigate({
      search: modalStrArr.length ? urlSearchParams.toString() : ''
    })
    setOpen(newValue);
  }, [identifier, navigate, open, search]);

  useEffect(() => {
    if (search.includes(identifier)) {
      setOpen(true);
    }
  }, [search, identifier])

  useEffect(() => {
    const backDrops = document.querySelectorAll(`.${BACKDROP_CLASS_NAME}`);
    const modalContents = document.querySelectorAll(`.${CONTENT_CLASS_NAME}`);
    if (open) {
      backDrops.forEach((el, elIdx) => {
        (elIdx + 1) !== backDrops.length && el.setAttribute('style', 'visibility: hidden;');
      });
      modalContents.forEach((el, elIdx) => {
        (elIdx + 1) !== backDrops.length && el.setAttribute('style', 'visibility: hidden;');
      });
    } else {
      backDrops.forEach((el, elIdx) => {
        (elIdx + 1) === backDrops.length && el.setAttribute('style', 'visibility: unset;');
      });
      modalContents.forEach((el, elIdx) => {
        (elIdx + 1) === backDrops.length && el.setAttribute('style', 'visibility: unset;');
      });
    }
  }, [open]);

  return (
    <div className={classes.Modal}>
      <span>
        {children && cloneElement(children as ReactElement, {
          onClick: toggleModal
        })}
      </span>
      {open && createPortal(
        (
          <div>
            <div id={identifier} className={classnames(BACKDROP_CLASS_NAME, classes.Modal__Backdrop)} />
            <div className={classnames(CONTENT_CLASS_NAME, classes.Modal__Content)} onClick={toggleModal}>
              <motion.div initial={{ translateY: '20px' }} animate={{ translateY: '0px' }} onClick={(e) => e.stopPropagation()}>
                {content}
              </motion.div>
            </div>
          </div>
        ),
        document.body
      )}
    </div>
  )
}