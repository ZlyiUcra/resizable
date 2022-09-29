import React from "react";
import "./styles.css"

export default class Resizable extends React.Component<{}, {}> {
  private readonly ref1: React.RefObject<HTMLDivElement>;
  private readonly ref2: React.RefObject<HTMLDivElement>;
  private readonly refLeft: React.RefObject<HTMLDivElement>;
  private readonly refTop: React.RefObject<HTMLDivElement>;
  private readonly refRight: React.RefObject<HTMLDivElement>;
  private readonly refBottom: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.refLeft = React.createRef();
    this.refTop = React.createRef();
    this.refRight = React.createRef();
    this.refBottom = React.createRef();
  }

  componentDidMount() {
    const resizeableEle1 = this.ref1.current;
    const resizeableEle2 = this.ref2.current;
    if (resizeableEle1 && resizeableEle2) {
      const styles1 = window.getComputedStyle(resizeableEle1);
      let width1 = parseInt(styles1.width, 10);
      let height1 = parseInt(styles1.height, 10);
      let x1 = 0;
      //let y1 = 0;

      const styles2 = window.getComputedStyle(resizeableEle2);
      let width2 = parseInt(styles2.width, 10);
      let height2 = parseInt(styles2.height, 10);
      let x2 = 0;
      // let y2 = 0;
      //console.log(width1, height1, width2, height2);

      const onMouseMoveRightResize = (event: MouseEvent) => {
        const dx1 = event.clientX - x1;
        x1 = event.clientX;
        width1 = width1 + dx1;
        if(width1 < 378 && width1 > 22) {
          resizeableEle1.style.width = `${width1}px`;
          resizeableEle2.style.width = `${400 -2 - width1}px`;
        }

        console.log(dx1, x1, width1);
      };
      const onMouseUpRightResize = (event: MouseEvent) => {
       document.removeEventListener("mousemove", onMouseMoveRightResize);
      };

      const onMouseDownRightResize = (event: MouseEvent) => {
        x1 = event.clientX;

          resizeableEle1.style.left = styles1.left;
          resizeableEle1.style.right = "0px";
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };
      // Add mouse down event listener
      const resizerRight = this.refRight.current;
      if (resizerRight)
        resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    }
  }


  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div className="base">
            <div ref={this.ref1} className="resizeable_1">
              <div ref={this.refLeft} className="resizer resizer-l"></div>
              <div ref={this.refTop} className="resizer resizer-t"></div>
              <div ref={this.refRight} className="resizer resizer-r"></div>
              <div ref={this.refBottom} className="resizer resizer-b"></div>
            </div>
            <div ref={this.ref2} className="resizeable_2"></div>
          </div>

        </div>
      </div>
    );
  }


}