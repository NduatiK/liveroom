export const CopyToClipboardButtonHook = {
  mounted() {
    const toCopy = this.el.dataset.tocopy;

    this.el.addEventListener("click", () => {
      navigator.clipboard.writeText(toCopy);

      this.el.setAttribute("disabled", "true");
      this.el.setAttribute("data-copied", "true");
      setTimeout(() => {
        this.el.removeAttribute("disabled");
        this.el.setAttribute("data-copied", "false");
      }, 3000);
    });
  },
};
