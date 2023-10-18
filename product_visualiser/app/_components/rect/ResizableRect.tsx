import { Color, RGBColor } from "react-color";
import { centerToTL, degToRadian, getNewStyle, tLToCenter } from "../utils/ResizeRotate-utils";
import Rect from "./Rect";

interface ResizableRectProps {
  top: number;
  left: number;
  width: number;
  height: number;
  rotateAngle: number;
  parentRotateAngle: number;
  zoomable: string;
  rotatable: boolean;
  aspectRatio: number;
  onRotate: (rotateAngle: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
  onRotateStart?: () => void;
  onRotateEnd?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrag?: (deltaX: number, deltaY: number) => void;
  onResize: (centerToTL: any,
    isShiftKey: any,
    type: any) => void;
  displayFontSize?: (ele: HTMLElement) => void,
  editing: boolean;
  text?: string;
  textColor?: RGBColor;
  textAlign?: string;
  // textSize?: number;
  font?: string;
  imageSrc?: string;
  minWidth: number;
  minHeight: number;
}

const ResizableRect: React.FunctionComponent<ResizableRectProps> = (props: ResizableRectProps) => {
  const {
    top,
    left,
    width,
    height,
    rotateAngle,
    parentRotateAngle,
    zoomable,
    rotatable,
    aspectRatio,
    text = '',
    textColor,
    textAlign = 'flex-start',
    // textSize,
    font,
    imageSrc = '',
    minWidth, minHeight,
    onRotate,
    onResizeStart,
    onResizeEnd,
    onResize,
    onRotateStart,
    onRotateEnd,
    onDragStart,
    onDragEnd,
    onDrag,
    displayFontSize,
    editing,
  } = props;

  const styles = tLToCenter({ top, left, width, height, rotateAngle });

  const handleRotate = (angle: number, startAngle: number) => {
    if (!onRotate) return;
    let rotateAngle = Math.round(startAngle + angle);
    if (rotateAngle >= 360) {
      rotateAngle -= 360;
    } else if (rotateAngle < 0) {
      rotateAngle += 360;
    }
    if (rotateAngle > 356 || rotateAngle < 4) {
      rotateAngle = 0;
    } else if (rotateAngle > 86 && rotateAngle < 94) {
      rotateAngle = 90;
    } else if (rotateAngle > 176 && rotateAngle < 184) {
      rotateAngle = 180;
    } else if (rotateAngle > 266 && rotateAngle < 274) {
      rotateAngle = 270;
    }
    onRotate(rotateAngle);
  };

  const handleResize = (deltaL: number, alpha: number, rect: {
    width: number, height: number, centerX: number, centerY: number, rotateAngle: number
  }, type: any, isShiftKey: any) => {
    if (!onResize) return;

    const beta = alpha - degToRadian(rotateAngle + parentRotateAngle);
    const deltaW = deltaL * Math.cos(beta);
    const deltaH = deltaL * Math.sin(beta);
    const ratio =
      isShiftKey && !aspectRatio ? rect.width / rect.height : aspectRatio;
    const {
      position: { centerX, centerY },
      size: { width, height },
    } = getNewStyle(
      type,
      { ...rect, rotateAngle },
      deltaW,
      deltaH,
      ratio,
      minWidth,
      minHeight
    );

    onResize(
      centerToTL({ centerX, centerY, width, height, rotateAngle }),
      isShiftKey,
      type
    );
  };

  const handleDrag = (deltaX: number, deltaY: number) => {
    onDrag && onDrag(deltaX, deltaY);
  };

  const onGetFontSize = (ele: HTMLElement) => {
    displayFontSize && displayFontSize(ele)
  }

  return (
    <Rect
      styles={styles}
      zoomable={zoomable}
      rotatable={Boolean(rotatable && onRotate)}
      parentRotateAngle={parentRotateAngle}
      onResizeStart={onResizeStart}
      onResize={handleResize}
      onResizeEnd={onResizeEnd}
      onRotateStart={onRotateStart}
      onRotate={handleRotate}
      onRotateEnd={onRotateEnd}
      onDragStart={onDragStart}
      onDrag={handleDrag}
      onDragEnd={onDragEnd}
      getFontSize={displayFontSize && onGetFontSize}
      text={text}
      textColor={textColor}
      textAlign={textAlign}
      // textSize={textSize}
      font={font}
      imageSrc={imageSrc}
      editing={editing}
    />
  );
}
// ResizableRect.defaultProps = {
//   minHeight: -Infinity,
//   minWidth: -Infinity
// }

export default ResizableRect;