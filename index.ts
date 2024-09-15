import { join } from "path";
import { file } from "bun";
import { serve } from "bun";

// สร้างเซิร์ฟเวอร์ Bun
serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    // ให้บริการไฟล์ index.html
    if (url.pathname === "/") {
      return new Response(file(join("public", "index.html")), {
        headers: { "Content-Type": "text/html" },
      });
    } 

    // ให้บริการไฟล์ index.js
    else if (url.pathname === "/index.js") {
      return new Response(file(join("public", "index.js")), {
        headers: { "Content-Type": "application/javascript" },
      });
    } 
    
    // กรณีไม่เจอไฟล์
    else {
      return new Response("Not Found", { status: 404 });
    }
  },
});