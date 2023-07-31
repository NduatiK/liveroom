import Main from "../components/Main.svelte";

// Some global styles on the page
// import "./styles.css";

// Some JS on the page
console.log("[content] Hello from content script!");

// Some svelte component on the page
new Main({ target: document.body });
