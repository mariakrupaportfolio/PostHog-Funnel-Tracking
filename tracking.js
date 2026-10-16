// =============================================================
// tracking.js — loaded by every page. Two jobs:
//   1. Connect the site to PostHog.
//   2. Give the pages one simple function to send events: track()
// =============================================================

// Your PostHog project key (starts with phc_): PostHog → Settings → Project → Project API key.
// It's safe to have this in public code; it can only SEND events, not read data.
const POSTHOG_KEY = 'YOUR_POSTHOG_PROJECT_KEY';

// ---- Official PostHog loader. Copy-paste code: you don't need to understand it.
// It creates the `posthog` object and loads the real library in the background.
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister identify setPersonProperties group reset get_distinct_id get_session_id alias set_config opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

// ---- Settings. These four choices are worth being able to explain.
posthog.init(POSTHOG_KEY, {
  api_host: 'https://eu.i.posthog.com', // EU servers (GDPR-friendly)
  autocapture: false,                   // DON'T record every click automatically,
                                        // only the events I define = clean data
  person_profiles: 'identified_only',   // visitors stay anonymous
  request_batching: false               // send each event immediately, so a click
                                        // isn't lost when the next page loads
});

// ---- The one function every page uses.
// eventName = WHAT happened, properties = the DETAILS of it.
function track(eventName, properties) {
  posthog.capture(eventName, properties);
}

// Reads a value from the URL. On checkout.html?ticket=vip,
// getFromUrl('ticket') gives back 'vip'.
function getFromUrl(name) {
  return new URLSearchParams(window.location.search).get(name);
}
