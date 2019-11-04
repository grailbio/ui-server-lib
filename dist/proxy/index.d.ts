/// <reference types="connect" />
export declare const setupProxy: (target: string, proxyOptions?: {
    [x: string]: any;
}) => import("connect").NextHandleFunction;
