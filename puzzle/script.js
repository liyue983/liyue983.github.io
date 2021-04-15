var script = {
  data() {
    return {
      tiles: _.shuffle('123456789'.split('')),
      solution: '123456789'.split(''),
      moves: [
        [1, 3],
        [0, 2, 4],
        [1, 5],
        [0, 4, 6],
        [1, 3, 5, 7],
        [2, 4, 8],
        [3, 7],
        [4, 6, 8],
        [5, 7]
      ]
    }
  },
  watch: {
    solved(newVal, oldVal) {
      alert('Solved.');
    }
  },
  computed: {
    empty() {
      return this.tiles.findIndex(tile => tile === '9')
    },
    solved() {
      return _.isEqual(this.tiles, this.solution)
    }
  },
  methods: {
    move(i) {
      if (this.moves[i].includes(this.empty)) {
        let tileIndex  = i;
        let tile       = this.tiles[i];
        let emptyIndex = this.empty;
        
        this.$set(this.tiles, tileIndex, this.tiles[emptyIndex]);
        this.$set(this.tiles, emptyIndex, tile);
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "section",
    [
      _c(
        "transition-group",
        { attrs: { tag: "div", name: "slide", id: "puzzle" } },
        _vm._l(_vm.tiles, function(tile, i) {
          return _c(
            "div",
            {
              key: tile,
              staticClass: "tile",
              class: { empty: tile === "9" },
              on: {
                click: function($event) {
                  return _vm.move(i)
                }
              }
            },
            [_vm._v("\n      " + _vm._s(tile) + "\n    ")]
          )
        }),
        0
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-0d535568_0", { source: "\nhtml, body, section{\n  height: 100%;\n  width: 100%;\n}\nbody{\n  background: whitesmoke;\n}\nsection{\n  align-items: center;\n  display: flex;\n  justify-content: center;\n}\n#puzzle{\n  background: #CCC;\n  border: 5px solid black;\n  display: grid;\n  grid-gap: 1px;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(3, 1fr);\n  height: 240px;\n  width: 240px;\n}\n.tile{\n  align-items: center;\n  background: white;\n  border-radius: 12px;\n  cursor: pointer;\n  display: flex;\n  font-size: 36px;\n  font-weight: bold;\n  justify-content: center;\n}\n.tile.empty{\n  opacity: 0;\n  pointer-events: none;\n}\n.slide-move{\n  transition: transform .5s ease;\n}\n", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue"],"names":[],"mappings":";AA0DA;EACA,YAAA;EACA,WAAA;AACA;AAEA;EACA,sBAAA;AACA;AAEA;EACA,mBAAA;EACA,aAAA;EACA,uBAAA;AACA;AAEA;EACA,gBAAA;EACA,uBAAA;EACA,aAAA;EACA,aAAA;EACA,qCAAA;EACA,kCAAA;EACA,aAAA;EACA,YAAA;AACA;AAEA;EACA,mBAAA;EACA,iBAAA;EACA,mBAAA;EACA,eAAA;EACA,aAAA;EACA,eAAA;EACA,iBAAA;EACA,uBAAA;AACA;AAEA;EACA,UAAA;EACA,oBAAA;AACA;AAEA;EACA,8BAAA;AACA","file":"pen.vue","sourcesContent":["<template>\n  <section>\n    <transition-group tag=\"div\" name=\"slide\" id=\"puzzle\">\n      <div class=\"tile\" v-for=\"(tile, i) in tiles\" :key=\"tile\" @click=\"move(i)\":class=\"{ empty: tile === '9' }\">\n        {{ tile }}\n      </div>\n    </transition-group>\n  </section>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      tiles: _.shuffle('123456789'.split('')),\n      solution: '123456789'.split(''),\n      moves: [\n        [1, 3],\n        [0, 2, 4],\n        [1, 5],\n        [0, 4, 6],\n        [1, 3, 5, 7],\n        [2, 4, 8],\n        [3, 7],\n        [4, 6, 8],\n        [5, 7]\n      ]\n    }\n  },\n  watch: {\n    solved(newVal, oldVal) {\n      alert('Solved.')\n    }\n  },\n  computed: {\n    empty() {\n      return this.tiles.findIndex(tile => tile === '9')\n    },\n    solved() {\n      return _.isEqual(this.tiles, this.solution)\n    }\n  },\n  methods: {\n    move(i) {\n      if (this.moves[i].includes(this.empty)) {\n        let tileIndex  = i\n        let tile       = this.tiles[i]\n        let emptyIndex = this.empty\n        \n        this.$set(this.tiles, tileIndex, this.tiles[emptyIndex])\n        this.$set(this.tiles, emptyIndex, tile)\n      }\n    }\n  }\n}\n</script>\n\n<style>\nhtml, body, section{\n  height: 100%;\n  width: 100%;\n}\n\nbody{\n  background: whitesmoke;\n}\n  \nsection{\n  align-items: center;\n  display: flex;\n  justify-content: center;\n}\n\n#puzzle{\n  background: #CCC;\n  border: 5px solid black;\n  display: grid;\n  grid-gap: 1px;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(3, 1fr);\n  height: 240px;\n  width: 240px;\n}\n  \n.tile{\n  align-items: center;\n  background: white;\n  border-radius: 12px;\n  cursor: pointer;\n  display: flex;\n  font-size: 36px;\n  font-weight: bold;\n  justify-content: center;\n}\n  \n.tile.empty{\n  opacity: 0;\n  pointer-events: none;\n}\n  \n.slide-move{\n  transition: transform .5s ease;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;