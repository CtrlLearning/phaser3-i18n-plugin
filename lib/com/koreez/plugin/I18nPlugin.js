"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var i18next_1 = require("i18next");
var XHR = require("i18next-xhr-backend");
var textExtensions_1 = require("./i18n/textExtensions");
var I18nPlugin = (function (_super) {
    tslib_1.__extends(I18nPlugin, _super);
    function I18nPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    I18nPlugin.staticConstructor = function () {
        textExtensions_1.default.extendText();
        textExtensions_1.default.extendBitmapText();
        textExtensions_1.default.extendDynamicBitmapText();
    };
    Object.defineProperty(I18nPlugin.prototype, "modules", {
        get: function () {
            return i18next_1.default.modules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(I18nPlugin.prototype, "services", {
        get: function () {
            return i18next_1.default.services;
        },
        enumerable: true,
        configurable: true
    });
    I18nPlugin.prototype.boot = function () {
        var eventEmitter = this.systems.events;
        eventEmitter.on("shutdown", this.shutdown, this);
        eventEmitter.on("shutdown", this.shutdown, this);
        this.languageChangedBound = this.languageChanged.bind(this);
        this.on("languageChanged", this.languageChangedBound);
    };
    I18nPlugin.prototype.initialize = function (options, callback) {
        i18next_1.default.use(new XHR(null, options));
        if (options) {
            return i18next_1.default.init(options, callback);
        }
        return i18next_1.default.init(callback);
    };
    I18nPlugin.prototype.use = function (module) {
        return i18next_1.default.use(module);
    };
    I18nPlugin.prototype.t = function (key, options) {
        return i18next_1.default.t(key, options);
    };
    I18nPlugin.prototype.exists = function (key, options) {
        return i18next_1.default.exists(key, options);
    };
    I18nPlugin.prototype.loadResources = function (callback) {
        i18next_1.default.loadResources(callback);
    };
    I18nPlugin.prototype.createInstance = function (options, callback) {
        return i18next_1.default.createInstance(options, callback);
    };
    I18nPlugin.prototype.cloneInstance = function (options, callback) {
        return i18next_1.default.cloneInstance(options, callback);
    };
    I18nPlugin.prototype.getFixedT = function (lng, ns) {
        return i18next_1.default.getFixedT(lng, ns);
    };
    I18nPlugin.prototype.changeLanguage = function (lng, callback) {
        return i18next_1.default.changeLanguage(lng, callback);
    };
    Object.defineProperty(I18nPlugin.prototype, "language", {
        get: function () {
            return i18next_1.default.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(I18nPlugin.prototype, "languages", {
        get: function () {
            return i18next_1.default.languages;
        },
        enumerable: true,
        configurable: true
    });
    I18nPlugin.prototype.loadNamespaces = function (ns, callback) {
        return i18next_1.default.loadNamespaces(ns, callback);
    };
    I18nPlugin.prototype.loadLanguages = function (lngs, callback) {
        return i18next_1.default.loadLanguages(lngs, callback);
    };
    I18nPlugin.prototype.reloadResources = function (lngs, ns) {
        return i18next_1.default.reloadResources(lngs, ns);
    };
    I18nPlugin.prototype.setDefaultNamespace = function (ns) {
        i18next_1.default.setDefaultNamespace(ns);
    };
    I18nPlugin.prototype.dir = function (lng) {
        return i18next_1.default.dir(lng);
    };
    Object.defineProperty(I18nPlugin.prototype, "format", {
        get: function () {
            return i18next_1.default.format;
        },
        enumerable: true,
        configurable: true
    });
    I18nPlugin.prototype.on = function (event, listener) {
        i18next_1.default.on(event, listener);
    };
    I18nPlugin.prototype.off = function (event, listener) {
        i18next_1.default.off(event, listener);
    };
    I18nPlugin.prototype.getResource = function (lng, ns, key, options) {
        i18next_1.default.getResource(lng, ns, key, options);
    };
    I18nPlugin.prototype.addResource = function (lng, ns, key, value, options) {
        i18next_1.default.addResource(lng, ns, key, value, options);
    };
    I18nPlugin.prototype.addResources = function (lng, ns, resources) {
        i18next_1.default.addResources(lng, ns, resources);
    };
    I18nPlugin.prototype.addResourceBundle = function (lng, ns, resources, deep, overwrite) {
        i18next_1.default.addResourceBundle(lng, ns, resources, deep, overwrite);
    };
    I18nPlugin.prototype.hasResourceBundle = function (lng, ns) {
        return i18next_1.default.hasResourceBundle(lng, ns);
    };
    I18nPlugin.prototype.getResourceBundle = function (lng, ns) {
        return i18next_1.default.getResourceBundle(lng, ns);
    };
    I18nPlugin.prototype.removeResourceBundle = function (lng, ns) {
        i18next_1.default.removeResourceBundle(lng, ns);
    };
    Object.defineProperty(I18nPlugin.prototype, "options", {
        get: function () {
            return i18next_1.default.options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(I18nPlugin.prototype, "isInitialized", {
        get: function () {
            return i18next_1.default.isInitialized;
        },
        enumerable: true,
        configurable: true
    });
    I18nPlugin.prototype.recursiveUpdateText = function (obj) {
        var _this = this;
        if (obj instanceof Phaser.GameObjects.Text ||
            obj instanceof Phaser.GameObjects.BitmapText ||
            obj instanceof Phaser.GameObjects.DynamicBitmapText) {
            obj.setText(obj._i18nKey);
            return;
        }
        if (obj instanceof Phaser.GameObjects.Container) {
            obj.list.forEach(function (child) {
                _this.recursiveUpdateText(child);
            });
            return;
        }
        if (obj.children && obj.children.length > 0) {
            obj.children.each(function (child) {
                _this.recursiveUpdateText(child);
            });
        }
    };
    I18nPlugin.prototype.shutdown = function () {
        this.off("languageChanged", this.languageChangedBound);
        var eventEmitter = this.systems.events;
        eventEmitter.off("shutdown", this.shutdown, this, false);
        eventEmitter.off("shutdown", this.shutdown, this, false);
        this.scene = null;
    };
    I18nPlugin.prototype.languageChanged = function () {
        this.recursiveUpdateText(this.scene);
    };
    return I18nPlugin;
}(Phaser.Plugins.ScenePlugin));
exports.I18nPlugin = I18nPlugin;
I18nPlugin.staticConstructor();
//# sourceMappingURL=I18nPlugin.js.map