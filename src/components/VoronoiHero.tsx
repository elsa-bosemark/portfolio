import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import paper from "paper";
import Voronoi from "voronoi";

const VoronoiHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    paper.setup(canvas);

    const computedStyle = getComputedStyle(document.documentElement);
    const primaryHSL = computedStyle.getPropertyValue("--primary").trim();
    const [h, s, l] = primaryHSL.split(" ").map(parseFloat);
    // Red for the gaps (background behind cells)
    const bgHSL = computedStyle.getPropertyValue("--background").trim();
    const [bh, bs, bl] = bgHSL.split(" ").map(parseFloat);
    const gapColor = new paper.Color("white");

    // Off-white cell interiors
    const spotColor = new paper.Color({
      hue: bh,
      saturation: bs / 100,
      lightness: bl / 100,
    });

    const voronoi = new Voronoi();
    let sites: paper.Point[] = [];
    let bbox: { xl: number; xr: number; yt: number; yb: number };
    let oldSize = new paper.Size(paper.view.size);
    let mousePos = new paper.Point(paper.view.center);

    function generateBeeHivePoints(
      size: paper.Size,
      loose: boolean
    ): paper.Point[] {
      const points: paper.Point[] = [];
      const col = new paper.Point(
        paper.view.size.width / size.width,
        paper.view.size.height / size.height
      );
      for (let i = -1; i < size.width + 1; i++) {
        for (let j = -1; j < size.height + 1; j++) {
          let point = new paper.Point(
            (i / size.width) * paper.view.size.width + col.x / 2,
            (j / size.height) * paper.view.size.height + col.y / 2
          );
          if (j % 2) {
            point = point.add(new paper.Point(col.x / 2, 0));
          }
          if (loose) {
            point = point.add(
              new paper.Point(
                (Math.random() - 0.5) * col.x * 0.5,
                (Math.random() - 0.5) * col.y * 0.5
              )
            );
          }
          points.push(point);
        }
      }
      return points;
    }

    function removeSmallBits(path: paper.Path) {
      const min = path.length / 50;
      for (let i = path.segments.length - 1; i >= 0; i--) {
        const segment = path.segments[i];
        const cur = segment.point;
        const nextSegment = segment.next;
        const next = nextSegment.point.add(nextSegment.handleIn);
        if (cur.getDistance(next) < min) {
          segment.remove();
        }
      }
    }

    function createPath(points: paper.Point[], _center: paper.Point) {
      const path = new paper.Path();
      path.fillColor = spotColor.clone();
      path.closed = true;

      for (let i = 0, len = points.length; i < len; i++) {
        const point = points[i];
        const next = points[(i + 1) === len ? 0 : i + 1];
        const vector = next.subtract(point).divide(2);
        path.add(
          new paper.Segment(
            point.add(vector),
            vector.multiply(-1),
            vector
          )
        );
      }
      path.scale(0.95);
      removeSmallBits(path);
      return path;
    }

    function renderDiagram() {
      paper.project.activeLayer.removeChildren();

      // Red background — visible through the gaps between cells
      const bg = new paper.Path.Rectangle(paper.view.bounds);
      bg.fillColor = gapColor.clone();

      // Convert paper.Points to plain objects for voronoi lib
      const plainSites = sites.map((p) => ({ x: p.x, y: p.y }));
      const diagram = voronoi.compute(plainSites, bbox);

      if (diagram) {
        for (let i = 0, len = sites.length; i < len; i++) {
          const cell = diagram.cells[(plainSites[i] as any).voronoiId];
          if (cell) {
            const halfedges = cell.halfedges;
            const length = halfedges.length;
            if (length > 2) {
              const points: paper.Point[] = [];
              for (let j = 0; j < length; j++) {
                const v = halfedges[j].getEndpoint();
                points.push(new paper.Point(v.x, v.y));
              }
              createPath(points, sites[i]);
            }
          }
        }
      }
    }

    function onResize() {
      const margin = 20;
      bbox = {
        xl: margin,
        xr: paper.view.bounds.width - margin,
        yt: margin,
        yb: paper.view.bounds.height - margin,
      };
      const newSize = paper.view.size;
      for (let i = 0, len = sites.length; i < len; i++) {
        sites[i] = new paper.Point(
          (sites[i].x * newSize.width) / oldSize.width,
          (sites[i].y * newSize.height) / oldSize.height
        );
      }
      oldSize = new paper.Size(newSize);
      renderDiagram();
    }

    // Initialize
    const gridSize = new paper.Size(
      paper.view.size.width / 300,
      paper.view.size.height / 300
    );
    sites = generateBeeHivePoints(gridSize, true);
    // Add the mouse point as the last site
    sites.push(new paper.Point(paper.view.center));

    onResize();

    // Mouse interaction
    const tool = new paper.Tool();
    tool.onMouseMove = (event: paper.ToolEvent) => {
      mousePos = event.point;
      sites[sites.length - 1] = event.point;
      renderDiagram();
    };

    tool.onMouseDown = (event: paper.ToolEvent) => {
      sites.push(event.point);
      renderDiagram();
    };

    const handleResize = () => {
      paper.view.viewSize = new paper.Size(
        canvas.parentElement!.clientWidth,
        canvas.parentElement!.clientHeight
      );
      onResize();
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

      <div className="relative z-10 text-center px-6 pointer-events-none">
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

export default VoronoiHero;
