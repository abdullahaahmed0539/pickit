/*! For license information please see 10.4b901651.chunk.js.LICENSE.txt */
(this.webpackJsonppickit=this.webpackJsonppickit||[]).push([[10],{215:function(t,e,r){"use strict";var n=r(37),c=r(38),a=r(39),o=r.n(a),s=r(0),i=r(41),u=r(1),f=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],l=s.forwardRef((function(t,e){var r=t.bsPrefix,a=t.className,s=t.striped,l=t.bordered,d=t.borderless,b=t.hover,p=t.size,j=t.variant,h=t.responsive,O=Object(c.a)(t,f),v=Object(i.a)(r,"table"),m=o()(a,v,j&&"".concat(v,"-").concat(j),p&&"".concat(v,"-").concat(p),s&&"".concat(v,"-striped"),l&&"".concat(v,"-bordered"),d&&"".concat(v,"-borderless"),b&&"".concat(v,"-hover")),x=Object(u.jsx)("table",Object(n.a)(Object(n.a)({},O),{},{className:m,ref:e}));if(h){var y="".concat(v,"-responsive");return"string"===typeof h&&(y="".concat(y,"-").concat(h)),Object(u.jsx)("div",{className:y,children:x})}return x}));e.a=l},234:function(t,e,r){"use strict";r.r(e);var n=r(55),c=r(40),a=r(0),o=r(3),s=r(61),i=r(215),u=r(59),f=r(1);e.default=Object(o.i)((function(t){var e=t.history,r=Object(o.h)().productId,l=Object(o.g)(),d=Object(a.useState)([]),b=Object(c.a)(d,2),p=b[0],j=b[1];Object(a.useEffect)((function(){Object(s.a)(r).then((function(t){return j(t.data.data.requestsOfThisProduct)})).catch((function(){return console.log("Error while fetching products")}))}),[r]);var h=function(t,e){if("reject"===e){var r=Object(n.a)(p),c=r.filter((function(e){return e._id!==t}));j(c),Object(s.c)(t,e).then((function(t){200!==t.status&&(alert("Unable to reject the product"),j(r))})).catch((function(t){alert("caught in exception"),j(r)}))}else if("accept"===e){for(var a=Object(n.a)(p),o="",i=0;i<a.length;i++)a[i]._id===t?(a[i].status="accepted",o=i):a[i].status="rejected";j(a),Object(s.c)(t,e).then((function(t){if(200!==t.status){alert("Unable to reject the product");var e=Object(n.a)(a);e[o].status="accepted",j(e)}})).catch((function(t){alert("caught in exception");var e=Object(n.a)(a);e[o].status="pending",j(e)}))}};return Object(f.jsx)(a.Fragment,{children:Object(f.jsxs)("div",{className:"container mt-5 ml-1",children:[Object(f.jsx)("div",{style:{color:"gray"},children:Object(f.jsxs)("h1",{children:["Requests for ",Object(f.jsx)("span",{style:{color:"black"},children:l.state.name})]})}),p&&p.length>0&&p.map((function(t){return Object(f.jsx)("h4",{style:{marginTop:"20px"},children:t.senderName})})),p&&0===p.length&&Object(f.jsx)("h6",{style:{marginTop:"20px",color:"red"},children:"No Requests for this product yet!"}),p&&0!==p.length&&Object(f.jsxs)(i.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Sender Name"}),Object(f.jsx)("th",{children:"Exchange Value"}),Object(f.jsx)("th",{children:"Actions"})]})}),Object(f.jsx)("tbody",{children:p.map((function(t){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:t.senderName}),Object(f.jsx)("td",{style:t.offer.cash>0?{color:"green"}:{color:"red "},children:t.offer.cash}),"pending"===t.status?Object(f.jsxs)("td",{children:[Object(f.jsx)(u.a,{onClick:function(){return e.push("/products/".concat(t.offer.productId))},className:"requestcardbutton me-1",children:"View Product"}),Object(f.jsx)(u.a,{variant:"danger",onClick:function(){return h(t._id,"reject")},className:"requestcardbutton me-1",children:"Reject"}),Object(f.jsx)(u.a,{onClick:function(){return h(t._id,"accept")},variant:"success",className:"requestcardbutton",children:"Accept"})]}):Object(f.jsx)("td",{children:Object(f.jsx)("b",{children:t.status})})]},t._id)}))})]})]})})}))},37:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(45);function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},38:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(6);function c(t,e){if(null==t)return{};var r,c,a=Object(n.a)(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(c=0;c<o.length;c++)r=o[c],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}},39:function(t,e,r){var n;!function(){"use strict";var r={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var a=typeof n;if("string"===a||"number"===a)t.push(n);else if(Array.isArray(n)){if(n.length){var o=c.apply(null,n);o&&t.push(o)}}else if("object"===a)if(n.toString===Object.prototype.toString)for(var s in n)r.call(n,s)&&n[s]&&t.push(s);else t.push(n.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):void 0===(n=function(){return c}.apply(e,[]))||(t.exports=n)}()},41:function(t,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"b",(function(){return o}));r(37);var n=r(0),c=(r(1),n.createContext({prefixes:{}}));c.Consumer,c.Provider;function a(t,e){var r=Object(n.useContext)(c).prefixes;return t||r[e]||e}function o(){return"rtl"===Object(n.useContext)(c).dir}},45:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},46:function(t,e,r){"use strict";r.d(e,"b",(function(){return s}));var n=r(40),c=r(0),a=r(1),o=["as","disabled"];function s(t){var e=t.tagName,r=t.disabled,n=t.href,c=t.target,a=t.rel,o=t.onClick,s=t.tabIndex,i=void 0===s?0:s,u=t.type;e||(e=null!=n||null!=c||null!=a?"a":"button");var f={tagName:e};if("button"===e)return[{type:u||"button",disabled:r},f];var l=function(t){(r||"a"===e&&function(t){return!t||"#"===t.trim()}(n))&&t.preventDefault(),r?t.stopPropagation():null==o||o(t)};return[{role:"button",disabled:void 0,tabIndex:r?void 0:i,href:"a"===e&&r?void 0:n,target:"a"===e?c:void 0,"aria-disabled":r||void 0,rel:"a"===e?a:void 0,onClick:l,onKeyDown:function(t){" "===t.key&&(t.preventDefault(),l(t))}},f]}var i=c.forwardRef((function(t,e){var r=t.as,c=t.disabled,i=function(t,e){if(null==t)return{};var r,n,c={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(c[r]=t[r]);return c}(t,o),u=s(Object.assign({tagName:r,disabled:c},i)),f=Object(n.a)(u,2),l=f[0],d=f[1].tagName;return Object(a.jsx)(d,Object.assign({},i,l,{ref:e}))}));i.displayName="Button",e.a=i},55:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(63);var c=r(58);function a(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},59:function(t,e,r){"use strict";var n=r(37),c=r(40),a=r(38),o=r(39),s=r.n(o),i=r(0),u=r(46),f=r(41),l=r(1),d=["as","bsPrefix","variant","size","active","className"],b=i.forwardRef((function(t,e){var r=t.as,o=t.bsPrefix,i=t.variant,b=t.size,p=t.active,j=t.className,h=Object(a.a)(t,d),O=Object(f.a)(o,"btn"),v=Object(u.b)(Object(n.a)({tagName:r},h)),m=Object(c.a)(v,2),x=m[0],y=m[1].tagName;return Object(l.jsx)(y,Object(n.a)(Object(n.a)(Object(n.a)({},h),x),{},{ref:e,className:s()(j,O,p&&"active",i&&"".concat(O,"-").concat(i),b&&"".concat(O,"-").concat(b),h.href&&h.disabled&&"disabled")}))}));b.displayName="Button",b.defaultProps={variant:"primary",active:!1,disabled:!1},e.a=b},61:function(t,e,r){"use strict";r.d(e,"e",(function(){return f})),r.d(e,"a",(function(){return l})),r.d(e,"c",(function(){return d})),r.d(e,"b",(function(){return b})),r.d(e,"d",(function(){return p}));var n=r(42),c=r.n(n),a=r(43),o=r(44),s=r.n(o),i=localStorage.getItem("token"),u={headers:{Authorization:"Bearer ".concat(i)}},f=function(){var t=Object(a.a)(c.a.mark((function t(e,r,n,a,o){var i,f;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i={senderName:r,recieverName:n,productId:e,offer:{cash:a,productId:o}},t.next=3,s.a.post("http://localhost:8080/requests/create_new",i,u);case 3:return f=t.sent,t.abrupt("return",f);case 5:case"end":return t.stop()}}),t)})));return function(e,r,n,c,a){return t.apply(this,arguments)}}(),l=function(){var t=Object(a.a)(c.a.mark((function t(e){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("http://localhost:8080/requests/".concat(e),u);case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),d=function(){var t=Object(a.a)(c.a.mark((function t(e,r){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.post("http://localhost:8080/requests/".concat(e),{action:r},u);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),b=function(){var t=Object(a.a)(c.a.mark((function t(){var e;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("http://localhost:8080/requests/pending",u);case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),p=function(){var t=Object(a.a)(c.a.mark((function t(e){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("http://localhost:8080/requests/remove/".concat(e),u);case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}]);
//# sourceMappingURL=10.4b901651.chunk.js.map