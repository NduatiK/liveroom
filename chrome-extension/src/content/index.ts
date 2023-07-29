import Overlay from "../components/Overlay.svelte";

// Some global styles on the page
// import "./styles.css";

// Some JS on the page
console.log("[content] Hello from content script!");

// Some svelte component on the page
new Overlay({ target: document.body });
