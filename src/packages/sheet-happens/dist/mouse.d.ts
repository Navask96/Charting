import { CellLayout, CellPropertyFunction, Change, Clickable, Rectangle, RowOrColumnPropertyFunction, SheetMouseEvent, SheetStyle, VisibleLayout, XY } from './types';
import { MouseEvent, PointerEvent, RefObject } from 'react';
export declare const useMouse: (hitmapRef: RefObject<Clickable[]>, selection: Rectangle, knobArea: Rectangle | null, editMode: boolean, editData: CellPropertyFunction<string>, sourceData: CellPropertyFunction<string | number | null>, canSizeColumn: RowOrColumnPropertyFunction<boolean | null>, canSizeRow: RowOrColumnPropertyFunction<boolean | null>, canOrderColumn: RowOrColumnPropertyFunction<boolean | null>, canOrderRow: RowOrColumnPropertyFunction<boolean | null>, cellLayout: CellLayout, visibleCells: VisibleLayout, sheetStyle: SheetStyle, onEdit?: ((cell: XY) => void) | undefined, onCommit?: (() => void) | undefined, onKnobAreaChange?: ((knobArea: Rectangle | null) => void) | undefined, onDragOffsetChange?: ((dragOffset: XY | null) => void) | undefined, onDropTargetChange?: ((selection: Rectangle | null) => void) | undefined, onSelectionChange?: ((selection: Rectangle, scrollTo?: boolean | undefined, toHead?: boolean | undefined) => void) | undefined, onInvalidateColumn?: ((column: number) => void) | undefined, onInvalidateRow?: ((row: number) => void) | undefined, onChange?: ((changes: Change[]) => void) | undefined, onColumnOrderChange?: ((indices: number[], order: number) => void) | undefined, onRowOrderChange?: ((indices: number[], order: number) => void) | undefined, onCellWidthChange?: ((indices: number[], value: number) => void) | undefined, onCellHeightChange?: ((indices: number[], value: number) => void) | undefined, onRightClick?: ((e: SheetMouseEvent) => void) | undefined, dontCommitEditOnSelectionChange?: boolean | undefined) => {
    knobPosition: XY | null;
    mouseHandlers: {
        onPointerLeave: () => void;
        onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
        onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
        onPointerUp: (e: PointerEvent<HTMLDivElement>) => void;
        onDoubleClick: (e: MouseEvent) => void;
        onContextMenu: (e: MouseEvent) => void;
    };
};
