import { onRequestGet as __api_contact_js_onRequestGet } from "/Users/ramesleroi/dev/mya-ink-ssg/functions/api/contact.js"
import { onRequestPost as __api_contact_js_onRequestPost } from "/Users/ramesleroi/dev/mya-ink-ssg/functions/api/contact.js"
import { onRequestOptions as __api__middleware_js_onRequestOptions } from "/Users/ramesleroi/dev/mya-ink-ssg/functions/api/_middleware.js"
import { onRequest as __api__middleware_js_onRequest } from "/Users/ramesleroi/dev/mya-ink-ssg/functions/api/_middleware.js"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_contact_js_onRequestGet],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  {
      routePath: "/api",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [__api__middleware_js_onRequestOptions],
      modules: [],
    },
  {
      routePath: "/api",
      mountPath: "/api",
      method: "",
      middlewares: [__api__middleware_js_onRequest],
      modules: [],
    },
  ]