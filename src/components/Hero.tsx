import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import paper from "paper";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    if (!canvas || !textEl) return;

    paper.setup(canvas);

    const computedStyle = getComputedStyle(document.documentElement);
    const primaryHSL = computedStyle.getPropertyValue("--primary").trim();
    // Parse "H S% L%" into components and build an rgba Paper.js color
    const [h, s, l] = primaryHSL.split(" ").map(parseFloat);
    const paperColor = new paper.Color({ hue: h, saturation: s * 0.4 / 100, lightness: 0.85 });
    paperColor.alpha = 1;

    // -- Ported from original Metaball script by SATO Hiroyuki --
    const handle_len_rate = 2.4;
    const circlePaths: paper.Path.Circle[] = [];

    const vw = paper.view.size.width;
    const vh = paper.view.size.height;

    // Measure the text area to create an exclusion zone
    const textRect = textEl.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const exclusion = {
      left: textRect.left - canvasRect.left - 40,
      top: textRect.top - canvasRect.top - 30,
      right: textRect.right - canvasRect.left + 40,
      bottom: textRect.bottom - canvasRect.top + 30,
    };

    // Scatter static circles avoiding the text zone
    const gridRadius = 40;
    const minDist = 200;
    const count = 18;
    const padding = 40;
    const maxAttempts = 1500;

    const placed: { x: number; y: number }[] = [];
    let attempts = 0;
    while (placed.length < count && attempts < maxAttempts) {
      const seed = attempts * 137 + 53;
      const cx =
        padding +
        (((Math.sin(seed) * 10000) % 1 + 1) % 1) * (vw - padding * 2);
      const cy =
        padding +
        (((Math.cos(seed * 3) * 10000) % 1 + 1) % 1) * (vh - padding * 2);
      attempts++;

      // Skip some circles in the top half to keep it sparser
      if (cy < vh * 0.45) {
        const skipSeed = ((Math.sin(seed * 7) * 10000) % 1 + 1) % 1;
        if (skipSeed < 0.45) continue;
      }

      // Reject if inside the text exclusion zone
      if (
        cx > exclusion.left &&
        cx < exclusion.right &&
        cy > exclusion.top &&
        cy < exclusion.bottom
      ) {
        continue;
      }

      // Reject if too close to any already-placed circle
      let tooClose = false;
      for (const p of placed) {
        const dx = cx - p.x;
        const dy = cy - p.y;
        if (Math.sqrt(dx * dx + dy * dy) < minDist) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;

      placed.push({ x: cx, y: cy });
      const circlePath = new paper.Path.Circle({
        center: new paper.Point(cx, cy),
        radius: gridRadius,
      });
      circlePath.fillColor = paperColor.clone();
      circlePaths.push(circlePath);
    }

    // Cursor circle — follows the mouse
    const cursorCircle = new paper.Path.Circle({
      center: new paper.Point(-999, -999),
      radius: 80,
    });
    cursorCircle.fillColor = paperColor.clone();

    const connections = new paper.Group();

    function generateConnections() {
      connections.removeChildren();

      // Sort grid circles by distance to cursor, pick the 4 closest
      const sorted = circlePaths
        .map((c, i) => ({
          idx: i,
          dist: cursorCircle.position.getDistance(c.position),
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 4);

      for (const { idx } of sorted) {
        const path = metaball(
          cursorCircle,
          circlePaths[idx],
          0.5,
          handle_len_rate,
          300
        );
        if (path) {
          connections.addChild(path);
        }
      }
    }

    function metaball(
      ball1: paper.Path.Circle,
      ball2: paper.Path.Circle,
      v: number,
      handle_len_rate: number,
      maxDistance: number
    ): paper.Path | null {
      const center1 = ball1.position;
      const center2 = ball2.position;
      const radius1 = ball1.bounds.width / 2;
      const radius2 = ball2.bounds.width / 2;
      const pi2 = Math.PI / 2;
      const d = center1.getDistance(center2);

      if (radius1 === 0 || radius2 === 0) return null;
      if (d > maxDistance || d <= Math.abs(radius1 - radius2)) return null;

      let u1: number, u2: number;

      if (d < radius1 + radius2) {
        u1 = Math.acos(
          (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)
        );
        u2 = Math.acos(
          (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)
        );
      } else {
        u1 = 0;
        u2 = 0;
      }

      const diff = center2.subtract(center1);
      const angle1 = Math.atan2(diff.y, diff.x);
      const angle2 = Math.acos((radius1 - radius2) / d);
      const angle1a = angle1 + u1 + (angle2 - u1) * v;
      const angle1b = angle1 - u1 - (angle2 - u1) * v;
      const angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v;
      const angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v;

      const p1a = center1.add(getVector(angle1a, radius1));
      const p1b = center1.add(getVector(angle1b, radius1));
      const p2a = center2.add(getVector(angle2a, radius2));
      const p2b = center2.add(getVector(angle2b, radius2));

      const totalRadius = radius1 + radius2;
      const d2 =
        Math.min(v * handle_len_rate, p1a.getDistance(p2a) / totalRadius) *
        Math.min(1, (d * 2) / totalRadius);

      const r1 = radius1 * d2;
      const r2 = radius2 * d2;

      const path = new paper.Path({
        segments: [p1a, p2a, p2b, p1b],
        closed: true,
      });
      path.fillColor = paperColor.clone();

      path.segments[0].handleOut = getVector(angle1a - pi2, r1);
      path.segments[1].handleIn = getVector(angle2a + pi2, r2);
      path.segments[2].handleOut = getVector(angle2b - pi2, r2);
      path.segments[3].handleIn = getVector(angle1b + pi2, r1);

      return path;
    }

    function getVector(radians: number, length: number): paper.Point {
      return new paper.Point({
        angle: (radians * 180) / Math.PI,
        length: length,
      });
    }

    // Smooth cursor tracking
    const targetPos = { x: -999, y: -999 };

    const tool = new paper.Tool();
    tool.onMouseMove = (event: paper.ToolEvent) => {
      targetPos.x = event.point.x;
      targetPos.y = event.point.y;
    };

    paper.view.onFrame = () => {
      cursorCircle.position.x +=
        (targetPos.x - cursorCircle.position.x) * 0.15;
      cursorCircle.position.y +=
        (targetPos.y - cursorCircle.position.y) * 0.15;

      generateConnections();
    };

    const handleResize = () => {
      paper.view.viewSize = new paper.Size(
        canvas.parentElement!.clientWidth,
        canvas.parentElement!.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      paper.project.clear();
      tool.remove();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        data-paper-resize="true"
      />

      <div
        ref={textRef}
        className="relative z-10 text-center px-6 pointer-events-none"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-foreground mb-8"
        >
          Elsa <span className="italic text-primary">Bosemark</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
        >
          A multidisciplinary designer crafting{" "}
          <span className="text-foreground font-medium">
            human-centered experiences
          </span>{" "}
          through research, strategy, and bold visual storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 pointer-events-auto"
        >
          <a
            href="#work"
            className="text-sm font-medium tracking-[0.3em] uppercase text-primary hover:text-foreground transition-colors"
          >
            View Work ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
