import { Direction, XY, CellContentType, CellProperty, CellPropertyFunction, PropTypes, RowOrColumnProperty, RowOrColumnPropertyFunction } from './types';
export declare const createRowOrColumnProp: <T extends PropTypes>(rowColProp: T | T[] | RowOrColumnPropertyFunction<T> | undefined, defaultValue: T) => RowOrColumnPropertyFunction<T>;
export declare const createCellProp: <T extends PropTypes>(cellProp: T | T[][] | CellPropertyFunction<T> | undefined, defaultValue: T) => CellPropertyFunction<T>;
export declare const findApproxMaxEditDataIndex: (editData: CellPropertyFunction<string>) => XY;
export declare const findInDisplayData: (displayData: CellPropertyFunction<CellContentType>, start: XY, direction: Direction) => XY;
