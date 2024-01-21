import { CellPropertyFunction, Change, Rectangle } from './types';
import { RefObject } from 'react';
export declare const useClipboardCopy: (textAreaRef: RefObject<HTMLTextAreaElement>, selection: Rectangle, editMode: boolean, editData: CellPropertyFunction<string>) => void;
export declare const useClipboardPaste: (textAreaRef: RefObject<HTMLTextAreaElement>, selection: Rectangle, onSelectionChange?: ((selection: Rectangle) => void) | undefined, onChange?: ((changes: Array<Change>) => void) | undefined) => void;
