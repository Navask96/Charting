import { InternalSheetStyle, SheetStyle, Style } from './types';
export declare const resolveSheetStyle: (sheetStyle?: SheetStyle | undefined) => InternalSheetStyle;
export declare const resolveCellStyle: (optionalStyle: Style, defaultStyle: Required<Style>) => Required<Style>;
export declare const applyAlignment: (start: number, cellSize: number, style: Required<Style>, imageWidth: number, alignment?: 'left' | 'center' | 'right') => number;
