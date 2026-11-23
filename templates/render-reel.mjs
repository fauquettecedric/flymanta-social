import { createRequire } from "module";
import { spawn } from "child_process";
import fs from "fs";
const require = createRequire("/home/claude/flymanta-journeys/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox","--allow-file-access-from-files"] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto("file:///home/claude/reel/reel2.html"); await p.waitForTimeout(800);
const scenes=[[0,72],[72,555],[555,645]];
for (const [i,[a,z]] of scenes.entries()) {
  const tmp=`/home/claude/reel/scene${i}.tmp.mp4`;
  const ff=spawn("ffmpeg",["-y","-loglevel","error","-f","image2pipe","-framerate","30","-c:v","mjpeg","-i","-","-c:v","libx264","-crf","18","-preset","veryfast","-pix_fmt","yuv420p","-r","30",tmp]);
  for (let f=a; f<z; f++) { await p.evaluate(t=>render(t), f/30); ff.stdin.write(await p.screenshot({ type:"jpeg", quality:92 })); }
  ff.stdin.end(); const code=await new Promise(r=>ff.on("close",r));
  if (code!==0) throw new Error("ffmpeg "+code);
  fs.renameSync(tmp,`/home/claude/reel/scene${i}.mp4`);
}
await b.close();
