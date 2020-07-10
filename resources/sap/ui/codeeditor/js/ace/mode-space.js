ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,i){"use strict";var r=e("../../lib/oop");var o=e("./fold_mode").FoldMode;var a=e("../../range").Range;var n=t.FoldMode=function(){};r.inherits(n,o);(function(){this.getFoldWidgetRange=function(e,t,i){var r=this.indentationBlock(e,i);if(r)return r;var o=/\S/;var n=e.getLine(i);var l=n.search(o);if(l==-1||n[l]!="#")return;var s=n.length;var d=e.getLength();var g=i;var c=i;while(++i<d){n=e.getLine(i);var f=n.search(o);if(f==-1)continue;if(n[f]!="#")break;c=i}if(c>g){var u=e.getLine(c).length;return new a(g,s,c,u)}};this.getFoldWidget=function(e,t,i){var r=e.getLine(i);var o=r.search(/\S/);var a=e.getLine(i+1);var n=e.getLine(i-1);var l=n.search(/\S/);var s=a.search(/\S/);if(o==-1){e.foldWidgets[i-1]=l!=-1&&l<s?"start":"";return""}if(l==-1){if(o==s&&r[o]=="#"&&a[o]=="#"){e.foldWidgets[i-1]="";e.foldWidgets[i+1]="";return"start"}}else if(l==o&&r[o]=="#"&&n[o]=="#"){if(e.getLine(i-2).search(/\S/)==-1){e.foldWidgets[i-1]="start";e.foldWidgets[i+1]="";return""}}if(l!=-1&&l<o)e.foldWidgets[i-1]="start";else e.foldWidgets[i-1]="";if(o<s)return"start";else return""}}).call(n.prototype)});ace.define("ace/mode/space_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var a=function(){this.$rules={start:[{token:"empty_line",regex:/ */,next:"key"},{token:"empty_line",regex:/$/,next:"key"}],key:[{token:"variable",regex:/\S+/},{token:"empty_line",regex:/$/,next:"start"},{token:"keyword.operator",regex:/ /,next:"value"}],value:[{token:"keyword.operator",regex:/$/,next:"start"},{token:"string",regex:/[^$]/}]}};r.inherits(a,o);t.SpaceHighlightRules=a});ace.define("ace/mode/space",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/folding/coffee","ace/mode/space_highlight_rules"],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var a=e("./folding/coffee").FoldMode;var n=e("./space_highlight_rules").SpaceHighlightRules;var l=function(){this.HighlightRules=n;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};r.inherits(l,o);(function(){this.$id="ace/mode/space"}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/space"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();