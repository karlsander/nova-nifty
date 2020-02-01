const prettier = require("../node_modules/prettier/standalone");
const plugins = [
  require("../node_modules/prettier/parser-angular"),
  require("../node_modules/prettier/parser-babylon"),
  require("../node_modules/prettier/parser-flow"),
  require("../node_modules/prettier/parser-glimmer"),
  require("../node_modules/prettier/parser-graphql"),
  require("../node_modules/prettier/parser-html"),
  require("../node_modules/prettier/parser-markdown"),
  require("../node_modules/prettier/parser-postcss"),
  require("../node_modules/prettier/parser-typescript"),
  require("../node_modules/prettier/parser-yaml")
];

exports.activate = function() {
  // Do work when the extension is activated
};

exports.deactivate = function() {
  // Clean up state before the extension is deactivated
};

const parserForSyntax = {
  javascript: "babel",
  typescript: "typescript",
  html: "html"
};

nova.commands.register("prettier.format", editor => {
  // Begin an edit session
  var position = editor.selectedRange.start;
  const syntax = editor.document.syntax;
  console.log(syntax);
  editor.edit(function(e) {
    const replaceRange = new Range(0, editor.document.length);
    const content = editor.document.getTextInRange(replaceRange);
    const { formatted, cursorOffset } = prettier.formatWithCursor(content, {
      cursorOffset: position,
      parser: parserForSyntax[syntax],
      plugins
    });
    e.replace(replaceRange, formatted);
    e.insert(cursorOffset, "");
  });
});
