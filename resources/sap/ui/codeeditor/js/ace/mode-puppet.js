ace.define("ace/mode/puppet_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var a=function(){this.$rules={start:[{token:["keyword.type.puppet","constant.class.puppet","keyword.inherits.puppet","constant.class.puppet"],regex:'^\\s*(class)(\\s+(?:[-_A-Za-z0-9".]+::)*[-_A-Za-z0-9".]+\\s*)(?:(inherits\\s*)(\\s+(?:[-_A-Za-z0-9".]+::)*[-_A-Za-z0-9".]+\\s*))?'},{token:["storage.function.puppet","name.function.puppet","punctuation.lpar"],regex:"(^\\s*define)(\\s+[a-zA-Z0-9_:]+\\s*)(\\()",push:[{token:"punctuation.rpar.puppet",regex:"\\)",next:"pop"},{include:"constants"},{include:"variable"},{include:"strings"},{include:"operators"},{defaultToken:"string"}]},{token:["language.support.class","keyword.operator"],regex:"\\b([a-zA-Z_]+)(\\s+=>)"},{token:["exported.resource.puppet","keyword.name.resource.puppet","paren.lpar"],regex:"(\\@\\@)?(\\s*[a-zA-Z_]*)(\\s*\\{)"},{token:"qualified.variable.puppet",regex:"(\\$([a-z][a-z0-9_]*)?(::[a-z][a-z0-9_]*)*::[a-z0-9_][a-zA-Z0-9_]*)"},{token:"singleline.comment.puppet",regex:"#(.)*$"},{token:"multiline.comment.begin.puppet",regex:"^\\s*\\/\\*\\s*$",push:"blockComment"},{token:"keyword.control.puppet",regex:"\\b(case|if|unless|else|elsif|in|default:|and|or)\\s+(?!::)"},{token:"keyword.control.puppet",regex:"\\b(import|default|inherits|include|require|contain|node|application|consumes|environment|site|function|produces)\\b"},{token:"support.function.puppet",regex:"\\b(lest|str2bool|escape|gsub|Timestamp|Timespan|with|alert|crit|debug|notice|sprintf|split|step|strftime|slice|shellquote|type|sha1|defined|scanf|reverse_each|regsubst|return|emerg|reduce|err|failed|fail|versioncmp|file|generate|then|info|realize|search|tag|tagged|template|epp|warning|hiera_include|each|assert_type|binary_file|create_resources|dig|digest|filter|lookup|find_file|fqdn_rand|hiera_array|hiera_hash|inline_epp|inline_template|map|match|md5|new|next)\\b"},{token:"constant.types.puppet",regex:"\\b(String|File|Package|Service|Class|Integer|Array|Catalogentry|Variant|Boolean|Undef|Number|Hash|Float|Numeric|NotUndef|Callable|Optional|Any|Regexp|Sensitive|Sensitive.new|Type|Resource|Default|Enum|Scalar|Collection|Data|Pattern|Tuple|Struct)\\b"},{token:"paren.lpar",regex:"[[({]"},{token:"paren.rpar",regex:"[\\])}]"},{include:"variable"},{include:"constants"},{include:"strings"},{include:"operators"},{token:"regexp.begin.string.puppet",regex:"\\s*(\\/(\\S)+)\\/"}],blockComment:[{regex:"^\\s*\\/\\*\\s*$",token:"multiline.comment.begin.puppet",push:"blockComment"},{regex:"^\\s*\\*\\/\\s*$",token:"multiline.comment.end.puppet",next:"pop"},{defaultToken:"comment"}],constants:[{token:"constant.language.puppet",regex:"\\b(false|true|running|stopped|installed|purged|latest|file|directory|held|undef|present|absent|link|mounted|unmounted)\\b"}],variable:[{token:"variable.puppet",regex:"(\\$[a-z0-9_{][a-zA-Z0-9_]*)"}],strings:[{token:"punctuation.quote.puppet",regex:"'",push:[{token:"punctuation.quote.puppet",regex:"'",next:"pop"},{include:"escaped_chars"},{defaultToken:"string"}]},{token:"punctuation.quote.puppet",regex:'"',push:[{token:"punctuation.quote.puppet",regex:'"',next:"pop"},{include:"escaped_chars"},{include:"variable"},{defaultToken:"string"}]}],escaped_chars:[{token:"constant.escaped_char.puppet",regex:"\\\\."}],operators:[{token:"keyword.operator",regex:"\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|::|,"}]};this.normalizeRules()};r.inherits(a,i);t.PuppetHighlightRules=a});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop");var i=e("../../range").Range;var a=e("./fold_mode").FoldMode;var o=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(o,a);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var i=this._getFoldWidgetBase(e,t,n);if(!i&&this.startRegionRe.test(r))return"start";return i};this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var a=i.match(this.foldingStartMarker);if(a){var o=a.index;if(a[1])return this.openingBracketBlock(e,a[1],n,o);var s=e.getCommentFoldRange(n,o+a[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var a=i.match(this.foldingStopMarker);if(a){var o=a.index+a[0].length;if(a[1])return this.closingBracketBlock(e,a[1],n,o);return e.getCommentFoldRange(n,o,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var a=t;var o=n.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){n=e.getLine(t);var p=n.search(/\S/);if(p===-1)continue;if(r>p)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=a){break}else if(u.isMultiLine()){t=u.end.row}else if(r==p){break}}s=t}return new i(a,o,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var a=e.getLength();var o=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++n<a){t=e.getLine(n);var p=s.exec(t);if(!p)continue;if(p[1])l--;else l++;if(!l)break}var u=n;if(u>o){return new i(o,r,u,t.length)}}}).call(o.prototype)});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range;var i=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var i=n.match(/^(\s*\})/);if(!i)return 0;var a=i[1].length;var o=e.findMatchingBracket({row:t,column:a});if(!o||o.row==t)return 0;var s=this.$getIndent(e.getLine(o.row));e.replace(new r(t,0,t,a-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype);t.MatchingBraceOutdent=i});ace.define("ace/mode/puppet",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/puppet_highlight_rules","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text").Mode;var a=e("./puppet_highlight_rules").PuppetHighlightRules;var o=e("./behaviour/cstyle").CstyleBehaviour;var s=e("./folding/cstyle").FoldMode;var l=e("./matching_brace_outdent").MatchingBraceOutdent;var p=function(){i.call(this);this.HighlightRules=a;this.$outdent=new l;this.$behaviour=new o;this.foldingRules=new s};r.inherits(p,i);(function(){this.$id="ace/mode/puppet"}).call(p.prototype);t.Mode=p});(function(){ace.require(["ace/mode/puppet"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();