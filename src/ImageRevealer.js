import React, { useEffect, useRef } from "react";
import "./ImageReveal.css"

const ImageRevealer = ({ ...rest }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const base = new Image();
    base.src = "https://didyouknowfacts.com/wp-content/uploads/2021/03/Screen-Shot-2021-03-01-at-11.20.29-AM.png"
    base.onload = drawBase;

    function drawBase() {
      ctx.drawImage(base, 0, 0)
    }

    const overlay = new Image();
    const radius = 150;

    overlay.onload = setupRevealer;
    overlay.src = "https://didyouknowfacts.com/wp-content/uploads/2021/03/Screen-Shot-2021-03-01-at-11.20.36-AM.png";

    function setupRevealer() {

      // set image as pattern for fillStyle
      ctx.fillStyle = ctx.createPattern(this, "no-repeat");

      canvas.onmousemove = function (e) {
        setTimeout(() => {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          drawBase();
          var r = this.getBoundingClientRect(),
            x = (e.clientX - r.left) * 593 / (0.6 * window.innerWidth),
            y = (e.clientY - r.top) * 593 / (0.6 * window.innerWidth);

          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }, 50)
      };

      canvas.onmouseleave = function () {
        setTimeout(() => {
          drawBase()
        }, 50)
      };
    }
  }, [])

  return (
    <canvas className="revealer" ref={canvasRef} width={593} height={387} {...rest} />
  )
}

export default ImageRevealer;