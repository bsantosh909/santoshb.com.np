(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{206:function(t,e,n){},217:function(t,e,n){var map={"./alone-forever.md":208,"./craze-for-computers.md":209,"./decision-making-and-chaos.md":210,"./never-to-be-forgotten.md":211,"./power-in-my-head.md":212,"./power-of-my-pen.md":213};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=217},218:function(t,e,n){"use strict";var r=n(206);n.n(r).a},233:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{dynamicComponent:null,article:null}},created:function(){var t=n(217)("./".concat(this.$route.params.id,".md"));this.dynamicComponent=t.vue.component,this.article=t.attributes},computed:{header:function(){var t,e;return this.article.updated?(t="Last Updated on",e=this.article.updated):(t="Originally Created on",e=this.article.created),"".concat(t," <b>").concat(new Date(e).toISOString().substr(0,10),"</b>")}}},o=(n(218),n(60)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"py-5"},[n("div",{staticClass:"text-center pb-4"},[n("p",{staticClass:"h1 font-weight-bold"},[t._v(t._s(t.article.title))])]),t._v(" "),n("div",{staticClass:"border-top-bottom mb-2 py-1"},[n("span",{domProps:{innerHTML:t._s(t.header)}})]),t._v(" "),n("div",{staticClass:"py-4"},[n(t.dynamicComponent,{tag:"component"})],1),t._v(" "),n("b-row",{staticClass:"my-2 py-1 border-top-bottom",attrs:{"no-gutters":""}},[t.article.updated?n("b-col",{attrs:{sm:"12",md:"6"}},[n("span",[t._v("Originally created on")]),t._v(" "),n("span",{staticClass:"font-weight-bold"},[t._v(t._s(new Date(t.article.created).toISOString().substr(0,10)))])]):t._e(),t._v(" "),n("b-col",{staticClass:"text-right",attrs:{sm:"12",md:t.article.updated?6:12}},t._l(t.article.tags,(function(e,i){return n("b-badge",{key:"article-tag-"+i,staticClass:"mx-1 my-1 text-capitalize",attrs:{variant:"dark",pill:""}},[t._v(t._s(e))])})),1)],1),t._v(" "),n("div",{staticClass:"mt-5"},[n("adsbygoogle")],1)],1)}),[],!1,null,"4db1728a",null);e.default=component.exports}}]);