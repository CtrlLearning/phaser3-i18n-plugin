import i18next from "i18next";
import { Ii18n } from "./i18n/Ii18n";
export declare class I18nPlugin extends Phaser.Plugins.ScenePlugin implements Ii18n {
    static staticConstructor(): any;
    readonly modules: i18next.Modules;
    readonly services: i18next.Services;
    private languageChangedBound;
    boot(): void;
    initialize(options: any, callback?: i18next.Callback): void;
    use(module: any): i18next.i18n;
    t<TResult extends string | object | Array<string | object> | undefined = string, TKeys extends string = string, TValues extends object = object>(key: TKeys | TKeys[], options?: i18next.TOptions<TValues>): TResult;
    exists(key: string | string[], options?: i18next.InterpolationOptions): boolean;
    loadResources(callback?: (err: any) => void): void;
    createInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n;
    cloneInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n;
    getFixedT(lng: string | string[], ns?: string | string[]): i18next.TFunction;
    changeLanguage(lng: string, callback?: i18next.Callback): Promise<i18next.TFunction>;
    readonly language: string;
    readonly languages: string[];
    loadNamespaces(ns: string | string[], callback: i18next.Callback): Promise<void>;
    loadLanguages(lngs: string | string[], callback: i18next.Callback): Promise<void>;
    reloadResources(lngs?: string[], ns?: string[]): Promise<void>;
    setDefaultNamespace(ns: string): void;
    dir(lng?: string): "ltr" | "rtl";
    readonly format: i18next.FormatFunction;
    on(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    getResource(lng: string, ns: string, key: string, options?: {
        keySeparator?: string;
    }): any;
    addResource(lng: string, ns: string, key: string, value: string, options?: {
        keySeparator?: string;
        silent?: boolean;
    }): void;
    addResources(lng: string, ns: string, resources: any): void;
    addResourceBundle(lng: string, ns: string, resources: any, deep?: boolean, overwrite?: boolean): void;
    hasResourceBundle(lng: string, ns: string): boolean;
    getResourceBundle(lng: string, ns: string): any;
    removeResourceBundle(lng: string, ns: string): void;
    readonly options: i18next.InitOptions;
    readonly isInitialized: boolean;
    recursiveUpdateText(obj: any): void;
    private shutdown;
    private languageChanged;
}
