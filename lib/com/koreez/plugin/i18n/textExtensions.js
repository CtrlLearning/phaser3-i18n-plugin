"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i18next_1 = require("i18next");
var setText = function (value) {
    if (value !== this._i18nKey) {
        this._i18nKey = value.toString() || "";
    }
    if (this.interpolations === undefined || this._i18nKey === "") {
        return this._setText(this._i18nKey);
    }
    else {
        return this._setText(i18next_1.default.t(this._i18nKey, this._interpolations) || "");
    }
};
var interpolations = {
    get: function () {
        return this._interpolations;
    },
    set: function (value) {
        this._interpolations = value === undefined ? null : value;
        this.setText(this._i18nKey);
    }
};
var setTranslationParameter = function (key, value) {
    if (!this._interpolations) {
        this._interpolations = {};
    }
    this._interpolations[key] = value;
    this.setText(this._i18nKey);
};
var clearTranslationParameter = function (key) {
    if (key in this._interpolations) {
        delete this._interpolations[key];
    }
    this.setText(this._i18nKey);
};
var commonExtend = function (clazz, prop) {
    if (clazz.prototype.setText !== setText) {
        clazz.prototype._setText = clazz.prototype.setText;
        clazz.prototype.setText = setText;
        Object.defineProperty(clazz.prototype, "interpolations", interpolations);
        clazz.prototype.setTranslationParameter = setTranslationParameter;
        clazz.prototype.clearTranslationParameter = clearTranslationParameter;
    }
    var creator = Phaser.GameObjects.GameObjectCreator;
    if (creator) {
        var textCreator = creator.prototype[prop];
        if (textCreator) {
            delete creator.prototype[prop];
            creator.register("_" + prop, textCreator);
            creator.register(prop, function (config, addToScene) {
                if (addToScene === void 0) { addToScene = false; }
                var _text = this.scene.make["_" + prop](config, addToScene);
                _text.interpolations = config.interpolations;
                return _text;
            });
        }
    }
    var factory = Phaser.GameObjects.GameObjectFactory;
    if (factory) {
        var textFactory = factory.prototype[prop];
        if (textFactory) {
            delete factory.prototype[prop];
            factory.register("_" + prop, textFactory);
        }
    }
};
var textExtensions = {
    extendText: function () {
        var text = Phaser.GameObjects.Text;
        if (text) {
            commonExtend(text, "text");
        }
        var gameObjectFactory = Phaser.GameObjects.GameObjectFactory;
        if (!gameObjectFactory) {
            return;
        }
        gameObjectFactory.register("text", function (x, y, str, style, theInterpolations) {
            var aText = this.scene.add._text(x, y, str, style);
            aText.interpolations = theInterpolations;
            return aText;
        });
    },
    extendBitmapText: function () {
        var bitmapText = Phaser.GameObjects.BitmapText;
        if (bitmapText) {
            commonExtend(bitmapText, "bitmapText");
        }
        var gameObjectFactory = Phaser.GameObjects.GameObjectFactory;
        if (!gameObjectFactory) {
            return;
        }
        gameObjectFactory.register("bitmapText", function (x, y, font, str, size, theInterpolations) {
            var aText = this.scene.add._bitmapText(x, y, font, str, size);
            aText.interpolations = theInterpolations;
            return aText;
        });
    },
    extendDynamicBitmapText: function () {
        var dynamicBitmapText = Phaser.GameObjects.DynamicBitmapText;
        if (dynamicBitmapText) {
            commonExtend(dynamicBitmapText, "dynamicBitmapText");
        }
        var gameObjectFactory = Phaser.GameObjects.GameObjectFactory;
        if (!gameObjectFactory) {
            return;
        }
        gameObjectFactory.register("dynamicBitmapText", function (x, y, font, str, size, theInterpolations) {
            var aText = this.scene.add._dynamicBitmapText(x, y, font, str, size);
            aText.interpolations = theInterpolations;
            return aText;
        });
    }
};
exports.default = textExtensions;
//# sourceMappingURL=textExtensions.js.map