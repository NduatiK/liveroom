import Main from "../components/Main.svelte";
import packageJson from "../../package.json";

const VERSION = packageJson["version"];

// Some global styles on the page
// import "./styles.css";

// Some JS on the page
console.log(`[Liveroom Extension] Starting... (v${VERSION})`);

// Some svelte component on the page
new Main({ target: document.body });
