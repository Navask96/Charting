import { XY, CellLayout, LayoutCache } from './types';
export declare const makeCellLayout: (freeze: XY, indent: XY, offset: XY, columns: LayoutCache, rows: LayoutCache) => CellLayout;
export declare const makeLayoutCache: (sizer: (index: number) => number) => LayoutCache;
