// app/lib/deals.js
import fs from "node:fs";
import path from "node:path";

function readProducts() {
  try {
    const file = path.join(process.cwd(), "data", "products.json");
    const raw = fs.readFileSync(file, "utf-8");
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function getDailySelection(limit = 6) {
  const items = readProducts();
  return items.slice(0, limit);
}
