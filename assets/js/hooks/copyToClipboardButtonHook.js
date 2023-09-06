export const CopyToClipboardButtonHook = {
  mounted() {
    this.handleEvent("copy_to_clipboard", ({ text }) => {
      navigator.clipboard.writeText(text);

      this.el.setAttribute("disabled", "true");
      this.el.setAttribute("data-copied", "true");
      setTimeout(() => {
        this.el.removeAttribute("disabled");
        this.el.setAttribute("data-copied", "false");
      }, 3000);
    });
  },
};
