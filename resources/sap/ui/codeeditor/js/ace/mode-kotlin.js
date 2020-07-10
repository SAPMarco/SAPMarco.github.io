ace.define("ace/mode/kotlin_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var o=e("../lib/oop");var r=e("./text_highlight_rules").TextHighlightRules;var i=function(){this.$rules={start:[{include:"#comments"},{token:["text","keyword.other.kotlin","text","entity.name.package.kotlin","text"],regex:/^(\s*)(package)\b(?:(\s*)([^ ;$]+)(\s*))?/},{include:"#imports"},{include:"#statements"}],"#classes":[{token:"text",regex:/(?=\s*(?:companion|class|object|interface))/,push:[{token:"text",regex:/}|(?=$)/,next:"pop"},{token:["keyword.other.kotlin","text"],regex:/\b((?:companion\s*)?)(class|object|interface)\b/,push:[{token:"text",regex:/(?=<|{|\(|:)/,next:"pop"},{token:"keyword.other.kotlin",regex:/\bobject\b/},{token:"entity.name.type.class.kotlin",regex:/\w+/}]},{token:"text",regex:/</,push:[{token:"text",regex:/>/,next:"pop"},{include:"#generics"}]},{token:"text",regex:/\(/,push:[{token:"text",regex:/\)/,next:"pop"},{include:"#parameters"}]},{token:"keyword.operator.declaration.kotlin",regex:/:/,push:[{token:"text",regex:/(?={|$)/,next:"pop"},{token:"entity.other.inherited-class.kotlin",regex:/\w+/},{token:"text",regex:/\(/,push:[{token:"text",regex:/\)/,next:"pop"},{include:"#expressions"}]}]},{token:"text",regex:/\{/,push:[{token:"text",regex:/\}/,next:"pop"},{include:"#statements"}]}]}],"#comments":[{token:"punctuation.definition.comment.kotlin",regex:/\/\*/,push:[{token:"punctuation.definition.comment.kotlin",regex:/\*\//,next:"pop"},{defaultToken:"comment.block.kotlin"}]},{token:["text","punctuation.definition.comment.kotlin","comment.line.double-slash.kotlin"],regex:/(\s*)(\/\/)(.*$)/}],"#constants":[{token:"constant.language.kotlin",regex:/\b(?:true|false|null|this|super)\b/},{token:"constant.numeric.kotlin",regex:/\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:(?:e|E)(?:\+|-)?[0-9]+)?)(?:[LlFfUuDd]|UL|ul)?\b/},{token:"constant.other.kotlin",regex:/\b[A-Z][A-Z0-9_]+\b/}],"#expressions":[{token:"text",regex:/\(/,push:[{token:"text",regex:/\)/,next:"pop"},{include:"#expressions"}]},{include:"#types"},{include:"#strings"},{include:"#constants"},{include:"#comments"},{include:"#keywords"}],"#functions":[{token:"text",regex:/(?=\s*fun)/,push:[{token:"text",regex:/}|(?=$)/,next:"pop"},{token:"keyword.other.kotlin",regex:/\bfun\b/,push:[{token:"text",regex:/(?=\()/,next:"pop"},{token:"text",regex:/</,push:[{token:"text",regex:/>/,next:"pop"},{include:"#generics"}]},{token:["text","entity.name.function.kotlin"],regex:/((?:[\.<\?>\w]+\.)?)(\w+)/}]},{token:"text",regex:/\(/,push:[{token:"text",regex:/\)/,next:"pop"},{include:"#parameters"}]},{token:"keyword.operator.declaration.kotlin",regex:/:/,push:[{token:"text",regex:/(?={|=|$)/,next:"pop"},{include:"#types"}]},{token:"text",regex:/\{/,push:[{token:"text",regex:/(?=\})/,next:"pop"},{include:"#statements"}]},{token:"keyword.operator.assignment.kotlin",regex:/=/,push:[{token:"text",regex:/(?=$)/,next:"pop"},{include:"#expressions"}]}]}],"#generics":[{token:"keyword.operator.declaration.kotlin",regex:/:/,push:[{token:"text",regex:/(?=,|>)/,next:"pop"},{include:"#types"}]},{include:"#keywords"},{token:"storage.type.generic.kotlin",regex:/\w+/}],"#getters-and-setters":[{token:["entity.name.function.kotlin","text"],regex:/\b(get)\b(\s*\(\s*\))/,push:[{token:"text",regex:/\}|(?=\bset\b)|$/,next:"pop"},{token:"keyword.operator.assignment.kotlin",regex:/=/,push:[{token:"text",regex:/(?=$|\bset\b)/,next:"pop"},{include:"#expressions"}]},{token:"text",regex:/\{/,push:[{token:"text",regex:/\}/,next:"pop"},{include:"#expressions"}]}]},{token:["entity.name.function.kotlin","text"],regex:/\b(set)\b(\s*)(?=\()/,push:[{token:"text",regex:/\}|(?=\bget\b)|$/,next:"pop"},{token:"text",regex:/\(/,push:[{token:"text",regex:/\)/,next:"pop"},{include:"#parameters"}]},{token:"keyword.operator.assignment.kotlin",regex:/=/,push:[{token:"text",regex:/(?=$|\bset\b)/,next:"pop"},{include:"#expressions"}]},{token:"text",regex:/\{/,push:[{token:"text",regex:/\}/,next:"pop"},{include:"#expressions"}]}]}],"#imports":[{token:["text","keyword.other.kotlin","text","keyword.other.kotlin"],regex:/^(\s*)(import)(\s+[^ $]+\s+)((?:as)?)/}],"#keywords":[{token:"storage.modifier.kotlin",regex:/\b(?:var|val|public|private|protected|abstract|final|enum|open|attribute|annotation|override|inline|var|val|vararg|lazy|in|out|internal|data|tailrec|operator|infix|const|yield|typealias|typeof)\b/},{token:"keyword.control.catch-exception.kotlin",regex:/\b(?:try|catch|finally|throw)\b/},{token:"keyword.control.kotlin",regex:/\b(?:if|else|while|for|do|return|when|where|break|continue)\b/},{token:"keyword.operator.kotlin",regex:/\b(?:in|is|as|assert)\b/},{token:"keyword.operator.comparison.kotlin",regex:/==|!=|===|!==|<=|>=|<|>/},{token:"keyword.operator.assignment.kotlin",regex:/=/},{token:"keyword.operator.declaration.kotlin",regex:/:/},{token:"keyword.operator.dot.kotlin",regex:/\./},{token:"keyword.operator.increment-decrement.kotlin",regex:/\-\-|\+\+/},{token:"keyword.operator.arithmetic.kotlin",regex:/\-|\+|\*|\/|%/},{token:"keyword.operator.arithmetic.assign.kotlin",regex:/\+=|\-=|\*=|\/=/},{token:"keyword.operator.logical.kotlin",regex:/!|&&|\|\|/},{token:"keyword.operator.range.kotlin",regex:/\.\./},{token:"punctuation.terminator.kotlin",regex:/;/}],"#namespaces":[{token:"keyword.other.kotlin",regex:/\bnamespace\b/},{token:"text",regex:/\{/,push:[{token:"text",regex:/\}/,next:"pop"},{include:"#statements"}]}],"#parameters":[{token:"keyword.operator.declaration.kotlin",regex:/:/,push:[{token:"text",regex:/(?=,|\)|=)/,next:"pop"},{include:"#types"}]},{token:"keyword.operator.declaration.kotlin",regex:/=/,push:[{token:"text",regex:/(?=,|\))/,next:"pop"},{include:"#expressions"}]},{include:"#keywords"},{token:"variable.parameter.function.kotlin",regex:/\w+/}],"#statements":[{include:"#namespaces"},{include:"#typedefs"},{include:"#classes"},{include:"#functions"},{include:"#variables"},{include:"#getters-and-setters"},{include:"#expressions"}],"#strings":[{token:"punctuation.definition.string.begin.kotlin",regex:/"""/,push:[{token:"punctuation.definition.string.end.kotlin",regex:/"""/,next:"pop"},{token:"variable.parameter.template.kotlin",regex:/\$\w+|\$\{[^\}]+\}/},{token:"constant.character.escape.kotlin",regex:/\\./},{defaultToken:"string.quoted.third.kotlin"}]},{token:"punctuation.definition.string.begin.kotlin",regex:/"/,push:[{token:"punctuation.definition.string.end.kotlin",regex:/"/,next:"pop"},{token:"variable.parameter.template.kotlin",regex:/\$\w+|\$\{[^\}]+\}/},{token:"constant.character.escape.kotlin",regex:/\\./},{defaultToken:"string.quoted.double.kotlin"}]},{token:"punctuation.definition.string.begin.kotlin",regex:/'/,push:[{token:"punctuation.definition.string.end.kotlin",regex:/'/,next:"pop"},{token:"constant.character.escape.kotlin",regex:/\\./},{defaultToken:"string.quoted.single.kotlin"}]},{token:"punctuation.definition.string.begin.kotlin",regex:/`/,push:[{token:"punctuation.definition.string.end.kotlin",regex:/`/,next:"pop"},{defaultToken:"string.quoted.single.kotlin"}]}],"#typedefs":[{token:"text",regex:/(?=\s*type)/,push:[{token:"text",regex:/(?=$)/,next:"pop"},{token:"keyword.other.kotlin",regex:/\btype\b/},{token:"text",regex:/</,push:[{token:"text",regex:/>/,next:"pop"},{include:"#generics"}]},{include:"#expressions"}]}],"#types":[{token:"storage.type.buildin.kotlin",regex:/\b(?:Any|Unit|String|Int|Boolean|Char|Long|Double|Float|Short|Byte|dynamic)\b/},{token:"storage.type.buildin.array.kotlin",regex:/\b(?:IntArray|BooleanArray|CharArray|LongArray|DoubleArray|FloatArray|ShortArray|ByteArray)\b/},{token:["storage.type.buildin.collection.kotlin","text"],regex:/\b(Array|List|Map)(<\b)/,push:[{token:"text",regex:/>/,next:"pop"},{include:"#types"},{include:"#keywords"}]},{token:"text",regex:/\w+</,push:[{token:"text",regex:/>/,next:"pop"},{include:"#types"},{include:"#keywords"}]},{token:["keyword.operator.tuple.kotlin","text"],regex:/(#)(\()/,push:[{token:"text",regex:/\)/,next:"pop"},{include:"#expressions"}]},{token:"text",regex:/\{/,push:[{token:"text",regex:/\}/,next:"pop"},{include:"#statements"}]},{token:"text",regex:/\(/,push:[{token:"text",regex:/\)/,next:"pop"},{include:"#types"}]},{token:"keyword.operator.declaration.kotlin",regex:/->/}],"#variables":[{token:"text",regex:/(?=\s*(?:var|val))/,push:[{token:"text",regex:/(?=:|=|$)/,next:"pop"},{token:"keyword.other.kotlin",regex:/\b(?:var|val)\b/,push:[{token:"text",regex:/(?=:|=|$)/,next:"pop"},{token:"text",regex:/</,push:[{token:"text",regex:/>/,next:"pop"},{include:"#generics"}]},{token:["text","entity.name.variable.kotlin"],regex:/((?:[\.<\?>\w]+\.)?)(\w+)/}]},{token:"keyword.operator.declaration.kotlin",regex:/:/,push:[{token:"text",regex:/(?==|$)/,next:"pop"},{include:"#types"},{include:"#getters-and-setters"}]},{token:"keyword.operator.assignment.kotlin",regex:/=/,push:[{token:"text",regex:/(?=$)/,next:"pop"},{include:"#expressions"},{include:"#getters-and-setters"}]}]}]};this.normalizeRules()};i.metaData={fileTypes:["kt","kts"],name:"Kotlin",scopeName:"source.Kotlin"};o.inherits(i,r);t.KotlinHighlightRules=i});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var o=e("../../lib/oop");var r=e("../../range").Range;var i=e("./fold_mode").FoldMode;var s=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};o.inherits(s,i);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var o=e.getLine(n);if(this.singleLineBlockCommentRe.test(o)){if(!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return""}var r=this._getFoldWidgetBase(e,t,n);if(!r&&this.startRegionRe.test(o))return"start";return r};this.getFoldWidgetRange=function(e,t,n,o){var r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);var i=r.match(this.foldingStartMarker);if(i){var s=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,s);var a=e.getCommentFoldRange(n,s+i[0].length,1);if(a&&!a.isMultiLine()){if(o){a=this.getSectionRange(e,n)}else if(t!="all")a=null}return a}if(t==="markbegin")return;var i=r.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;if(i[1])return this.closingBracketBlock(e,i[1],n,s);return e.getCommentFoldRange(n,s,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var o=n.search(/\S/);var i=t;var s=n.length;t=t+1;var a=t;var l=e.getLength();while(++t<l){n=e.getLine(t);var k=n.search(/\S/);if(k===-1)continue;if(o>k)break;var x=this.getFoldWidgetRange(e,"all",t);if(x){if(x.start.row<=i){break}else if(x.isMultiLine()){t=x.end.row}else if(o==k){break}}a=t}return new r(i,s,a,e.getLine(a).length)};this.getCommentRegionBlock=function(e,t,n){var o=t.search(/\s*$/);var i=e.getLength();var s=n;var a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++n<i){t=e.getLine(n);var k=a.exec(t);if(!k)continue;if(k[1])l--;else l++;if(!l)break}var x=n;if(x>s){return new r(s,o,x,t.length)}}}).call(s.prototype)});ace.define("ace/mode/kotlin",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/kotlin_highlight_rules","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var o=e("../lib/oop");var r=e("./text").Mode;var i=e("./kotlin_highlight_rules").KotlinHighlightRules;var s=e("./behaviour/cstyle").CstyleBehaviour;var a=e("./folding/cstyle").FoldMode;var l=function(){this.HighlightRules=i;this.foldingRules=new a;this.$behaviour=new s};o.inherits(l,r);(function(){this.$id="ace/mode/kotlin"}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/kotlin"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();