import { onRequestDelete as __api_prijava_js_onRequestDelete } from "/Users/aljazklanecek/Library/Application Support/Claude/scratch-workspaces/f3c19371-bdb3-41c0-85af-08f999ae7bd9/42fee12a-dc5e-4010-9315-6fe51a56f6cc/scratch-2026-09-18-cfb6c1/gbdomzale-redesign/functions/api/prijava.js"
import { onRequestGet as __api_prijava_js_onRequestGet } from "/Users/aljazklanecek/Library/Application Support/Claude/scratch-workspaces/f3c19371-bdb3-41c0-85af-08f999ae7bd9/42fee12a-dc5e-4010-9315-6fe51a56f6cc/scratch-2026-09-18-cfb6c1/gbdomzale-redesign/functions/api/prijava.js"
import { onRequestPost as __api_prijava_js_onRequestPost } from "/Users/aljazklanecek/Library/Application Support/Claude/scratch-workspaces/f3c19371-bdb3-41c0-85af-08f999ae7bd9/42fee12a-dc5e-4010-9315-6fe51a56f6cc/scratch-2026-09-18-cfb6c1/gbdomzale-redesign/functions/api/prijava.js"
import { onRequestPut as __api_prijava_js_onRequestPut } from "/Users/aljazklanecek/Library/Application Support/Claude/scratch-workspaces/f3c19371-bdb3-41c0-85af-08f999ae7bd9/42fee12a-dc5e-4010-9315-6fe51a56f6cc/scratch-2026-09-18-cfb6c1/gbdomzale-redesign/functions/api/prijava.js"

export const routes = [
    {
      routePath: "/api/prijava",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_prijava_js_onRequestDelete],
    },
  {
      routePath: "/api/prijava",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_prijava_js_onRequestGet],
    },
  {
      routePath: "/api/prijava",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_prijava_js_onRequestPost],
    },
  {
      routePath: "/api/prijava",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_prijava_js_onRequestPut],
    },
  ]