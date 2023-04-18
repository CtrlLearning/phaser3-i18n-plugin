import i18next from "i18next";
export interface Ii18n {
    modules: i18next.Modules;
    services: i18next.Services;
    exists: i18next.ExistsFunction;
    language: string;
    languages: string[];
    format: i18next.FormatFunction;
    options: i18next.InitOptions;
    isInitialized: boolean;
    loadResources(callback?: (err: any) => void): void;
    getFixedT(lng: string | string[], ns?: string | string[]): i18next.TFunction;
    getFixedT(lng: null, ns: string | string[]): i18next.TFunction;
    changeLanguage(lng: string, callback?: i18next.Callback): Promise<i18next.TFunction>;
    loadNamespaces(ns: string | string[], callback?: i18next.Callback): Promise<void>;
    loadLanguages(lngs: string | string[], callback?: i18next.Callback): Promise<void>;
    reloadResources(lngs?: string | string[], ns?: string | string[], callback?: () => void): Promise<void>;
    reloadResources(lngs: null, ns: string | string[], callback?: () => void): Promise<void>;
    setDefaultNamespace(ns: string): void;
    dir(lng?: string): "ltr" | "rtl";
    createInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n;
    cloneInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n;
    on(event: "initialized", callback: (options: i18next.InitOptions) => void): void;
    on(event: "loaded", callback: (loaded: boolean) => void): void;
    on(event: "failedLoading", callback: (lng: string, ns: string, msg: string) => void): void;
    on(event: "missingKey", callback: (lngs: string[], namespace: string, key: string, res: string) => void): void;
    on(event: "added" | "removed", callback: (lng: string, ns: string) => void): void;
    on(event: "languageChanged", callback: (lng: string) => void): void;
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
}
