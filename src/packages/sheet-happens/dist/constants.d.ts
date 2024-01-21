import { XY, Rectangle, Selection, Clickable, Direction, Style } from './types';
export declare const INITIAL_MAX_SCROLL: XY;
export declare const ORIGIN: XY;
export declare const ONE_ONE: XY;
export declare const NO_CELL: XY;
export declare const NO_SELECTION: Rectangle;
export declare const NO_SELECTIONS: Selection[];
export declare const NO_CLICKABLES: Clickable[];
export declare const NO_STYLE: {};
export declare const MAX_SEARCHABLE_INDEX = 65536;
export declare const MAX_XY: XY;
export declare const COLORS: {
    selectionBorder: string;
    selectionBackground: string;
    gridLine: string;
    dragGhost: string;
    dropTarget: string;
    knobAreaBorder: string;
    headerBackground: string;
    headerText: string;
    headerActive: string;
    headerActiveText: string;
    headerSelected: string;
    headerSelectedText: string;
};
export declare const SIZES: {
    knobArea: number;
    headerWidth: number;
    headerHeight: number;
    minimumWidth: number;
    minimumHeight: number;
    resizeZone: number;
    scrollZone: number;
    scrollSpeed: number;
};
export declare const DEFAULT_CELL_STYLE: Required<Style>;
export declare const DEFAULT_COLUMN_HEADER_STYLE: Required<Style>;
export declare const HEADER_ACTIVE_STYLE: {
    color: string;
};
export declare const HEADER_SELECTED_STYLE: {
    backgroundColor: string;
    color: string;
};
export declare const ARROW_KEYS: Record<string, Direction>;
