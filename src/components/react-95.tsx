'use client';

import React from 'react';
import * as React95 from 'react95';

/**
 * [React95 components]
 * - GitHub : https://github.com/react95-io/React95
 * - 스토리북 : https://storybook.react95.io/?path=/story/docs-welcome-to-react95--page
 * ***************************************************
 * !주의! : Slider 컴포넌트는 findDOMNode를 사용하므로, 사용하지 않음 (patch package 참고)
 */

export const Window = React.forwardRef<HTMLDivElement, React95.WindowProps>(
  (props, ref) => {
    return <React95.Window {...props} ref={ref} />;
  },
);

Window.displayName = 'Window';

export const WindowHeader = React.forwardRef<
  HTMLDivElement,
  React95.WindowHeaderProps
>((props, ref) => {
  return <React95.WindowHeader {...props} ref={ref} />;
});

WindowHeader.displayName = 'WindowHeader';

export const WindowContent = React.forwardRef<
  HTMLDivElement,
  React95.WindowContentProps
>((props, ref) => {
  return <React95.WindowContent {...props} ref={ref} />;
});

WindowContent.displayName = 'WindowContent';

export const Frame = React.forwardRef<HTMLDivElement, React95.FrameProps>(
  (props, ref) => {
    return <React95.Frame {...props} ref={ref} />;
  },
);

Frame.displayName = 'Frame';

export const Button = React.forwardRef<HTMLButtonElement, React95.ButtonProps>(
  (props, ref) => {
    return <React95.Button {...props} ref={ref} />;
  },
);

Button.displayName = 'Button';

export const Monitor = React.forwardRef<HTMLDivElement, React95.MonitorProps>(
  (props, ref) => {
    return <React95.Monitor {...props} ref={ref} />;
  },
);

Monitor.displayName = 'Monitor';

export const ScrollView = React.forwardRef<
  HTMLDivElement,
  React95.ScrollViewProps
>((props, ref) => {
  return <React95.ScrollView {...props} ref={ref} />;
});

ScrollView.displayName = 'ScrollView';

export const GroupBox = React.forwardRef<
  HTMLFieldSetElement,
  React95.GroupBoxProps
>((props, ref) => {
  return <React95.GroupBox {...props} ref={ref} />;
});

GroupBox.displayName = 'GroupBox';

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React95.TextInputProps
>((props, ref) => {
  return <React95.TextInput {...props} ref={ref} />;
});

TextInput.displayName = 'TextInput';

export const AppBar = React.forwardRef<HTMLDivElement, React95.AppBarProps>(
  (props, ref) => {
    return <React95.AppBar {...props} ref={ref} />;
  },
);

AppBar.displayName = 'AppBar';

// info: Toolbar does not have prop types in library
type ToolbarProps = {
  children?: React.ReactNode;
  noPadding?: boolean | undefined;
} & React.HTMLAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement>;

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (props, ref) => {
    return <React95.Toolbar {...props} ref={ref} />;
  },
);

Toolbar.displayName = 'Toolbar';

export const Table = React.forwardRef<HTMLTableElement, React95.TableProps>(
  (props, ref) => {
    return <React95.Table {...props} ref={ref} />;
  },
);

Table.displayName = 'Table';

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React95.TableHeadProps
>((props, ref) => {
  return <React95.TableHead {...props} ref={ref} />;
});

TableHead.displayName = 'TableHead';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React95.TableBodyProps
>((props, ref) => {
  return <React95.TableBody {...props} ref={ref} />;
});

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React95.TableRowProps
>((props, ref) => {
  return <React95.TableRow {...props} ref={ref} />;
});

TableRow.displayName = 'TableRow';

export const TableDataCell = React.forwardRef<
  HTMLTableCellElement,
  React95.TableDataCellProps
>((props, ref) => {
  return <React95.TableDataCell {...props} ref={ref} />;
});

TableDataCell.displayName = 'TableDataCell';

export const TableHeadCell = React.forwardRef<
  HTMLTableCellElement,
  React95.TableHeadCellProps
>((props, ref) => {
  return <React95.TableHeadCell {...props} ref={ref} />;
});

TableHeadCell.displayName = 'TableHeadCell';

export const Counter = React.forwardRef<HTMLDivElement, React95.CounterProps>(
  (props, ref) => {
    return <React95.Counter {...props} ref={ref} />;
  },
);

Counter.displayName = 'Counter';
