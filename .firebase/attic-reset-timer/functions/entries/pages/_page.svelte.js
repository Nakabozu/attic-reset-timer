import { c as create_ssr_component, e as escape, f as add_attribute, h as null_to_empty } from "../../chunks/ssr.js";
import { io } from "socket.io-client";
import moment from "moment";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: `body{margin:0px;padding:0px;min-height:100vh;color:white;background:rgb(13,10,39);background:linear-gradient(45deg, rgba(13,10,39,1) 0%, rgba(44,24,93,1) 35%, rgba(83,140,167,1) 100%)}a.s-y_bCXRrkrYfP{white-space:pre-wrap;color:#AACCFF}a.s-y_bCXRrkrYfP:visited{color:#6699FF}.banner-container.s-y_bCXRrkrYfP{background:#000000 url("ghost_shop.gif") no-repeat center;background-size:cover;padding:1em}h1.s-y_bCXRrkrYfP{display:flex;flex-flow:row;flex-grow:1;align-items:center;justify-content:center;margin:0px;padding:0px;z-index:2;font:600 3em Helvetica, Arial, Sans-Serif;color:white;text-shadow:#000000 -7px -1px 4px;-webkit-text-stroke:2px black}h2.s-y_bCXRrkrYfP{width:100%;text-align:center;font-family:'Courier New', Courier, monospace;font-size:4em;font-weight:600;text-shadow:#000000 -7px 5px 6px}h3.s-y_bCXRrkrYfP{display:flex;flex-flow:row 1;align-items:center;justify-content:center}.black-to-red.s-y_bCXRrkrYfP{filter:invert(12%) sepia(99%) saturate(7050%) hue-rotate(347deg) brightness(98%) contrast(97%)}.black-to-white.s-y_bCXRrkrYfP{filter:invert(100%)}.buttons-container.s-y_bCXRrkrYfP{display:flex;flex-direction:row;flex-grow:1;justify-content:space-evenly}.audio-container.s-y_bCXRrkrYfP{display:flex;flex-direction:column;justify-content:center;align-items:center}.audio-controls.s-y_bCXRrkrYfP{min-width:"300px";width:50%;padding:1em 0em}.audio-button.s-y_bCXRrkrYfP{}.transparent-button.s-y_bCXRrkrYfP{border:none;background:none}button.s-y_bCXRrkrYfP{cursor:pointer}html:active{cursor:url("https://uxwing.com/wp-content/themes/uxwing/download/computers-mobile-hardware/mouse-click-icon.png")}.time-adjust-button.s-y_bCXRrkrYfP{background:#E9FFF3;width:10em;padding:5px 0px;margin-bottom:1em;color:#F60730;border:linear-gradient(45deg, rgba(13,10,39,1) 0%, rgba(44,24,93,1) 35%, rgba(83,140,167,1) 100%) solid 3px;border-radius:8px;line-height:1.5em;vertical-align:middle;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-size:1.5em;font-weight:500}.time-adjust-button.s-y_bCXRrkrYfP:active{background:linear-gradient(225deg, #E9FFF3 0%, #96a89f 100%);color:#D50020}section.s-y_bCXRrkrYfP{position:relative;bottom:0px;display:flex;flex-direction:row;flex-grow:1;justify-content:center}`,
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isMuted;
  const socket = io("ws://localhost:5174/");
  const secondsToString = (seconds) => {
    if (seconds / 10 < 1) {
      return `0${seconds}`;
    } else {
      return seconds;
    }
  };
  let thisAudio;
  let sound = "Several Dings.mp3";
  let nextUpdateDate = moment();
  let timeToNextUpdate = 420 - Math.abs(nextUpdateDate.diff(moment(), "s")) % 420;
  let minutesToNextUpdate = Math.floor(timeToNextUpdate / 60);
  let secondsToNextUpdate = secondsToString(timeToNextUpdate % 60);
  socket.on("welcomeEventFromServer", (date) => {
    nextUpdateDate = moment(date);
  });
  socket.on("timer_updated", (date) => {
    nextUpdateDate = moment(date);
  });
  $$result.css.add(css);
  isMuted = false;
  return `<div class="banner-container s-y_bCXRrkrYfP"><h1 class="s-y_bCXRrkrYfP" data-svelte-h="svelte-hp6wd9">Almost Abandoned Attic Restock Timer</h1></div> <h2 class="s-y_bCXRrkrYfP">${escape(minutesToNextUpdate)}:${escape(secondsToNextUpdate)}</h2> <h3 class="s-y_bCXRrkrYfP"><button class="transparent-button s-y_bCXRrkrYfP"><img src="icons8-notification.svg"${add_attribute(
    "alt",
    "Notifications off",
    0
  )} class="${escape(null_to_empty(`${"black-to-red"}`), true) + " s-y_bCXRrkrYfP"}"></button></h3> <div class="buttons-container s-y_bCXRrkrYfP"><button class="time-adjust-button s-y_bCXRrkrYfP" data-svelte-h="svelte-b2r26z">⏪ Subtract Minute</button> <button class="time-adjust-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1qazkkh">⏴ Subtract Second</button> <button class="time-adjust-button s-y_bCXRrkrYfP" data-svelte-h="svelte-17mbynr">⟳ Reset Timer</button> <button class="time-adjust-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1wmnhu2">⏵ Add Second</button> <button class="time-adjust-button s-y_bCXRrkrYfP" data-svelte-h="svelte-71fgqm">⏩ Add Minute</button></div> <div class="audio-container s-y_bCXRrkrYfP"><input type="image"${add_attribute(
    "src",
    isMuted ? "icons8-no-audio-24.png" : "icons8-audio-64.png",
    0
  )}${add_attribute("alt", isMuted ? "Audio is muted" : "Audio is active", 0)} width="64px"> <audio class="audio-controls s-y_bCXRrkrYfP" controls${add_attribute("src", sound, 0)}${add_attribute("muted", isMuted, 1)}${add_attribute("this", thisAudio, 0)}></audio> <div class="audio-buttons-container"><button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1f4euax">Several Dings</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1sb7wo3">Toaster Ding</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1nt41xx">Car Door Is Open Chime</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-163059h">Twinkle Toes</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-pjz8s">Typewriter on the fritz</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-12qdyfc">Ehem</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-15ga5m3">Ed, Edd, n Eddy Title Card</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1cc8zx2">La Cucaracha Car Horn</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1hhif55">Angry Man</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1opjar">Get It On</button> <button class="audio-button s-y_bCXRrkrYfP" data-svelte-h="svelte-1s8guhl">Yodel</button></div></div> <section class="s-y_bCXRrkrYfP">Visit <a href="https://www.sunnyneo.com/attictimer/" class="s-y_bCXRrkrYfP" data-svelte-h="svelte-nuimdl">sunnyneo</a> for details about the almost abandoned attic.</section>`;
});
export {
  Page as default
};
