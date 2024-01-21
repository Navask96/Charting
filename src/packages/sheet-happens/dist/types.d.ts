import { MouseEvent, PointerEvent, CSSProperties } from 'react';
export declare type PropTypes = string | number | boolean | Style | CellContentType;
export declare type CellPropertyFunction<T extends PropTypes> = (x: number, y: number) => T;
export declare type RowOrColumnPropertyFunction<T extends PropTypes> = (rowOrColIndex: number) => T;
export declare type CellProperty<T extends PropTypes> = T | T[][] | CellPropertyFunction<T>;
export declare type RowOrColumnProperty<T extends PropTypes> = T | T[] | RowOrColumnPropertyFunction<T>;
export declare type CellContentType = null | number | string | CellContent;
export declare type CellContent = {
    items: CellContentItem[];
};
export declare type CellContentItem = {
    content: HTMLImageElement | string | number;
    x: number;
    y: number;
    width?: number;
    height?: number;
    horizontalAlign?: 'left' | 'right' | 'center';
    onClick?: (e: MouseEvent) => void;
};
export declare type XY = [number, number];
export declare type Rectangle = [XY, XY];
export declare type Direction = 'up' | 'down' | 'left' | 'right';
export declare type LayoutCache = {
    getSize: (i: number) => number;
    getStart: (i: number) => number;
    getEnd: (i: number) => number;
    lookupIndex: (i: number, anchor?: number) => number;
    getVersion: () => number;
    clearAfter: (i: number) => void;
    setSizer: (s: (i: number) => number) => void;
};
export declare type CellLayout = {
    cellToPixel: (cell: XY, anchor?: XY) => XY;
    pixelToCell: (pixel: XY, anchor?: XY) => XY;
    cellToAbsolute: (cell: XY, anchor?: XY) => XY;
    absoluteToCell: (pixel: XY, anchor?: XY) => XY;
    columnToPixel: (column: number, anchor?: number) => number;
    rowToPixel: (column: number, anchor?: number) => number;
    pixelToColumn: (pixel: number, anchor?: number) => number;
    pixelToRow: (pixel: number, anchor?: number) => number;
    columnToAbsolute: (column: number, anchor?: number) => number;
    rowToAbsolute: (column: number, anchor?: number) => number;
    absoluteToColumn: (pixel: number, anchor?: number) => number;
    absoluteToRow: (pixel: number, anchor?: number) => number;
    getVisibleCells: (view: XY) => VisibleLayout;
    getIndentX: () => number;
    getIndentY: () => number;
    getVersion: () => number;
};
export declare type VisibleLayout = {
    columns: number[];
    rows: number[];
};
export declare type Selection = {
    span: Rectangle;
    color: string;
};
export declare type Clickable = {
    rect: Rectangle;
    obj: CellContentItem;
};
export declare type Resizable = {
    rect: Rectangle;
    anchor: number;
    size: number;
    indices: number[];
};
export declare type Change = {
    x: number;
    y: number;
    value: string | number | null;
    source?: {
        x: number;
        y: number;
    };
};
export declare type ParsedChange = {
    selection: Rectangle;
    changes: Change[];
};
export declare type SheetMouseEvent = MouseEvent & {
    cellX: number;
    cellY: number;
};
export declare type SheetPointerEvent = PointerEvent & {
    cellX: number;
    cellY: number;
};
export declare type InputStyle = Pick<CSSProperties, 'position' | 'top' | 'left' | 'width' | 'height' | 'outline' | 'border' | 'textAlign' | 'color' | 'fontSize' | 'fontFamily'>;
export declare type Style = {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    textAlign?: 'right' | 'left' | 'center';
    marginRight?: number;
    marginLeft?: number;
    weight?: string;
    fillColor?: string;
    backgroundColor?: string;
};
export declare type SheetStyle = {
    hideGridlines?: boolean;
    hideColumnHeaders?: boolean;
    hideRowHeaders?: boolean;
    hideScrollBars?: boolean;
    freezeColumns?: number;
    freezeRows?: number;
};
export declare type InternalSheetStyle = Required<SheetStyle> & {
    columnHeaderHeight: number;
    rowHeaderWidth: number;
};
