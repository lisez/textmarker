// https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0?permalink_comment_id=4215753#gistcomment-4215753
class TrieNode {
  constructor(key) {
    // the "key" value will be the character in sequence
    this.key = key;

    // we keep a reference to parent
    this.parent = null;

    // we have hash of children
    this.children = {};

    // check to see if the node is at the end
    this.end = false;
  }

  getWord() {
    let output = [];
    let node = this;

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join("");
  }
}

export class Trie {
  constructor() {
    this.base = new TrieNode(null);
  }

  insert(word) {
    let node = this.base;

    const points = Array.from(word);

    for (const i in points) {
      const point = points[i];
      if (!node.children[point]) {
        node.children[point] = new TrieNode(point);
        node.children[point].parent = node;
      }

      node = node.children[point];

      if (i == word.length - 1) {
        node.end = true;
      }
    }
  }

  contains(word) {
    let node = this.base;

    const points = Array.from(word);

    for (const i in points) {
      const point = points[i];

      if (node.children[point]) {
        node = node.children[point];
      } else {
        return false;
      }
    }

    return node.end;
  }

  find(prefix) {
    let node = this.base;
    let output = [];

    const points = Array.from(prefix);

    for (const i in points) {
      const point = points[i];

      // make sure prefix actually has words
      if (node.children[point]) {
        node = node.children[point];
      } else {
        // there's none. just return it.
        return output;
      }
    }

    const stack = [node];
    while (stack.length) {
      node = stack.shift();
      // base case, if node is at a word, push to output
      if (node.end) {
        output.unshift(node.getWord());
      }

      // iterate through each children, call recursive findAllWords
      for (var child in node.children) {
        stack.push(node.children[child]);
      }
    }

    return output;
  }
}
