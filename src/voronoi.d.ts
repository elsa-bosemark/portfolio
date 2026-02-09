declare module "voronoi" {
  class Voronoi {
    compute(
      sites: { x: number; y: number }[],
      bbox: { xl: number; xr: number; yt: number; yb: number }
    ): {
      cells: {
        halfedges: {
          getEndpoint(): { x: number; y: number };
        }[];
      }[];
    } | null;
  }
  export default Voronoi;
}
