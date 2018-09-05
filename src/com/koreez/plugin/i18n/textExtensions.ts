import * as i18next from "i18next";

const setText: (value: string) => any = function(value: string): any {
    console.log("value :", value);
    if (value !== this._i18nKey) {
        this._i18nKey = value.toString() || "";
    }
    this._i18nText = i18next.t(this._i18nKey, this._interpolations) || "";
    return this._setText(this._i18nText);
};

const interpolations: any = {
    get(): any {
        return this._interpolations;
    },

    set(value: any): void {
        this._interpolations = value;
        this.setText(this._i18nKey);
    }
};

const setTranslationParameter: (key: string, value: any) => void = function(key: string, value: any): void {
    if (!this._interpolations) {
        this._interpolations = {};
    }
    this._interpolations[key] = value;
    this.setText(this._i18nKey);
};

const clearTranslationParameter: (key: string) => void = function(key: string): void {
    if (key in this._interpolations) {
        delete this._interpolations[key];
    }
    this.setText(this._i18nKey);
};

const commonExtend: (clazz: any, prop: string) => void = (clazz: any, prop: string): void => {
    const creator: any = Phaser.GameObjects.GameObjectCreator;

    const factory: any = Phaser.GameObjects.GameObjectFactory;

    clazz.prototype._setText = clazz.prototype.setText;

    clazz.prototype.setText = setText;

    Object.defineProperty(clazz.prototype, "interpolations", interpolations);

    clazz.prototype.setTranslationParameter = setTranslationParameter;

    clazz.prototype.clearTranslationParameter = clearTranslationParameter;

    const textCreator: string = creator.prototype[prop];
    delete creator.prototype[prop];

    const textFactory: string = factory.prototype[prop];
    delete factory.prototype[prop];

    creator.register(`_${prop}`, textCreator);

    factory.register(`_${prop}`, textFactory);

    creator.register(prop, function(config: any, addToScene: boolean = false): Phaser.GameObjects.GameObject {
        const _text: Phaser.GameObjects.GameObject = this.scene.make[`_${prop}`](config, addToScene);
        (_text as any).interpolations = config.interpolations;
        return _text;
    });
};

const textExtensions: any = {
    extendText: () => {
        commonExtend(Phaser.GameObjects.Text, "text");

        (Phaser.GameObjects.GameObjectFactory as any).register("text", function(
            x: any,
            y: any,
            str: any,
            style: any,
            theInterpolations: any
        ): Phaser.GameObjects.GameObject {
            const aText: Phaser.GameObjects.GameObject = this.scene.add._text(x, y, str, style);
            (aText as any).interpolations = theInterpolations;
            return aText;
        });
    },

    extendBitmapText: () => {
        commonExtend(Phaser.GameObjects.BitmapText, "bitmapText");

        (Phaser.GameObjects.GameObjectFactory as any).register("bitmapText", function(
            x: any,
            y: any,
            font: any,
            str: any,
            size: any,
            theInterpolations: any
        ): Phaser.GameObjects.GameObject {
            const aText: Phaser.GameObjects.GameObject = this.scene.add._bitmapText(x, y, font, str, size);
            (aText as any).interpolations = theInterpolations;
            return aText;
        });
    },

    extendDynamicBitmapText: () => {
        commonExtend(Phaser.GameObjects.DynamicBitmapText, "dynamicBitmapText");

        (Phaser.GameObjects.GameObjectFactory as any).register("dynamicBitmapText", function(
            x: any,
            y: any,
            font: any,
            str: any,
            size: any,
            theInterpolations: any
        ): Phaser.GameObjects.GameObject {
            const aText: Phaser.GameObjects.GameObject = this.scene.add._dynamicBitmapText(x, y, font, str, size);
            (aText as any).interpolations = theInterpolations;
            return aText;
        });
    }
};

export default textExtensions;
