// New line events need to detect
// 1. newline "<br clear='none'>"
// 2. return enter code 13
// 3. reach maximum width // or interpret them as same line? just paste the image?

// TODO: checkCurrentCursor // caret position
(function(exports) {
  'use strict';
  var editorId = "entinymce_328"; 
  var tinymce = window.parent.tinymce;
  var editor = window.parent.tinymce.get(editorId);
  var editorBody = editor.getBody();
  console.log(tinymce.get("entinymce_328"));

  var inputTextCache = "";
  // plug-in contents
  var waitEditor = window.setTimeout(function() {
    exec();
    window.clearTimeout(waitEditor);
  }, 2000);

  var processor = function(textNode) {
    var mathModeBling=/(\$([^\$]*)\$)/g;                // /g to avoid infinite loop
    var result;
    var textVal = textNode.nodeValue;
    if (textVal === null) {
      return "<br clear='none'>";
    }
    if (typeof textVal !== 'string') {
      return null;
    }
    while((result = mathModeBling.exec(textVal)) !== null) {
      if (result.index === mathModeBling.lastIndex) {
        mathModeBling.lastIndex++;
      }
      // use setContent?
      // setPositon first then update the dom value
      // console.log(result[1]);
      textVal = textVal.replace(result[1], "butt");
      textNode.nodeValue = textVal;
    }
  };

  var exec = function() {
  //  console.log(editor.selection.getRng().textContent);
//    editor.execCommand('mceInsertContent', false, "my some text");
//    editor.execCommand('mceInsertRawHTML', false, "<br clear='none'>");       // create new line
    console.log(editor.selection.getRng().endOffset);
    console.log(editor.selection.getRng());
    // Set up event listener
    editorBody.addEventListener('keydown', function(e) {
      if (document.activeElement === editorBody) {
        // console.log(e.keyCode);
        // check current cursor location
        processor(window.getSelection().focusNode);
      }
    });
    // add event listener for mouse actions
//    editorBody.addEventListener('')
  };

})(this);
