import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import paper from "paper";

interface SpringPoint extends paper.Point {
  px: number;
  py: number;
  fixed: boolean;
}

const WaveHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable wave animation on mobile
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    paper.setup(canvas);

    const computedStyle = getComputedStyle(document.documentElement);
    const bgHSL = computedStyle.getPropertyValue("--background").trim();
    const [bh, bs, bl] = bgHSL.split(" ").map(parseFloat);
    const offWhite = new paper.Color({
      hue: bh,
      saturation: bs / 100,
      lightness: bl / 100,
    });

    // -- Ported from http://the389.com/9/1/ via Paper.js examples --
    const values = {
      friction: 0.8,
      timeStep: 0.01,
      amount: 15,
      mass: 2,
      invMass: 1 / 2,
    };

    let wavePath: paper.Path | null = null;
    let springs: { a: SpringPoint; b: SpringPoint; restLength: number; strength: number; mamb: number; update: () => void }[] = [];
    let size = new paper.Size(
      paper.view.size.width * 1.2,
      paper.view.size.height
    );

    function createSpring(a: SpringPoint, b: SpringPoint, strength: number, restLength?: number) {
      const spring = {
        a,
        b,
        restLength: restLength || 80,
        strength: strength || 0.55,
        mamb: values.invMass * values.invMass,
        update() {
          const delta = this.b.subtract(this.a);
          const dist = delta.length;
          const normDistStrength =
            ((dist - this.restLength) / (dist * this.mamb)) * this.strength;
          const dy = delta.y * normDistStrength * values.invMass * 0.2;
          if (!this.a.fixed) this.a.y += dy;
          if (!this.b.fixed) this.b.y -= dy;
        },
      };
      return spring;
    }

    function createWavePath(strength: number): paper.Path {
      const path = new paper.Path({
        fillColor: offWhite,
      });
      springs = [];

      for (let i = 0; i <= values.amount; i++) {
        const segment = path.add(
          new paper.Point(
            (i / values.amount) * size.width,
            0.5 * size.height
          )
        );
        const point = segment.point as SpringPoint;
        if (i === 0 || i === values.amount) {
          point.y += size.height;
        }
        point.px = point.x;
        point.py = point.y;
        point.fixed = i < 2 || i > values.amount - 2;

        if (i > 0) {
          const prevPoint = (segment.previous as paper.Segment).point as SpringPoint;
          springs.push(createSpring(prevPoint, point, strength));
        }
      }

      path.position.x -= size.width / 4;
      return path;
    }

    function updateWave(path: paper.Path) {
      const force = 1 - values.friction * values.timeStep * values.timeStep;
      for (let i = 0, l = path.segments.length; i < l; i++) {
        const point = path.segments[i].point as SpringPoint;
        const dy = (point.y - point.py) * force;
        point.py = point.y;
        point.y = Math.max(point.y + dy, 0);
      }
      for (let j = 0, l = springs.length; j < l; j++) {
        springs[j].update();
      }
      path.smooth({ type: "continuous" });
    }

    // Initialize
    size = new paper.Size(
      paper.view.bounds.width * 2,
      paper.view.bounds.height
    );
    wavePath = createWavePath(0.1);

    // White background for the top half
    const bgRect = new paper.Path.Rectangle(paper.view.bounds);
    bgRect.fillColor = new paper.Color("white");
    bgRect.sendToBack();

    // Mouse interaction
    const tool = new paper.Tool();
    tool.onMouseMove = (event: paper.ToolEvent) => {
      if (!wavePath) return;
      const location = wavePath.getNearestLocation(event.point);
      const segment = location.segment;
      const point = segment.point as SpringPoint;

      if (!point.fixed && location.distance < size.height / 4) {
        const y = event.point.y;
        point.y += (y - point.y) / 6;
        if (segment.previous) {
          const prev = segment.previous.point as SpringPoint;
          if (!prev.fixed) {
            prev.y += (y - prev.y) / 24;
          }
        }
        if (segment.next) {
          const next = segment.next.point as SpringPoint;
          if (!next.fixed) {
            next.y += (y - next.y) / 24;
          }
        }
      }
    };

    paper.view.onFrame = () => {
      if (wavePath) updateWave(wavePath);
    };

    const handleResize = () => {
      paper.view.viewSize = new paper.Size(
        canvas.parentElement!.clientWidth,
        canvas.parentElement!.clientHeight
      );
      if (wavePath) wavePath.remove();
      size = new paper.Size(
        paper.view.bounds.width * 2,
        paper.view.bounds.height
      );
      wavePath = createWavePath(0.1);
      bgRect.bounds = paper.view.bounds;
      bgRect.sendToBack();
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
          className="text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-foreground mb-8"
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
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
        >
          Crafting{" "}
          <span className="text-foreground font-medium">
            human-centered experiences
          </span>{" "}
          at the intersection of design and code, bringing clarity in ambiguous situations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 pointer-events-auto"
        >
          <button
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-sm font-medium tracking-[0.3em] uppercase text-primary hover:text-foreground transition-colors cursor-pointer"
          >
            View Work ↓
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WaveHero;
