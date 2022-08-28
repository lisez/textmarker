<script>
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

function emitEvent(result) {
  dispatch("update-file", {
    keywords: result,
  });
}

function loadCsv(evt) {
  const [file] = evt.target.files;
  if (file) {
    const reader = new FileReader();
    const content = reader.readAsText(file);
    reader.addEventListener(
      "load",
      () => {
        const keywords = Array.from(new Set((reader.result || "").split(/\r?\n/g).filter(e=> e.length>1)));
        emitEvent(keywords);
      },
      false
    );
  }
}
</script>

<input on:change={loadCsv} type="file" accept="text/plain,.csv">