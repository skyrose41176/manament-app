import {IconButtonProps, Tooltip} from '@mui/material';
import {IconButton} from '@mui/material';
import {Icon} from 'iconsax-react';
import React, {FC} from 'react';
import {COLORS} from '../../../constants';

type Color = 'primary' | 'success' | 'error' | 'info' | 'warning' | 'inherit' | undefined;

type IconSize = 'small' | 'medium' | 'large';
interface Props extends IconButtonProps {
  rounded?: boolean;
  hasBackground?: boolean;
  color?: Color;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  iconName: Icon;
  iconSize?: IconSize;
  tooltip?: string;
  className?: string;
}

const IconButtonBase: FC<Props> = ({
  color = 'primary',
  hasBackground = false,
  rounded = true,
  iconName,
  iconSize = 'small',
  onClick,
  tooltip = '',
  className,
  ...rest
}) => {
  const IconClone = iconName;
  return (
    <Tooltip title={tooltip}>
      <IconButton
        {...rest}
        className={`${className} ${rounded ? `rounded-full` : 'rounded-md'}`}
        sx={
          hasBackground
            ? {
                backgroundColor: COLORS[color],
                '&:hover': {backgroundColor: COLORS[`${color}-dark`]},
              }
            : {}
        }
        size={iconSize}
        edge="start"
        color={color}
        onClick={onClick}
      >
        <IconClone
          size={iconSize === 'small' ? 16 : iconSize === 'medium' ? 24 : 32}
          color={hasBackground ? '#fff' : COLORS[color]}
        />
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonBase;
