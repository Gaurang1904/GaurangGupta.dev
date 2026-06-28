import { useEffect } from "react"
import Lenis from "lenis"

/*
  Smooth Scroll — mirrors the Framer "Smooth_Scroll" component instance,
  which wraps the Lenis library. Values below are the EXACT instance config
  from the Framer project (not the component defaults):

    Lerp:                      1      (default 0.1)
    Duration:                  1.2
    Smooth wheel:              true
    Smooth touch:              true   (default false)  → Lenis `syncTouch`
    Sync touch lerp:           0.1
    Touch inertia multiplier:  1      (default 35)
    Wheel multiplier:          1
    Touch multiplier:          2
    Normalize wheel:           true
    Infinite:                  false
    Auto resize:               true   (default false)

  Note: Lenis prioritises `lerp` when both `lerp` and `duration` are set, so
  with lerp=1 the scroll position tracks the target almost immediately. This
  matches the Framer instance values exactly.
*/
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      /* normalizeWheel (Framer: true) is internal/default in Lenis ≥1.1 */
      infinite: false,
      autoResize: true,
    })

    let frameId: number
    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])
}
