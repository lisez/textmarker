<script>
import FileInput from "./FileInput.svelte";
import Marker from "./Marker.svelte";
import { Trie } from "./Trie";

let keywords = [];
let keywordTrie = new Trie();
let article = "";

function makeTrie(words) {
  const nextTrie = new Trie();
  for (const kwd of words) {
    const kwds = kwd.normalize("NFC");
    nextTrie.insert(kwds);
    for (const nkwd of kwds.split(/[,:;]/g).filter(Boolean)) {
      if (nkwd.length > 1) {
        nextTrie.insert(nkwd);
      } else {
        console.debug({ nkwd, kwd });
      }
    }
  }
  return nextTrie;
}

function updateKeywords(evt) {
  keywords = evt.detail.keywords;
  keywordTrie = makeTrie(keywords);
}
</script>

<h1>Text Marker</h1>
<address>sujingjhong@gmail.com</address>
<div class="container">
  <label>Keywords File<FileInput on:update-file="{updateKeywords}" /></label>
  <div>keywords: {keywords.length}</div>
  <h2>Input:</h2>
  <textarea bind:value="{article}" />
  <h2>Output:</h2>
  <Marker keywords="{keywordTrie}" article="{article}" />
</div>

<style>
  div.container {
    display: flex;
    flex-direction: column;
  }
</style>
