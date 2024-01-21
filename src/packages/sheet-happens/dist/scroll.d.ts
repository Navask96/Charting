import { UIEvent } from 'react';
import { XY, CellLayout } from './types';
export declare const useScroll: (offset: XY, maxScroll: XY, cellLayout: CellLayout, onOffsetChange?: ((offset: XY) => void) | undefined, onMaxScrollChange?: ((maxScroll: XY) => void) | undefined) => (e: UIEvent) => void;
export declare const scrollToCell: (element: HTMLDivElement, cell: XY, view: XY, freeze: XY, offset: XY, maxScroll: XY, cellLayout: CellLayout, callback: (offset: XY, maxScroll: XY) => void) => void;
