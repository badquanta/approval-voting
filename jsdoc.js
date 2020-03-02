'use strict';

module.exports = {
  plugins: [
    "plugins/markdown",
//    "plugins/summarize"
  ],
  "destination": "docs",
  "recurseDepth": 10,
  "source": {
    "include": [
      "index.js",
      "dbg.js",
      "cli.js",
      "cli/",
      "lib.js",
      "lib/",
      "test/",      
      "bin/",
      "cfg.js",
      "README.md",      
    ],
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "sourceType": "module",
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc", "closure"]
  },
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false
  }
};