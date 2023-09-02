import Settings from "src/components/Settings.svelte";

const target = document.getElementById("app");

function render() {
  target && new Settings({ target, props: {} });
}

document.addEventListener("DOMContentLoaded", render);
