import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useCopy } from '../hooks/useCopy';

type CopyColorButtonProps = {
  value: string;
  iconClassName?: string;
};

export const CopyColorButton = ({
  value,
  iconClassName,
}: CopyColorButtonProps) => {
  const [didCopy, setDidCopy] = useState(false);
  const { copy } = useCopy();

  useEffect(() => {
    if (didCopy) {
      setTimeout(() => setDidCopy(false), 3000);
    }
  }, [didCopy]);

  return didCopy ? (
    <CheckIcon className={`${iconClassName}`} />
  ) : (
    <CopyIcon
      className={iconClassName}
      onClick={() => {
        setDidCopy(true);
        copy(value);
      }}
    />
  );
};
