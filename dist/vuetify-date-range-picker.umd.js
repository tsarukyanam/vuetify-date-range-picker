(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vuetify/lib'), require('moment')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vuetify/lib', 'moment'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VuetifyDateRangePicker = {}, global['vuetify/lib'], global.moment));
}(this, (function (exports, lib, moment) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

  // Material Design Icons v5.8.55
  var mdiCalendarRangeOutline = "M7,12H9V14H7V12M21,6V20A2,2 0 0,1 19,22H5C3.89,22 3,21.1 3,20V6A2,2 0 0,1 5,4H6V2H8V4H16V2H18V4H19A2,2 0 0,1 21,6M5,8H19V6H5V8M19,20V10H5V20H19M15,14H17V12H15V14M11,14H13V12H11V14Z";

  var DATE_FORMAT = "MMM D, YYYY";

  var script = {
    components: {
      VIcon: lib.VIcon,
      VCol: lib.VCol,
      VRow: lib.VRow,
      VSheet: lib.VSheet
    },

    name: "DateSelector",
    props: ["config"],

    data: function () { return ({
      icon: {
        mdiCalendarRangeOutline: mdiCalendarRangeOutline,
      },
      compare: true,
      moment: moment__default['default'],
    }); },

    created: function created() {
      this.compare = this.config.compare || false;
    },

    // computed
    computed: {
      getDateStart: function getDateStart() {
        return this.config.dateStart
          ? this.moment(this.config.dateStart).format(DATE_FORMAT)
          : this.moment()
              .subtract(7, "days")
              .format(DATE_FORMAT)
      },

      getDateUntil: function getDateUntil() {
        return this.config.dateUntil
          ? this.moment(this.config.dateUntil).format(DATE_FORMAT)
          : this.moment()
              .subtract(1, "day")
              .format(DATE_FORMAT)
      },

      getCompareStart: function getCompareStart() {
        return this.config.compareStart
          ? this.moment(this.config.compareStart).format(DATE_FORMAT)
          : this.moment()
              .subtract(15, "days")
              .format(DATE_FORMAT)
      },

      getCompareUntil: function getCompareUntil() {
        return this.config.compareUntil
          ? this.moment(this.config.compareUntil).format(DATE_FORMAT)
          : this.moment()
              .subtract(8, "days")
              .format(DATE_FORMAT)
      },
    }
  }; // export

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
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
      var hook;
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
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
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
                  { style.element.setAttribute('media', css.media); }
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
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "v-sheet",
      {
        staticClass: "date-selector d-inline-block elevation-2 rounded",
        attrs: { "max-height": "44px" }
      },
      [
        _c(
          "v-row",
          [
            _c(
              "v-col",
              {
                staticClass:
                  "date-selector__icon d-flex align-center py-1 px-6 pr-8"
              },
              [_c("v-icon", [_vm._v(_vm._s(_vm.icon.mdiCalendarRangeOutline))])],
              1
            ),
            _vm._v(" "),
            _c(
              "v-col",
              {
                staticClass: "date-selector__info d-flex align-center pa-1",
                staticStyle: { "line-height": "10px" }
              },
              [
                _vm._v(
                  "\n      " +
                    _vm._s(_vm.getDateStart) +
                    " — " +
                    _vm._s(_vm.getDateUntil) +
                    "\n\n      "
                ),
                _vm.compare
                  ? _c("small", { staticClass: "d-flex mt-n2" }, [
                      _vm._v(
                        "\n        Compare to: " +
                          _vm._s(_vm.getCompareStart) +
                          " — " +
                          _vm._s(_vm.getCompareUntil) +
                          "\n      "
                      )
                    ])
                  : _vm._e()
              ]
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-12217c9c_0", { source: ".date-selector[data-v-12217c9c] {\n  min-width: 250px;\n  max-width: 290px;\n  cursor: pointer;\n}\n.date-selector[data-v-12217c9c] .date-selector__icon {\n  max-width: 3rem;\n  min-height: 3rem;\n}\n.date-selector[data-v-12217c9c] .date-selector__info {\n  flex-wrap: wrap;\n  min-height: 3rem;\n  font-size: 0.9em;\n}\n\n/*# sourceMappingURL=DateSelector.vue.map */", map: {"version":3,"sources":["/Users/mark/Sites/npm-packages/vuetify-date-range-picker/src/components/DateSelector.vue","DateSelector.vue"],"names":[],"mappings":"AAqBA;EACA,gBAAA;EACA,gBAAA;EACA,eAAA;ACpBA;ADsBA;EACA,eAAA;EACA,gBAAA;ACpBA;ADuBA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;ACrBA;;AAEA,2CAA2C","file":"DateSelector.vue","sourcesContent":["<template>\n  <v-sheet max-height=\"44px\" class=\"date-selector d-inline-block elevation-2 rounded\">\n    <v-row>\n      <v-col class=\"date-selector__icon d-flex align-center py-1 px-6 pr-8\">\n        <v-icon>{{ icon.mdiCalendarRangeOutline }}</v-icon>\n      </v-col>\n\n      <v-col style=\"line-height: 10px\" class=\"date-selector__info d-flex align-center pa-1\">\n        {{ getDateStart }} &mdash; {{ getDateUntil }}\n\n        <small class=\"d-flex mt-n2\" v-if=\"compare\">\n          Compare to: {{ getCompareStart }} &mdash; {{ getCompareUntil }}\n        </small>\n      </v-col>\n    </v-row>\n  </v-sheet>\n</template>\n\n<style lang=\"scss\" scoped>\n// @import \"~vuetify/src/styles/styles.sass\";\n\n.date-selector::v-deep {\n  min-width: 250px;\n  max-width: 290px;\n  cursor: pointer;\n\n  .date-selector__icon {\n    max-width: 3rem;\n    min-height: 3rem;\n  }\n\n  .date-selector__info {\n    flex-wrap: wrap;\n    min-height: 3rem;\n    font-size: 0.9em;\n  }\n}\n</style>\n\n<script>\nimport moment from \"moment\"\nimport { mdiCalendarRangeOutline } from \"@mdi/js\"\n\nconst DATE_FORMAT = \"MMM D, YYYY\"\n\nexport default {\n  name: \"DateSelector\",\n  props: [\"config\"],\n\n  data: () => ({\n    icon: {\n      mdiCalendarRangeOutline,\n    },\n    compare: true,\n    moment: moment,\n  }),\n\n  created() {\n    this.compare = this.config.compare || false\n  },\n\n  computed: {\n    getDateStart() {\n      return this.config.dateStart\n        ? this.moment(this.config.dateStart).format(DATE_FORMAT)\n        : this.moment()\n            .subtract(7, \"days\")\n            .format(DATE_FORMAT)\n    },\n\n    getDateUntil() {\n      return this.config.dateUntil\n        ? this.moment(this.config.dateUntil).format(DATE_FORMAT)\n        : this.moment()\n            .subtract(1, \"day\")\n            .format(DATE_FORMAT)\n    },\n\n    getCompareStart() {\n      return this.config.compareStart\n        ? this.moment(this.config.compareStart).format(DATE_FORMAT)\n        : this.moment()\n            .subtract(15, \"days\")\n            .format(DATE_FORMAT)\n    },\n\n    getCompareUntil() {\n      return this.config.compareUntil\n        ? this.moment(this.config.compareUntil).format(DATE_FORMAT)\n        : this.moment()\n            .subtract(8, \"days\")\n            .format(DATE_FORMAT)\n    },\n  }, // computed\n} // export\n</script>\n",".date-selector::v-deep {\n  min-width: 250px;\n  max-width: 290px;\n  cursor: pointer;\n}\n.date-selector::v-deep .date-selector__icon {\n  max-width: 3rem;\n  min-height: 3rem;\n}\n.date-selector::v-deep .date-selector__info {\n  flex-wrap: wrap;\n  min-height: 3rem;\n  font-size: 0.9em;\n}\n\n/*# sourceMappingURL=DateSelector.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-12217c9c";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
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

  var DATE_FORMAT$1 = "YYYY-MM-DD";
  var MONTH_FORMAT = "YYYY-MM";

  var script$1 = {
    components: {
      VDatePicker: lib.VDatePicker,
      VCol: lib.VCol,
      VRow: lib.VRow,
      VTextField: lib.VTextField,
      VBtn: lib.VBtn,
      VCheckbox: lib.VCheckbox,
      VCardText: lib.VCardText,
      VSpacer: lib.VSpacer,
      VCardActions: lib.VCardActions,
      VCard: lib.VCard
    },

    name: "DatePickerDesktop",
    props: ["config"],

    data: function () { return ({
      today: null,
      compare_: false,

      pickerMain: [], // to use moment.js this has to be set in mounted()
      pickerCompare: [], // to use moment.js this has to be set in mounted()
      pickerMainIsActive: true,
      pickerMainLeft: null,
      pickerMainRight: null,
      pickerCompareLeft: null,
      pickerCompareRight: null,
      moment: moment__default['default'],
    }); },

    // mounted ()
    mounted: function mounted() {
      var moment = this.moment;
      this.today = moment().format(DATE_FORMAT$1);

      this.compare = this.config.compare || false;

      console.log("CONFIG", this.config, this.compare_);
      this.pickerMainLeft = moment()
        .subtract(1, "month")
        .format(MONTH_FORMAT);
      this.pickerMainRight = moment().format(MONTH_FORMAT);

      this.pickerMain = [
        moment()
          .subtract(7, "days")
          .format(DATE_FORMAT$1),
        moment()
          .subtract(1, "day")
          .format(DATE_FORMAT$1) ];

      this.pickerCompare = [
        moment()
          .subtract(15, "day")
          .format(DATE_FORMAT$1),
        moment()
          .subtract(8, "days")
          .format(DATE_FORMAT$1) ];

      this.compare = this.compareRanges;
    },

    // computed()
    computed: {
      compare: {
        get: function get() {
          return this.compare_
        },
        set: function set(val) {
          this.compare_ = val;
          this.pickerMainIsActive = !this.compare_;
        },
      }, // compare
    },

    // watch()
    watch: {
      // Left and right date pickers should move accordingly
      pickerMainLeft: function(val) {
        this.pickerMainRight = this.moment(val)
          .add(1, "month")
          .format(MONTH_FORMAT);
      },

      pickerMainRight: function(val) {
        this.pickerMainLeft = this.moment(val)
          .subtract(1, "month")
          .format(MONTH_FORMAT);
      },

      // The compare date picker should display the same month as the primary one
      pickerCompareLeft: function(val) {
        this.pickerCompareRight = this.moment(val)
          .add(1, "month")
          .format(MONTH_FORMAT);
      },

      pickerCompareRight: function(val) {
        this.pickerCompareLeft = this.moment(val)
          .subtract(1, "month")
          .format(MONTH_FORMAT);
      },
    },

    // methods()
    methods: {
      // Sets the main date picker to the last week,
      // meaning if it's Friday it sets the range from last
      // Friday to yesterday
      setMainLast7Days: function setMainLast7Days() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(7, "days")
          .format(MONTH_FORMAT);

        this.pickerMain = [
          moment()
            .subtract(7, "days")
            .format(DATE_FORMAT$1),
          moment()
            .subtract(1, "day")
            .format(DATE_FORMAT$1) ];
      }, // setMainLast7Days()

      // Sets the main date picker to the Monday to Sunday of the previous week
      setMainPrevWeek: function setMainPrevWeek() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(1, "week")
          .day(1)
          .format(MONTH_FORMAT);

        this.pickerMain = [
          moment()
            .subtract(1, "week")
            .day(1)
            .format(DATE_FORMAT$1),
          moment()
            .subtract(1, "week")
            .day(7)
            .format(DATE_FORMAT$1) ];
      }, // setMainPrevWeek()

      // Sets the main date picker to the last month,
      // meaning, if it's 20 March it starts the range
      // from 20 Feb. to yesterday.
      // If it's 31 March, the range begins at 28 or 29 Feb.
      setMainLastMonth: function setMainLastMonth() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(1, "month")
          .format(DATE_FORMAT$1);

        this.pickerMain = [
          moment()
            .subtract(1, "month")
            .format(DATE_FORMAT$1),
          moment()
            .subtract(1, "day")
            .format(DATE_FORMAT$1) ];
      }, // setMainLastMonth()

      // Sets the range to 1st to last of the previous month.
      setMainPrevMonth: function setMainPrevMonth() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(1, "month")
          .date(1)
          .format(MONTH_FORMAT);

        this.pickerMain = [
          moment()
            .subtract(1, "month")
            .date(1)
            .format(DATE_FORMAT$1),
          moment()
            .date(0)
            .format(DATE_FORMAT$1) ];
      }, // setMainPrevMonth()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousPeriod: function setComparePreviousPeriod() {
        var moment = this.moment;
        var mainRangeStart = this.pickerMain[0];
        var mainRangeEnd = this.pickerMain[1];

        var mainDuration = moment(mainRangeEnd).diff(moment(mainRangeStart), "days");

        this.pickerMainIsActive = false;
        this.pickerMainLeft = moment(mainRangeStart)
          .subtract(1 + mainDuration, "days")
          .format(MONTH_FORMAT);
        this.pickerCompareLeft = moment(mainRangeEnd)
          .subtract(1 + mainDuration, "days")
          .format(MONTH_FORMAT);

        this.pickerCompare = [
          moment(mainRangeStart)
            .subtract(1 + mainDuration, "days")
            .format(DATE_FORMAT$1),
          moment(mainRangeEnd)
            .subtract(1 + mainDuration, "days")
            .format(DATE_FORMAT$1) ];
      }, // setComparePreviousPeriod()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousMonth: function setComparePreviousMonth() {
        var moment = this.moment;

        this.pickerMainIsActive = false;
        this.pickerMainLeft = moment(this.pickerMain[0])
          .subtract(1, "month")
          .format(MONTH_FORMAT);
        this.pickerCompareLeft = moment(this.pickerMain[0])
          .subtract(1, "month")
          .format(MONTH_FORMAT);

        this.pickerCompare = [
          moment(this.pickerMain[0])
            .subtract(1, "month")
            .format(DATE_FORMAT$1),
          moment(this.pickerMain[1])
            .subtract(1, "month")
            .format(DATE_FORMAT$1) ];
      }, // setComparePreviousMonth()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousYear: function setComparePreviousYear() {
        var moment = this.moment;

        this.pickerMainIsActive = false;
        this.pickerMainLeft = moment(this.pickerMain[0])
          .subtract(1, "year")
          .format(MONTH_FORMAT);
        this.pickerCompareLeft = moment(this.pickerMain[0])
          .subtract(1, "year")
          .format(MONTH_FORMAT);

        this.pickerCompare = [
          moment(this.pickerMain[0])
            .subtract(1, "year")
            .format(DATE_FORMAT$1),
          moment(this.pickerMain[1])
            .subtract(1, "year")
            .format(DATE_FORMAT$1) ];
      }, // setComparePreviousYear()

      close: function close() {
        this.$emit("close");
      }, // close()

      applyDates: function applyDates() {
        this.pickerMain.sort();
        this.pickerCompare.sort();

        this.$emit("change", {
          dateStart: this.pickerMain[0],
          dateUntil: this.pickerMain[1],
          compareStart: this.pickerCompare[0],
          compareUntil: this.pickerCompare[1],
          compare: this.compare,
        });

        this.close();
      }, // applyDates()
    }
  }; // export

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "v-card",
      { staticClass: "date-picker-desktop elevation-4 mx-auto" },
      [
        _c(
          "v-card-text",
          { staticClass: "pickers" },
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  { attrs: { cols: "7" } },
                  [
                    _c(
                      "v-row",
                      {
                        class: [
                          "picker-main",
                          _vm.pickerMainIsActive ? "active" : ""
                        ]
                      },
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-date-picker", {
                              staticClass: "picker-main-left pr-1",
                              attrs: {
                                "no-title": "",
                                "first-day-of-week": "1",
                                range: "",
                                color: "blue darken-2 picker-main-selected",
                                max: _vm.today,
                                "picker-date": _vm.pickerMainLeft
                              },
                              on: {
                                "update:pickerDate": function($event) {
                                  _vm.pickerMainLeft = $event;
                                },
                                "update:picker-date": function($event) {
                                  _vm.pickerMainLeft = $event;
                                }
                              },
                              model: {
                                value: _vm.pickerMain,
                                callback: function($$v) {
                                  _vm.pickerMain = $$v;
                                },
                                expression: "pickerMain"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-date-picker", {
                              staticClass: "picker-main-right",
                              attrs: {
                                "no-title": "",
                                "first-day-of-week": "1",
                                range: "",
                                color: "blue darken-2 picker-main-selected",
                                max: this.today,
                                "picker-date": _vm.pickerMainRight
                              },
                              on: {
                                "update:pickerDate": function($event) {
                                  _vm.pickerMainRight = $event;
                                },
                                "update:picker-date": function($event) {
                                  _vm.pickerMainRight = $event;
                                }
                              },
                              model: {
                                value: _vm.pickerMain,
                                callback: function($$v) {
                                  _vm.pickerMain = $$v;
                                },
                                expression: "pickerMain"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.compare
                      ? _c(
                          "v-row",
                          {
                            staticClass: "picker-compare",
                            attrs: { justify: "center" }
                          },
                          [
                            _c(
                              "v-col",
                              { attrs: { cols: "6" } },
                              [
                                _c("v-date-picker", {
                                  staticClass: "picker-compare-left pr-1",
                                  attrs: {
                                    "no-title": "",
                                    "show-current": "false",
                                    "first-day-of-week": "1",
                                    range: "",
                                    color:
                                      "orange darken-4 picker-compare-selected",
                                    max: this.today,
                                    "picker-date": _vm.pickerMainLeft
                                  },
                                  on: {
                                    "update:pickerDate": function($event) {
                                      _vm.pickerMainLeft = $event;
                                    },
                                    "update:picker-date": function($event) {
                                      _vm.pickerMainLeft = $event;
                                    }
                                  },
                                  model: {
                                    value: _vm.pickerCompare,
                                    callback: function($$v) {
                                      _vm.pickerCompare = $$v;
                                    },
                                    expression: "pickerCompare"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              { attrs: { cols: "6" } },
                              [
                                _c("v-date-picker", {
                                  staticClass: "picker-compare-right",
                                  attrs: {
                                    "no-title": "",
                                    "show-current": "false",
                                    "first-day-of-week": "1",
                                    range: "",
                                    color:
                                      "orange darken-4 picker-compare-selected",
                                    max: this.today,
                                    "picker-date": _vm.pickerMainRight
                                  },
                                  on: {
                                    "update:pickerDate": function($event) {
                                      _vm.pickerMainRight = $event;
                                    },
                                    "update:picker-date": function($event) {
                                      _vm.pickerMainRight = $event;
                                    }
                                  },
                                  model: {
                                    value: _vm.pickerCompare,
                                    callback: function($$v) {
                                      _vm.pickerCompare = $$v;
                                    },
                                    expression: "pickerCompare"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  { attrs: { cols: "5" } },
                  [
                    _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                label: "From",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = true;
                                }
                              },
                              model: {
                                value: _vm.pickerMain[0],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerMain, 0, $$v);
                                },
                                expression: "pickerMain[0]"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                label: "To",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = true;
                                }
                              },
                              model: {
                                value: _vm.pickerMain[1],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerMain, 1, $$v);
                                },
                                expression: "pickerMain[1]"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      { staticClass: "pl-2 pr-1" },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainLast7Days }
                          },
                          [_vm._v("Last 7 days")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainPrevWeek }
                          },
                          [_vm._v("Prev. week")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainLastMonth }
                          },
                          [_vm._v("Last month")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainPrevMonth }
                          },
                          [_vm._v("Prev. month")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      { staticClass: "pl-2 pt-6" },
                      [
                        _c("v-checkbox", {
                          staticClass: "compare-label",
                          attrs: { label: "Compare to the following" },
                          model: {
                            value: _vm.compare,
                            callback: function($$v) {
                              _vm.compare = $$v;
                            },
                            expression: "compare"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                disabled: !_vm.compare,
                                label: "From",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = false;
                                }
                              },
                              model: {
                                value: _vm.pickerCompare[0],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerCompare, 0, $$v);
                                },
                                expression: "pickerCompare[0]"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                disabled: !_vm.compare,
                                label: "To",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = false;
                                }
                              },
                              model: {
                                value: _vm.pickerCompare[1],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerCompare, 1, $$v);
                                },
                                expression: "pickerCompare[1]"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      { staticClass: "pl-2" },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              text: "",
                              "x-small": "",
                              disabled: !_vm.compare
                            },
                            on: { click: _vm.setComparePreviousPeriod }
                          },
                          [_vm._v("\n            Previous period\n          ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              text: "",
                              "x-small": "",
                              disabled: !_vm.compare
                            },
                            on: { click: _vm.setComparePreviousMonth }
                          },
                          [_vm._v("\n            Previous month\n          ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              text: "",
                              "x-small": "",
                              disabled: !_vm.compare
                            },
                            on: { click: _vm.setComparePreviousYear }
                          },
                          [_vm._v("\n            Previous year\n          ")]
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-card-actions",
          [
            _c("v-spacer"),
            _vm._v(" "),
            _c(
              "v-btn",
              {
                staticClass: "px-4 mr-6",
                attrs: { text: "" },
                on: { click: _vm.close }
              },
              [_vm._v("Cancel")]
            ),
            _vm._v(" "),
            _c(
              "v-btn",
              {
                staticClass: "primary px-7",
                attrs: { large: "" },
                on: { click: _vm.applyDates }
              },
              [_vm._v("Apply")]
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = function (inject) {
      if (!inject) { return }
      inject("data-v-bba21826_0", { source: ".date-picker-desktop[data-v-bba21826] {\n  max-width: 1040px;\n  margin-top: 5vh;\n}\n.date-picker-desktop[data-v-bba21826] .pickers {\n  max-height: 23em;\n}\n.date-picker-desktop[data-v-bba21826] .pickers .v-text-field__details {\n  display: none;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main {\n  position: relative;\n  z-index: 1;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main .v-picker {\n  background-color: transparent;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main.active {\n  z-index: 1000;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main .v-picker__body {\n  background-color: transparent;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main .v-date-picker-table button:not(.picker-main-selected) {\n  background-color: transparent;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main:not(.active) .picker-main-selected {\n  color: darkgrey;\n}\n.date-picker-desktop[data-v-bba21826] .picker-compare {\n  transform: translateY(-100%);\n  position: relative;\n  z-index: 2;\n}\n.date-picker-desktop[data-v-bba21826] .picker-compare .v-date-picker-header {\n  opacity: 0;\n}\n.date-picker-desktop[data-v-bba21826] .picker-compare .v-date-picker-table thead {\n  opacity: 0;\n}\n.date-picker-desktop[data-v-bba21826] .picker-compare .v-date-picker-table button:not(.picker-compare-selected) {\n  color: transparent;\n}\n.date-picker-desktop[data-v-bba21826] .picker-compare .v-picker {\n  background-color: transparent !important;\n}\n.date-picker-desktop[data-v-bba21826] .picker-compare .v-picker .v-picker__body {\n  background-color: transparent !important;\n}\n.date-picker-desktop[data-v-bba21826] .compare-label .v-messages {\n  display: none;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main-left .v-date-picker-header > button:nth-of-type(2) {\n  display: none;\n}\n.date-picker-desktop[data-v-bba21826] .picker-main-right .v-date-picker-header > button:nth-of-type(1) {\n  display: none;\n}\n\n/*# sourceMappingURL=DatePickerDesktop.vue.map */", map: {"version":3,"sources":["/Users/mark/Sites/npm-packages/vuetify-date-range-picker/src/components/DatePickerDesktop.vue","DatePickerDesktop.vue"],"names":[],"mappings":"AAobA;EACA,iBAAA;EACA,eAAA;ACnbA;ADqbA;EACA,gBAAA;ACnbA;ADqbA;EACA,aAAA;ACnbA;ADubA;EACA,kBAAA;EACA,UAAA;ACrbA;ADubA;EACA,6BAAA;ACrbA;ADwbA;EACA,aAAA;ACtbA;AD0bA;EACA,6BAAA;ACxbA;AD4bA;EACA,6BAAA;AC1bA;AD+bA;EACA,eAAA;AC7bA;ADqcA;EACA,4BAAA;EAEA,kBAAA;EACA,UAAA;ACpcA;ADucA;EACA,UAAA;ACrcA;ADycA;EACA,UAAA;ACvcA;AD0cA;EACA,kBAAA;ACxcA;AD4cA;EACA,wCAAA;AC1cA;AD2cA;EACA,wCAAA;ACzcA;AD+cA;EACA,aAAA;AC7cA;ADidA;EACA,aAAA;AC/cA;ADkdA;EACA,aAAA;AChdA;;AAEA,gDAAgD","file":"DatePickerDesktop.vue","sourcesContent":["<template>\n  <v-card class=\"date-picker-desktop elevation-4 mx-auto\">\n    <v-card-text class=\"pickers\">\n      <v-row>\n        <v-col cols=\"7\">\n          <v-row :class=\"['picker-main', pickerMainIsActive ? 'active' : '']\">\n            <v-col cols=\"6\">\n              <v-date-picker\n                v-model=\"pickerMain\"\n                no-title\n                first-day-of-week=\"1\"\n                range\n                color=\"blue darken-2 picker-main-selected\"\n                :max=\"today\"\n                :picker-date.sync=\"pickerMainLeft\"\n                class=\"picker-main-left pr-1\"\n              />\n            </v-col>\n            <v-col cols=\"6\">\n              <v-date-picker\n                v-model=\"pickerMain\"\n                no-title\n                first-day-of-week=\"1\"\n                range\n                color=\"blue darken-2 picker-main-selected\"\n                :max=\"this.today\"\n                :picker-date.sync=\"pickerMainRight\"\n                class=\"picker-main-right\"\n              />\n            </v-col>\n          </v-row>\n\n          <v-row justify=\"center\" class=\"picker-compare\" v-if=\"compare\">\n            <v-col cols=\"6\">\n              <v-date-picker\n                v-model=\"pickerCompare\"\n                no-title\n                show-current=\"false\"\n                first-day-of-week=\"1\"\n                range\n                color=\"orange darken-4 picker-compare-selected\"\n                :max=\"this.today\"\n                :picker-date.sync=\"pickerMainLeft\"\n                class=\"picker-compare-left pr-1\"\n              />\n            </v-col>\n            <v-col cols=\"6\">\n              <v-date-picker\n                v-model=\"pickerCompare\"\n                no-title\n                show-current=\"false\"\n                first-day-of-week=\"1\"\n                range\n                color=\"orange darken-4 picker-compare-selected\"\n                :max=\"this.today\"\n                :picker-date.sync=\"pickerMainRight\"\n                class=\"picker-compare-right\"\n              />\n            </v-col>\n          </v-row>\n        </v-col>\n\n        <v-col cols=\"5\">\n          <v-row>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerMain[0]\"\n                label=\"From\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = true\"\n              />\n            </v-col>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerMain[1]\"\n                label=\"To\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = true\"\n              />\n            </v-col>\n          </v-row>\n\n          <v-row class=\"pl-2 pr-1\">\n            <v-btn text x-small @click=\"setMainLast7Days\">Last 7 days</v-btn>\n            <v-btn text x-small @click=\"setMainPrevWeek\">Prev. week</v-btn>\n            <v-btn text x-small @click=\"setMainLastMonth\">Last month</v-btn>\n            <v-btn text x-small @click=\"setMainPrevMonth\">Prev. month</v-btn>\n          </v-row>\n\n          <v-row class=\"pl-2 pt-6\">\n            <v-checkbox v-model=\"compare\" label=\"Compare to the following\" class=\"compare-label\" />\n          </v-row>\n\n          <v-row>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerCompare[0]\"\n                :disabled=\"!compare\"\n                label=\"From\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = false\"\n              />\n            </v-col>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerCompare[1]\"\n                :disabled=\"!compare\"\n                label=\"To\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = false\"\n              />\n            </v-col>\n          </v-row>\n\n          <v-row class=\"pl-2\">\n            <v-btn text x-small :disabled=\"!compare\" @click=\"setComparePreviousPeriod\">\n              Previous period\n            </v-btn>\n            <v-btn text x-small :disabled=\"!compare\" @click=\"setComparePreviousMonth\">\n              Previous month\n            </v-btn>\n            <v-btn text x-small :disabled=\"!compare\" @click=\"setComparePreviousYear\">\n              Previous year\n            </v-btn>\n          </v-row>\n        </v-col>\n      </v-row>\n    </v-card-text>\n\n    <v-card-actions>\n      <v-spacer />\n      <v-btn text class=\"px-4 mr-6\" @click=\"close\">Cancel</v-btn>\n      <v-btn large class=\"primary px-7\" @click=\"applyDates\">Apply</v-btn>\n    </v-card-actions>\n  </v-card>\n</template>\n\n<script>\nimport moment from \"moment\"\n\nconst DATE_FORMAT = \"YYYY-MM-DD\"\nconst MONTH_FORMAT = \"YYYY-MM\"\n\nexport default {\n  name: \"DatePickerDesktop\",\n\n  props: [\"config\"],\n\n  data: () => ({\n    today: null,\n    compare_: false,\n\n    pickerMain: [], // to use moment.js this has to be set in mounted()\n    pickerCompare: [], // to use moment.js this has to be set in mounted()\n    pickerMainIsActive: true,\n    pickerMainLeft: null,\n    pickerMainRight: null,\n    pickerCompareLeft: null,\n    pickerCompareRight: null,\n    moment: moment,\n  }),\n\n  mounted() {\n    const moment = this.moment\n    this.today = moment().format(DATE_FORMAT)\n\n    this.compare = this.config.compare || false\n\n    console.log(\"CONFIG\", this.config, this.compare_)\n    this.pickerMainLeft = moment()\n      .subtract(1, \"month\")\n      .format(MONTH_FORMAT)\n    this.pickerMainRight = moment().format(MONTH_FORMAT)\n\n    this.pickerMain = [\n      moment()\n        .subtract(7, \"days\")\n        .format(DATE_FORMAT),\n      moment()\n        .subtract(1, \"day\")\n        .format(DATE_FORMAT),\n    ]\n\n    this.pickerCompare = [\n      moment()\n        .subtract(15, \"day\")\n        .format(DATE_FORMAT),\n      moment()\n        .subtract(8, \"days\")\n        .format(DATE_FORMAT),\n    ]\n\n    this.compare = this.compareRanges\n  }, // mounted ()\n\n  computed: {\n    compare: {\n      get() {\n        return this.compare_\n      },\n      set(val) {\n        this.compare_ = val\n        this.pickerMainIsActive = !this.compare_\n      },\n    }, // compare\n  }, // computed()\n\n  watch: {\n    // Left and right date pickers should move accordingly\n    pickerMainLeft: function(val) {\n      this.pickerMainRight = this.moment(val)\n        .add(1, \"month\")\n        .format(MONTH_FORMAT)\n    },\n\n    pickerMainRight: function(val) {\n      this.pickerMainLeft = this.moment(val)\n        .subtract(1, \"month\")\n        .format(MONTH_FORMAT)\n    },\n\n    // The compare date picker should display the same month as the primary one\n    pickerCompareLeft: function(val) {\n      this.pickerCompareRight = this.moment(val)\n        .add(1, \"month\")\n        .format(MONTH_FORMAT)\n    },\n\n    pickerCompareRight: function(val) {\n      this.pickerCompareLeft = this.moment(val)\n        .subtract(1, \"month\")\n        .format(MONTH_FORMAT)\n    },\n  }, // watch()\n\n  methods: {\n    // Sets the main date picker to the last week,\n    // meaning if it's Friday it sets the range from last\n    // Friday to yesterday\n    setMainLast7Days() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(7, \"days\")\n        .format(MONTH_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(7, \"days\")\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"day\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainLast7Days()\n\n    // Sets the main date picker to the Monday to Sunday of the previous week\n    setMainPrevWeek() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(1, \"week\")\n        .day(1)\n        .format(MONTH_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"week\")\n          .day(1)\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"week\")\n          .day(7)\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainPrevWeek()\n\n    // Sets the main date picker to the last month,\n    // meaning, if it's 20 March it starts the range\n    // from 20 Feb. to yesterday.\n    // If it's 31 March, the range begins at 28 or 29 Feb.\n    setMainLastMonth() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(1, \"month\")\n        .format(DATE_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"day\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainLastMonth()\n\n    // Sets the range to 1st to last of the previous month.\n    setMainPrevMonth() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(1, \"month\")\n        .date(1)\n        .format(MONTH_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"month\")\n          .date(1)\n          .format(DATE_FORMAT),\n        moment()\n          .date(0)\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainPrevMonth()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousPeriod() {\n      const moment = this.moment\n      const mainRangeStart = this.pickerMain[0]\n      const mainRangeEnd = this.pickerMain[1]\n\n      const mainDuration = moment(mainRangeEnd).diff(moment(mainRangeStart), \"days\")\n\n      this.pickerMainIsActive = false\n      this.pickerMainLeft = moment(mainRangeStart)\n        .subtract(1 + mainDuration, \"days\")\n        .format(MONTH_FORMAT)\n      this.pickerCompareLeft = moment(mainRangeEnd)\n        .subtract(1 + mainDuration, \"days\")\n        .format(MONTH_FORMAT)\n\n      this.pickerCompare = [\n        moment(mainRangeStart)\n          .subtract(1 + mainDuration, \"days\")\n          .format(DATE_FORMAT),\n        moment(mainRangeEnd)\n          .subtract(1 + mainDuration, \"days\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousPeriod()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousMonth() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = false\n      this.pickerMainLeft = moment(this.pickerMain[0])\n        .subtract(1, \"month\")\n        .format(MONTH_FORMAT)\n      this.pickerCompareLeft = moment(this.pickerMain[0])\n        .subtract(1, \"month\")\n        .format(MONTH_FORMAT)\n\n      this.pickerCompare = [\n        moment(this.pickerMain[0])\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n        moment(this.pickerMain[1])\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousMonth()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousYear() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = false\n      this.pickerMainLeft = moment(this.pickerMain[0])\n        .subtract(1, \"year\")\n        .format(MONTH_FORMAT)\n      this.pickerCompareLeft = moment(this.pickerMain[0])\n        .subtract(1, \"year\")\n        .format(MONTH_FORMAT)\n\n      this.pickerCompare = [\n        moment(this.pickerMain[0])\n          .subtract(1, \"year\")\n          .format(DATE_FORMAT),\n        moment(this.pickerMain[1])\n          .subtract(1, \"year\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousYear()\n\n    close() {\n      this.$emit(\"close\")\n    }, // close()\n\n    applyDates() {\n      this.pickerMain.sort()\n      this.pickerCompare.sort()\n\n      this.$emit(\"change\", {\n        dateStart: this.pickerMain[0],\n        dateUntil: this.pickerMain[1],\n        compareStart: this.pickerCompare[0],\n        compareUntil: this.pickerCompare[1],\n        compare: this.compare,\n      })\n\n      this.close()\n    }, // applyDates()\n  }, // methods()\n} // export\n</script>\n\n<style lang=\"scss\" scoped>\n// @import \"~vuetify/src/styles/styles.sass\";\n\n.date-picker-desktop::v-deep {\n  max-width: 1040px;\n  margin-top: 5vh;\n\n  .pickers {\n    max-height: 23em;\n\n    .v-text-field__details {\n      display: none;\n    }\n  } // .pickers\n\n  .picker-main {\n    position: relative;\n    z-index: 1;\n\n    .v-picker {\n      background-color: transparent;\n    } // .v-picker\n\n    &.active {\n      z-index: 1000;\n    } // .v-picker.active\n\n    // Body should be rendered but not visible\n    .v-picker__body {\n      background-color: transparent;\n    } // .v-picker__body\n\n    .v-date-picker-table {\n      button:not(.picker-main-selected) {\n        background-color: transparent;\n      }\n    } // .v-date-picker-table\n\n    &:not(.active) {\n      .picker-main-selected {\n        color: darkgrey;\n      }\n    }\n  } // .picker-main\n\n  // The secondary date picker should be translated\n  // over the primary and many of its elements should\n  // become invisible.\n  .picker-compare {\n    transform: translateY(-100%);\n\n    position: relative;\n    z-index: 2;\n\n    // Header should be rendered but not visible\n    .v-date-picker-header {\n      opacity: 0;\n    }\n\n    .v-date-picker-table {\n      thead {\n        opacity: 0;\n      }\n\n      button:not(.picker-compare-selected) {\n        color: transparent;\n      }\n    } // .v-date-picker-table\n\n    .v-picker {\n      background-color: transparent !important;\n      .v-picker__body {\n        background-color: transparent !important;\n      }\n    } // > .v-picker\n  } // .picker-compare\n\n  .compare-label {\n    .v-messages {\n      display: none;\n    }\n  } // .compare-label\n\n  .picker-main-left .v-date-picker-header > button:nth-of-type(2) {\n    display: none;\n  }\n\n  .picker-main-right .v-date-picker-header > button:nth-of-type(1) {\n    display: none;\n  }\n} // .date-picker-desktop\n</style>\n",".date-picker-desktop::v-deep {\n  max-width: 1040px;\n  margin-top: 5vh;\n}\n.date-picker-desktop::v-deep .pickers {\n  max-height: 23em;\n}\n.date-picker-desktop::v-deep .pickers .v-text-field__details {\n  display: none;\n}\n.date-picker-desktop::v-deep .picker-main {\n  position: relative;\n  z-index: 1;\n}\n.date-picker-desktop::v-deep .picker-main .v-picker {\n  background-color: transparent;\n}\n.date-picker-desktop::v-deep .picker-main.active {\n  z-index: 1000;\n}\n.date-picker-desktop::v-deep .picker-main .v-picker__body {\n  background-color: transparent;\n}\n.date-picker-desktop::v-deep .picker-main .v-date-picker-table button:not(.picker-main-selected) {\n  background-color: transparent;\n}\n.date-picker-desktop::v-deep .picker-main:not(.active) .picker-main-selected {\n  color: darkgrey;\n}\n.date-picker-desktop::v-deep .picker-compare {\n  transform: translateY(-100%);\n  position: relative;\n  z-index: 2;\n}\n.date-picker-desktop::v-deep .picker-compare .v-date-picker-header {\n  opacity: 0;\n}\n.date-picker-desktop::v-deep .picker-compare .v-date-picker-table thead {\n  opacity: 0;\n}\n.date-picker-desktop::v-deep .picker-compare .v-date-picker-table button:not(.picker-compare-selected) {\n  color: transparent;\n}\n.date-picker-desktop::v-deep .picker-compare .v-picker {\n  background-color: transparent !important;\n}\n.date-picker-desktop::v-deep .picker-compare .v-picker .v-picker__body {\n  background-color: transparent !important;\n}\n.date-picker-desktop::v-deep .compare-label .v-messages {\n  display: none;\n}\n.date-picker-desktop::v-deep .picker-main-left .v-date-picker-header > button:nth-of-type(2) {\n  display: none;\n}\n.date-picker-desktop::v-deep .picker-main-right .v-date-picker-header > button:nth-of-type(1) {\n  display: none;\n}\n\n/*# sourceMappingURL=DatePickerDesktop.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$1 = "data-v-bba21826";
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  var DATE_FORMAT$2 = "YYYY-MM-DD";
  var MONTH_FORMAT$1 = "YYYY-MM";

  var script$2 = {
    components: {
      VDatePicker: lib.VDatePicker,
      VCol: lib.VCol,
      VRow: lib.VRow,
      VTextField: lib.VTextField,
      VBtn: lib.VBtn,
      VCheckbox: lib.VCheckbox,
      VCardText: lib.VCardText,
      VSpacer: lib.VSpacer,
      VCardActions: lib.VCardActions,
      VCard: lib.VCard
    },

    name: "DatePickerTablet",
    props: ["compare-ranges"],

    data: function () { return ({
      compare_: false,
      today: null,
      pickerMain: [], // to use moment.js this has to be set in mounted()
      pickerCompare: [], // to use moment.js this has to be set in mounted()
      pickerMainIsActive: true,
      pickerMainLeft: null,
      pickerMainRight: null,
      pickerCompareLeft: null,
      pickerCompareRight: null,
      moment: moment__default['default'],
    }); },

    // mounted ()
    mounted: function mounted() {
      var moment = this.moment;
      this.today = moment().format(DATE_FORMAT$2);

      this.pickerMain = [
        moment()
          .subtract(7, "days")
          .format(DATE_FORMAT$2),
        moment()
          .subtract(1, "day")
          .format(DATE_FORMAT$2) ];

      this.pickerCompare = [
        moment()
          .subtract(15, "day")
          .format(DATE_FORMAT$2),
        moment()
          .subtract(8, "days")
          .format(DATE_FORMAT$2) ];

      this.compare = this.compareRanges;
    },

    // computed
    computed: {
      compare: {
        get: function get() {
          return this.compare_
        },
        set: function set(val) {
          this.compare_ = val;
          this.pickerMainIsActive = !this.compare_;
        },
      }, // compare
    },

    // methods()
    methods: {
      // Sets the main date picker to the last week,
      // meaning if it's Friday it sets the range from last
      // Friday to yesterday
      setMainLast7Days: function setMainLast7Days() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(7, "days")
          .format(MONTH_FORMAT$1);

        this.pickerMain = [
          moment()
            .subtract(7, "days")
            .format(DATE_FORMAT$2),
          moment()
            .subtract(1, "day")
            .format(DATE_FORMAT$2) ];
      }, // setMainLast7Days()

      // Sets the main date picker to the Monday to Sunday of the previous week
      setMainPrevWeek: function setMainPrevWeek() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(1, "week")
          .day(1)
          .format(MONTH_FORMAT$1);

        this.pickerMain = [
          moment()
            .subtract(1, "week")
            .day(1)
            .format(DATE_FORMAT$2),
          moment()
            .subtract(1, "week")
            .day(7)
            .format(DATE_FORMAT$2) ];
      }, // setMainPrevWeek()

      // Sets the main date picker to the last month,
      // meaning, if it's 20 March it starts the range
      // from 20 Feb. to yesterday.
      // If it's 31 March, the range begins at 28 or 29 Feb.
      setMainLastMonth: function setMainLastMonth() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(1, "month")
          .format(DATE_FORMAT$2);

        this.pickerMain = [
          moment()
            .subtract(1, "month")
            .format(DATE_FORMAT$2),
          moment()
            .subtract(1, "day")
            .format(DATE_FORMAT$2) ];
      }, // setMainLastMonth()

      // Sets the range to 1st to last of the previous month.
      setMainPrevMonth: function setMainPrevMonth() {
        var moment = this.moment;

        this.pickerMainIsActive = true;
        this.pickerMainLeft = moment()
          .subtract(1, "month")
          .date(1)
          .format(MONTH_FORMAT$1);

        this.pickerMain = [
          moment()
            .subtract(1, "month")
            .date(1)
            .format(DATE_FORMAT$2),
          moment()
            .date(0)
            .format(DATE_FORMAT$2) ];
      }, // setMainPrevMonth()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousPeriod: function setComparePreviousPeriod() {
        var moment = this.moment;
        var mainRangeStart = this.pickerMain[0];
        var mainRangeEnd = this.pickerMain[1];
        var mainDuration = moment(mainRangeEnd).diff(moment(mainRangeStart), "days");

        this.pickerMainIsActive = false;
        this.pickerMainLeft = moment(mainRangeStart)
          .subtract(1 + mainDuration, "days")
          .format(MONTH_FORMAT$1);
        this.pickerCompareLeft = moment(mainRangeEnd)
          .subtract(1 + mainDuration, "days")
          .format(MONTH_FORMAT$1);

        this.pickerCompare = [
          moment(mainRangeStart)
            .subtract(1 + mainDuration, "days")
            .format(DATE_FORMAT$2),
          moment(mainRangeEnd)
            .subtract(1 + mainDuration, "days")
            .format(DATE_FORMAT$2) ];
      }, // setComparePreviousPeriod()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousMonth: function setComparePreviousMonth() {
        var moment = this.moment;

        this.pickerMainIsActive = false;
        this.pickerMainLeft = moment(this.pickerMain[0])
          .subtract(1, "month")
          .format(MONTH_FORMAT$1);
        this.pickerCompareLeft = moment(this.pickerMain[0])
          .subtract(1, "month")
          .format(MONTH_FORMAT$1);

        this.pickerCompare = [
          moment(this.pickerMain[0])
            .subtract(1, "month")
            .format(DATE_FORMAT$2),
          moment(this.pickerMain[1])
            .subtract(1, "month")
            .format(DATE_FORMAT$2) ];
      }, // setComparePreviousMonth()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousYear: function setComparePreviousYear() {
        var moment = this.moment;

        this.pickerMainIsActive = false;
        this.pickerMainLeft = moment(this.pickerMain[0])
          .subtract(1, "year")
          .format(MONTH_FORMAT$1);
        this.pickerCompareLeft = moment(this.pickerMain[0])
          .subtract(1, "year")
          .format(MONTH_FORMAT$1);

        this.pickerCompare = [
          moment(this.pickerMain[0])
            .subtract(1, "year")
            .format(DATE_FORMAT$2),
          moment(this.pickerMain[1])
            .subtract(1, "year")
            .format(DATE_FORMAT$2) ];
      }, // setComparePreviousYear()

      close: function close() {
        this.$emit("close");
      }, // close()

      applyDates: function applyDates() {
        this.pickerMain.sort();
        this.pickerCompare.sort();

        this.$emit("change", {
          dateStart: this.pickerMain[0],
          dateUntil: this.pickerMain[1],
          compareStart: this.pickerCompare[0],
          compareUntil: this.pickerCompare[1],
          compare: this.compare,
        });

        this.close();
      }, // applyDates()
    }
  }; // export

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "v-card",
      { staticClass: "date-picker-tablet elevation-4 mx-auto" },
      [
        _c(
          "v-card-text",
          { staticClass: "pickers" },
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  { attrs: { cols: "5" } },
                  [
                    _c(
                      "v-row",
                      {
                        class: [
                          "picker-main",
                          _vm.pickerMainIsActive ? "active" : ""
                        ],
                        attrs: { justify: "center" }
                      },
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "12" } },
                          [
                            _c("v-date-picker", {
                              staticClass: "pr-1",
                              attrs: {
                                "no-title": "",
                                "first-day-of-week": "1",
                                range: "",
                                color: "blue darken-2 picker-main-selected",
                                max: _vm.today,
                                "picker-date": _vm.pickerMainLeft
                              },
                              on: {
                                "update:pickerDate": function($event) {
                                  _vm.pickerMainLeft = $event;
                                },
                                "update:picker-date": function($event) {
                                  _vm.pickerMainLeft = $event;
                                }
                              },
                              model: {
                                value: _vm.pickerMain,
                                callback: function($$v) {
                                  _vm.pickerMain = $$v;
                                },
                                expression: "pickerMain"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.compare
                      ? _c(
                          "v-row",
                          {
                            staticClass: "picker-compare",
                            attrs: { justify: "center" }
                          },
                          [
                            _c(
                              "v-col",
                              { attrs: { cols: "12" } },
                              [
                                _c("v-date-picker", {
                                  staticClass: "pr-1",
                                  attrs: {
                                    "no-title": "",
                                    "show-current": "false",
                                    "first-day-of-week": "1",
                                    range: "",
                                    color:
                                      "orange darken-4 picker-compare-selected",
                                    max: _vm.today,
                                    "picker-date": _vm.pickerMainLeft
                                  },
                                  on: {
                                    "update:pickerDate": function($event) {
                                      _vm.pickerMainLeft = $event;
                                    },
                                    "update:picker-date": function($event) {
                                      _vm.pickerMainLeft = $event;
                                    }
                                  },
                                  model: {
                                    value: _vm.pickerCompare,
                                    callback: function($$v) {
                                      _vm.pickerCompare = $$v;
                                    },
                                    expression: "pickerCompare"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  { attrs: { cols: "7" } },
                  [
                    _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                label: "From",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = true;
                                }
                              },
                              model: {
                                value: _vm.pickerMain[0],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerMain, 0, $$v);
                                },
                                expression: "pickerMain[0]"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                label: "To",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = true;
                                }
                              },
                              model: {
                                value: _vm.pickerMain[1],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerMain, 1, $$v);
                                },
                                expression: "pickerMain[1]"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      { staticClass: "pl-2 pr-1" },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainLast7Days }
                          },
                          [_vm._v("Last 7 days")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainPrevWeek }
                          },
                          [_vm._v("Prev. week")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainLastMonth }
                          },
                          [_vm._v("Last month")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", "x-small": "" },
                            on: { click: _vm.setMainPrevMonth }
                          },
                          [_vm._v("Prev. month")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      { staticClass: "pl-2 pt-6" },
                      [
                        _c("v-checkbox", {
                          staticClass: "compare-label",
                          attrs: { label: "Compare to the following" },
                          model: {
                            value: _vm.compare,
                            callback: function($$v) {
                              _vm.compare = $$v;
                            },
                            expression: "compare"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                disabled: !_vm.compare,
                                label: "From",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = false;
                                }
                              },
                              model: {
                                value: _vm.pickerCompare[0],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerCompare, 0, $$v);
                                },
                                expression: "pickerCompare[0]"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: "6" } },
                          [
                            _c("v-text-field", {
                              staticClass: "picker-input",
                              attrs: {
                                disabled: !_vm.compare,
                                label: "To",
                                type: "date",
                                outlined: "",
                                dense: "",
                                max: _vm.moment().format("YYYY-MM-DD")
                              },
                              on: {
                                click: function($event) {
                                  _vm.pickerMainIsActive = false;
                                }
                              },
                              model: {
                                value: _vm.pickerCompare[1],
                                callback: function($$v) {
                                  _vm.$set(_vm.pickerCompare, 1, $$v);
                                },
                                expression: "pickerCompare[1]"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      { staticClass: "pl-2" },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              text: "",
                              "x-small": "",
                              disabled: !_vm.compare
                            },
                            on: { click: _vm.setComparePreviousPeriod }
                          },
                          [_vm._v("\n            Previous period\n          ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              text: "",
                              "x-small": "",
                              disabled: !_vm.compare
                            },
                            on: { click: _vm.setComparePreviousMonth }
                          },
                          [_vm._v("\n            Previous month\n          ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              text: "",
                              "x-small": "",
                              disabled: !_vm.compare
                            },
                            on: { click: _vm.setComparePreviousYear }
                          },
                          [_vm._v("\n            Previous year\n          ")]
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-card-actions",
          [
            _c("v-spacer"),
            _vm._v(" "),
            _c(
              "v-btn",
              {
                staticClass: "px-4 mr-6",
                attrs: { text: "" },
                on: { click: _vm.close }
              },
              [_vm._v("Cancel")]
            ),
            _vm._v(" "),
            _c(
              "v-btn",
              {
                staticClass: "primary px-7",
                attrs: { large: "" },
                on: { click: _vm.applyDates }
              },
              [_vm._v("Apply")]
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = function (inject) {
      if (!inject) { return }
      inject("data-v-5f43ee30_0", { source: ".date-picker-tablet[data-v-5f43ee30] {\n  max-width: 785px;\n  margin-top: 5vh;\n}\n.date-picker-tablet[data-v-5f43ee30] .pickers {\n  max-height: 23em;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-input .v-text-field__details {\n  display: none;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main {\n  position: relative;\n  z-index: 1;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main .v-picker {\n  background-color: transparent;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main.active {\n  z-index: 1000;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main .v-picker__body {\n  background-color: transparent;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main .v-date-picker-table button:not(.picker-main-selected) {\n  background-color: transparent;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main:not(.active) .picker-main-selected {\n  color: darkgrey;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main-left .v-date-picker-header > button:nth-of-type(2) {\n  display: none;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-main-right .v-date-picker-header > button:nth-of-type(1) {\n  display: none;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-compare {\n  transform: translateY(-100%);\n  position: relative;\n  z-index: 2;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-compare .v-date-picker-header {\n  opacity: 0;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-compare .v-date-picker-table thead {\n  opacity: 0;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-compare .v-date-picker-table button:not(.picker-compare-selected) {\n  color: transparent;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-compare .v-picker {\n  background-color: transparent !important;\n}\n.date-picker-tablet[data-v-5f43ee30] .picker-compare .v-picker .v-picker__body {\n  background-color: transparent !important;\n}\n.date-picker-tablet[data-v-5f43ee30] .compare-label .v-messages {\n  display: none;\n}\n\n/*# sourceMappingURL=DatePickerTablet.vue.map */", map: {"version":3,"sources":["/Users/mark/Sites/npm-packages/vuetify-date-range-picker/src/components/DatePickerTablet.vue","DatePickerTablet.vue"],"names":[],"mappings":"AA8WA;EACA,gBAAA;EACA,eAAA;AC7WA;AD+WA;EACA,gBAAA;AC7WA;ADiXA;EACA,aAAA;AC/WA;ADmXA;EACA,kBAAA;EACA,UAAA;ACjXA;ADmXA;EACA,6BAAA;ACjXA;ADoXA;EACA,aAAA;AClXA;ADsXA;EACA,6BAAA;ACpXA;ADwXA;EACA,6BAAA;ACtXA;AD2XA;EACA,eAAA;ACzXA;AD8XA;EACA,aAAA;AC5XA;AD+XA;EACA,aAAA;AC7XA;ADmYA;EACA,4BAAA;EAEA,kBAAA;EACA,UAAA;AClYA;ADqYA;EACA,UAAA;ACnYA;ADuYA;EACA,UAAA;ACrYA;ADwYA;EACA,kBAAA;ACtYA;AD0YA;EACA,wCAAA;ACxYA;ADyYA;EACA,wCAAA;ACvYA;AD6YA;EACA,aAAA;AC3YA;;AAEA,+CAA+C","file":"DatePickerTablet.vue","sourcesContent":["<template>\n  <v-card class=\"date-picker-tablet elevation-4 mx-auto\">\n    <v-card-text class=\"pickers\">\n      <v-row>\n        <v-col cols=\"5\">\n          <v-row justify=\"center\" :class=\"['picker-main', pickerMainIsActive ? 'active' : '']\">\n            <v-col cols=\"12\">\n              <v-date-picker\n                v-model=\"pickerMain\"\n                no-title\n                first-day-of-week=\"1\"\n                range\n                color=\"blue darken-2 picker-main-selected\"\n                :max=\"today\"\n                :picker-date.sync=\"pickerMainLeft\"\n                class=\"pr-1\"\n              />\n            </v-col>\n          </v-row>\n          <v-row justify=\"center\" class=\"picker-compare\" v-if=\"compare\">\n            <v-col cols=\"12\">\n              <v-date-picker\n                v-model=\"pickerCompare\"\n                no-title\n                show-current=\"false\"\n                first-day-of-week=\"1\"\n                range\n                color=\"orange darken-4 picker-compare-selected\"\n                :max=\"today\"\n                :picker-date.sync=\"pickerMainLeft\"\n                class=\"pr-1\"\n              />\n            </v-col>\n          </v-row>\n        </v-col>\n        <v-col cols=\"7\">\n          <v-row>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerMain[0]\"\n                label=\"From\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = true\"\n              />\n            </v-col>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerMain[1]\"\n                label=\"To\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = true\"\n              />\n            </v-col>\n          </v-row>\n          <v-row class=\"pl-2 pr-1\">\n            <v-btn text x-small @click=\"setMainLast7Days\">Last 7 days</v-btn>\n            <v-btn text x-small @click=\"setMainPrevWeek\">Prev. week</v-btn>\n            <v-btn text x-small @click=\"setMainLastMonth\">Last month</v-btn>\n            <v-btn text x-small @click=\"setMainPrevMonth\">Prev. month</v-btn>\n          </v-row>\n          <v-row class=\"pl-2 pt-6\">\n            <v-checkbox v-model=\"compare\" label=\"Compare to the following\" class=\"compare-label\" />\n          </v-row>\n          <v-row>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerCompare[0]\"\n                :disabled=\"!compare\"\n                label=\"From\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = false\"\n              />\n            </v-col>\n            <v-col cols=\"6\">\n              <v-text-field\n                v-model=\"pickerCompare[1]\"\n                :disabled=\"!compare\"\n                label=\"To\"\n                type=\"date\"\n                outlined\n                dense\n                :max=\"moment().format('YYYY-MM-DD')\"\n                class=\"picker-input\"\n                @click=\"pickerMainIsActive = false\"\n              />\n            </v-col>\n          </v-row>\n          <v-row class=\"pl-2\">\n            <v-btn text x-small :disabled=\"!compare\" @click=\"setComparePreviousPeriod\">\n              Previous period\n            </v-btn>\n            <v-btn text x-small :disabled=\"!compare\" @click=\"setComparePreviousMonth\">\n              Previous month\n            </v-btn>\n            <v-btn text x-small :disabled=\"!compare\" @click=\"setComparePreviousYear\">\n              Previous year\n            </v-btn>\n          </v-row>\n        </v-col>\n      </v-row>\n    </v-card-text>\n    <v-card-actions>\n      <v-spacer />\n      <v-btn text class=\"px-4 mr-6\" @click=\"close\">Cancel</v-btn>\n      <v-btn large class=\"primary px-7\" @click=\"applyDates\">Apply</v-btn>\n    </v-card-actions>\n  </v-card>\n</template>\n\n<script>\nimport moment from \"moment\"\n\nconst DATE_FORMAT = \"YYYY-MM-DD\"\nconst MONTH_FORMAT = \"YYYY-MM\"\n\nexport default {\n  name: \"DatePickerTablet\",\n\n  props: [\"compare-ranges\"],\n\n  data: () => ({\n    compare_: false,\n    today: null,\n    pickerMain: [], // to use moment.js this has to be set in mounted()\n    pickerCompare: [], // to use moment.js this has to be set in mounted()\n    pickerMainIsActive: true,\n    pickerMainLeft: null,\n    pickerMainRight: null,\n    pickerCompareLeft: null,\n    pickerCompareRight: null,\n    moment: moment,\n  }),\n\n  mounted() {\n    const moment = this.moment\n    this.today = moment().format(DATE_FORMAT)\n\n    this.pickerMain = [\n      moment()\n        .subtract(7, \"days\")\n        .format(DATE_FORMAT),\n      moment()\n        .subtract(1, \"day\")\n        .format(DATE_FORMAT),\n    ]\n\n    this.pickerCompare = [\n      moment()\n        .subtract(15, \"day\")\n        .format(DATE_FORMAT),\n      moment()\n        .subtract(8, \"days\")\n        .format(DATE_FORMAT),\n    ]\n\n    this.compare = this.compareRanges\n  }, // mounted ()\n\n  computed: {\n    compare: {\n      get() {\n        return this.compare_\n      },\n      set(val) {\n        this.compare_ = val\n        this.pickerMainIsActive = !this.compare_\n      },\n    }, // compare\n  }, // computed\n\n  methods: {\n    // Sets the main date picker to the last week,\n    // meaning if it's Friday it sets the range from last\n    // Friday to yesterday\n    setMainLast7Days() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(7, \"days\")\n        .format(MONTH_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(7, \"days\")\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"day\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainLast7Days()\n\n    // Sets the main date picker to the Monday to Sunday of the previous week\n    setMainPrevWeek() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(1, \"week\")\n        .day(1)\n        .format(MONTH_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"week\")\n          .day(1)\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"week\")\n          .day(7)\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainPrevWeek()\n\n    // Sets the main date picker to the last month,\n    // meaning, if it's 20 March it starts the range\n    // from 20 Feb. to yesterday.\n    // If it's 31 March, the range begins at 28 or 29 Feb.\n    setMainLastMonth() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(1, \"month\")\n        .format(DATE_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"day\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainLastMonth()\n\n    // Sets the range to 1st to last of the previous month.\n    setMainPrevMonth() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = true\n      this.pickerMainLeft = moment()\n        .subtract(1, \"month\")\n        .date(1)\n        .format(MONTH_FORMAT)\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"month\")\n          .date(1)\n          .format(DATE_FORMAT),\n        moment()\n          .date(0)\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainPrevMonth()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousPeriod() {\n      const moment = this.moment\n      const mainRangeStart = this.pickerMain[0]\n      const mainRangeEnd = this.pickerMain[1]\n      const mainDuration = moment(mainRangeEnd).diff(moment(mainRangeStart), \"days\")\n\n      this.pickerMainIsActive = false\n      this.pickerMainLeft = moment(mainRangeStart)\n        .subtract(1 + mainDuration, \"days\")\n        .format(MONTH_FORMAT)\n      this.pickerCompareLeft = moment(mainRangeEnd)\n        .subtract(1 + mainDuration, \"days\")\n        .format(MONTH_FORMAT)\n\n      this.pickerCompare = [\n        moment(mainRangeStart)\n          .subtract(1 + mainDuration, \"days\")\n          .format(DATE_FORMAT),\n        moment(mainRangeEnd)\n          .subtract(1 + mainDuration, \"days\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousPeriod()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousMonth() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = false\n      this.pickerMainLeft = moment(this.pickerMain[0])\n        .subtract(1, \"month\")\n        .format(MONTH_FORMAT)\n      this.pickerCompareLeft = moment(this.pickerMain[0])\n        .subtract(1, \"month\")\n        .format(MONTH_FORMAT)\n\n      this.pickerCompare = [\n        moment(this.pickerMain[0])\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n        moment(this.pickerMain[1])\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousMonth()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousYear() {\n      const moment = this.moment\n\n      this.pickerMainIsActive = false\n      this.pickerMainLeft = moment(this.pickerMain[0])\n        .subtract(1, \"year\")\n        .format(MONTH_FORMAT)\n      this.pickerCompareLeft = moment(this.pickerMain[0])\n        .subtract(1, \"year\")\n        .format(MONTH_FORMAT)\n\n      this.pickerCompare = [\n        moment(this.pickerMain[0])\n          .subtract(1, \"year\")\n          .format(DATE_FORMAT),\n        moment(this.pickerMain[1])\n          .subtract(1, \"year\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousYear()\n\n    close() {\n      this.$emit(\"close\")\n    }, // close()\n\n    applyDates() {\n      this.pickerMain.sort()\n      this.pickerCompare.sort()\n\n      this.$emit(\"change\", {\n        dateStart: this.pickerMain[0],\n        dateUntil: this.pickerMain[1],\n        compareStart: this.pickerCompare[0],\n        compareUntil: this.pickerCompare[1],\n        compare: this.compare,\n      })\n\n      this.close()\n    }, // applyDates()\n  }, // methods()\n} // export\n</script>\n\n<style lang=\"scss\" scoped>\n// @import \"~vuetify/src/styles/styles.sass\";\n\n.date-picker-tablet::v-deep {\n  max-width: 785px;\n  margin-top: 5vh;\n\n  .pickers {\n    max-height: 23em;\n  } // .pickers\n\n  .picker-input {\n    .v-text-field__details {\n      display: none;\n    }\n  } // .picker-input\n\n  .picker-main {\n    position: relative;\n    z-index: 1;\n\n    .v-picker {\n      background-color: transparent;\n    } // .v-picker\n\n    &.active {\n      z-index: 1000;\n    } // .v-picker.active\n\n    // Body should be rendered but not visible\n    .v-picker__body {\n      background-color: transparent;\n    } // .v-picker__body\n\n    .v-date-picker-table {\n      button:not(.picker-main-selected) {\n        background-color: transparent;\n      }\n    } // .v-date-picker-table\n\n    &:not(.active) {\n      .picker-main-selected {\n        color: darkgrey;\n      }\n    }\n  } // .picker-main\n\n  .picker-main-left .v-date-picker-header > button:nth-of-type(2) {\n    display: none;\n  } // button[2]\n\n  .picker-main-right .v-date-picker-header > button:nth-of-type(1) {\n    display: none;\n  } // button[1]\n\n  // The secondary date picker should be translated\n  // over the primary and many of its elements should\n  // become invisible.\n  .picker-compare {\n    transform: translateY(-100%);\n\n    position: relative;\n    z-index: 2;\n\n    // Header should be rendered but not visible\n    .v-date-picker-header {\n      opacity: 0;\n    }\n\n    .v-date-picker-table {\n      thead {\n        opacity: 0;\n      }\n\n      button:not(.picker-compare-selected) {\n        color: transparent;\n      }\n    } // .v-date-picker-table\n\n    .v-picker {\n      background-color: transparent !important;\n      .v-picker__body {\n        background-color: transparent !important;\n      }\n    } // > .v-picker\n  } // .picker-compare\n\n  .compare-label {\n    .v-messages {\n      display: none;\n    }\n  } // .compare-label\n} // .date-picker-tablet\n</style>\n",".date-picker-tablet::v-deep {\n  max-width: 785px;\n  margin-top: 5vh;\n}\n.date-picker-tablet::v-deep .pickers {\n  max-height: 23em;\n}\n.date-picker-tablet::v-deep .picker-input .v-text-field__details {\n  display: none;\n}\n.date-picker-tablet::v-deep .picker-main {\n  position: relative;\n  z-index: 1;\n}\n.date-picker-tablet::v-deep .picker-main .v-picker {\n  background-color: transparent;\n}\n.date-picker-tablet::v-deep .picker-main.active {\n  z-index: 1000;\n}\n.date-picker-tablet::v-deep .picker-main .v-picker__body {\n  background-color: transparent;\n}\n.date-picker-tablet::v-deep .picker-main .v-date-picker-table button:not(.picker-main-selected) {\n  background-color: transparent;\n}\n.date-picker-tablet::v-deep .picker-main:not(.active) .picker-main-selected {\n  color: darkgrey;\n}\n.date-picker-tablet::v-deep .picker-main-left .v-date-picker-header > button:nth-of-type(2) {\n  display: none;\n}\n.date-picker-tablet::v-deep .picker-main-right .v-date-picker-header > button:nth-of-type(1) {\n  display: none;\n}\n.date-picker-tablet::v-deep .picker-compare {\n  transform: translateY(-100%);\n  position: relative;\n  z-index: 2;\n}\n.date-picker-tablet::v-deep .picker-compare .v-date-picker-header {\n  opacity: 0;\n}\n.date-picker-tablet::v-deep .picker-compare .v-date-picker-table thead {\n  opacity: 0;\n}\n.date-picker-tablet::v-deep .picker-compare .v-date-picker-table button:not(.picker-compare-selected) {\n  color: transparent;\n}\n.date-picker-tablet::v-deep .picker-compare .v-picker {\n  background-color: transparent !important;\n}\n.date-picker-tablet::v-deep .picker-compare .v-picker .v-picker__body {\n  background-color: transparent !important;\n}\n.date-picker-tablet::v-deep .compare-label .v-messages {\n  display: none;\n}\n\n/*# sourceMappingURL=DatePickerTablet.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$2 = "data-v-5f43ee30";
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      createInjector,
      undefined,
      undefined
    );

  var DATE_FORMAT$3 = "YYYY-MM-DD";

  var script$3 = {
    components: {
      VTextField: lib.VTextField,
      VCol: lib.VCol,
      VRow: lib.VRow,
      VBtn: lib.VBtn,
      VCheckbox: lib.VCheckbox,
      VCardText: lib.VCardText,
      VSpacer: lib.VSpacer,
      VCardActions: lib.VCardActions,
      VCard: lib.VCard,
      VContainer: lib.VContainer
    },

    name: "DatePickerMobile",
    props: ["compare-ranges"],

    data: function () { return ({
      today: null,
      compare: false,
      pickerMain: [], // to use moment.js this has to be set in mounted()
      pickerCompare: [], // to use moment.js this has to be set in mounted()
      moment: moment__default['default'],
    }); },

    // mounted ()
    mounted: function mounted() {
      var moment = this.moment;
      this.today = this.moment().format(DATE_FORMAT$3);

      this.pickerMain = [
        moment()
          .subtract(7, "days")
          .format(DATE_FORMAT$3),
        moment()
          .subtract(1, "day")
          .format(DATE_FORMAT$3) ];

      this.pickerCompare = [
        moment()
          .subtract(15, "days")
          .format(DATE_FORMAT$3),
        moment()
          .subtract(8, "days")
          .format(DATE_FORMAT$3) ];

      this.compare = this.compareRanges;
    },

    // methods()
    methods: {
      // Sets the main date picker to the last week,
      // meaning if it's Friday it sets the range from last
      // Friday to yesterday
      setMainLast7Days: function setMainLast7Days() {
        var moment = this.moment;

        this.pickerMain = [
          moment()
            .subtract(7, "days")
            .format(DATE_FORMAT$3),
          moment()
            .subtract(1, "day")
            .format(DATE_FORMAT$3) ];
      }, // setMainLast7Days()

      // Sets the main date picker to the Monday to Sunday of the previous week
      setMainPrevWeek: function setMainPrevWeek() {
        var moment = this.moment;

        this.pickerMain = [
          moment()
            .subtract(1, "week")
            .day(1)
            .format(DATE_FORMAT$3),
          moment()
            .subtract(1, "week")
            .day(7)
            .format(DATE_FORMAT$3) ];
      }, // setMainPrevWeek()

      // Sets the main date picker to the last month,
      // meaning, if it's 20 March it starts the range
      // from 20 Feb. to yesterday.
      // If it's 31 March, the range begins at 28 or 29 Feb.
      setMainLastMonth: function setMainLastMonth() {
        var moment = this.moment;

        this.pickerMain = [
          moment()
            .subtract(1, "month")
            .format(DATE_FORMAT$3),
          moment()
            .subtract(1, "day")
            .format(DATE_FORMAT$3) ];
      }, // setMainLastMonth()

      // Sets the range to 1st to last of the previous month.
      setMainPrevMonth: function setMainPrevMonth() {
        var moment = this.moment;

        this.pickerMain = [
          moment()
            .subtract(1, "month")
            .date(1)
            .format(DATE_FORMAT$3),
          moment()
            .date(0)
            .format(DATE_FORMAT$3) ];
      }, // setMainPrevMonth()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousPeriod: function setComparePreviousPeriod() {
        var moment = this.moment;
        var mainRangeStart = this.pickerMain[0];
        var mainRangeEnd = this.pickerMain[1];

        var mainDuration = moment(mainRangeEnd).diff(moment(mainRangeStart), "days");

        this.pickerCompare = [
          moment(mainRangeStart)
            .subtract(1 + mainDuration, "days")
            .format(DATE_FORMAT$3),
          moment(mainRangeEnd)
            .subtract(1 + mainDuration, "days")
            .format(DATE_FORMAT$3) ];
      }, // setComparePreviousPeriod()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousMonth: function setComparePreviousMonth() {
        var moment = this.moment;

        this.pickerCompare = [
          moment(this.pickerMain[0])
            .subtract(1, "month")
            .format(DATE_FORMAT$3),
          moment(this.pickerMain[1])
            .subtract(1, "month")
            .format(DATE_FORMAT$3) ];
      }, // setComparePreviousMonth()

      // Takes current duration of the main range and sets the same
      // duration to the compare picker, but this duration earlier
      setComparePreviousYear: function setComparePreviousYear() {
        var moment = this.moment;

        this.pickerCompare = [
          moment(this.pickerMain[0])
            .subtract(1, "year")
            .format(DATE_FORMAT$3),
          moment(this.pickerMain[1])
            .subtract(1, "year")
            .format(DATE_FORMAT$3) ];
      }, // setComparePreviousYear()

      close: function close() {
        this.$emit("close");
      }, // close()

      applyDates: function applyDates() {
        this.pickerMain.sort();
        this.pickerCompare.sort();

        this.$emit("change", {
          dateStart: this.pickerMain[0],
          dateUntil: this.pickerMain[1],
          compareStart: this.pickerCompare[0],
          compareUntil: this.pickerCompare[1],
          compare: this.compare,
        });

        this.close();
      }, // applyDates()
    }
  }; // export

  /* script */
  var __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "v-container",
      { staticClass: "ma-0 pa-0" },
      [
        _c(
          "v-card",
          {
            staticClass: "date-picker-mobile elevation-0 ma-0 d-flex flex-column",
            attrs: { "min-height": "100vh" }
          },
          [
            _c(
              "v-card-text",
              { staticClass: "flex-grow-1" },
              [
                _c(
                  "v-row",
                  [
                    _c(
                      "v-col",
                      { staticClass: "pt-0", attrs: { cols: "12" } },
                      [
                        _c(
                          "v-row",
                          [
                            _c(
                              "v-col",
                              { attrs: { cols: "12" } },
                              [
                                _c("v-text-field", {
                                  staticClass: "picker-input",
                                  attrs: {
                                    label: "From",
                                    type: "date",
                                    outlined: "",
                                    dense: "",
                                    max: _vm.moment().format("YYYY-MM-DD")
                                  },
                                  model: {
                                    value: _vm.pickerMain[0],
                                    callback: function($$v) {
                                      _vm.$set(_vm.pickerMain, 0, $$v);
                                    },
                                    expression: "pickerMain[0]"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-row",
                          [
                            _c(
                              "v-col",
                              { attrs: { cols: "12" } },
                              [
                                _c("v-text-field", {
                                  staticClass: "picker-input",
                                  attrs: {
                                    label: "To",
                                    type: "date",
                                    outlined: "",
                                    dense: "",
                                    max: _vm.moment().format("YYYY-MM-DD")
                                  },
                                  model: {
                                    value: _vm.pickerMain[1],
                                    callback: function($$v) {
                                      _vm.$set(_vm.pickerMain, 1, $$v);
                                    },
                                    expression: "pickerMain[1]"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-row",
                          {
                            staticClass: "pl-2 pr-1",
                            attrs: { justify: "start" }
                          },
                          [
                            _c(
                              "v-btn",
                              {
                                staticClass: "mr-2 mb-3",
                                attrs: {
                                  depressed: "",
                                  "min-width": "48%",
                                  small: ""
                                },
                                on: { click: _vm.setMainLast7Days }
                              },
                              [_vm._v("Last 7 days")]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                staticClass: "mb-2",
                                attrs: {
                                  depressed: "",
                                  "min-width": "48%",
                                  small: ""
                                },
                                on: { click: _vm.setMainPrevWeek }
                              },
                              [_vm._v("Previous week")]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                staticClass: "mr-2 mb-3",
                                attrs: {
                                  depressed: "",
                                  "min-width": "48%",
                                  small: ""
                                },
                                on: { click: _vm.setMainLastMonth }
                              },
                              [_vm._v("Last month")]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                staticClass: "mb-2",
                                attrs: {
                                  depressed: "",
                                  "min-width": "48%",
                                  small: ""
                                },
                                on: { click: _vm.setMainPrevMonth }
                              },
                              [_vm._v("Previous month")]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-row",
                          { staticClass: "pl-2 pt-0" },
                          [
                            _c("v-checkbox", {
                              staticClass: "compare-label pt-0",
                              attrs: { label: "Compare to the following" },
                              model: {
                                value: _vm.compare,
                                callback: function($$v) {
                                  _vm.compare = $$v;
                                },
                                expression: "compare"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-row",
                          [
                            _c(
                              "v-col",
                              { attrs: { cols: "12" } },
                              [
                                _c("v-text-field", {
                                  staticClass: "picker-input",
                                  attrs: {
                                    disabled: !_vm.compare,
                                    label: "From",
                                    type: "date",
                                    outlined: "",
                                    dense: "",
                                    max: _vm.moment().format("YYYY-MM-DD")
                                  },
                                  model: {
                                    value: _vm.pickerCompare[0],
                                    callback: function($$v) {
                                      _vm.$set(_vm.pickerCompare, 0, $$v);
                                    },
                                    expression: "pickerCompare[0]"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-row",
                          [
                            _c(
                              "v-col",
                              { attrs: { cols: "12" } },
                              [
                                _c("v-text-field", {
                                  staticClass: "picker-input",
                                  attrs: {
                                    disabled: !_vm.compare,
                                    label: "To",
                                    type: "date",
                                    outlined: "",
                                    dense: "",
                                    max: _vm.moment().format("YYYY-MM-DD")
                                  },
                                  model: {
                                    value: _vm.pickerCompare[1],
                                    callback: function($$v) {
                                      _vm.$set(_vm.pickerCompare, 1, $$v);
                                    },
                                    expression: "pickerCompare[1]"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-row",
                          { staticClass: "pl-2", attrs: { justify: "start" } },
                          [
                            _c(
                              "v-btn",
                              {
                                staticClass: "mr-2 mb-3",
                                attrs: {
                                  depressed: "",
                                  small: "",
                                  "min-width": "47%",
                                  disabled: !_vm.compare
                                },
                                on: { click: _vm.setComparePreviousPeriod }
                              },
                              [
                                _vm._v(
                                  "\n              Previous period\n            "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                staticClass: "mr-2 mb-3",
                                attrs: {
                                  depressed: "",
                                  small: "",
                                  "min-width": "47%",
                                  disabled: !_vm.compare
                                },
                                on: { click: _vm.setComparePreviousMonth }
                              },
                              [
                                _vm._v(
                                  "\n              Previous month\n            "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                staticClass: "mr-2 mb-3",
                                attrs: {
                                  depressed: "",
                                  small: "",
                                  "min-width": "47%",
                                  disabled: !_vm.compare
                                },
                                on: { click: _vm.setComparePreviousYear }
                              },
                              [
                                _vm._v(
                                  "\n              Previous year\n            "
                                )
                              ]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "v-card-actions",
              [
                _c("v-spacer"),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    staticClass: "px-4 mr-3",
                    attrs: { text: "" },
                    on: { click: _vm.close }
                  },
                  [_vm._v("Cancel")]
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    staticClass: "primary px-7",
                    attrs: { large: "" },
                    on: { click: _vm.applyDates }
                  },
                  [_vm._v("Apply")]
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    var __vue_inject_styles__$3 = function (inject) {
      if (!inject) { return }
      inject("data-v-7c1df034_0", { source: ".date-picker-mobile[data-v-7c1df034] {\n  width: 1040px;\n}\n.date-picker-mobile[data-v-7c1df034] .picker-input .v-text-field__details {\n  display: none;\n}\n.date-picker-mobile[data-v-7c1df034] .compare-label .v-messages {\n  display: none;\n}\n\n/*# sourceMappingURL=DatePickerMobile.vue.map */", map: {"version":3,"sources":["/Users/mark/Sites/npm-packages/vuetify-date-range-picker/src/components/DatePickerMobile.vue","DatePickerMobile.vue"],"names":[],"mappings":"AA2SA;EACA,aAAA;AC1SA;ADgTA;EACA,aAAA;AC9SA;ADmTA;EACA,aAAA;ACjTA;;AAEA,+CAA+C","file":"DatePickerMobile.vue","sourcesContent":["<template>\n  <v-container class=\"ma-0 pa-0\">\n    <v-card min-height=\"100vh\" class=\"date-picker-mobile elevation-0 ma-0 d-flex flex-column\">\n      <v-card-text class=\"flex-grow-1\">\n        <v-row>\n          <v-col cols=\"12\" class=\"pt-0\">\n            <v-row>\n              <v-col cols=\"12\">\n                <v-text-field\n                  v-model=\"pickerMain[0]\"\n                  label=\"From\"\n                  type=\"date\"\n                  outlined\n                  dense\n                  :max=\"moment().format('YYYY-MM-DD')\"\n                  class=\"picker-input\"\n                />\n              </v-col>\n            </v-row>\n\n            <v-row>\n              <v-col cols=\"12\">\n                <v-text-field\n                  v-model=\"pickerMain[1]\"\n                  label=\"To\"\n                  type=\"date\"\n                  outlined\n                  dense\n                  :max=\"moment().format('YYYY-MM-DD')\"\n                  class=\"picker-input\"\n                />\n              </v-col>\n            </v-row>\n\n            <v-row justify=\"start\" class=\"pl-2 pr-1\">\n              <v-btn depressed min-width=\"48%\" class=\"mr-2 mb-3\" small @click=\"setMainLast7Days\">Last 7 days</v-btn>\n              <v-btn depressed min-width=\"48%\" class=\"mb-2\" small @click=\"setMainPrevWeek\">Previous week</v-btn>\n              <v-btn depressed min-width=\"48%\" class=\"mr-2 mb-3\" small @click=\"setMainLastMonth\">Last month</v-btn>\n              <v-btn depressed min-width=\"48%\" class=\"mb-2\" small @click=\"setMainPrevMonth\">Previous month</v-btn>\n            </v-row>\n\n            <v-row class=\"pl-2 pt-0\">\n              <v-checkbox v-model=\"compare\" label=\"Compare to the following\" class=\"compare-label pt-0\" />\n            </v-row>\n\n            <v-row>\n              <v-col cols=\"12\">\n                <v-text-field\n                  v-model=\"pickerCompare[0]\"\n                  :disabled=\"!compare\"\n                  label=\"From\"\n                  type=\"date\"\n                  outlined\n                  dense\n                  :max=\"moment().format('YYYY-MM-DD')\"\n                  class=\"picker-input\"\n                />\n              </v-col>\n            </v-row>\n            <v-row>\n              <v-col cols=\"12\">\n                <v-text-field\n                  v-model=\"pickerCompare[1]\"\n                  :disabled=\"!compare\"\n                  label=\"To\"\n                  type=\"date\"\n                  outlined\n                  dense\n                  :max=\"moment().format('YYYY-MM-DD')\"\n                  class=\"picker-input\"\n                />\n              </v-col>\n            </v-row>\n            <v-row justify=\"start\" class=\"pl-2\">\n              <v-btn\n                depressed\n                small\n                min-width=\"47%\"\n                class=\"mr-2 mb-3\"\n                :disabled=\"!compare\"\n                @click=\"setComparePreviousPeriod\"\n              >\n                Previous period\n              </v-btn>\n              <v-btn\n                depressed\n                small\n                min-width=\"47%\"\n                class=\"mr-2 mb-3\"\n                :disabled=\"!compare\"\n                @click=\"setComparePreviousMonth\"\n              >\n                Previous month\n              </v-btn>\n              <v-btn\n                depressed\n                small\n                min-width=\"47%\"\n                class=\"mr-2 mb-3\"\n                :disabled=\"!compare\"\n                @click=\"setComparePreviousYear\"\n              >\n                Previous year\n              </v-btn>\n            </v-row>\n          </v-col>\n        </v-row>\n      </v-card-text>\n      <v-card-actions>\n        <v-spacer />\n        <v-btn text class=\"px-4 mr-3\" @click=\"close\">Cancel</v-btn>\n        <v-btn large class=\"primary px-7\" @click=\"applyDates\">Apply</v-btn>\n      </v-card-actions>\n    </v-card>\n  </v-container>\n</template>\n\n<script>\nimport moment from \"moment\"\n\nconst DATE_FORMAT = \"YYYY-MM-DD\"\n\nexport default {\n  name: \"DatePickerMobile\",\n\n  props: [\"compare-ranges\"],\n\n  data: () => ({\n    today: null,\n    compare: false,\n    pickerMain: [], // to use moment.js this has to be set in mounted()\n    pickerCompare: [], // to use moment.js this has to be set in mounted()\n    moment: moment,\n  }),\n\n  mounted() {\n    const moment = this.moment\n    this.today = this.moment().format(DATE_FORMAT)\n\n    this.pickerMain = [\n      moment()\n        .subtract(7, \"days\")\n        .format(DATE_FORMAT),\n      moment()\n        .subtract(1, \"day\")\n        .format(DATE_FORMAT),\n    ]\n\n    this.pickerCompare = [\n      moment()\n        .subtract(15, \"days\")\n        .format(DATE_FORMAT),\n      moment()\n        .subtract(8, \"days\")\n        .format(DATE_FORMAT),\n    ]\n\n    this.compare = this.compareRanges\n  }, // mounted ()\n\n  methods: {\n    // Sets the main date picker to the last week,\n    // meaning if it's Friday it sets the range from last\n    // Friday to yesterday\n    setMainLast7Days() {\n      const moment = this.moment\n\n      this.pickerMain = [\n        moment()\n          .subtract(7, \"days\")\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"day\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainLast7Days()\n\n    // Sets the main date picker to the Monday to Sunday of the previous week\n    setMainPrevWeek() {\n      const moment = this.moment\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"week\")\n          .day(1)\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"week\")\n          .day(7)\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainPrevWeek()\n\n    // Sets the main date picker to the last month,\n    // meaning, if it's 20 March it starts the range\n    // from 20 Feb. to yesterday.\n    // If it's 31 March, the range begins at 28 or 29 Feb.\n    setMainLastMonth() {\n      const moment = this.moment\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n        moment()\n          .subtract(1, \"day\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainLastMonth()\n\n    // Sets the range to 1st to last of the previous month.\n    setMainPrevMonth() {\n      const moment = this.moment\n\n      this.pickerMain = [\n        moment()\n          .subtract(1, \"month\")\n          .date(1)\n          .format(DATE_FORMAT),\n        moment()\n          .date(0)\n          .format(DATE_FORMAT),\n      ]\n    }, // setMainPrevMonth()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousPeriod() {\n      const moment = this.moment\n      const mainRangeStart = this.pickerMain[0]\n      const mainRangeEnd = this.pickerMain[1]\n\n      const mainDuration = moment(mainRangeEnd).diff(moment(mainRangeStart), \"days\")\n\n      this.pickerCompare = [\n        moment(mainRangeStart)\n          .subtract(1 + mainDuration, \"days\")\n          .format(DATE_FORMAT),\n        moment(mainRangeEnd)\n          .subtract(1 + mainDuration, \"days\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousPeriod()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousMonth() {\n      const moment = this.moment\n\n      this.pickerCompare = [\n        moment(this.pickerMain[0])\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n        moment(this.pickerMain[1])\n          .subtract(1, \"month\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousMonth()\n\n    // Takes current duration of the main range and sets the same\n    // duration to the compare picker, but this duration earlier\n    setComparePreviousYear() {\n      const moment = this.moment\n\n      this.pickerCompare = [\n        moment(this.pickerMain[0])\n          .subtract(1, \"year\")\n          .format(DATE_FORMAT),\n        moment(this.pickerMain[1])\n          .subtract(1, \"year\")\n          .format(DATE_FORMAT),\n      ]\n    }, // setComparePreviousYear()\n\n    close() {\n      this.$emit(\"close\")\n    }, // close()\n\n    applyDates() {\n      this.pickerMain.sort()\n      this.pickerCompare.sort()\n\n      this.$emit(\"change\", {\n        dateStart: this.pickerMain[0],\n        dateUntil: this.pickerMain[1],\n        compareStart: this.pickerCompare[0],\n        compareUntil: this.pickerCompare[1],\n        compare: this.compare,\n      })\n\n      this.close()\n    }, // applyDates()\n  }, // methods()\n} // export\n</script>\n\n<style lang=\"scss\" scoped>\n// @import \"~vuetify/src/styles/styles.sass\";\n\n.date-picker-mobile::v-deep {\n  width: 1040px;\n\n  .picker-input {\n    // Under the date inputs there is a place\n    // for some details, which are completely\n    // unnecessary\n    .v-text-field__details {\n      display: none;\n    } // .v-text-field__details\n  } // .picker-input\n\n  .compare-label {\n    .v-messages {\n      display: none;\n    }\n  } // .compare-label\n} // .date-picker-mobile\n</style>\n",".date-picker-mobile::v-deep {\n  width: 1040px;\n}\n.date-picker-mobile::v-deep .picker-input .v-text-field__details {\n  display: none;\n}\n.date-picker-mobile::v-deep .compare-label .v-messages {\n  display: none;\n}\n\n/*# sourceMappingURL=DatePickerMobile.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$3 = "data-v-7c1df034";
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      createInjector,
      undefined,
      undefined
    );

  var script$4 = {
    name: "MainComponent",

    props: ["config"],

    components: {
      DateSelector: __vue_component__,
      DatePickerDesktop: __vue_component__$1,
      DatePickerTablet: __vue_component__$2,
      DatePickerMobile: __vue_component__$3,
      VOverlay: lib.VOverlay
    },

    data: function () { return ({
      dateSelectorOpen: false,
      dateStart: null,
      dateUntil: null,
      compareStart: null,
      compareUntil: null,
      compare: false,
      inheritedClasses: "",
    }); },

    mounted: function mounted() {
      this.inheritedClasses = this.$el.className;
      this.$el.className = "date-selector d-inline-flex align-center justify-center";
    },

    methods: {
      dateSelectorChanged: function dateSelectorChanged(v) {
        this.dateStart = v.dateStart;
        this.dateUntil = v.dateUntil;
        this.compareStart = v.compareStart;
        this.compareUntil = v.compareUntil;
        this.compare = v.compare;

        this.$emit("change", {
          dateStart: this.dateStart,
          dateUntil: this.dateUntil,
          compareStart: this.compareStart,
          compareUntil: this.compareUntil,
          compare: this.compare,
        });
      },
    }, // methods
  }; // export

  /* script */
  var __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "date-selector" },
      [
        _c("v-overlay", {
          attrs: { value: _vm.dateSelectorOpen },
          nativeOn: {
            click: function($event) {
              _vm.dateSelectorOpen = false;
            }
          }
        }),
        _vm._v(" "),
        _c("date-selector", {
          class: "" + this.inheritedClasses,
          attrs: { "icon-color": "grey darken-1", config: _vm.config },
          nativeOn: {
            click: function($event) {
              _vm.dateSelectorOpen = !_vm.dateSelectorOpen;
            }
          }
        }),
        _vm._v(" "),
        _vm.dateSelectorOpen
          ? _c(
              "div",
              { staticClass: "date-pickers-container" },
              [
                this.$vuetify.breakpoint.mdAndUp
                  ? _c("date-picker-desktop", {
                      attrs: { config: _vm.config },
                      on: {
                        change: _vm.dateSelectorChanged,
                        close: function($event) {
                          _vm.dateSelectorOpen = false;
                        }
                      }
                    })
                  : this.$vuetify.breakpoint.smAndUp
                  ? _c("date-picker-tablet", {
                      attrs: { config: _vm.config },
                      on: {
                        change: _vm.dateSelectorChanged,
                        close: function($event) {
                          _vm.dateSelectorOpen = false;
                        }
                      }
                    })
                  : _c("date-picker-mobile", {
                      attrs: { config: _vm.config },
                      on: {
                        change: _vm.dateSelectorChanged,
                        close: function($event) {
                          _vm.dateSelectorOpen = false;
                        }
                      }
                    })
              ],
              1
            )
          : _vm._e()
      ],
      1
    )
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    var __vue_inject_styles__$4 = function (inject) {
      if (!inject) { return }
      inject("data-v-0ec94b3b_0", { source: ".date-selector[data-v-0ec94b3b] {\n  padding: 0;\n  margin: 0;\n  max-height: 60px;\n}\n.date-pickers-container[data-v-0ec94b3b] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  padding: 0;\n  margin: 0;\n  z-index: 100;\n  width: 100vw;\n}\n\n/*# sourceMappingURL=Component.vue.map */", map: {"version":3,"sources":["/Users/mark/Sites/npm-packages/vuetify-date-range-picker/src/components/Component.vue","Component.vue"],"names":[],"mappings":"AAmFA;EACA,UAAA;EACA,SAAA;EACA,gBAAA;AClFA;ADqFA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,UAAA;EACA,SAAA;EACA,YAAA;EACA,YAAA;AClFA;;AAEA,wCAAwC","file":"Component.vue","sourcesContent":["<template>\n  <div class=\"date-selector\">\n    <v-overlay :value=\"dateSelectorOpen\" @click.native=\"dateSelectorOpen = false\" />\n\n    <date-selector\n      icon-color=\"grey darken-1\"\n      :class=\"`${this.inheritedClasses}`\"\n      :config=\"config\"\n      @click.native=\"dateSelectorOpen = !dateSelectorOpen\"\n    />\n\n    <div class=\"date-pickers-container\" v-if=\"dateSelectorOpen\">\n      <date-picker-desktop\n        :config=\"config\"\n        @change=\"dateSelectorChanged\"\n        @close=\"dateSelectorOpen = false\"\n        v-if=\"this.$vuetify.breakpoint.mdAndUp\"\n      />\n      <date-picker-tablet\n        :config=\"config\"\n        @change=\"dateSelectorChanged\"\n        @close=\"dateSelectorOpen = false\"\n        v-else-if=\"this.$vuetify.breakpoint.smAndUp\"\n      />\n      <date-picker-mobile :config=\"config\" @change=\"dateSelectorChanged\" @close=\"dateSelectorOpen = false\" v-else />\n    </div>\n  </div>\n</template>\n\n<script>\nimport DateSelector from \"./DateSelector.vue\"\nimport DatePickerDesktop from \"./DatePickerDesktop.vue\"\nimport DatePickerTablet from \"./DatePickerTablet.vue\"\nimport DatePickerMobile from \"./DatePickerMobile.vue\"\n\nexport default {\n  name: \"MainComponent\",\n\n  props: [\"config\"],\n\n  components: {\n    DateSelector,\n    DatePickerDesktop,\n    DatePickerTablet,\n    DatePickerMobile,\n  },\n\n  data: () => ({\n    dateSelectorOpen: false,\n    dateStart: null,\n    dateUntil: null,\n    compareStart: null,\n    compareUntil: null,\n    compare: false,\n    inheritedClasses: \"\",\n  }),\n\n  mounted() {\n    this.inheritedClasses = this.$el.className\n    this.$el.className = \"date-selector d-inline-flex align-center justify-center\"\n  },\n\n  methods: {\n    dateSelectorChanged(v) {\n      this.dateStart = v.dateStart\n      this.dateUntil = v.dateUntil\n      this.compareStart = v.compareStart\n      this.compareUntil = v.compareUntil\n      this.compare = v.compare\n\n      this.$emit(\"change\", {\n        dateStart: this.dateStart,\n        dateUntil: this.dateUntil,\n        compareStart: this.compareStart,\n        compareUntil: this.compareUntil,\n        compare: this.compare,\n      })\n    },\n  }, // methods\n} // export\n</script>\n\n<style lang=\"scss\" scoped>\n.date-selector {\n  padding: 0;\n  margin: 0;\n  max-height: 60px;\n}\n\n.date-pickers-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  padding: 0;\n  margin: 0;\n  z-index: 100;\n  width: 100vw;\n} // .date-pickers-container\n</style>\n",".date-selector {\n  padding: 0;\n  margin: 0;\n  max-height: 60px;\n}\n\n.date-pickers-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  padding: 0;\n  margin: 0;\n  z-index: 100;\n  width: 100vw;\n}\n\n/*# sourceMappingURL=Component.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$4 = "data-v-0ec94b3b";
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) { return }
    install.installed = true;
    Vue.component("DateRangeSelector", __vue_component__$4);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;

  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) { GlobalVue.use(plugin); }

  exports.default = __vue_component__$4;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
