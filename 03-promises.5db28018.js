!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return o[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){n[e]=o},e.parcelRequired7c6=t);var i=t("h6c0i");function r(e,o){return new Promise((function(n,t){setTimeout((function(){Math.random()>.3?n({position:e,delay:o}):t({position:e,delay:o})}),o)}))}function c(e){var o=e.position,n=e.delay;console.log("notifySuccess"),i.Notify.success("Fulfilled promise ".concat(o," in ").concat(n,"ms"))}function l(e){var o=e.position,n=e.delay;console.log("notifyRejected"),i.Notify.failure("Rejected promise ".concat(o," in ").concat(n,"ms"))}var u=document.querySelector(".form");document.querySelector('button[type="submit"]').addEventListener("click",(function(e){e.preventDefault();var o=Number(u.delay.value),n=Number(u.step.value),t=Number(u.amount.value),i=o;console.log(o,n,t);for(var a=1;a<=t;a++)console.log(a,i),r(a,i).then(c).catch(l),i+=n}))}();
//# sourceMappingURL=03-promises.5db28018.js.map