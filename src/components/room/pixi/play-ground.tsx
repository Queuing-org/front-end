// components/room/pixi/play-ground.tsx
"use client";

import { useEffect, useRef } from "react";
import { Application, Assets, Sprite } from "pixi.js";

const SPEED = 220;

export default function MiniPlayground() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const bgRef = useRef<Sprite | null>(null);
  const meRef = useRef<Sprite | null>(null);
  const keys = useRef(new Set<string>());

  useEffect(() => {
    if (!hostRef.current) return;

    let disposed = false;

    (async () => {
      const app = new Application();
      await app.init({
        background: "#ffffff",
        resizeTo: hostRef.current!,
        antialias: true,
      });
      appRef.current = app;
      hostRef.current!.appendChild(app.canvas);

      const [bg, me] = await Promise.all([
        Assets.load("/assets/Sample.png"),
        Assets.load("/assets/avater_sample.png"),
      ]);
      if (disposed) return;

      const bgSprite = new Sprite(bg);
      bgSprite.anchor.set(0.5);
      app.stage.addChild(bgSprite);
      bgRef.current = bgSprite;

      const meSprite = new Sprite(me);
      meSprite.scale.set(0.3);
      meSprite.anchor.set(0.5);
      meSprite.x = app.renderer.width / 2;
      meSprite.y = app.renderer.height / 2;
      app.stage.addChild(meSprite);
      meRef.current = meSprite;

      const fitBackground = () => {
        if (!bgRef.current) return;
        const W = app.renderer.width;
        const H = app.renderer.height;
        const texW = bgRef.current.texture.width || 1;
        const texH = bgRef.current.texture.height || 1;
        const scale = Math.max(W / texW, H / texH); // cover
        bgRef.current.scale.set(scale);
        bgRef.current.position.set(W / 2, H / 2);
      };

      fitBackground();

      const ro = new ResizeObserver(() => fitBackground());
      ro.observe(hostRef.current!);

      let last = performance.now();
      const loop = (now: number) => {
        const dt = (now - last) / 1000;
        last = now;

        let vx =
          (keys.current.has("ArrowRight") || keys.current.has("d") ? 1 : 0) -
          (keys.current.has("ArrowLeft") || keys.current.has("a") ? 1 : 0);
        let vy =
          (keys.current.has("ArrowDown") || keys.current.has("s") ? 1 : 0) -
          (keys.current.has("ArrowUp") || keys.current.has("w") ? 1 : 0);

        const mag = Math.hypot(vx, vy) || 1;
        vx = (vx / mag) * SPEED;
        vy = (vy / mag) * SPEED;

        if (meRef.current) {
          meRef.current.x = Math.max(
            16,
            Math.min(app.renderer.width - 16, meRef.current.x + vx * dt)
          );
          meRef.current.y = Math.max(
            16,
            Math.min(app.renderer.height - 16, meRef.current.y + vy * dt)
          );
        }

        app.renderer.render(app.stage);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);

      // cleanup
      (app as any).__ro = ro;
    })();

    return () => {
      disposed = true;
      const app = appRef.current;
      const ro: ResizeObserver | undefined = (app as any)?.__ro;
      ro?.disconnect();
      appRef.current?.destroy(true);
      appRef.current = null;
      bgRef.current = null;
      meRef.current = null;
    };
  }, []);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => keys.current.add(e.key);
    const ku = (e: KeyboardEvent) => keys.current.delete(e.key);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="w-full h-full rounded-2xl border overflow-hidden"
      onPointerDown={(e) => (e.currentTarget as HTMLDivElement).focus()}
      tabIndex={0}
    />
  );
}
