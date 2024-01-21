function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var useResizeObserver = _interopDefault(require('use-resize-observer'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var styles = {"sheetscroll":"_PxIi8"};

var INITIAL_MAX_SCROLL = [100, 100];
var ORIGIN = [0, 0];
var ONE_ONE = [1, 1];
var NO_CELL = [-1, -1];
var NO_SELECTION = [NO_CELL, NO_CELL];
var NO_SELECTIONS = [];
var NO_CLICKABLES = [];
var NO_STYLE = {};
var MAX_SEARCHABLE_INDEX = 65536;
var MAX_XY = [MAX_SEARCHABLE_INDEX, MAX_SEARCHABLE_INDEX];
var COLORS = {
  selectionBorder: '#1a66ff',
  selectionBackground: '#e8f0ff',
  gridLine: '#0000001f',
  dragGhost: '#1a66ff30',
  dropTarget: '#1a66ff',
  knobAreaBorder: '#707070',
  headerBackground: '#f6f9fc',
  headerText: '#666666',
  headerActive: '#e8f0ff',
  headerActiveText: '#1a66ff',
  headerSelected: '#1a66ff',
  headerSelectedText: '#ffffff'
};
var SIZES = {
  knobArea: 6,
  headerWidth: 50,
  headerHeight: 22,
  minimumWidth: 50,
  minimumHeight: 22,
  resizeZone: 4,
  scrollZone: 50,
  scrollSpeed: 30
};
var DEFAULT_CELL_STYLE = {
  textAlign: 'left',
  fontSize: 12,
  marginRight: 5,
  marginLeft: 5,
  color: '#000',
  fontFamily: 'sans-serif',
  weight: '',
  fillColor: '',
  backgroundColor: ''
};
var DEFAULT_COLUMN_HEADER_STYLE = {
  textAlign: 'center',
  fontSize: 12,
  marginRight: 5,
  marginLeft: 5,
  color: '#000',
  fontFamily: 'sans-serif',
  weight: '',
  fillColor: '',
  backgroundColor: ''
};
var HEADER_ACTIVE_STYLE = {
  color: COLORS.headerActiveText
};
var HEADER_SELECTED_STYLE = {
  backgroundColor: COLORS.headerSelected,
  color: COLORS.headerSelectedText
};
var ARROW_KEYS = {
  'ArrowRight': 'right',
  'ArrowLeft': 'left',
  'ArrowUp': 'up',
  'ArrowDown': 'down'
};

var clamp = function clamp(x, min, max) {
  return Math.max(Math.min(max, x), min);
};
var seq = function seq(n, s, d) {
  if (s === void 0) {
    s = 0;
  }

  if (d === void 0) {
    d = 1;
  }

  return Array.from({
    length: n
  }).map(function (_, i) {
    return s + d * i;
  });
};
var isInRange = function isInRange(x, min, max) {
  return min <= x && x <= max;
};
var isInRangeLeft = function isInRangeLeft(x, min, max) {
  return min <= x && x < max;
};
var isInRangeCenter = function isInRangeCenter(x, min, max) {
  return min < x && x < max;
};

var addXY = function addXY(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
};
var subXY = function subXY(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
};
var mulXY = function mulXY(a, b) {
  return [a[0] * b[0], a[1] * b[1]];
};
var maxXY = function maxXY(a, b) {
  return [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
};
var clampXY = function clampXY(p, min, max) {
  if (max === void 0) {
    max = [Infinity, Infinity];
  }

  return [clamp(p[0], min[0], max[0]), clamp(p[1], min[1], max[1])];
};
var getDirectionStep = function getDirectionStep(direction) {
  if (direction === 'left') return [-1, 0];
  if (direction === 'right') return [1, 0];
  if (direction === 'up') return [0, -1];
  if (direction === 'down') return [0, 1];
  return [0, 0];
};
var isSameXY = function isSameXY(a, b) {
  return a[0] === b[0] && a[1] === b[1];
};
var isSameSelection = function isSameSelection(a, b) {
  var a1 = a[0],
      a2 = a[1];
  var b1 = b[0],
      b2 = b[1];
  return isSameXY(a1, b1) && isSameXY(a2, b2);
};
var isMaybeRowSelection = function isMaybeRowSelection(selection) {
  var _selection$ = selection[0],
      left = _selection$[0],
      _selection$2 = selection[1],
      right = _selection$2[0];
  return left === -1 && right === -1;
};
var isMaybeColumnSelection = function isMaybeColumnSelection(selection) {
  var _selection$3 = selection[0],
      top = _selection$3[1],
      _selection$4 = selection[1],
      bottom = _selection$4[1];
  return top === -1 && bottom === -1;
};
var isRowSelection = function isRowSelection(selection) {
  var _selection$5 = selection[0],
      left = _selection$5[0],
      top = _selection$5[1],
      _selection$6 = selection[1],
      right = _selection$6[0],
      bottom = _selection$6[1];
  return left === -1 && right === -1 && top !== -1 && bottom !== -1;
};
var isColumnSelection = function isColumnSelection(selection) {
  var _selection$7 = selection[0],
      left = _selection$7[0],
      top = _selection$7[1],
      _selection$8 = selection[1],
      right = _selection$8[0],
      bottom = _selection$8[1];
  return top === -1 && bottom === -1 && left !== -1 && right !== -1;
};
var isCellSelection = function isCellSelection(selection) {
  var _selection$9 = selection[0],
      left = _selection$9[0],
      top = _selection$9[1],
      _selection$10 = selection[1],
      right = _selection$10[0],
      bottom = _selection$10[1];
  return left !== -1 && right !== -1 && top !== -1 && bottom !== -1;
};
var isEmptySelection = function isEmptySelection(selection) {
  var _selection$11 = selection[0],
      left = _selection$11[0],
      top = _selection$11[1],
      _selection$12 = selection[1],
      right = _selection$12[0],
      bottom = _selection$12[1];
  return left === -1 && right === -1 && top === -1 && bottom === -1;
};
var isPointInsideSelection = function isPointInsideSelection(selection, point) {
  var _normalizeSelection = normalizeSelection(selection),
      _normalizeSelection$ = _normalizeSelection[0],
      left = _normalizeSelection$[0],
      top = _normalizeSelection$[1],
      _normalizeSelection$2 = _normalizeSelection[1],
      right = _normalizeSelection$2[0],
      bottom = _normalizeSelection$2[1];

  var x = point[0],
      y = point[1];
  return x >= left && x <= right && y >= top && y <= bottom;
};
var normalizeSelection = function normalizeSelection(selection) {
  var _selection$13 = selection[0],
      left = _selection$13[0],
      top = _selection$13[1],
      _selection$14 = selection[1],
      right = _selection$14[0],
      bottom = _selection$14[1];

  if (left > right) {
    var _ref = [right, left];
    left = _ref[0];
    right = _ref[1];
  }

  if (top > bottom) {
    var _ref2 = [bottom, top];
    top = _ref2[0];
    bottom = _ref2[1];
  }

  return [[left, top], [right, bottom]];
};

var createRowOrColumnProp = function createRowOrColumnProp(rowColProp, defaultValue) {
  if (Array.isArray(rowColProp)) {
    return function (rowOrColIndex) {
      if (rowOrColIndex >= 0 && rowOrColIndex < rowColProp.length) {
        return rowColProp[rowOrColIndex];
      } else {
        return defaultValue;
      }
    };
  } else if (typeof rowColProp === 'function') {
    return rowColProp;
  } else if (rowColProp !== null && rowColProp !== undefined) {
    return function () {
      return rowColProp;
    };
  } else {
    return function () {
      return defaultValue;
    };
  }
};
var createCellProp = function createCellProp(cellProp, defaultValue) {
  if (Array.isArray(cellProp)) {
    return function (x, y) {
      if (y >= 0 && y < cellProp.length) {
        if (x >= 0 && x < cellProp[y].length) {
          return cellProp[y][x];
        } else {
          return defaultValue;
        }
      } else {
        return defaultValue;
      }
    };
  } else if (typeof cellProp === 'function') {
    return cellProp;
  } else if (cellProp !== null && cellProp !== undefined) {
    return function () {
      return cellProp;
    };
  } else {
    return function () {
      return defaultValue;
    };
  }
};
var findApproxMaxEditDataIndex = function findApproxMaxEditDataIndex(editData) {
  var x = 0;
  var y = 0;
  var howManyEmpty = 0;
  var growthIncrement = 10;
  var growthIncrementFactor = 1.5;

  while (howManyEmpty < 4) {
    var allEmpty = true;

    for (var yy = 0; yy < 10; yy++) {
      var data = editData(x, yy);

      if (data !== null && data !== undefined && data !== '') {
        allEmpty = false;
        break;
      }
    }

    if (allEmpty) {
      howManyEmpty += 1;
    }

    x += growthIncrement;

    if (x > MAX_SEARCHABLE_INDEX) {
      break;
    }

    growthIncrement = Math.floor(growthIncrement * growthIncrementFactor);
  }

  howManyEmpty = 0;
  growthIncrement = 10;
  growthIncrementFactor = 1.5;

  while (howManyEmpty < 4) {
    var _allEmpty = true;

    for (var xx = 0; xx < 10; xx++) {
      var _data = editData(xx, y);

      if (_data !== null && _data !== undefined && _data !== '') {
        _allEmpty = false;
        break;
      }
    }

    if (_allEmpty) {
      howManyEmpty += 1;
    }

    y += growthIncrement;

    if (y > MAX_SEARCHABLE_INDEX) {
      break;
    }

    growthIncrement = Math.floor(growthIncrement * growthIncrementFactor);
  }

  return [x, y];
};
var findInDisplayData = function findInDisplayData(displayData, start, direction) {
  var step = getDirectionStep(direction);
  var cell = clampXY(start, ORIGIN, MAX_XY);
  var first = displayData.apply(void 0, addXY(cell, step));
  var firstFilled = first !== '' && first !== null && first !== undefined;

  if (!firstFilled) {
    cell = addXY(cell, step);
  }

  var _cell = cell,
      cellX = _cell[0],
      cellY = _cell[1];

  while (cellX <= MAX_SEARCHABLE_INDEX && cellY <= MAX_SEARCHABLE_INDEX && cellX >= 0 && cellY >= 0) {
    var data = displayData(cellX, cellY);

    if (firstFilled && (data === '' || data === null || data === undefined)) {
      return subXY(cell, step);
    }

    if (!firstFilled && data !== '' && data !== null && data !== undefined) {
      return cell;
    }

    var _cell2 = cell = addXY(cell, step);

    cellX = _cell2[0];
    cellY = _cell2[1];
  }

  return maxXY(cell, [0, 0]);
};

var useMouse = function useMouse(hitmapRef, selection, knobArea, editMode, editData, sourceData, canSizeColumn, canSizeRow, canOrderColumn, canOrderRow, cellLayout, visibleCells, sheetStyle, onEdit, onCommit, onKnobAreaChange, onDragOffsetChange, onDropTargetChange, onSelectionChange, onInvalidateColumn, onInvalidateRow, onChange, onColumnOrderChange, onRowOrderChange, onCellWidthChange, onCellHeightChange, onRightClick, dontCommitEditOnSelectionChange) {
  var _useState = React.useState(null),
      hitTarget = _useState[0],
      setHitTarget = _useState[1];

  var _useState2 = React.useState(null),
      columnResize = _useState2[0],
      setColumnResize = _useState2[1];

  var _useState3 = React.useState(null),
      rowResize = _useState3[0],
      setRowResize = _useState3[1];

  var _useState4 = React.useState(null),
      columnDrag = _useState4[0],
      setColumnDrag = _useState4[1];

  var _useState5 = React.useState(null),
      rowDrag = _useState5[0],
      setRowDrag = _useState5[1];

  var _useState6 = React.useState(false),
      draggingKnob = _useState6[0],
      setDraggingKnob = _useState6[1];

  var _useState7 = React.useState(false),
      draggingSelection = _useState7[0],
      setDraggingSelection = _useState7[1];

  var _useState8 = React.useState(false),
      draggingRowSelection = _useState8[0],
      setDraggingRowSelection = _useState8[1];

  var _useState9 = React.useState(false),
      draggingColumnSelection = _useState9[0],
      setDraggingColumnSelection = _useState9[1];

  var hideRowHeaders = sheetStyle.hideRowHeaders,
      hideColumnHeaders = sheetStyle.hideColumnHeaders;
  var cellToPixel = cellLayout.cellToPixel,
      getVersion = cellLayout.getVersion;
  var version = getVersion();
  var knobPosition = React.useMemo(function () {
    var _normalizeSelection = normalizeSelection(selection),
        _normalizeSelection$ = _normalizeSelection[1],
        maxX = _normalizeSelection$[0],
        maxY = _normalizeSelection$[1];

    if (isRowSelection(selection)) {
      return subXY(addXY(cellToPixel([0, maxY], [0, 1]), [SIZES.knobArea * 0.5, 0]), ONE_ONE);
    }

    if (isColumnSelection(selection)) {
      return subXY(addXY(cellToPixel([maxX, 0], [1, 0]), [0, SIZES.knobArea * 0.5]), ONE_ONE);
    }

    if (isCellSelection(selection)) {
      return subXY(cellToPixel([maxX, maxY], ONE_ONE), ONE_ONE);
    }

    return null;
  }, [selection, cellToPixel, version]);
  var refState = {
    selection: selection,
    knobArea: knobArea,
    editMode: editMode,
    editData: editData,
    sourceData: sourceData,
    cellLayout: cellLayout,
    visibleCells: visibleCells,
    knobPosition: knobPosition,
    columnResize: columnResize,
    rowResize: rowResize,
    columnDrag: columnDrag,
    rowDrag: rowDrag,
    draggingKnob: draggingKnob,
    draggingSelection: draggingSelection,
    draggingRowSelection: draggingRowSelection,
    draggingColumnSelection: draggingColumnSelection
  };
  var ref = React.useRef(refState);
  ref.current = refState;
  var getMousePosition = React.useCallback(function (e) {
    if (!e.target || !(e.target instanceof Element)) {
      return null;
    }

    var rect = e.target.getBoundingClientRect();
    var xy = [e.clientX - rect.left, e.clientY - rect.top];
    return xy;
  }, []);
  var getScrollPosition = React.useCallback(function (e) {
    if (!e.target || !(e.target instanceof Element)) {
      return [0, 0];
    }

    var _e$target = e.target,
        scrollLeft = _e$target.scrollLeft,
        scrollTop = _e$target.scrollTop;
    var xy = [scrollLeft, scrollTop];
    return xy;
  }, []);
  var getMouseHit = React.useCallback(function (xy) {
    var hitmap = hitmapRef.current;
    if (!hitmap) return null;

    for (var _iterator = _createForOfIteratorHelperLoose(hitmap), _step; !(_step = _iterator()).done;) {
      var object = _step.value;
      var rect = object.rect;

      if (isPointInsideSelection(rect, xy)) {
        return object;
      }
    }

    return null;
  }, [hitmapRef]);
  var onPointerLeave = React.useCallback(function () {
    window.document.body.style.cursor = 'auto';
  }, []);
  var onPointerDown = React.useCallback(function (e) {
    var _e$target2, _e$target2$setPointer;

    var _ref$current = ref.current,
        selection = _ref$current.selection,
        _ref$current$cellLayo = _ref$current.cellLayout,
        columnToPixel = _ref$current$cellLayo.columnToPixel,
        rowToPixel = _ref$current$cellLayo.rowToPixel,
        pixelToCell = _ref$current$cellLayo.pixelToCell,
        getIndentX = _ref$current$cellLayo.getIndentX,
        getIndentY = _ref$current$cellLayo.getIndentY,
        _ref$current$visibleC = _ref$current.visibleCells,
        columns = _ref$current$visibleC.columns,
        rows = _ref$current$visibleC.rows,
        knobPosition = _ref$current.knobPosition;
    if (e.button !== 0) return;
    (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : (_e$target2$setPointer = _e$target2.setPointerCapture) === null || _e$target2$setPointer === void 0 ? void 0 : _e$target2$setPointer.call(_e$target2, e.pointerId);
    var xy = getMousePosition(e);
    if (!xy) return;
    var x = xy[0],
        y = xy[1];
    var hitTarget = getMouseHit(xy);

    if (hitTarget) {
      setHitTarget(hitTarget);
      return;
    }

    var _normalizeSelection2 = normalizeSelection(selection),
        _normalizeSelection2$ = _normalizeSelection2[0],
        minX = _normalizeSelection2$[0],
        minY = _normalizeSelection2$[1],
        _normalizeSelection2$2 = _normalizeSelection2[1],
        maxX = _normalizeSelection2$2[0],
        maxY = _normalizeSelection2$2[1];

    var selectedColumns = [];
    var selectedRows = [];

    for (var i = minX; i <= maxX; i++) {
      selectedColumns.push(i);
    }

    for (var _i = minY; _i <= maxY; _i++) {
      selectedRows.push(_i);
    }

    if (!hideColumnHeaders && y < getIndentY()) {
      if (onColumnOrderChange) {
        var start = columnToPixel(minX) + SIZES.resizeZone;
        var end = columnToPixel(maxX, 1) - SIZES.resizeZone;

        if (isInRange(x, start, end)) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(columns), _step2; !(_step2 = _iterator2()).done;) {
            var index = _step2.value;

            var _start = columnToPixel(index, 0);

            var _end = columnToPixel(index, 1);

            if (isColumnSelection(selection) && isInRange(x, _start, _end) && isInRange(index, minX, maxX) && canOrderColumn(index)) {
              window.document.body.style.cursor = 'grabbing';
              var indices = selectedColumns;
              var size = columnToPixel(maxX, 1) - columnToPixel(minX);

              var _getScrollPosition = getScrollPosition(e),
                  scroll = _getScrollPosition[0];

              setColumnDrag({
                anchor: x,
                scroll: scroll,
                size: size,
                indices: indices
              });
              onDragOffsetChange === null || onDragOffsetChange === void 0 ? void 0 : onDragOffsetChange([0, 0]);
              return;
            }
          }
        }
      }

      if (onCellWidthChange) {
        for (var _iterator3 = _createForOfIteratorHelperLoose(columns), _step3; !(_step3 = _iterator3()).done;) {
          var _index = _step3.value;
          var edge = columnToPixel(_index, 1);

          if (Math.abs(edge - x) < SIZES.resizeZone && canSizeColumn(_index)) {
            window.document.body.style.cursor = 'col-resize';

            var asGroup = isColumnSelection(selection) && maxX === _index;

            var _indices = asGroup ? selectedColumns : [_index];

            var _size = asGroup ? columnToPixel(maxX, 1) - columnToPixel(minX) : columnToPixel(_index, 1) - columnToPixel(_index);

            var _getScrollPosition2 = getScrollPosition(e),
                _scroll = _getScrollPosition2[0];

            setColumnResize({
              anchor: x,
              scroll: _scroll,
              size: _size,
              indices: _indices
            });
            return;
          }
        }
      }
    }

    if (!hideRowHeaders && x < getIndentX()) {
      if (onRowOrderChange) {
        var _start2 = rowToPixel(minY) + SIZES.resizeZone;

        var _end2 = rowToPixel(maxY, 1) - SIZES.resizeZone;

        if (isInRange(y, _start2, _end2)) {
          for (var _iterator4 = _createForOfIteratorHelperLoose(rows), _step4; !(_step4 = _iterator4()).done;) {
            var _index2 = _step4.value;

            var _start3 = rowToPixel(_index2, 0);

            var _end3 = rowToPixel(_index2, 1);

            if (isRowSelection(selection) && isInRange(y, _start3, _end3) && isInRange(_index2, minY, maxY) && canOrderRow(_index2)) {
              window.document.body.style.cursor = 'grabbing';
              var _indices2 = selectedRows;

              var _size2 = rowToPixel(maxY, 1) - rowToPixel(minY);

              var _getScrollPosition3 = getScrollPosition(e),
                  _scroll2 = _getScrollPosition3[1];

              setRowDrag({
                anchor: y,
                scroll: _scroll2,
                size: _size2,
                indices: _indices2
              });
              onDragOffsetChange === null || onDragOffsetChange === void 0 ? void 0 : onDragOffsetChange([0, 0]);
              return;
            }
          }
        }
      }

      if (onCellHeightChange) {
        for (var _iterator5 = _createForOfIteratorHelperLoose(rows), _step5; !(_step5 = _iterator5()).done;) {
          var _index3 = _step5.value;

          var _edge = rowToPixel(_index3, 1);

          if (Math.abs(_edge - y) < SIZES.resizeZone && canSizeRow(_index3)) {
            window.document.body.style.cursor = 'row-resize';

            var _asGroup = isRowSelection(selection) && maxY === _index3;

            var _indices3 = _asGroup ? selectedRows : [_index3];

            var _size3 = _asGroup ? rowToPixel(maxY, 1) - rowToPixel(minY) : rowToPixel(_index3, 1) - rowToPixel(_index3);

            var _getScrollPosition4 = getScrollPosition(e),
                _scroll3 = _getScrollPosition4[1];

            setRowResize({
              anchor: y,
              scroll: _scroll3,
              size: _size3,
              indices: _indices3
            });
            return;
          }
        }
      }
    }

    if (knobPosition) {
      var knobX = knobPosition[0],
          knobY = knobPosition[1];

      if (Math.abs(x - knobX) < SIZES.knobArea && Math.abs(y - knobY) < SIZES.knobArea) {
        setDraggingKnob(true);
        onKnobAreaChange === null || onKnobAreaChange === void 0 ? void 0 : onKnobAreaChange(selection);
        return;
      }
    }

    var head = pixelToCell(xy);
    var anchor = e.shiftKey ? [].concat(selection[0]) : head;

    if (editMode) {
      if (!dontCommitEditOnSelectionChange) {
        onCommit === null || onCommit === void 0 ? void 0 : onCommit();
      }
    }

    var scrollTo = true;

    if (!hideRowHeaders && x < getIndentX()) {
      scrollTo = false;
      setDraggingRowSelection(true);
      anchor[0] = -1;
      head[0] = -1;
    }

    if (!hideColumnHeaders && y < getIndentY()) {
      scrollTo = false;
      setDraggingColumnSelection(true);
      anchor[1] = -1;
      head[1] = -1;
    }

    setDraggingSelection(true);
    onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange([anchor, head], scrollTo, true);
  }, [getMousePosition, getScrollPosition, getMouseHit, onColumnOrderChange, onRowOrderChange, onCellWidthChange, onCellHeightChange, onKnobAreaChange, onSelectionChange, onCommit, canSizeColumn, canSizeRow, canOrderColumn, canOrderRow]);
  var onPointerUp = React.useCallback(function (e) {
    var _ref$current2 = ref.current,
        knobArea = _ref$current2.knobArea,
        selection = _ref$current2.selection,
        sourceData = _ref$current2.sourceData,
        editData = _ref$current2.editData,
        columnDrag = _ref$current2.columnDrag,
        rowDrag = _ref$current2.rowDrag,
        draggingKnob = _ref$current2.draggingKnob,
        _ref$current2$cellLay = _ref$current2.cellLayout,
        pixelToColumn = _ref$current2$cellLay.pixelToColumn,
        pixelToRow = _ref$current2$cellLay.pixelToRow,
        getIndentX = _ref$current2$cellLay.getIndentX,
        getIndentY = _ref$current2$cellLay.getIndentY;

    if (knobArea && draggingKnob) {
      var changes = parseKnobOperation(knobArea, selection, sourceData, editData);
      onChange === null || onChange === void 0 ? void 0 : onChange(changes);
      onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(knobArea, true, true);
      onKnobAreaChange === null || onKnobAreaChange === void 0 ? void 0 : onKnobAreaChange(null);
    }

    var xy = getMousePosition(e);

    if (xy && (columnDrag || rowDrag)) {
      window.document.body.style.cursor = 'auto';
      onDragOffsetChange === null || onDragOffsetChange === void 0 ? void 0 : onDragOffsetChange(null);
      onDropTargetChange === null || onDropTargetChange === void 0 ? void 0 : onDropTargetChange(null);
      var x = xy[0],
          y = xy[1];

      var _normalizeSelection3 = normalizeSelection(selection),
          _normalizeSelection3$ = _normalizeSelection3[0],
          minX = _normalizeSelection3$[0],
          minY = _normalizeSelection3$[1],
          _normalizeSelection3$2 = _normalizeSelection3[1],
          maxX = _normalizeSelection3$2[0],
          maxY = _normalizeSelection3$2[1];

      var cellX = pixelToColumn(Math.max(x, getIndentX()), 0.5);
      var cellY = pixelToRow(Math.max(y, getIndentY()), 0.5);

      if (columnDrag) {
        var indices = columnDrag.indices;
        var insideSelection = cellX >= minX && cellX <= maxX + 1;

        if (!insideSelection) {
          var order = cellX > minX ? cellX - indices.length : cellX;
          onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange([[order, minY], [order + maxX - minX, maxY]]);
          onColumnOrderChange === null || onColumnOrderChange === void 0 ? void 0 : onColumnOrderChange(indices, order);
          onInvalidateColumn === null || onInvalidateColumn === void 0 ? void 0 : onInvalidateColumn(Math.min(minX, order));
        }
      }

      if (rowDrag) {
        var _indices4 = rowDrag.indices;

        var _insideSelection = cellY >= minY && cellY <= maxY + 1;

        if (!_insideSelection) {
          var _order = cellY > minY ? cellY - _indices4.length : cellY;

          onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange([[minX, _order], [maxX, _order + maxY - minY]]);
          onRowOrderChange === null || onRowOrderChange === void 0 ? void 0 : onRowOrderChange(_indices4, _order);
          onInvalidateRow === null || onInvalidateRow === void 0 ? void 0 : onInvalidateRow(Math.min(minY, _order));
        }
      }
    }

    setDraggingSelection(false);
    setDraggingRowSelection(false);
    setDraggingColumnSelection(false);
    setDraggingKnob(false);
    setColumnResize(null);
    setColumnDrag(null);
    setRowResize(null);
    setRowDrag(null);
    if (!xy || !hitTarget) return;
    setHitTarget(null);

    if (hitTarget === getMouseHit(xy)) {
      var _obj$onClick;

      var obj = hitTarget.obj;
      (_obj$onClick = obj.onClick) === null || _obj$onClick === void 0 ? void 0 : _obj$onClick.call(obj, e);
    }
  }, [getMousePosition, getMouseHit, onChange, onSelectionChange, onKnobAreaChange, onDropTargetChange, onColumnOrderChange, onRowOrderChange]);
  var onPointerMove = React.useCallback(function (e) {
    var _ref$current3 = ref.current,
        selection = _ref$current3.selection,
        visibleCells = _ref$current3.visibleCells,
        knobPosition = _ref$current3.knobPosition,
        columnResize = _ref$current3.columnResize,
        columnDrag = _ref$current3.columnDrag,
        rowResize = _ref$current3.rowResize,
        rowDrag = _ref$current3.rowDrag,
        draggingKnob = _ref$current3.draggingKnob,
        draggingSelection = _ref$current3.draggingSelection,
        draggingColumnSelection = _ref$current3.draggingColumnSelection,
        draggingRowSelection = _ref$current3.draggingRowSelection,
        _ref$current3$cellLay = _ref$current3.cellLayout,
        columnToPixel = _ref$current3$cellLay.columnToPixel,
        rowToPixel = _ref$current3$cellLay.rowToPixel,
        pixelToCell = _ref$current3$cellLay.pixelToCell,
        pixelToColumn = _ref$current3$cellLay.pixelToColumn,
        pixelToRow = _ref$current3$cellLay.pixelToRow,
        getIndentX = _ref$current3$cellLay.getIndentX,
        getIndentY = _ref$current3$cellLay.getIndentY;
    var xy = getMousePosition(e);
    if (!xy) return;
    window.document.body.style.cursor = 'auto';
    var hitTarget = getMouseHit(xy);

    if (hitTarget) {
      window.document.body.style.cursor = 'pointer';
    } else if (columnDrag || rowDrag) {
      window.document.body.style.cursor = 'grabbing';
    } else if (columnResize) {
      window.document.body.style.cursor = 'col-resize';
      e.preventDefault();
    } else if (rowResize) {
      window.document.body.style.cursor = 'row-resize';
      e.preventDefault();
    } else if (draggingRowSelection || draggingColumnSelection) {
      e.preventDefault();
    }

    var columns = visibleCells.columns,
        rows = visibleCells.rows;
    var x = xy[0],
        y = xy[1];

    var _normalizeSelection4 = normalizeSelection(selection),
        _normalizeSelection4$ = _normalizeSelection4[0],
        minX = _normalizeSelection4$[0],
        minY = _normalizeSelection4$[1],
        _normalizeSelection4$2 = _normalizeSelection4[1],
        maxX = _normalizeSelection4$2[0],
        maxY = _normalizeSelection4$2[1];

    var isDragging = columnResize || columnDrag || rowResize || rowDrag || draggingRowSelection || draggingColumnSelection;

    if (!isDragging) {
      if (!hideColumnHeaders && y < getIndentY()) {
        if (onColumnOrderChange) {
          var start = columnToPixel(minX) + SIZES.resizeZone;
          var end = columnToPixel(maxX, 1) - SIZES.resizeZone;

          if (isInRange(x, start, end)) {
            for (var _iterator6 = _createForOfIteratorHelperLoose(columns), _step6; !(_step6 = _iterator6()).done;) {
              var index = _step6.value;

              var _start4 = columnToPixel(index);

              var _end4 = columnToPixel(index, 1);

              if (!draggingColumnSelection && isColumnSelection(selection) && isInRange(x, _start4, _end4) && isInRange(index, minX, maxX) && canOrderColumn(index)) {
                window.document.body.style.cursor = 'grab';
                return;
              }
            }
          }
        }

        if (onCellWidthChange) {
          for (var _iterator7 = _createForOfIteratorHelperLoose(columns), _step7; !(_step7 = _iterator7()).done;) {
            var _index4 = _step7.value;
            var edge = columnToPixel(_index4, 1);

            if (Math.abs(edge - x) < SIZES.resizeZone && canSizeColumn(_index4)) {
              window.document.body.style.cursor = 'col-resize';
              return;
            }
          }
        }
      }

      if (!hideRowHeaders && x < getIndentX()) {
        if (onRowOrderChange) {
          var _start5 = rowToPixel(minY) + SIZES.resizeZone;

          var _end5 = rowToPixel(maxY, 1) - SIZES.resizeZone;

          if (isInRange(y, _start5, _end5)) {
            for (var _iterator8 = _createForOfIteratorHelperLoose(rows), _step8; !(_step8 = _iterator8()).done;) {
              var _index5 = _step8.value;

              var _start6 = rowToPixel(_index5);

              var _end6 = rowToPixel(_index5, 1);

              if (!draggingRowSelection && isRowSelection(selection) && isInRange(y, _start6, _end6) && isInRange(_index5, minY, maxY) && canOrderRow(_index5)) {
                window.document.body.style.cursor = 'grab';
                return;
              }
            }
          }
        }

        if (onCellHeightChange) {
          for (var _iterator9 = _createForOfIteratorHelperLoose(rows), _step9; !(_step9 = _iterator9()).done;) {
            var _index6 = _step9.value;

            var _edge2 = rowToPixel(_index6, 1);

            if (Math.abs(_edge2 - y) < SIZES.resizeZone && canSizeRow(_index6)) {
              window.document.body.style.cursor = 'row-resize';
              return;
            }
          }
        }
      }

      if (knobPosition) {
        var knobX = knobPosition[0],
            knobY = knobPosition[1];

        if (Math.abs(x - knobX) < SIZES.knobArea && Math.abs(y - knobY) < SIZES.knobArea) {
          window.document.body.style.cursor = 'crosshair';
          return;
        }
      }
    }

    if (columnResize) {
      if (onCellWidthChange) {
        var size = columnResize.size,
            anchor = columnResize.anchor,
            scroll = columnResize.scroll,
            indices = columnResize.indices;

        var _getScrollPosition5 = getScrollPosition(e),
            currentScroll = _getScrollPosition5[0];

        var newWidth = Math.max(size + x - anchor + scroll - currentScroll, SIZES.minimumWidth * indices.length);
        onInvalidateColumn === null || onInvalidateColumn === void 0 ? void 0 : onInvalidateColumn(indices[0] - 1);
        onCellWidthChange(indices, newWidth / indices.length);
      }

      return;
    }

    if (rowResize) {
      if (onCellHeightChange) {
        var _size4 = rowResize.size,
            _anchor = rowResize.anchor,
            _scroll4 = rowResize.scroll,
            _indices5 = rowResize.indices;

        var _getScrollPosition6 = getScrollPosition(e),
            _currentScroll = _getScrollPosition6[1];

        var newHeight = Math.max(_size4 + y - _anchor + _scroll4 - _currentScroll, SIZES.minimumHeight * _indices5.length);
        onInvalidateRow === null || onInvalidateRow === void 0 ? void 0 : onInvalidateRow(_indices5[0] - 1);
        onCellHeightChange(_indices5, newHeight / _indices5.length);
      }

      return;
    }

    if (draggingSelection) {
      var _anchor2 = selection[0];
      var head = pixelToCell(xy);
      var anchorX = _anchor2[0],
          anchorY = _anchor2[1];
      var headX = head[0],
          headY = head[1];

      if (draggingRowSelection) {
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange([[-1, anchorY], [-1, Math.max(0, headY)]], false);
      } else if (draggingColumnSelection) {
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange([[anchorX, -1], [Math.max(0, headX), -1]], false);
      } else {
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange([maxXY(_anchor2, ORIGIN), maxXY(head, ORIGIN)], false);
      }
    }

    if (draggingKnob) {
      window.document.body.style.cursor = 'crosshair';

      var _pixelToCell = pixelToCell(xy),
          cellX = _pixelToCell[0],
          cellY = _pixelToCell[1];

      var _normalizeSelection5 = normalizeSelection(selection),
          _normalizeSelection5$ = _normalizeSelection5[0],
          _minX = _normalizeSelection5$[0],
          _minY = _normalizeSelection5$[1],
          _normalizeSelection5$2 = _normalizeSelection5[1],
          _maxX = _normalizeSelection5$2[0],
          _maxY = _normalizeSelection5$2[1];

      var xCellDiff = Math.min(cellX - _minX, _maxX - cellX, 0);
      var yCellDiff = Math.min(cellY - _minY, _maxY - cellY, 0);

      if (isMaybeRowSelection(selection) || xCellDiff > yCellDiff) {
        if (cellY < _minY) {
          _minY = cellY;
        } else if (cellY > _maxY) {
          _maxY = cellY;
        }
      } else {
        if (cellX < _minX) {
          _minX = cellX;
        } else if (cellX > _maxX) {
          _maxX = cellX;
        }
      }

      onKnobAreaChange === null || onKnobAreaChange === void 0 ? void 0 : onKnobAreaChange([[_minX, _minY], [_maxX, _maxY]]);
    }

    if (columnDrag || rowDrag) {
      var _x = xy[0],
          _y = xy[1];

      if (columnDrag) {
        var _cellX = pixelToColumn(Math.max(_x, getIndentX()), 0.5);

        var insideSelection = _cellX >= minX && _cellX <= maxX + 1;
        var _anchor3 = columnDrag.anchor,
            _scroll5 = columnDrag.scroll;
        var shift = _x - _anchor3;

        var _getScrollPosition7 = getScrollPosition(e),
            _currentScroll2 = _getScrollPosition7[0];

        onDragOffsetChange === null || onDragOffsetChange === void 0 ? void 0 : onDragOffsetChange([shift + _currentScroll2 - _scroll5, 0]);
        onDropTargetChange === null || onDropTargetChange === void 0 ? void 0 : onDropTargetChange(insideSelection ? null : [[_cellX, -1], [_cellX, -1]]);
      }

      if (rowDrag) {
        var _cellY = pixelToRow(Math.max(_y, getIndentY()), 0.5);

        var _insideSelection2 = _cellY >= minY && _cellY <= maxY + 1;

        var _anchor4 = rowDrag.anchor,
            _scroll6 = rowDrag.scroll;

        var _shift = _y - _anchor4;

        var _getScrollPosition8 = getScrollPosition(e),
            _currentScroll3 = _getScrollPosition8[1];

        onDragOffsetChange === null || onDragOffsetChange === void 0 ? void 0 : onDragOffsetChange([0, _shift + _currentScroll3 - _scroll6]);
        onDropTargetChange === null || onDropTargetChange === void 0 ? void 0 : onDropTargetChange(_insideSelection2 ? null : [[-1, _cellY], [-1, _cellY]]);
      }
    }
  }, [getMousePosition, getScrollPosition, getMouseHit, onCellWidthChange, onCellHeightChange]);
  var onDoubleClick = React.useCallback(function (e) {
    var pixelToCell = ref.current.cellLayout.pixelToCell;
    e.preventDefault();
    if (e.shiftKey) return;
    var xy = getMousePosition(e);
    if (!xy) return;
    var hitTarget = getMouseHit(xy);

    if (hitTarget) {
      window.document.body.style.cursor = 'pointer';
      return;
    }

    var editCell = pixelToCell(xy);
    if (editMode) onCommit === null || onCommit === void 0 ? void 0 : onCommit();
    onEdit === null || onEdit === void 0 ? void 0 : onEdit(editCell);
  }, [getMousePosition, getMouseHit, onCommit, onEdit]);
  var onContextMenu = React.useCallback(function (e) {
    var _ref$current$cellLayo2 = ref.current.cellLayout,
        pixelToCell = _ref$current$cellLayo2.pixelToCell,
        getIndentX = _ref$current$cellLayo2.getIndentX,
        getIndentY = _ref$current$cellLayo2.getIndentY;
    var xy = getMousePosition(e);
    if (!xy) return;
    var x = xy[0],
        y = xy[1];

    if (x <= getIndentX() || y <= getIndentY()) {
      return;
    }

    var cell = pixelToCell(xy);

    if (!isPointInsideSelection(selection, cell)) {
      onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange([cell, cell]);
    }

    onPointerMove(e);
    var cellX = cell[0],
        cellY = cell[1];

    var event = _extends({}, e, {
      cellX: cellX,
      cellY: cellY
    });

    onRightClick === null || onRightClick === void 0 ? void 0 : onRightClick(event);
  }, [getMousePosition, onSelectionChange, onPointerMove, onRightClick]);
  var mouseHandlers = {
    onPointerLeave: onPointerLeave,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onDoubleClick: onDoubleClick,
    onContextMenu: onContextMenu
  };
  return {
    knobPosition: knobPosition,
    mouseHandlers: mouseHandlers
  };
};

var parseKnobOperation = function parseKnobOperation(knobArea, selection, sourceData, editData) {
  var _normalizeSelection6 = normalizeSelection(knobArea),
      _normalizeSelection6$ = _normalizeSelection6[0],
      kx1 = _normalizeSelection6$[0],
      ky1 = _normalizeSelection6$[1],
      _normalizeSelection6$2 = _normalizeSelection6[1],
      kx2 = _normalizeSelection6$2[0],
      ky2 = _normalizeSelection6$2[1];

  var _normalizeSelection7 = normalizeSelection(selection),
      _normalizeSelection7$ = _normalizeSelection7[0],
      sx1 = _normalizeSelection7$[0],
      sy1 = _normalizeSelection7$[1],
      _normalizeSelection7$2 = _normalizeSelection7[1],
      sx2 = _normalizeSelection7$2[0],
      sy2 = _normalizeSelection7$2[1];

  var fx1 = kx1;
  var fy1 = ky1;
  var fx2 = kx2;
  var fy2 = ky2;
  var changes = [];

  if (fx2 - fx1 === sx2 - sx1) {
    if (fy1 === sy1) {
      fy1 = sy2 + 1;
    } else {
      fy2 = sy1 - 1;
    }

    if (fx1 === -1 && fx2 === -1) {
      var _findApproxMaxEditDat = findApproxMaxEditDataIndex(editData),
          maxX = _findApproxMaxEditDat[0];

      fx1 = 0;
      fx2 = maxX;
    }

    var srcY = sy1;

    for (var y = fy1; y <= fy2; y++) {
      for (var x = fx1; x <= fx2; x++) {
        var value = sourceData(x, srcY);
        changes.push({
          x: x,
          y: y,
          value: value,
          source: {
            x: x,
            y: srcY
          }
        });
      }

      srcY = srcY + 1;

      if (srcY > sy2) {
        srcY = sy1;
      }
    }
  } else {
    if (fx1 === sx1) {
      fx1 = sx2 + 1;
    } else {
      fx2 = sx1 - 1;
    }

    if (fy1 === -1 && fy2 === -1) {
      var _findApproxMaxEditDat2 = findApproxMaxEditDataIndex(editData),
          maxY = _findApproxMaxEditDat2[1];

      fy1 = 0;
      fy2 = maxY;
    }

    var srcX = sx1;

    for (var _x2 = fx1; _x2 <= fx2; _x2++) {
      for (var _y2 = fy1; _y2 <= fy2; _y2++) {
        var _value = sourceData(srcX, _y2);

        changes.push({
          x: _x2,
          y: _y2,
          value: _value,
          source: {
            x: srcX,
            y: _y2
          }
        });
      }

      srcX = srcX + 1;

      if (srcX > sx2) {
        srcX = sx1;
      }
    }
  }

  return changes;
};

var useScroll = function useScroll(offset, maxScroll, cellLayout, onOffsetChange, onMaxScrollChange) {
  return React.useCallback(function (e) {
    if (!e.target || !(e.target instanceof Element)) {
      return;
    }

    var absoluteToCell = cellLayout.absoluteToCell,
        cellToAbsolute = cellLayout.cellToAbsolute;

    var _cellToAbsolute = cellToAbsolute([0, 0], [0.5, 0.5]),
        nudgeX = _cellToAbsolute[0],
        nudgeY = _cellToAbsolute[1];

    var xy = [e.target.scrollLeft + nudgeX, e.target.scrollTop + nudgeY];
    var cell = absoluteToCell(xy);

    if (!isSameXY(cell, offset)) {
      onOffsetChange === null || onOffsetChange === void 0 ? void 0 : onOffsetChange(cell);
    }

    var x = xy[0],
        y = xy[1];
    var maxScrollX = maxScroll[0],
        maxScrollY = maxScroll[1];
    var growX = maxScrollX < x + 1 ? 1.5 : 1;
    var growY = maxScrollY < y + 1 ? 1.5 : 1;

    if (growX > 1 || growY > 1) {
      onMaxScrollChange === null || onMaxScrollChange === void 0 ? void 0 : onMaxScrollChange(mulXY(maxScroll, [growX, growY]));
    }
  }, [cellLayout, onOffsetChange, onMaxScrollChange]);
};
var scrollToCell = function scrollToCell(element, cell, view, freeze, offset, maxScroll, cellLayout, callback) {
  var x = cell[0],
      y = cell[1];
  var w = view[0],
      h = view[1];
  var offsetX = offset[0],
      offsetY = offset[1];
  var cellToAbsolute = cellLayout.cellToAbsolute,
      cellToPixel = cellLayout.cellToPixel,
      columnToPixel = cellLayout.columnToPixel,
      rowToPixel = cellLayout.rowToPixel;

  var _cellToAbsolute2 = cellToAbsolute(freeze),
      frozenX = _cellToAbsolute2[0],
      frozenY = _cellToAbsolute2[1];

  var _cellToPixel = cellToPixel(cell),
      left = _cellToPixel[0],
      top = _cellToPixel[1];

  var _cellToPixel2 = cellToPixel(cell, ONE_ONE),
      right = _cellToPixel2[0],
      bottom = _cellToPixel2[1];

  var newX = offset[0],
      newY = offset[1];

  if (left <= frozenX) {
    newX = x - freeze[0];
  }

  if (top <= frozenY) {
    newY = y - freeze[1];
  }

  if (right > w) {
    var edge = right - w + columnToPixel(newX);

    while (columnToPixel(++newX) < edge) {}
  }

  if (bottom > h) {
    var _edge = bottom - h + rowToPixel(newY);

    while (rowToPixel(++newY) < _edge) {}
  }

  var newOffset = [newX >= 0 ? newX : offsetX, newY >= 0 ? newY : offsetY];

  if (!isSameXY(newOffset, offset)) {
    var scroll = cellToAbsolute(newOffset);

    var _cellToAbsolute3 = cellToAbsolute([0, 0], [0.5, 0.5]),
        nudgeX = _cellToAbsolute3[0],
        nudgeY = _cellToAbsolute3[1];

    callback(newOffset, maxXY(maxScroll, scroll));
    setTimeout(function () {
      var scrollX = scroll[0],
          scrollY = scroll[1];
      element.scrollLeft = scrollX - nudgeX;
      element.scrollTop = scrollY - nudgeY;
    });
  }
};

var useClipboardCopy = function useClipboardCopy(textAreaRef, selection, editMode, editData) {
  React.useLayoutEffect(function () {
    var textArea = textAreaRef.current;
    if (!textArea) return;
    if (editMode) return;
    if (isEmptySelection(selection)) return;
    var v = formatSelectionAsTSV(selection, editData);

    if (v.match(/^[\t\n]*$/)) {
      v = ' ' + v;
    }

    textArea.value = v;
  }, [selection, editMode, editData, textAreaRef]);
  React.useLayoutEffect(function () {
    var textArea = textAreaRef.current;
    if (!textArea) return;

    var focus = function focus() {
      textArea.focus({
        preventScroll: true
      });
      textArea.select();
    };

    if (editMode) return;
    if (document.activeElement === textArea) return;
    var activeTagName = document.activeElement.tagName.toLowerCase();

    if (!(activeTagName === 'div' && document.activeElement.contentEditable === 'true' || activeTagName === 'input' || activeTagName === 'textarea' || activeTagName === 'select')) {
      focus();
    }
  });
};
var useClipboardPaste = function useClipboardPaste(textAreaRef, selection, onSelectionChange, onChange) {
  React.useEffect(function () {
    var onPaste = function onPaste(e) {
      var textArea = textAreaRef.current;
      if (!textArea) return;
      if (e.target !== textArea) return;
      e.preventDefault();
      var clipboardData = e.clipboardData || window.clipboardData;
      var types = clipboardData.types;
      var parsed;

      if (types.includes('text/html')) {
        var pastedHtml = clipboardData.getData('text/html');
        parsed = parsePastedHtml(selection, pastedHtml);
      } else if (types.includes('text/plain')) {
        var text = clipboardData.getData('text/plain');
        parsed = parsePastedText(selection, text);
      }

      if (!parsed) return;
      var _parsed = parsed,
          s = _parsed.selection,
          changes = _parsed.changes;
      onChange === null || onChange === void 0 ? void 0 : onChange(changes);
      onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(s);
    };

    window.document.addEventListener('paste', onPaste);
    return function () {
      window.document.removeEventListener('paste', onPaste);
    };
  }, [textAreaRef, selection]);
};

var formatTSV = function formatTSV(rows) {
  return rows.map(function (row) {
    return row.join('\t');
  }).join('\n');
};

var formatSelectionAsTSV = function formatSelectionAsTSV(selection, editData) {
  if (isEmptySelection(selection)) return '';

  var _normalizeSelection = normalizeSelection(selection),
      _normalizeSelection$ = _normalizeSelection[0],
      minX = _normalizeSelection$[0],
      minY = _normalizeSelection$[1],
      _normalizeSelection$2 = _normalizeSelection[1],
      maxX = _normalizeSelection$2[0],
      maxY = _normalizeSelection$2[1];

  if (isMaybeRowSelection(selection)) {
    var _findApproxMaxEditDat = findApproxMaxEditDataIndex(editData),
        cellX = _findApproxMaxEditDat[0];

    minX = 0;
    maxX = cellX;
  }

  if (isMaybeColumnSelection(selection)) {
    var _findApproxMaxEditDat2 = findApproxMaxEditDataIndex(editData),
        cellY = _findApproxMaxEditDat2[1];

    minY = 0;
    maxY = cellY;
  }

  var rows = [];

  for (var y = minY; y <= maxY; y++) {
    var row = [];

    for (var x = minX; x <= maxX; x++) {
      var value = editData(x, y);

      if (value !== null && value !== undefined) {
        row.push(value != null ? value : '');
      }
    }

    rows.push(row);
  }

  return formatTSV(rows);
};

var findTable = function findTable(element) {
  for (var _iterator = _createForOfIteratorHelperLoose(element.children), _step; !(_step = _iterator()).done;) {
    var child = _step.value;

    if (child.nodeName === 'TABLE') {
      return child;
    }

    var maybeTable = findTable(child);

    if (maybeTable) {
      return maybeTable;
    }
  }
};

var parsePastedHtml = function parsePastedHtml(selection, html) {
  var div = document.createElement('div');
  div.innerHTML = html.trim();

  var _normalizeSelection2 = normalizeSelection(selection),
      _normalizeSelection2$ = _normalizeSelection2[0],
      minX = _normalizeSelection2$[0],
      minY = _normalizeSelection2$[1];

  var left = isMaybeRowSelection(selection) ? 0 : minX;
  var top = isMaybeColumnSelection(selection) ? 0 : minY;
  var changes = [];
  var tableNode = findTable(div);

  if (!tableNode) {
    return null;
  }

  var right = left;
  var bottom = top;
  var y = top;

  for (var _iterator2 = _createForOfIteratorHelperLoose(tableNode.children), _step2; !(_step2 = _iterator2()).done;) {
    var tableChild = _step2.value;

    if (tableChild.nodeName === 'TBODY') {
      for (var _iterator3 = _createForOfIteratorHelperLoose(tableChild.children), _step3; !(_step3 = _iterator3()).done;) {
        var tr = _step3.value;
        var x = left;

        if (tr.nodeName === 'TR') {
          for (var _iterator4 = _createForOfIteratorHelperLoose(tr.children), _step4; !(_step4 = _iterator4()).done;) {
            var td = _step4.value;

            if (td.nodeName === 'TD') {
              var str = '';

              if (td.children.length !== 0 && td.children[0].nodeName === 'P') {
                var p = td.children[0];

                if (p.children.length !== 0 && p.children[0].nodeName === 'FONT') {
                  str = p.children[0].textContent.trim();
                } else {
                  str = p.textContent.trim();
                }
              } else {
                str = td.textContent.trim();
              }

              str = str.replaceAll('\n', '');
              str = str.replaceAll(/\s\s+/g, ' ');
              changes.push({
                x: x,
                y: y,
                value: str
              });
              x++;
            }
          }

          y++;
        }

        right = Math.max(right, x - 1);
      }
    }
  }

  bottom = Math.max(top, y - 1);
  return {
    selection: [[left, top], [right, bottom]],
    changes: changes
  };
};

var parsePastedText = function parsePastedText(selection, text) {
  var _normalizeSelection3 = normalizeSelection(selection),
      _normalizeSelection3$ = _normalizeSelection3[0],
      minX = _normalizeSelection3$[0],
      minY = _normalizeSelection3$[1];

  var left = isMaybeRowSelection(selection) ? 0 : minX;
  var top = isMaybeColumnSelection(selection) ? 0 : minY;
  var rows = text.split(/\r?\n/);
  var right = left;
  var bottom = top + rows.length - 1;
  var changes = [];

  for (var y = 0; y < rows.length; y++) {
    var cols = rows[y].split('\t');
    right = Math.max(right, left + cols.length - 1);

    for (var x = 0; x < cols.length; x++) {
      changes.push({
        x: left + x,
        y: top + y,
        value: cols[x]
      });
    }
  }

  return {
    selection: [[left, top], [right, bottom]],
    changes: changes
  };
};

var INITIAL_SIZE = 256;
var makeCellLayout = function makeCellLayout(freeze, indent, offset, columns, rows) {
  var freezeX = freeze[0],
      freezeY = freeze[1];
  var indentX = indent[0],
      indentY = indent[1];
  var offsetX = offset[0],
      offsetY = offset[1];

  var getIndentX = function getIndentX() {
    return indentX;
  };

  var getIndentY = function getIndentY() {
    return indentY;
  };

  var getBaseOriginFor = function getBaseOriginFor(index, freeze, offset) {
    return index < freeze ? 0 : offset + freeze;
  };

  var columnToPixel = function columnToPixel(column, anchor) {
    if (anchor === void 0) {
      anchor = 0;
    }

    var base = getBaseOriginFor(column, freezeX, offsetX);
    var relative = columns.getStart(column) - columns.getStart(base);
    var adjust = column < freezeX ? 0 : columns.getStart(freezeX) - columns.getStart(0);
    var size = column < 0 ? indentX : columns.getSize(column);
    return column < 0 ? 0 : indentX + relative + adjust + anchor * size;
  };

  var rowToPixel = function rowToPixel(row, anchor) {
    if (anchor === void 0) {
      anchor = 0;
    }

    var base = getBaseOriginFor(row, freezeY, offsetY);
    var relative = rows.getStart(row) - rows.getStart(base);
    var adjust = row < freezeY ? 0 : rows.getStart(freezeY) - rows.getStart(0);
    var size = row < 0 ? indentY : rows.getSize(row);
    return row < 0 ? 0 : indentY + relative + adjust + anchor * size;
  };

  var cellToPixel = function cellToPixel(cell, anchor) {
    if (anchor === void 0) {
      anchor = ORIGIN;
    }

    var cellX = cell[0],
        cellY = cell[1];
    var _anchor = anchor,
        anchorX = _anchor[0],
        anchorY = _anchor[1];
    return [columnToPixel(cellX, anchorX), rowToPixel(cellY, anchorY)];
  };

  var columnToAbsolute = function columnToAbsolute(column, anchorX) {
    if (anchorX === void 0) {
      anchorX = 0;
    }

    var relative = columns.getStart(column);
    var size = column < 0 ? 0 : columns.getSize(column);
    return relative + anchorX * size;
  };

  var rowToAbsolute = function rowToAbsolute(row, anchorY) {
    if (anchorY === void 0) {
      anchorY = 0;
    }

    var relative = rows.getStart(row);
    var size = row < 0 ? 0 : rows.getSize(row);
    return relative + anchorY * size;
  };

  var cellToAbsolute = function cellToAbsolute(cell, anchor) {
    if (anchor === void 0) {
      anchor = ORIGIN;
    }

    var cellX = cell[0],
        cellY = cell[1];
    var _anchor2 = anchor,
        anchorX = _anchor2[0],
        anchorY = _anchor2[1];
    return [columnToAbsolute(cellX, anchorX), rowToAbsolute(cellY, anchorY)];
  };

  var pixelToIndex = function pixelToIndex(pixel, anchor, indent, freeze, offset, layout) {
    var relative = pixel - indent;
    if (relative < 0) return -1;
    var getStart = layout.getStart,
        lookupIndex = layout.lookupIndex;
    var frozen = getStart(freeze);

    if (relative < frozen) {
      return lookupIndex(relative, anchor);
    } else {
      var base = getStart(offset + freeze);
      var adjust = getStart(freeze) - getStart(0);
      return lookupIndex(base + relative - adjust, anchor);
    }
  };

  var pixelToColumn = function pixelToColumn(pixelX, anchorX) {
    if (anchorX === void 0) {
      anchorX = 0;
    }

    return pixelToIndex(pixelX, anchorX, indentX, freezeX, offsetX, columns);
  };

  var pixelToRow = function pixelToRow(pixelY, anchorY) {
    if (anchorY === void 0) {
      anchorY = 0;
    }

    return pixelToIndex(pixelY, anchorY, indentY, freezeY, offsetY, rows);
  };

  var pixelToCell = function pixelToCell(pixel, anchor) {
    if (anchor === void 0) {
      anchor = ORIGIN;
    }

    var pixelX = pixel[0],
        pixelY = pixel[1];
    var _anchor3 = anchor,
        anchorX = _anchor3[0],
        anchorY = _anchor3[1];
    return [pixelToColumn(pixelX, anchorX), pixelToRow(pixelY, anchorY)];
  };

  var absoluteToIndex = function absoluteToIndex(pixel, anchor, layout) {
    if (pixel < 0) return -1;
    var lookupIndex = layout.lookupIndex;
    return lookupIndex(pixel, anchor);
  };

  var absoluteToColumn = function absoluteToColumn(pixelX, anchorX) {
    if (anchorX === void 0) {
      anchorX = 0;
    }

    return absoluteToIndex(pixelX, anchorX, columns);
  };

  var absoluteToRow = function absoluteToRow(pixelY, anchorY) {
    if (anchorY === void 0) {
      anchorY = 0;
    }

    return absoluteToIndex(pixelY, anchorY, rows);
  };

  var absoluteToCell = function absoluteToCell(pixel, anchor) {
    if (anchor === void 0) {
      anchor = ORIGIN;
    }

    var pixelX = pixel[0],
        pixelY = pixel[1];
    var _anchor4 = anchor,
        anchorX = _anchor4[0],
        anchorY = _anchor4[1];
    return [absoluteToColumn(pixelX, anchorX), absoluteToRow(pixelY, anchorY)];
  };

  var getVisibleIndices = function getVisibleIndices(view, indent, freeze, offset, layout) {
    var indices = [].concat(seq(freeze));
    var getStart = layout.getStart;
    var relative = view - indent + getStart(offset);

    for (var i = offset + freeze; getStart(i) <= relative; ++i) {
      indices.push(i);
    }

    return indices;
  };

  var getVisibleCells = function getVisibleCells(view) {
    var viewX = view[0],
        viewY = view[1];
    return {
      columns: getVisibleIndices(viewX, indentX, freezeX, offsetX, columns),
      rows: getVisibleIndices(viewY, indentY, freezeY, offsetY, rows)
    };
  };

  var getVersion = function getVersion() {
    return columns.getVersion() + rows.getVersion();
  };

  return {
    columnToPixel: columnToPixel,
    rowToPixel: rowToPixel,
    cellToPixel: cellToPixel,
    columnToAbsolute: columnToAbsolute,
    rowToAbsolute: rowToAbsolute,
    cellToAbsolute: cellToAbsolute,
    pixelToColumn: pixelToColumn,
    pixelToRow: pixelToRow,
    pixelToCell: pixelToCell,
    absoluteToColumn: absoluteToColumn,
    absoluteToRow: absoluteToRow,
    absoluteToCell: absoluteToCell,
    getVisibleCells: getVisibleCells,
    getIndentX: getIndentX,
    getIndentY: getIndentY,
    getVersion: getVersion
  };
};
var makeLayoutCache = function makeLayoutCache(sizer) {
  var offsets = makeIntMap(INITIAL_SIZE);
  var sizes = makeIntMap(INITIAL_SIZE);
  var version = 0;
  offsets.set(0, 0);

  var getSize = function getSize(i) {
    if (i < 0) return 0;
    if (sizes.has(i)) return sizes.get(i);
    var size = sizer(i) || 0;
    sizes.set(i, size);
    return size;
  };

  var getOffset = function getOffset(i) {
    if (i < 0) return 0;
    if (offsets.has(i)) return offsets.get(i);
    var j = offsets.tail() || 0;

    while (j < i) {
      var size = getSize(j);
      var offset = (offsets.get(j) || 0) + size;
      offsets.set(++j, offset);
    }

    return offsets.get(i);
  };

  var getStart = function getStart(i) {
    return getOffset(i);
  };

  var getEnd = function getEnd(i) {
    return getOffset(i + 1);
  };

  var lookupIndex = function lookupIndex(x, anchor) {
    if (anchor === void 0) {
      anchor = 0;
    }

    var last = offsets.tail() || 0;

    while (getOffset(last) < x && getSize(last)) {
      last += 64;
    }

    var start = 0;
    var end = last;

    while (start < end) {
      var mid = start + Math.floor((end - start) / 2) + 1;
      var value = getOffset(mid) - (anchor ? anchor * getSize(mid - 1) : 0);
      if (value <= x) start = mid;else end = mid - 1;
    }

    return start;
  };

  var clearAfter = function clearAfter(index) {
    index = Math.max(0, index);
    offsets.truncate(index);
    sizes.truncate(index);
    version++;
  };

  var setSizer = function setSizer(s) {
    sizer = s;
  };

  var getVersion = function getVersion() {
    return version;
  };

  return {
    getSize: getSize,
    getStart: getStart,
    getEnd: getEnd,
    getVersion: getVersion,
    lookupIndex: lookupIndex,
    setSizer: setSizer,
    clearAfter: clearAfter
  };
};

var makeIntMap = function makeIntMap(initialSize) {
  if (initialSize === void 0) {
    initialSize = 128;
  }

  var used;
  var values;
  var last = 0;
  var GROW = 1.2;

  var allocate = function allocate(size) {
    var newUsed = new Uint8Array(size);
    var newValues = new Uint32Array(size);
    if (used) copy(used, newUsed);
    if (values) copy(values, newValues);
    used = newUsed;
    values = newValues;
  };

  allocate(initialSize);

  var copy = function copy(from, to) {
    var n = Math.min(from.length, to.length);

    for (var i = 0; i < n; ++i) {
      to[i] = from[i];
    }
  };

  var ensure = function ensure(size) {
    var l = values.length;
    var grow = Math.round(l * GROW);
    if (l < size) allocate(Math.max(grow, size));
  };

  var truncate = function truncate(size) {
    var l = values.length;
    if (l < size) return;
    var shrink = Math.round(size * GROW);
    if (l > shrink) allocate(size);else for (var i = size; i < l; ++i) {
        used[i] = 0;
      }
    last = Math.min(last, size);

    while (last > 0 && !used[last]) {
      last--;
    }
  };

  var getTail = function getTail() {
    return used[last] ? last : null;
  };

  var setValue = function setValue(i, value) {
    ensure(i + 1);
    values[i] = value;
    used[i] = 1;
    last = Math.max(last, i);
  };

  var getValue = function getValue(i) {
    return used[i] ? values[i] : null;
  };

  var hasValue = function hasValue(i) {
    return !!used[i];
  };

  return {
    truncate: truncate,
    set: setValue,
    get: getValue,
    has: hasValue,
    tail: getTail
  };
};

var resolveSheetStyle = function resolveSheetStyle(sheetStyle) {
  return {
    freezeColumns: (sheetStyle === null || sheetStyle === void 0 ? void 0 : sheetStyle.freezeColumns) || 0,
    freezeRows: (sheetStyle === null || sheetStyle === void 0 ? void 0 : sheetStyle.freezeRows) || 0,
    hideColumnHeaders: (sheetStyle === null || sheetStyle === void 0 ? void 0 : sheetStyle.hideColumnHeaders) || false,
    hideRowHeaders: (sheetStyle === null || sheetStyle === void 0 ? void 0 : sheetStyle.hideRowHeaders) || false,
    hideGridlines: (sheetStyle === null || sheetStyle === void 0 ? void 0 : sheetStyle.hideGridlines) || false,
    hideScrollBars: (sheetStyle === null || sheetStyle === void 0 ? void 0 : sheetStyle.hideScrollBars) || false,
    columnHeaderHeight: sheetStyle !== null && sheetStyle !== void 0 && sheetStyle.hideColumnHeaders ? 1 : SIZES.headerHeight,
    rowHeaderWidth: sheetStyle !== null && sheetStyle !== void 0 && sheetStyle.hideRowHeaders ? 1 : SIZES.headerWidth
  };
};
var resolveCellStyle = function resolveCellStyle(optionalStyle, defaultStyle) {
  return _extends({}, defaultStyle, optionalStyle);
};
var applyAlignment = function applyAlignment(start, cellSize, style, imageWidth, alignment) {
  if (alignment === void 0) {
    alignment = style.textAlign;
  }

  if (alignment === 'left') {
    return start + style.marginLeft;
  } else if (alignment === 'center') {
    return start + cellSize * 0.5 - imageWidth / 2;
  } else if (alignment === 'right') {
    return start + (cellSize - style.marginRight - imageWidth);
  }

  return start;
};

var renderSheet = function renderSheet(context, cellLayout, visibleCells, sheetStyle, cellStyle, selection, secondarySelections, knobPosition, knobArea, dragOffset, dropTarget, columnHeaders, columnHeaderStyle, displayData, dataOffset) {
  var canvas = context.canvas;
  var width = canvas.width,
      height = canvas.height;
  var hideGridlines = sheetStyle.hideGridlines,
      hideRowHeaders = sheetStyle.hideRowHeaders,
      hideColumnHeaders = sheetStyle.hideColumnHeaders,
      rowHeaderWidth = sheetStyle.rowHeaderWidth,
      columnHeaderHeight = sheetStyle.columnHeaderHeight,
      freezeColumns = sheetStyle.freezeColumns,
      freezeRows = sheetStyle.freezeRows;
  var columns = visibleCells.columns,
      rows = visibleCells.rows;
  var columnToPixel = cellLayout.columnToPixel,
      rowToPixel = cellLayout.rowToPixel;
  var clickables = [];
  var freeze = [freezeColumns, freezeRows];
  var indent = [rowHeaderWidth, columnHeaderHeight];
  resizeCanvas(canvas);
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);

  for (var _iterator = _createForOfIteratorHelperLoose(rows), _step; !(_step = _iterator()).done;) {
    var y = _step.value;

    for (var _iterator8 = _createForOfIteratorHelperLoose(columns), _step8; !(_step8 = _iterator8()).done;) {
      var x = _step8.value;

      var _left7 = columnToPixel(x);

      var _right7 = columnToPixel(x, 1);

      var _top7 = rowToPixel(y);

      var _bottom7 = rowToPixel(y, 1);

      var _cellStyle = cellStyle(x, y),
          fillColor = _cellStyle.fillColor;

      if (fillColor) {
        context.fillStyle = fillColor;
        context.fillRect(_left7, _top7, _right7 - _left7, _bottom7 - _top7);
      }
    }
  }

  var selectionActive = !isEmptySelection(selection);
  var rowSelectionActive = isRowSelection(selection);
  var columnSelectionActive = isColumnSelection(selection);

  var _resolveFrozenSelecti = resolveFrozenSelection(selection, cellLayout, freeze, indent, dataOffset),
      selected = _resolveFrozenSelecti[0],
      hideKnob = _resolveFrozenSelecti[1];

  if (selectionActive) {
    var _selected$ = selected[0],
        left = _selected$[0],
        top = _selected$[1],
        _selected$2 = selected[1],
        right = _selected$2[0],
        bottom = _selected$2[1];
    context.fillStyle = COLORS.selectionBackground;
    context.fillRect(left, top, right - left, bottom - top);
  }

  if (!hideRowHeaders) {
    context.fillStyle = COLORS.headerBackground;
    context.fillRect(0, 0, rowHeaderWidth, context.canvas.height);

    if (selectionActive && !columnSelectionActive) {
      var _selected$3 = selected[0],
          _top = _selected$3[1],
          _selected$4 = selected[1],
          _bottom = _selected$4[1];
      context.fillStyle = COLORS.headerActive;
      context.fillRect(0, _top, rowHeaderWidth, _bottom - _top);
    }
  }

  if (!hideColumnHeaders) {
    context.fillStyle = COLORS.headerBackground;
    context.fillRect(0, 0, context.canvas.width, columnHeaderHeight);

    if (selectionActive && !rowSelectionActive) {
      var _selected$5 = selected[0],
          _left = _selected$5[0],
          _selected$6 = selected[1],
          _right = _selected$6[0];
      context.fillStyle = COLORS.headerActive;
      context.fillRect(_left, 0, _right - _left, columnHeaderHeight);
    }
  }

  context.strokeStyle = COLORS.gridLine;
  context.lineWidth = 1;
  var gridRight = hideGridlines ? rowHeaderWidth : context.canvas.width;
  var gridBottom = hideGridlines ? columnHeaderHeight : context.canvas.height;

  var drawGridLineX = function drawGridLineX(x, height) {
    context.beginPath();
    context.moveTo(x - .5, 0);
    context.lineTo(x - .5, height);
    context.stroke();
  };

  var drawGridLineY = function drawGridLineY(y, width) {
    context.beginPath();
    context.moveTo(0, y - .5);
    context.lineTo(width, y - .5);
    context.stroke();
  };

  drawGridLineX(rowHeaderWidth, context.canvas.height);
  drawGridLineY(columnHeaderHeight, context.canvas.width);

  for (var _iterator2 = _createForOfIteratorHelperLoose(columns), _step2; !(_step2 = _iterator2()).done;) {
    var _column = _step2.value;

    var _right8 = columnToPixel(_column, 1);

    drawGridLineX(_right8, gridBottom);
  }

  for (var _iterator3 = _createForOfIteratorHelperLoose(rows), _step3; !(_step3 = _iterator3()).done;) {
    var _row = _step3.value;

    var _bottom8 = rowToPixel(_row, 1);

    drawGridLineY(_bottom8, gridRight);
  }

  var _normalizeSelection = normalizeSelection(selection),
      _normalizeSelection$ = _normalizeSelection[0],
      minX = _normalizeSelection$[0],
      minY = _normalizeSelection$[1],
      _normalizeSelection$2 = _normalizeSelection[1],
      maxX = _normalizeSelection$2[0],
      maxY = _normalizeSelection$2[1];

  if (!hideRowHeaders) {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = DEFAULT_CELL_STYLE.fontSize + 'px ' + DEFAULT_CELL_STYLE.fontFamily;
    context.fillStyle = COLORS.headerText;

    for (var _iterator4 = _createForOfIteratorHelperLoose(rows), _step4; !(_step4 = _iterator4()).done;) {
      var row = _step4.value;
      var content = "" + (row + 1);
      var isActive = isInRange(row, minY, maxY);
      var isSelected = rowSelectionActive && !columnSelectionActive && isActive;
      var style = isSelected ? HEADER_SELECTED_STYLE : isActive ? HEADER_ACTIVE_STYLE : NO_STYLE;

      var _top2 = rowToPixel(row);

      var _bottom2 = rowToPixel(row, 1);

      clickables.push.apply(clickables, renderCell(context, content, style, DEFAULT_COLUMN_HEADER_STYLE, 0, _top2, rowHeaderWidth, _bottom2 - _top2));
    }
  }

  if (!hideColumnHeaders) {
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    for (var _iterator5 = _createForOfIteratorHelperLoose(columns), _step5; !(_step5 = _iterator5()).done;) {
      var _columnHeaders;

      var column = _step5.value;

      var _content = (_columnHeaders = columnHeaders(column)) != null ? _columnHeaders : excelHeaderString(column + 1);

      var _isActive = isInRange(column, minX, maxX);

      var selectedStyle = columnSelectionActive && !rowSelectionActive && _isActive ? HEADER_SELECTED_STYLE : NO_STYLE;
      var activeStyle = _isActive ? HEADER_ACTIVE_STYLE : NO_STYLE;

      var _style = _extends({}, columnHeaderStyle(column), activeStyle, selectedStyle);

      var _left2 = columnToPixel(column);

      var _right2 = columnToPixel(column, 1);

      clickables.push.apply(clickables, renderCell(context, _content, _style, DEFAULT_COLUMN_HEADER_STYLE, _left2, 0, _right2 - _left2, columnHeaderHeight));
    }
  }

  if (selectionActive) {
    context.strokeStyle = COLORS.selectionBorder;
    context.lineWidth = 2;
    var _selected$7 = selected[0],
        _left3 = _selected$7[0],
        _top3 = _selected$7[1],
        _selected$8 = selected[1],
        _right3 = _selected$8[0],
        _bottom3 = _selected$8[1];
    context.strokeRect(_left3, _top3, _right3 - _left3 - 1, _bottom3 - _top3 - 1);
  }

  for (var _iterator6 = _createForOfIteratorHelperLoose(secondarySelections), _step6; !(_step6 = _iterator6()).done;) {
    var secondarySelection = _step6.value;
    var _selection = secondarySelection.span;
    if (isEmptySelection(_selection)) continue;

    var _resolveFrozenSelecti2 = resolveFrozenSelection(_selection, cellLayout, freeze, indent, dataOffset),
        _selected = _resolveFrozenSelecti2[0];

    var _selected$9 = _selected[0],
        _left8 = _selected$9[0],
        _top8 = _selected$9[1],
        _selected$10 = _selected[1],
        _right9 = _selected$10[0],
        _bottom9 = _selected$10[1];
    context.strokeStyle = secondarySelection.color;
    context.lineWidth = 1;
    context.beginPath();
    context.strokeRect(_left8 - 1, _top8 - 1, _right9 - _left8 + 1, _bottom9 - _top8 + 1);
  }

  if (knobArea) {
    var _normalizeSelection2 = normalizeSelection(knobArea),
        _normalizeSelection2$ = _normalizeSelection2[0],
        _minX = _normalizeSelection2$[0],
        _minY = _normalizeSelection2$[1],
        _normalizeSelection2$2 = _normalizeSelection2[1],
        _maxX = _normalizeSelection2$2[0],
        _maxY = _normalizeSelection2$2[1];

    var _left4 = columnToPixel(_minX);

    var _top4 = rowToPixel(_minY);

    var _right4 = columnToPixel(_maxX, 1);

    var _bottom4 = rowToPixel(_maxY, 1);

    context.strokeStyle = COLORS.knobAreaBorder;
    context.setLineDash([3, 3]);
    context.lineWidth = 1;
    context.strokeRect(_left4 - 1, _top4 - 1, _right4 - _left4 + 1, _bottom4 - _top4 + 1);
    context.setLineDash([]);
  }

  if (knobPosition && !hideKnob) {
    var knobX = knobPosition[0],
        knobY = knobPosition[1];
    context.fillStyle = COLORS.selectionBorder;
    context.fillRect(knobX - SIZES.knobArea * 0.5, knobY - SIZES.knobArea * 0.5, SIZES.knobArea, SIZES.knobArea);
  }

  if (dragOffset) {
    var shiftX = dragOffset[0],
        shiftY = dragOffset[1];

    var _resolveSelection = resolveSelection(selection, cellLayout),
        _resolveSelection$ = _resolveSelection[0],
        _left5 = _resolveSelection$[0],
        _top5 = _resolveSelection$[1],
        _resolveSelection$2 = _resolveSelection[1],
        _right5 = _resolveSelection$2[0],
        _bottom5 = _resolveSelection$2[1];

    context.fillStyle = COLORS.dragGhost;
    context.fillRect(_left5 + shiftX, _top5 + shiftY, _right5 - _left5, _bottom5 - _top5);
  }

  if (dropTarget) {
    var _resolveSelection2 = resolveSelection(dropTarget, cellLayout),
        _resolveSelection2$ = _resolveSelection2[0],
        _left6 = _resolveSelection2$[0],
        _top6 = _resolveSelection2$[1],
        _resolveSelection2$2 = _resolveSelection2[1],
        _right6 = _resolveSelection2$2[0],
        _bottom6 = _resolveSelection2$2[1];

    context.strokeStyle = COLORS.dropTarget;
    context.lineWidth = 2;

    if (isColumnSelection(dropTarget)) {
      _right6 = _left6;
    }

    if (isRowSelection(dropTarget)) {
      _bottom6 = _top6;
    }

    context.strokeRect(_left6 - 1, _top6 - 1, _right6 - _left6, _bottom6 - _top6);
  }

  context.textBaseline = 'middle';

  for (var _iterator7 = _createForOfIteratorHelperLoose(rows), _step7; !(_step7 = _iterator7()).done;) {
    var _y = _step7.value;

    for (var _iterator9 = _createForOfIteratorHelperLoose(columns), _step9; !(_step9 = _iterator9()).done;) {
      var _x = _step9.value;

      var _left9 = columnToPixel(_x);

      var _right10 = columnToPixel(_x, 1);

      var _top9 = rowToPixel(_y);

      var _bottom10 = rowToPixel(_y, 1);

      var cellContent = displayData(_x, _y);

      if (cellContent !== null && cellContent !== undefined) {
        var _style2 = cellStyle(_x, _y);

        clickables.push.apply(clickables, renderCell(context, cellContent, _style2, DEFAULT_CELL_STYLE, _left9, _top9, _right10 - _left9, _bottom10 - _top9));
      }
    }
  }

  return clickables;
};
var renderCell = function renderCell(context, cellContent, style, defaultCellStyle, xCoord, yCoord, cellWidth, cellHeight) {
  var clickables = [];

  if (cellContent === null) {
    return clickables;
  }

  var finalStyle = resolveCellStyle(style, defaultCellStyle);
  context.fillStyle = finalStyle.color;
  context.font = finalStyle.weight + ' ' + finalStyle.fontSize + 'px ' + finalStyle.fontFamily;
  context.textAlign = finalStyle.textAlign;
  var yy = Math.floor(yCoord + cellHeight * 0.5);
  context.save();
  context.beginPath();
  context.rect(xCoord, yCoord, cellWidth, cellHeight);
  context.clip();

  if (finalStyle.backgroundColor !== '') {
    context.fillStyle = finalStyle.backgroundColor;
    context.fillRect(xCoord, yCoord, cellWidth, cellHeight);
    context.fillStyle = finalStyle.color;
  }

  if (typeof cellContent === 'string' || typeof cellContent === 'number') {
    var xx = applyAlignment(xCoord, cellWidth, finalStyle, 0);
    var text = '' + cellContent;
    context.fillText(text, xx, yy);
  } else if (typeof cellContent === 'object') {
    for (var _iterator10 = _createForOfIteratorHelperLoose(cellContent.items), _step10; !(_step10 = _iterator10()).done;) {
      var obj = _step10.value;
      var x = 0;
      var y = 0;
      var w = 0;
      var h = 0;

      if (obj.content instanceof HTMLImageElement) {
        w = obj.width || cellWidth;
        h = obj.height || cellHeight;
        var finalX = applyAlignment(xCoord, cellWidth, finalStyle, w, obj.horizontalAlign);
        x = finalX + obj.x;
        y = yy + obj.y;
        context.drawImage(obj.content, x, y, w, h);
      } else if (typeof obj.content === 'string' || typeof obj.content === 'number') {
        if (obj.horizontalAlign) {
          context.textAlign = obj.horizontalAlign;
        }

        var _finalX = applyAlignment(xCoord, cellWidth, finalStyle, 0, obj.horizontalAlign);

        var _text = '' + obj.content;

        var left = _finalX + obj.x;
        var top = yy + obj.y;
        context.fillText(_text, left, top);
        var measure = context.measureText(_text);
        x = left - measure.actualBoundingBoxLeft;
        y = top - measure.actualBoundingBoxAscent;
        w = left + measure.actualBoundingBoxRight - x;
        h = top + measure.actualBoundingBoxDescent - y;
      }

      if (obj.onClick) {
        clickables.push({
          rect: [[x, y], [x + w, y + h]],
          obj: obj
        });
      }
    }
  }

  context.restore();
  return clickables;
};

var resolveSelection = function resolveSelection(selection, cellLayout) {
  var cellToPixel = cellLayout.cellToPixel;
  var rowSelectionActive = isRowSelection(selection);
  var columnSelectionActive = isColumnSelection(selection);

  var _normalizeSelection3 = normalizeSelection(selection),
      min = _normalizeSelection3[0],
      max = _normalizeSelection3[1];

  var _cellToPixel = cellToPixel(min),
      left = _cellToPixel[0],
      top = _cellToPixel[1];

  var _cellToPixel2 = cellToPixel(max, ONE_ONE),
      right = _cellToPixel2[0],
      bottom = _cellToPixel2[1];

  if (rowSelectionActive) {
    right = 1e5;
  }

  if (columnSelectionActive) {
    bottom = 1e5;
  }

  return [[left, top], [right, bottom]];
};

var resolveFrozenSelection = function resolveFrozenSelection(selection, cellLayout, freeze, indent, offset) {
  var cellToPixel = cellLayout.cellToPixel,
      columnToAbsolute = cellLayout.columnToAbsolute,
      rowToAbsolute = cellLayout.rowToAbsolute;
  var rowSelectionActive = isRowSelection(selection);
  var columnSelectionActive = isColumnSelection(selection);
  var freezeX = freeze[0],
      freezeY = freeze[1];
  var indentX = indent[0],
      indentY = indent[1];
  var offsetX = offset[0],
      offsetY = offset[1];

  var _normalizeSelection4 = normalizeSelection(selection),
      min = _normalizeSelection4[0],
      max = _normalizeSelection4[1];

  var minX = min[0],
      minY = min[1];
  var maxX = max[0],
      maxY = max[1];

  var _cellToPixel3 = cellToPixel(min),
      left = _cellToPixel3[0],
      top = _cellToPixel3[1];

  var _cellToPixel4 = cellToPixel(max, ONE_ONE),
      right = _cellToPixel4[0],
      bottom = _cellToPixel4[1];

  var frozenX = columnToAbsolute(freezeX);
  var frozenY = rowToAbsolute(freezeY);
  var hideKnob = false;

  if (isInRangeCenter(freezeX, minX, maxX + 1)) {
    var edge = indentX + frozenX;

    if (right <= edge) {
      right = edge;
      hideKnob = true;
    }
  }

  if (isInRangeCenter(freezeY, minY, maxY + 1)) {
    var _edge = indentY + frozenY;

    if (bottom <= _edge) {
      bottom = _edge;
      hideKnob = true;
    }
  }

  if (isInRangeLeft(minX, freezeX, offsetX + freezeX)) {
    left = -1e5;
    var lastInvisibleX = offsetX + freezeX - 1;

    if (maxX <= lastInvisibleX) {
      if (maxX === lastInvisibleX) right = indentX;else right = -1e5;
      hideKnob = true;
    }
  }

  if (isInRangeLeft(minY, freezeY, offsetY + freezeY)) {
    top = -1e5;
    var lastInvisibleY = offsetY + freezeY - 1;

    if (maxY <= lastInvisibleY) {
      if (maxY === lastInvisibleY) bottom = indentY;else bottom = -1e5;
      hideKnob = true;
    }
  }

  if (rowSelectionActive && offsetX > 0) {
    hideKnob = true;
  }

  if (columnSelectionActive && offsetY > 0) {
    hideKnob = true;
  }

  if (rowSelectionActive) {
    right = 1e5;
  }

  if (columnSelectionActive) {
    bottom = 1e5;
  }

  return [[[left, top], [right, bottom]], hideKnob];
};

var resizeCanvas = function resizeCanvas(canvas) {
  var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
      width = _canvas$getBoundingCl.width,
      height = _canvas$getBoundingCl.height;

  var _window = window,
      _window$devicePixelRa = _window.devicePixelRatio,
      ratio = _window$devicePixelRa === void 0 ? 1 : _window$devicePixelRa;

  if (ratio < 1) {
    ratio = 1;
  }

  var newCanvasWidth = Math.round(width * ratio);
  var newCanvasHeight = Math.round(height * ratio);

  if (canvas.width !== newCanvasWidth || canvas.height !== newCanvasHeight) {
    var context = canvas.getContext('2d');

    if (context) {
      canvas.width = newCanvasWidth;
      canvas.height = newCanvasHeight;
      context.scale(ratio, ratio);
    }

    return true;
  }

  return false;
};

var excelHeaderString = function excelHeaderString(num) {
  var s = '';
  var t = 0;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t) / 26 | 0;
  }

  return s || '';
};

var Sheet = React.forwardRef(function (props, ref) {
  var _props$selection, _props$secondarySelec, _props$inputComponent;

  var canvasRef = React.useRef(null);
  var overlayRef = React.useRef(null);

  var _useState = React.useState(INITIAL_MAX_SCROLL),
      maxScroll = _useState[0],
      setMaxScroll = _useState[1];

  var _useState2 = React.useState(ORIGIN),
      dataOffset = _useState2[0],
      setDataOffset = _useState2[1];

  var selectionProp = (_props$selection = props.selection) != null ? _props$selection : NO_SELECTION;

  var _useState3 = React.useState(selectionProp),
      selection = _useState3[0],
      setSelection = _useState3[1];

  var _useState4 = React.useState(null),
      knobArea = _useState4[0],
      setKnobArea = _useState4[1];

  var _useState5 = React.useState(null),
      dragOffset = _useState5[0],
      setDragOffset = _useState5[1];

  var _useState6 = React.useState(null),
      dropTarget = _useState6[0],
      setDropTarget = _useState6[1];

  var _useState7 = React.useState(NO_CELL),
      editCell = _useState7[0],
      setEditCell = _useState7[1];

  var _useState8 = React.useState(selectionProp),
      lastSelectionProp = _useState8[0],
      setLastSelectionProp = _useState8[1];

  if (lastSelectionProp !== selectionProp) {
    setLastSelectionProp(selectionProp);
    setSelection(selectionProp);
  }

  var _useState9 = React.useState(''),
      editValue = _useState9[0],
      setEditValue = _useState9[1];

  var _useState10 = React.useState(false),
      arrowKeyCommitMode = _useState10[0],
      setArrowKeyCommitMode = _useState10[1];

  var _useResizeObserver = useResizeObserver({
    ref: canvasRef
  }),
      _useResizeObserver$wi = _useResizeObserver.width,
      canvasWidth = _useResizeObserver$wi === void 0 ? 3000 : _useResizeObserver$wi,
      _useResizeObserver$he = _useResizeObserver.height,
      canvasHeight = _useResizeObserver$he === void 0 ? 3000 : _useResizeObserver$he;

  var cellWidth = React.useMemo(function () {
    return createRowOrColumnProp(props.cellWidth, 100);
  }, [props.cellWidth]);
  var cellHeight = React.useMemo(function () {
    return createRowOrColumnProp(props.cellHeight, 22);
  }, [props.cellHeight]);
  var columnHeaders = React.useMemo(function () {
    return createRowOrColumnProp(props.columnHeaders, null);
  }, [props.columnHeaders]);
  var columnHeaderStyle = React.useMemo(function () {
    return createRowOrColumnProp(props.columnHeaderStyle, {});
  }, [props.columnHeaderStyle]);
  var canSizeColumn = React.useMemo(function () {
    return createRowOrColumnProp(props.canSizeColumn, true);
  }, [props.canSizeColumn]);
  var canSizeRow = React.useMemo(function () {
    return createRowOrColumnProp(props.canSizeRow, true);
  }, [props.canSizeRow]);
  var canOrderColumn = React.useMemo(function () {
    return createRowOrColumnProp(props.canOrderColumn, true);
  }, [props.canOrderColumn]);
  var canOrderRow = React.useMemo(function () {
    return createRowOrColumnProp(props.canOrderRow, true);
  }, [props.canOrderRow]);
  var cellReadOnly = React.useMemo(function () {
    return createCellProp(props.readOnly, false);
  }, [props.readOnly]);
  var sourceData = React.useMemo(function () {
    return createCellProp(props.sourceData, null);
  }, [props.sourceData]);
  var displayData = React.useMemo(function () {
    return createCellProp(props.displayData, '');
  }, [props.displayData]);
  var editData = React.useMemo(function () {
    return createCellProp(props.editData, '');
  }, [props.editData]);
  var editKeys = React.useMemo(function () {
    return createCellProp(props.editKeys, '');
  }, [props.editKeys]);
  var cellStyle = React.useMemo(function () {
    return createCellProp(props.cellStyle, DEFAULT_CELL_STYLE);
  }, [props.cellStyle]);
  var sheetStyle = React.useMemo(function () {
    return resolveSheetStyle(props.sheetStyle);
  }, [props.sheetStyle]);
  var secondarySelections = (_props$secondarySelec = props.secondarySelections) != null ? _props$secondarySelec : NO_SELECTIONS;
  var maxScrollX = maxScroll[0],
      maxScrollY = maxScroll[1];
  var editCellX = editCell[0],
      editCellY = editCell[1];
  var editMode = editCellX !== -1 && editCellY !== -1;
  var columnLayout = React.useMemo(function () {
    return makeLayoutCache(cellWidth);
  }, [props.cacheLayout ? null : cellWidth]);
  var rowLayout = React.useMemo(function () {
    return makeLayoutCache(cellHeight);
  }, [props.cacheLayout ? null : cellHeight]);
  React.useMemo(function () {
    if (!props.cacheLayout) return;
    columnLayout.setSizer(cellWidth);
    rowLayout.setSizer(cellHeight);
  }, [props.cacheLayout, cellWidth, cellHeight]);
  var freezeColumns = sheetStyle.freezeColumns,
      freezeRows = sheetStyle.freezeRows,
      rowHeaderWidth = sheetStyle.rowHeaderWidth,
      columnHeaderHeight = sheetStyle.columnHeaderHeight;
  var cellLayout = React.useMemo(function () {
    return makeCellLayout([freezeColumns, freezeRows], [rowHeaderWidth, columnHeaderHeight], dataOffset, columnLayout, rowLayout);
  }, [freezeColumns, freezeRows, rowHeaderWidth, columnHeaderHeight, dataOffset, columnLayout, rowLayout]);
  var getVisibleCells = cellLayout.getVisibleCells,
      cellToPixel = cellLayout.cellToPixel,
      getVersion = cellLayout.getVersion;
  var visibleCells = React.useMemo(function () {
    return getVisibleCells([canvasWidth, canvasHeight]);
  }, [getVisibleCells, canvasWidth, canvasHeight, getVersion()]);
  React.useLayoutEffect(function () {
    if (props.onScrollChange) {
      props.onScrollChange([].concat(visibleCells.rows), [].concat(visibleCells.columns));
    }
  }, [visibleCells, props.onScrollChange]);

  var changeSelection = function changeSelection(newSelection, scrollTo, toHead) {
    if (scrollTo === void 0) {
      scrollTo = true;
    }

    if (toHead === void 0) {
      toHead = false;
    }

    if (!isSameSelection(selection, newSelection)) {
      setSelection(newSelection);
    }

    var overlay = overlayRef.current;
    if (!overlay) return;

    if (scrollTo) {
      var anchor = newSelection[0],
          head = newSelection[1];
      scrollToCell(overlay, toHead ? head : anchor, [canvasWidth, canvasHeight], [freezeColumns, freezeRows], dataOffset, maxScroll, cellLayout, function (dataOffset, maxScroll) {
        setDataOffset(dataOffset);
        setMaxScroll(maxScroll);
      });
    }

    if (props.onSelectionChanged) {
      var _normalizeSelection = normalizeSelection(newSelection),
          _normalizeSelection$ = _normalizeSelection[0],
          minX = _normalizeSelection$[0],
          minY = _normalizeSelection$[1],
          _normalizeSelection$2 = _normalizeSelection[1],
          maxX = _normalizeSelection$2[0],
          maxY = _normalizeSelection$2[1];

      props.onSelectionChanged(minX, minY, maxX, maxY);
    }
  };

  var commitEditingCell = function commitEditingCell(value) {
    if (props.onChange) {
      var cellX = editCell[0],
          cellY = editCell[1];
      props.onChange([{
        x: cellX,
        y: cellY,
        value: value !== undefined ? value : editValue
      }]);
    }

    setEditCell(NO_CELL);
  };

  var startEditingCell = function startEditingCell(editCell, arrowKeyCommitMode) {
    if (arrowKeyCommitMode === void 0) {
      arrowKeyCommitMode = false;
    }

    var cellX = editCell[0],
        cellY = editCell[1];

    if (cellReadOnly(cellX, cellY)) {
      return;
    }

    var editDataValue = editData(cellX, cellY);
    var val = '';

    if (editDataValue !== null && editDataValue !== undefined) {
      val = editDataValue;
    }

    setEditCell(editCell);
    setEditValue(val);
    setArrowKeyCommitMode(arrowKeyCommitMode);
    setLastEditKey(editKeys.apply(void 0, editCell));
  };

  var hitmapRef = React.useRef(NO_CLICKABLES);
  var textAreaRef = React.useRef(null);
  useClipboardCopy(textAreaRef, selection, editMode, editData);
  useClipboardPaste(textAreaRef, selection, changeSelection, props.onChange);
  var onScroll = useScroll(dataOffset, maxScroll, cellLayout, setDataOffset, setMaxScroll);

  var _useMouse = useMouse(hitmapRef, selection, knobArea, editMode, editData, sourceData, canSizeColumn, canSizeRow, canOrderColumn, canOrderRow, cellLayout, visibleCells, sheetStyle, startEditingCell, commitEditingCell, setKnobArea, setDragOffset, setDropTarget, changeSelection, props.cacheLayout ? columnLayout.clearAfter : undefined, props.cacheLayout ? rowLayout.clearAfter : undefined, props.onChange, props.onColumnOrderChange, props.onRowOrderChange, props.onCellWidthChange, props.onCellHeightChange, props.onRightClick, props.dontCommitEditOnSelectionChange),
      mouseHandlers = _useMouse.mouseHandlers,
      knobPosition = _useMouse.knobPosition;

  React.useLayoutEffect(function () {
    var canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    var context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    var animationFrameId = window.requestAnimationFrame(function () {
      hitmapRef.current = renderSheet(context, cellLayout, visibleCells, sheetStyle, cellStyle, selection, secondarySelections, knobPosition, knobArea, dragOffset, dropTarget, columnHeaders, columnHeaderStyle, displayData, dataOffset);
    });
    return function () {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [cellLayout, visibleCells, sheetStyle, cellStyle, selection, secondarySelections, knobPosition, knobArea, dragOffset, dropTarget, columnHeaders, columnHeaderStyle, displayData, dataOffset]);

  var onKeyDown = function onKeyDown(e) {
    if (e.key === 'Escape') {
      setEditCell(NO_CELL);
      return;
    }

    var direction = e.key === 'Enter' ? 'down' : e.key === 'Tab' ? 'right' : arrowKeyCommitMode ? ARROW_KEYS[e.key] : null;

    if (direction) {
      e.preventDefault();
      var step = getDirectionStep(direction);
      var head = maxXY(addXY(editCell, step), ORIGIN);
      commitEditingCell();
      changeSelection([head, head]);
    }
  };

  var onGridKeyDown = function onGridKeyDown(e) {
    if (editMode && arrowKeyCommitMode && e.key in ARROW_KEYS) {
      commitEditingCell();
      return;
    }

    if ((e.metaKey || e.ctrlKey) && String.fromCharCode(e.which).toLowerCase() === 'v') {
      return;
    }

    if ((e.metaKey || e.ctrlKey) && String.fromCharCode(e.which).toLowerCase() === 'c') {
      var textArea = textAreaRef.current;
      textArea === null || textArea === void 0 ? void 0 : textArea.select();
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      var _normalizeSelection2 = normalizeSelection(selection),
          _normalizeSelection2$ = _normalizeSelection2[0],
          x1 = _normalizeSelection2$[0],
          y1 = _normalizeSelection2$[1],
          _normalizeSelection2$2 = _normalizeSelection2[1],
          x2 = _normalizeSelection2$2[0],
          y2 = _normalizeSelection2$2[1];

      if (isRowSelection(selection)) {
        x1 = 0;
        x2 = MAX_SEARCHABLE_INDEX;
      }

      if (isColumnSelection(selection)) {
        // alert('column delete not allowed!')
        y1 = 0;
        y2 = MAX_SEARCHABLE_INDEX;
      }

      var changes = [];

      for (var y = y1; y <= y2; y++) {
        for (var x = x1; x <= x2; x++) {
          changes.push({
            x: x,
            y: y,
            value: null
          });
        }
      }

      if (props.onChange) {
        props.onChange(changes);
      }

      return;
    }

    if (isEmptySelection(selection)) {
      return;
    }

    if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90 || e.key === 'Enter' || e.key === '-' || e.key === '.' || e.key === ',') {
      var cell = selection[0];
      var cellX = cell[0],
          cellY = cell[1];

      if (cellReadOnly(cellX, cellY)) {
        e.preventDefault();
        return;
      }

      startEditingCell(cell, e.key !== 'Enter');
      return;
    }

    if (e.key in ARROW_KEYS) {
      var anchor = selection[0],
          head = selection[1];
      var direction = ARROW_KEYS[e.key];
      var step = getDirectionStep(direction);

      if (e.metaKey || e.ctrlKey) {
        head = findInDisplayData(displayData, head, direction);
      } else {
        head = maxXY(addXY(head, step), ORIGIN);
      }

      if (!e.shiftKey) {
        anchor = head;
      }

      changeSelection([anchor, head], true, true);
      return;
    }

    e.preventDefault();
  };

  var _useState11 = React.useState(''),
      lastEditKey = _useState11[0],
      setLastEditKey = _useState11[1];

  var editTextPosition = ORIGIN;
  var editTextWidth = 0;
  var editTextHeight = 0;
  var editTextTextAlign = 'right';

  if (editMode) {
    var style = cellStyle.apply(void 0, editCell);
    editTextPosition = cellToPixel(editCell);
    editTextPosition = addXY(editTextPosition, ONE_ONE);
    editTextWidth = cellWidth(editCellX) - 3;
    editTextHeight = cellHeight(editCellY) - 3;
    editTextTextAlign = style.textAlign || DEFAULT_CELL_STYLE.textAlign || 'left';
    var editKey = editKeys.apply(void 0, editCell);

    if (editKey !== lastEditKey) {
      setLastEditKey('');
      setEditCell(NO_CELL);
    }
  }

  var _editTextPosition = editTextPosition,
      textX = _editTextPosition[0],
      textY = _editTextPosition[1];
  var inputProps = {
    value: editValue,
    autoFocus: true,
    onKeyDown: onKeyDown,
    style: {
      position: 'absolute',
      left: textX,
      top: textY,
      padding: '0px 4px',
      width: editTextWidth,
      height: editTextHeight,
      outline: 'none',
      border: 'none',
      textAlign: editTextTextAlign,
      color: 'black',
      fontSize: DEFAULT_CELL_STYLE.fontSize,
      fontFamily: 'sans-serif'
    }
  };
  var input = (_props$inputComponent = props.inputComponent) === null || _props$inputComponent === void 0 ? void 0 : _props$inputComponent.call(props, editCellX, editCellY, _extends({}, inputProps, {
    onChange: setEditValue
  }), commitEditingCell);
  var overlayDivClassName = styles.sheetscroll;
  var overlayDivStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'scroll',
    borderBottom: '1px solid #ddd'
  };
  var canvasStyles = {
    width: 'calc(100% - 14px)',
    height: 'calc(100% - 15px)',
    outline: '1px solid #ddd'
  };

  if (sheetStyle.hideScrollBars) {
    delete canvasStyles['outline'];
    delete overlayDivStyles['borderBottom'];
    overlayDivClassName = '';
    canvasStyles.width = 'calc(100%)';
  }

  var renderedInside = React.useMemo(function () {
    var _props$renderInside;

    return (_props$renderInside = props.renderInside) === null || _props$renderInside === void 0 ? void 0 : _props$renderInside.call(props, {
      visibleCells: visibleCells,
      cellLayout: cellLayout,
      selection: selection,
      editMode: editMode
    });
  }, [props.renderInside, visibleCells, cellLayout, selection, editMode]);
  var renderedOutside = React.useMemo(function () {
    var _props$renderOutside;

    return (_props$renderOutside = props.renderOutside) === null || _props$renderOutside === void 0 ? void 0 : _props$renderOutside.call(props, {
      visibleCells: visibleCells,
      cellLayout: cellLayout,
      selection: selection,
      editMode: editMode
    });
  }, [props.renderOutside, visibleCells, cellLayout, selection, editMode]);
  React.useImperativeHandle(ref, function () {
    return _extends({}, cellLayout, {
      startEditingCell: startEditingCell
    });
  }, [cellLayout, startEditingCell]);
  return React__default.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden'
    }
  }, React__default.createElement("canvas", {
    style: canvasStyles,
    ref: canvasRef
  }), React__default.createElement("div", Object.assign({
    ref: overlayRef
  }, mouseHandlers, {
    onScroll: onScroll,
    className: overlayDivClassName,
    style: overlayDivStyles
  }), React__default.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1,
      height: maxScrollY + 2000,
      backgroundColor: 'rgba(0,0,0,0.0)'
    }
  }), React__default.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: maxScrollX + 5000,
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.0)'
    }
  }), renderedInside ? React__default.createElement("div", {
    style: {
      position: 'sticky',
      left: 0,
      top: 0
    }
  }, renderedInside) : null), renderedOutside ? React__default.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }
  }, renderedOutside) : null, React__default.createElement("textarea", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 1,
      height: 1,
      opacity: 0.01
    },
    ref: textAreaRef,
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false",
    onFocus: function onFocus(e) {
      return e.target.select();
    },
    tabIndex: 0,
    onKeyDown: onGridKeyDown
  }), editMode && (input !== undefined ? input : React__default.createElement("input", Object.assign({}, inputProps, {
    type: "text",
    onFocus: function onFocus(e) {
      return e.target.select();
    },
    onChange: function onChange(e) {
      return setEditValue(e.target.value);
    }
  }))));
});

module.exports = Sheet;
//# sourceMappingURL=index.js.map
