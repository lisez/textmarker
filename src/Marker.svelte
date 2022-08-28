<script>
import { Trie } from "./Trie";
import MarkText from "./MarkText.svelte";

function makeText(text, trie) {
  const result = [];
  let previous = "";
  for (const w of text.replace(/ /g, "").normalize("NFC")) {
    const target = previous + w;

    const targetMatch = !!trie.find(target).length;
    const wMatch = !!trie.find(w).length;

    if (!!targetMatch !== !!wMatch && !targetMatch) {
      result.push([
        MarkText,
        { word: previous, mark: trie.contains(previous) },
      ]);
      previous = "";
    }
    previous += w;
  }
  if (previous) {
    result.push([MarkText, { word: previous, mark: trie.contains(previous) }]);
  }
  console.log({ result });
  return result;
}

export let keywords = new Trie();
export let article = "";

let renderText = [];

$: if (article) {
  renderText = makeText(article, keywords);
}
</script>

<article>
{#each renderText as [component, props]}
    <svelte:component this={component} {...props} />
{/each}
</article>