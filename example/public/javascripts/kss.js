var KssStateGenerator = (function() {

  function KssStateGenerator() {
    var idx, idxs, pseudos, replaceRule, rule, stylesheet, _i, _len, _len2, _ref, _ref2;
    pseudos = /(\:hover|\:disabled|\:active|\:visited|\:focus)/g;

    try {
      // Remove any previously added kss rules
      headEl = document.getElementsByTagName('head')[0];
      for (var i=headEl.children.length - 1; i >= 0; i--) {
        node = headEl.children[i];
        if (node.tagName == "STYLE" && node.className == "kss") {
          headEl.removeChild(node);
        }
      }

      _ref = document.styleSheets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stylesheet = _ref[_i];
        idxs = [];
        if (stylesheet.media[0] == "print") {
          continue;
        }
        _ref2 = stylesheet.cssRules;
        for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
          rule = _ref2[idx];
          if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
            replaceRule = function(matched, stuff) {
              return matched.replace(/\:/g, '.pseudo-class-');
            };
            this.insertRule(rule.cssText.replace(pseudos, replaceRule));
          }
        }
      }
    } catch (_error) {}
  }

  KssStateGenerator.prototype.insertRule = function(rule) {
    var headEl, styleEl;
    headEl = document.getElementsByTagName('head')[0];
    styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    styleEl.className = 'kss';
    if (styleEl.styleSheet) {
      styleEl.styleSheet.cssText = rule;
    } else {
      styleEl.appendChild(document.createTextNode(rule));
    }
    return headEl.appendChild(styleEl);
  };

  return KssStateGenerator;

})();

new KssStateGenerator;
