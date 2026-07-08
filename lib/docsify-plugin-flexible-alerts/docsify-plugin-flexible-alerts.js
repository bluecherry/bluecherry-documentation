/*!
 * docsify-plugin-flexible-alerts
 * v1.3.0
 * https://github.com/fzankl/docsify-plugin-flexible-alerts#readme
 * (c) 2026 Fabian Zankl
 * MIT license
 */
(function() {
    "use strict";
    function _defineProperty(e, r, t) {
        return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: true,
            configurable: true,
            writable: true
        }) : e[r] = t, e;
    }
    function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter(function(r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })), t.push.apply(t, o);
        }
        return t;
    }
    function _objectSpread2(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
                _defineProperty(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
        }
        return e;
    }
    function _toPrimitive(t, r) {
        if ("object" != typeof t || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
            var i = e.call(t, r);
            if ("object" != typeof i) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == typeof i ? i : i + "";
    }
    function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, _typeof(o);
    }
    function styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;
        if (typeof document === "undefined") {
            return;
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        var style = document.createElement("style");
        style.type = "text/css";
        if (insertAt === "top") {
            if (head.firstChild) {
                head.insertBefore(style, head.firstChild);
            } else {
                head.appendChild(style);
            }
        } else {
            head.appendChild(style);
        }
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }
    var css_248z = ".alert{word-wrap:break-word;display:block;margin-bottom:1rem!important;padding:.75rem 1.25rem!important;position:relative;word-break:break-word}.alert>*{max-width:100%}.alert>:first-child{margin-top:0}.alert>:last-child{margin-bottom:0}.alert:before{content:unset!important}.alert+.alert{margin-top:-.25rem!important}.alert p{margin-bottom:.5rem;margin-top:.5rem}.alert .title{align-items:center;display:flex;flex-wrap:wrap;font-weight:600;margin:0}.icon{background-repeat:no-repeat;display:inline-block;height:20px;margin-right:.5rem;width:20px}.alert.callout{background:var(--background);border:1px solid #eee;border-left-width:.25rem;border-radius:.25rem}.alert.callout.note{border-left-color:#17a2b8!important}.alert.callout.note .title{color:#17a2b8}.alert.callout.note .icon-note{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%2317a2b8' d='M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9 2 12t.788-3.9 2.137-3.175T8.1 2.788 12 2t3.9.788 3.175 2.137T21.213 8.1 22 12t-.788 3.9-2.137 3.175-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4 6.325 6.325 4 12t2.325 5.675T12 20m0-8'/%3E%3C/svg%3E\")}.alert.callout.tip{border-left-color:#28a745!important}.alert.callout.tip .title{color:#28a745}.alert.callout.tip .icon-tip{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%2328a745' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9 18h6m-5 3h4m-5-6c.001-2-.499-2.5-1.5-3.5S6.025 9.487 6 8c-.047-3.05 2-5 6-5 4.001 0 6.049 1.95 6 5-.023 1.487-.5 2.5-1.5 3.5-.999 1-1.499 1.5-1.5 3.5'/%3E%3C/svg%3E\")}.alert.callout.important{border-left-color:#8250df!important}.alert.callout.important .title{color:#8250df}.alert.callout.important .icon-important{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 56 56'%3E%3Cpath fill='%238250df' d='M16.586 52.246c1.172 0 1.969-.61 3.375-1.875l8.11-7.195h15.023c6.984 0 10.734-3.867 10.734-10.735V14.488c0-6.867-3.75-10.734-10.734-10.734H12.906c-6.96 0-10.734 3.844-10.734 10.734v17.953c0 6.891 3.773 10.735 10.734 10.735h1.125v6.093c0 1.805.938 2.977 2.555 2.977m.96-4.289V41.16c0-1.265-.468-1.758-1.757-1.758h-2.86c-4.757 0-6.984-2.414-6.984-6.984v-17.93c0-4.57 2.227-6.96 6.985-6.96h30.164c4.734 0 6.96 2.39 6.96 6.96v17.93c0 4.57-2.226 6.984-6.96 6.984H27.906c-1.289 0-1.968.188-2.86 1.102Zm10.618-19.758c1.125 0 1.781-.633 1.805-1.851l.328-12.375c.023-1.196-.914-2.086-2.156-2.086-1.266 0-2.157.867-2.133 2.062l.328 12.399c.024 1.195.656 1.851 1.828 1.851m0 7.617c1.36 0 2.531-1.078 2.531-2.437 0-1.36-1.148-2.438-2.53-2.438-1.384 0-2.532 1.102-2.532 2.438s1.172 2.437 2.531 2.437'/%3E%3C/svg%3E\")}.alert.callout.warning{border-left-color:#f0ad4e!important}.alert.callout.warning .title{color:#f0ad4e}.alert.callout.warning .icon-warning{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 56 56'%3E%3Cpath fill='%23f0ad4e' d='M9.965 50.207h36.07c3.985 0 6.469-2.86 6.469-6.469 0-1.078-.281-2.18-.867-3.187L33.567 9.074c-1.22-2.133-3.352-3.281-5.555-3.281-2.18 0-4.336 1.148-5.579 3.281l-18.07 31.5a6.25 6.25 0 0 0-.867 3.164c0 3.61 2.508 6.469 6.469 6.469m.047-3.68c-1.641 0-2.72-1.336-2.72-2.789 0-.422.071-.914.306-1.406l18.046-31.477c.516-.89 1.454-1.312 2.368-1.312s1.804.398 2.32 1.312l18.047 31.5c.234.47.351.961.351 1.383 0 1.453-1.125 2.79-2.742 2.79Zm18-12.117c1.125 0 1.78-.656 1.804-1.875l.328-12.351c.024-1.196-.914-2.086-2.156-2.086-1.265 0-2.156.867-2.133 2.062l.305 12.375c.023 1.196.68 1.875 1.852 1.875m0 7.617c1.359 0 2.53-1.078 2.53-2.437 0-1.383-1.148-2.438-2.53-2.438-1.383 0-2.532 1.078-2.532 2.438 0 1.336 1.172 2.437 2.532 2.437'/%3E%3C/svg%3E\")}.alert.callout.attention{border-left-color:#dc3545!important}.alert.callout.attention .title{color:#dc3545}.alert.callout.attention .icon-attention{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 56 56'%3E%3Cpath fill='%23dc3545' d='M20.887 50.71h14.226c2.977 0 4.407-.96 5.93-2.624l8.625-9.563c1.547-1.71 1.945-2.836 1.945-5.156v-10.71c0-2.344-.398-3.446-1.945-5.157l-8.625-9.562c-1.523-1.665-2.953-2.649-5.93-2.649H20.887c-2.977 0-4.383.984-5.93 2.649L6.332 17.5c-1.547 1.71-1.945 2.813-1.945 5.156v10.711c0 2.32.398 3.446 1.945 5.156l8.625 9.563c1.547 1.664 2.953 2.625 5.93 2.625m1.265-3.75c-2.343 0-3-.515-4.312-1.921l-7.97-8.79c-.937-1.031-1.148-1.617-1.148-3.328v-9.82c0-1.711.21-2.297 1.148-3.329l7.969-8.789c1.312-1.43 1.969-1.921 4.312-1.921h11.696c2.343 0 3 .492 4.312 1.921l7.992 8.79c.914 1.03 1.126 1.617 1.126 3.328v9.82c0 1.71-.212 2.297-1.126 3.328l-7.992 8.789c-1.312 1.406-1.969 1.922-4.312 1.922Zm5.86-14.835c1.101 0 1.758-.633 1.78-1.852l.352-12.375c.024-1.195-.914-2.085-2.156-2.085-1.265 0-2.156.867-2.133 2.062l.305 12.398c.023 1.196.68 1.852 1.852 1.852m0 7.617c1.336 0 2.508-1.078 2.508-2.437 0-1.36-1.149-2.438-2.508-2.438-1.383 0-2.532 1.102-2.532 2.438s1.172 2.437 2.532 2.437'/%3E%3C/svg%3E\")}.alert.flat{background-color:#e2e3e5;border:1px solid #d6d8db;border-radius:.125rem;color:#383d41}.alert.flat.note{background-color:#cdeefd;border-color:#b7e7fc;color:#02587f}.alert.flat.note .title{color:#01354d}.alert.flat.note .icon-note{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%2301354d' d='M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9 2 12t.788-3.9 2.137-3.175T8.1 2.788 12 2t3.9.788 3.175 2.137T21.213 8.1 22 12t-.788 3.9-2.137 3.175-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4 6.325 6.325 4 12t2.325 5.675T12 20m0-8'/%3E%3C/svg%3E\")}.alert.flat.tip{background-color:#dbefdc;border-color:#cbe8cd;color:#285b2a}.alert.flat.tip .title{color:#18381a}.alert.flat.tip .icon-tip{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%2318381a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9 18h6m-5 3h4m-5-6c.001-2-.499-2.5-1.5-3.5S6.025 9.487 6 8c-.047-3.05 2-5 6-5 4.001 0 6.049 1.95 6 5-.023 1.487-.5 2.5-1.5 3.5-.999 1-1.499 1.5-1.5 3.5'/%3E%3C/svg%3E\")}.alert.flat.important{background-color:#d0cede;border-color:#c4c1d5;color:#8250df}.alert.flat.important .title{color:#8250df}.alert.flat.important .icon-important{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 56 56'%3E%3Cpath fill='%238250df' d='M16.586 52.246c1.172 0 1.969-.61 3.375-1.875l8.11-7.195h15.023c6.984 0 10.734-3.867 10.734-10.735V14.488c0-6.867-3.75-10.734-10.734-10.734H12.906c-6.96 0-10.734 3.844-10.734 10.734v17.953c0 6.891 3.773 10.735 10.734 10.735h1.125v6.093c0 1.805.938 2.977 2.555 2.977m.96-4.289V41.16c0-1.265-.468-1.758-1.757-1.758h-2.86c-4.757 0-6.984-2.414-6.984-6.984v-17.93c0-4.57 2.227-6.96 6.985-6.96h30.164c4.734 0 6.96 2.39 6.96 6.96v17.93c0 4.57-2.226 6.984-6.96 6.984H27.906c-1.289 0-1.968.188-2.86 1.102Zm10.618-19.758c1.125 0 1.781-.633 1.805-1.851l.328-12.375c.023-1.196-.914-2.086-2.156-2.086-1.266 0-2.157.867-2.133 2.062l.328 12.399c.024 1.195.656 1.851 1.828 1.851m0 7.617c1.36 0 2.531-1.078 2.531-2.437 0-1.36-1.148-2.438-2.53-2.438-1.384 0-2.532 1.102-2.532 2.438s1.172 2.437 2.531 2.437'/%3E%3C/svg%3E\")}.alert.flat.warning{background-color:#ffddd3;border-color:#ffcbbc;color:#852d12}.alert.flat.warning .title{color:#581e0c}.alert.flat.warning .icon-warning{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 56 56'%3E%3Cpath fill='%23581e0c' d='M9.965 50.207h36.07c3.985 0 6.469-2.86 6.469-6.469 0-1.078-.281-2.18-.867-3.187L33.567 9.074c-1.22-2.133-3.352-3.281-5.555-3.281-2.18 0-4.336 1.148-5.579 3.281l-18.07 31.5a6.25 6.25 0 0 0-.867 3.164c0 3.61 2.508 6.469 6.469 6.469m.047-3.68c-1.641 0-2.72-1.336-2.72-2.789 0-.422.071-.914.306-1.406l18.046-31.477c.516-.89 1.454-1.312 2.368-1.312s1.804.398 2.32 1.312l18.047 31.5c.234.47.351.961.351 1.383 0 1.453-1.125 2.79-2.742 2.79Zm18-12.117c1.125 0 1.78-.656 1.804-1.875l.328-12.351c.024-1.196-.914-2.086-2.156-2.086-1.265 0-2.156.867-2.133 2.062l.305 12.375c.023 1.196.68 1.875 1.852 1.875m0 7.617c1.359 0 2.53-1.078 2.53-2.437 0-1.383-1.148-2.438-2.53-2.438-1.383 0-2.532 1.078-2.532 2.438 0 1.336 1.172 2.437 2.532 2.437'/%3E%3C/svg%3E\")}.alert.flat.attention{background-color:#fdd9d7;border-color:#fcc4c1;color:#7f231c}.alert.flat.attention .title{color:#551713}.alert.flat.attention .icon-attention{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 56 56'%3E%3Cpath fill='%23551713' d='M20.887 50.71h14.226c2.977 0 4.407-.96 5.93-2.624l8.625-9.563c1.547-1.71 1.945-2.836 1.945-5.156v-10.71c0-2.344-.398-3.446-1.945-5.157l-8.625-9.562c-1.523-1.665-2.953-2.649-5.93-2.649H20.887c-2.977 0-4.383.984-5.93 2.649L6.332 17.5c-1.547 1.71-1.945 2.813-1.945 5.156v10.711c0 2.32.398 3.446 1.945 5.156l8.625 9.563c1.547 1.664 2.953 2.625 5.93 2.625m1.265-3.75c-2.343 0-3-.515-4.312-1.921l-7.97-8.79c-.937-1.031-1.148-1.617-1.148-3.328v-9.82c0-1.711.21-2.297 1.148-3.329l7.969-8.789c1.312-1.43 1.969-1.921 4.312-1.921h11.696c2.343 0 3 .492 4.312 1.921l7.992 8.79c.914 1.03 1.126 1.617 1.126 3.328v9.82c0 1.71-.212 2.297-1.126 3.328l-7.992 8.789c-1.312 1.406-1.969 1.922-4.312 1.922Zm5.86-14.835c1.101 0 1.758-.633 1.78-1.852l.352-12.375c.024-1.195-.914-2.085-2.156-2.085-1.265 0-2.156.867-2.133 2.062l.305 12.398c.023 1.196.68 1.852 1.852 1.852m0 7.617c1.336 0 2.508-1.078 2.508-2.437 0-1.36-1.149-2.438-2.508-2.438-1.383 0-2.532 1.102-2.532 2.438s1.172 2.437 2.532 2.437'/%3E%3C/svg%3E\")}";
    styleInject(css_248z);
    (function() {
        var CONFIG = {
            style: "callout",
            note: {
                icon: "icon-note",
                className: "note"
            },
            tip: {
                icon: "icon-tip",
                className: "tip"
            },
            warning: {
                icon: "icon-warning",
                className: "warning"
            },
            important: {
                icon: "icon-important",
                className: "important"
            },
            attention: {
                icon: "icon-attention",
                className: "attention"
            },
            typeMappings: {
                info: "note",
                danger: "attention",
                caution: "attention"
            }
        };
        function mergeObjects(obj1, obj2) {
            var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            for (var property in obj2) {
                try {
                    if (obj2[property].constructor === Object && level < 1) {
                        obj1[property] = mergeObjects(obj1[property], obj2[property], level + 1);
                    } else {
                        obj1[property] = obj2[property];
                    }
                } catch (e) {
                    obj1[property] = obj2[property];
                }
            }
            return obj1;
        }
        var install = function install(hook, vm) {
            var options = mergeObjects(CONFIG, vm.config["flexible-alerts"] || vm.config.flexibleAlerts);
            var findSetting = function findAlertSetting(input, key, fallback, callback) {
                var match = (input || "").match(new RegExp("".concat(key, ":(([\\u002E\\s\\w\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF-]*))")));
                if (!match) {
                    return callback ? callback(fallback) : fallback;
                }
                return callback ? callback(match[1]) : match[1];
            };
            hook.afterEach(function(html) {
                return html.replace(/<\s*blockquote[^>]*>\s?(?:<p>)?\[!(\w*)((?:\|[\w*:[\u002E\s\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF-]*)*?)]([\s\S]*?)(?:<\/p>)?<\s*\/\s*blockquote>/g, function(match, key, settings, value) {
                    var _config$label;
                    if (!options[key.toLowerCase()] && options.typeMappings[key.toLowerCase()]) {
                        key = options.typeMappings[key.toLowerCase()];
                    }
                    var config = options[key.toLowerCase()];
                    if (!config) {
                        return match;
                    }
                    var style = findSetting(settings, "style", options.style);
                    var isIconVisible = findSetting(settings, "iconVisibility", "visible", function(value) {
                        return value !== "hidden";
                    });
                    var isLabelVisible = findSetting(settings, "labelVisibility", "visible", function(value) {
                        return value !== "hidden";
                    });
                    var icon = findSetting(settings, "icon", config.icon);
                    var className = findSetting(settings, "className", config.className);
                    var defaultLabel = (_config$label = config.label) !== null && _config$label !== void 0 ? _config$label : key.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
                        return "".concat(g1.toUpperCase()).concat(g2.toLowerCase());
                    });
                    var label = findSetting(settings, "label", defaultLabel);
                    if (_typeof(label) === "object") {
                        var foundLabel = Object.keys(label).filter(function(key) {
                            return vm.route.path.indexOf(key) > -1;
                        });
                        if (foundLabel && foundLabel.length > 0) {
                            label = label[foundLabel[0]];
                        } else {
                            isLabelVisible = false;
                            isIconVisible = false;
                        }
                    }
                    var iconTag = '<span class="icon '.concat(icon, '"></span>');
                    var titleTag = '<p class="title">'.concat(isIconVisible ? iconTag : "").concat(isLabelVisible ? label : "", "</p>");
                    return '<div class="alert '.concat(style, " ").concat(className, '">\n            ').concat(isIconVisible || isLabelVisible ? titleTag : "", "\n            <p>").concat(value, "</p>\n          </div>");
                });
            });
        };
        var docsify = window.$docsify || {};
        var docsifyMajorVersion = window.Docsify.version.split(".")[0];
        if (docsifyMajorVersion <= 4) {
            window.$docsify = _objectSpread2(_objectSpread2({}, docsify), {}, {
                plugins: [].concat(install, docsify.plugins)
            });
        } else {
            window.$docsify = _objectSpread2(_objectSpread2({}, docsify), {}, {
                plugins: [].concat(install, docsify.plugins),
                markdown: {
                    renderer: {
                        blockquote: function blockquote(_ref) {
                            var tokens = _ref.tokens;
                            return "<blockquote>".concat(this.parser.parse(tokens), "</blockquote>");
                        }
                    }
                }
            });
        }
    })();
})();
//# sourceMappingURL=docsify-plugin-flexible-alerts.js.map
