import { useEffect, useRef, useState } from "react";
import StyledRect from "./StyledRect";
import { getAngle, getCursor, getLength } from "../utils/ResizeRotate-utils";
import Image from "next/image";
import { RGBColor } from "react-color";
interface RectProps {
  styles: {
    position: { centerX: number; centerY: number };
    size: { width: number; height: number };
    transform: { rotateAngle: number };
  };
  zoomable: string;
  rotatable: boolean;
  onResizeStart?: () => void;
  onResize: (
    deltaL: number,
    alpha: number,
    rect: {
      width: number;
      height: number;
      centerX: number;
      centerY: number;
      rotateAngle: number;
    },
    type: any,
    isShiftKey: any
  ) => void;
  onResizeEnd?: () => void;
  onRotateStart?: () => void;
  onRotate: (angle: number, rotateAngle: number) => void;
  onRotateEnd?: () => void;
  onDragStart?: () => void;
  onDrag: (deltaX: number, deltaY: number) => void;
  onDragEnd?: () => void;
  getFontSize?: (ele: HTMLElement) => void;
  parentRotateAngle: number;
  text: string;
  textColor: RGBColor | undefined;
  textAlign: string;
  // textSize: number | undefined;
  font: string | undefined;
  imageSrc: string;
  editing: boolean | undefined;
}

const zoomableMap = {
  n: "t",
  s: "b",
  e: "r",
  w: "l",
  ne: "tr",
  nw: "tl",
  se: "br",
  sw: "bl",
};

const Rect = (props: RectProps) => {
  const {
    onDragStart,
    onDrag,
    onDragEnd,
    onRotateStart,
    onRotate,
    onRotateEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
    getFontSize,
    rotatable,
    editing,
    zoomable,
    parentRotateAngle,
    text,
    textColor,
    textAlign,
    // textSize,
    font,
    imageSrc,
    styles: {
      transform: { rotateAngle },
      position: { centerX, centerY },
      size: { width, height },
    },
  } = props;
  const style = {
    width: Math.abs(width),
    height: Math.abs(height),
    transform: `rotate(${rotateAngle}deg)`,
    left: centerX - Math.abs(width) / 2,
    top: centerY - Math.abs(height) / 2,
    border: editing ? "1px solid #eb5648" : "",
  };
  const direction = zoomable
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d); // TODO: may be speed up
  const RectRef = useRef<HTMLDivElement>(null);
  const TextRef = useRef<HTMLDivElement>(null);
  //const [isMouseDown, setIsMouseDown] = useState(false);
  
  useEffect(() => {
    if (RectRef && getFontSize) {
      const { current } = RectRef;
      const lastEle = current?.lastChild as HTMLElement;
      if (lastEle?.className === 'text') {
        getFontSize && getFontSize(lastEle)
      }
    }
  }, [RectRef, getFontSize])

  useEffect(() => {
    if (TextRef.current) {
      autoSizeText(TextRef.current);
    }
  });

  const autoSizeText = (text: HTMLDivElement) => {
    const currentSize = Number(text.style.fontSize.slice(0, -2));
    const scrollHeight = text.scrollHeight;
    const offsetHeight = text.offsetHeight;
    const scrollWidth = text.scrollWidth;
    const offsetWidth = text.offsetWidth;
    if (scrollWidth < offsetWidth) {
      text.style.fontSize = `${currentSize + 1}px`;
      autoSizeText(text);
    }
    if (scrollHeight > offsetHeight) {
      text.style.fontSize = `${currentSize - 1}px`;
      autoSizeText(text);
    }
  };

  // Drag
  const onMouseDown = (e: any) => {
    
    if (!editing) return;
    let dragging = false;
    let { clientX: startX, clientY: startY } = e;
    
    onDragStart && onDragStart();
    let isMouseDown = true;
    
    const onMouseMove = (e: any) => {
      
      if(!dragging && isMouseDown) {
        dragging = true
      }

      if(dragging && !isMouseDown) {
        dragging = false
      }

      if(dragging) {
        const { clientX, clientY } = e;
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        onDrag(deltaX, deltaY);
      }

      e.stopPropagation()
      e.preventDefault()

    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      isMouseDown = false;
      dragging = false;
      onDragEnd && onDragEnd();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Rotate
  const startRotate = (e: any) => {
    if (e.button !== 0) return;
    const { clientX, clientY } = e;

    const rect = RectRef?.current?.getBoundingClientRect() as DOMRect;
    const { width = 0, left = 0, top = 0, height = 0 } = rect;
    const center = {
      x: left + width / 2,
      y: top + height / 2,
    };
    const startVector = {
      x: clientX - center.x,
      y: clientY - center.y,
    };
    onRotateStart && onRotateStart();
    let isMouseDown = true;

    const onMoveRotate = (e: any) => {
      if (!isMouseDown) return; // patch: fix windows press win key during mouseup issue
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const rotateVector = {
        x: clientX - center.x,
        y: clientY - center.y,
      };
      const angle = getAngle(startVector, rotateVector);
      onRotate(angle, rotateAngle);
    };

    const onUpRotate = () => {
      document.removeEventListener("mousemove", onMoveRotate);
      document.removeEventListener("mouseup", onUpRotate);
      if (!isMouseDown) return;
      isMouseDown = false;
      onRotateEnd && onRotateEnd();
    };

    document.addEventListener("mousemove", onMoveRotate);
    document.addEventListener("mouseup", onUpRotate);
  };

  // Resize
  const startResize = (e: any, cursor: any) => {
    if (e.button !== 0) return;
    document.body.style.cursor = cursor;

    const { clientX: startX, clientY: startY } = e;
    const rect = { width, height, centerX, centerY, rotateAngle };
    const type = e.target.getAttribute("class").split(" ")[0];
    onResizeStart && onResizeStart();
    let isMouseDown = true;

    const onMoveResize = (e: any) => {
      if (!isMouseDown) return; // patch: fix windows press win key during mouseup issue
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const alpha = Math.atan2(deltaY, deltaX);
      const deltaL = getLength(deltaX, deltaY);
      const isShiftKey = e.shiftKey;
      onResize(deltaL, alpha, rect, type, isShiftKey);
    };

    const onUpResize = () => {
      const { current } = RectRef;
      const lastEle = current?.lastChild as HTMLElement;
      if (lastEle?.className === 'text') {
        getFontSize && getFontSize(lastEle)
      }
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", onMoveResize);
      document.removeEventListener("mouseup", onUpResize);
      if (!isMouseDown) return;
      isMouseDown = false;
      onResizeEnd && onResizeEnd();
    };

    document.addEventListener("mousemove", onMoveResize);
    document.addEventListener("mouseup", onUpResize);
  };

  const loaderProp = (load: { src: string }) => {
    const { src } = load;
    return src;
  };

  return (
    <StyledRect
      ref={RectRef}
      onMouseDown={onMouseDown}
      className="rect single-resizer"
      style={style}
    >
      {rotatable && editing && (
        <div className="rotate" onMouseDown={startRotate}>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z"
              fill="#eb5648"
              fillRule="nonzero"
            />
          </svg>
        </div>
      )}
      {editing &&
        direction.map((d) => {
          const cursor = `${getCursor(
            rotateAngle + parentRotateAngle,
            d
          )}-resize`;
          return (
            <div
              key={d}
              style={{ cursor }}
              className={`${zoomableMap[d as keyof typeof zoomableMap]
                } resizable-handler`}
              onMouseDown={(e) => startResize(e, cursor)}
            />
          );
        })}
      {editing &&
        direction.map((d) => {
          return (
            <div
              key={d}
              className={`${zoomableMap[d as keyof typeof zoomableMap]} square`}
            />
          );
        })}
      {text && ( //todo
        <div
          ref={TextRef}
          style={{
            fontFamily: font,
            fontSize: Math.min(width / text?.length, width) + (width / text?.length) + 5,
            color: textColor ? `rgba(${ textColor.r }, ${ textColor.g }, ${ textColor.b }, ${ textColor.a })` : '',
            justifyContent: textAlign,
            userSelect: 'none',
            pointerEvents: 'none'
          }}
          className="text"
        >
          {text}
        </div>
      )}
      {imageSrc && (
        <Image
          className="img-content"
          alt=""
          src={imageSrc}
          width={100}
          height={100}
          style={{
            width: "100%",
            height: "100%",
            userSelect: 'none'
          }}
          loader={loaderProp}
          unoptimized
        />
      )}
    </StyledRect>
  );
};

export default Rect;
