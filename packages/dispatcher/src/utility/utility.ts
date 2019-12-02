/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as fs from "fs";

import * as md5 from "ts-md5";

// ==== NOTE-utility-CANNOT-HAVE-IMPORT-CYCLE ====
// ==== import { MathematicsHelper } from "../mathematics/mathematics_helper/mathematics_helper";

export class Utility {

    public static toPrintDebuggingLogToConsole: boolean = false;

    public static epsilon: number = 0.0001;
    public static epsilonRough: number = 0.01;

    public static readonly LanguageTokenPunctuationDelimiters: string[] = [
        // ---- // ---- "\0",
        // ---- // ---- "\u0001",
        // ---- // ---- "\u0002",
        // ---- // ---- "\u0003",
        // ---- // ---- "\u0004",
        // ---- // ---- "\u0005",
        // ---- // ---- "\u0006",
        // ---- // ---- "\a",
        // ---- // ---- "\b",
        // ---- // ---- "\t",
        // ---- // ---- "\n",
        // ---- // ---- "\v",
        // ---- // ---- "\f",
        // ---- // ---- "\r",
        // ---- // ---- "\u000E",
        // ---- // ---- "\u000F",
        // ---- // ---- "\u0010",
        // ---- // ---- "\u0011",
        // ---- // ---- "\u0012",
        // ---- // ---- "\u0013",
        // ---- // ---- "\u0014",
        // ---- // ---- "\u0015",
        // ---- // ---- "\u0016",
        // ---- // ---- "\u0017",
        // ---- // ---- "\u0018",
        // ---- // ---- "\u0019",
        // ---- // ---- "\u001A",
        // ---- // ---- "\u001B",
        // ---- // ---- "\u001C",
        // ---- // ---- "\u001D",
        // ---- // ---- "\u001E",
        // ---- // ---- "\u001F",
        // ---- // ---- " ",
        "!",
        "\"",
        "#",
        "$",
        "%",
        "&",
        "\"",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "@",
        "[",
        "\\",
        "]",
        "^",
        "`",
        "{",
        "|",
        "}",
        "~",
        // ---- // ---- "\u007F"
    ];

    public static readonly LanguageTokenPunctuationDelimitersSet: Set<string> =
        new Set(Utility.LanguageTokenPunctuationDelimiters);

    public static readonly LanguageTokenPunctuationReplacementDelimiters: string[] = [
        // ---- // ---- " \0 ",
        // ---- // ---- " \u0001 ",
        // ---- // ---- " \u0002 ",
        // ---- // ---- " \u0003 ",
        // ---- // ---- " \u0004 ",
        // ---- // ---- " \u0005 ",
        // ---- // ---- " \u0006 ",
        // ---- // ---- " \a ",
        // ---- // ---- " \b ",
        // ---- // ---- " \t ",
        // ---- // ---- " \n ",
        // ---- // ---- " \v ",
        // ---- // ---- " \f ",
        // ---- // ---- " \r ",
        // ---- // ---- " \u000E ",
        // ---- // ---- " \u000F ",
        // ---- // ---- " \u0010 ",
        // ---- // ---- " \u0011 ",
        // ---- // ---- " \u0012 ",
        // ---- // ---- " \u0013 ",
        // ---- // ---- " \u0014 ",
        // ---- // ---- " \u0015 ",
        // ---- // ---- " \u0016 ",
        // ---- // ---- " \u0017 ",
        // ---- // ---- " \u0018 ",
        // ---- // ---- " \u0019 ",
        // ---- // ---- " \u001A ",
        // ---- // ---- " \u001B ",
        // ---- // ---- " \u001C ",
        // ---- // ---- " \u001D ",
        // ---- // ---- " \u001E ",
        // ---- // ---- " \u001F ",
        // ---- // ---- " ",
        " ! ",
        " \" ",
        " # ",
        " $ ",
        " % ",
        " & ",
        " \" ",
        " ( ",
        " ) ",
        " * ",
        " + ",
        " , ",
        " - ",
        " . ",
        " / ",
        " : ",
        " ; ",
        " < ",
        " = ",
        " > ",
        " ? ",
        " @ ",
        " [ ",
        " \\ ",
        " ] ",
        " ^ ",
        " ` ",
        " { ",
        " | ",
        " } ",
        " ~ ",
        // ---- // ---- " \u007F "
    ];

    public static readonly LanguageTokenSpaceDelimiters: string[] = [
        "\0",
        "\u0001",
        "\u0002",
        "\u0003",
        "\u0004",
        "\u0005",
        "\u0006",
        "\a",
        "\b",
        "\t",
        "\n",
        "\v",
        "\f",
        "\r",
        "\u000E",
        "\u000F",
        "\u0010",
        "\u0011",
        "\u0012",
        "\u0013",
        "\u0014",
        "\u0015",
        "\u0016",
        "\u0017",
        "\u0018",
        "\u0019",
        "\u001A",
        "\u001B",
        "\u001C",
        "\u001D",
        "\u001E",
        "\u001F",
        " ",
        // ---- // ---- "!",
        // ---- // ---- "\"",
        // ---- // ---- "#",
        // ---- // ---- "$",
        // ---- // ---- "%",
        // ---- // ---- "&",
        // ---- // ---- "\"",
        // ---- // ---- "(",
        // ---- // ---- ")",
        // ---- // ---- "*",
        // ---- // ---- "+",
        // ---- // ---- ",",
        // ---- // ---- "-",
        // ---- // ---- ".",
        // ---- // ---- "/",
        // ---- // ---- ":",
        // ---- // ---- ";",
        // ---- // ---- "<",
        // ---- // ---- "=",
        // ---- // ---- ">",
        // ---- // ---- "?",
        // ---- // ---- "@",
        // ---- // ---- "[",
        // ---- // ---- "\\",
        // ---- // ---- "]",
        // ---- // ---- "^",
        // ---- // ---- "`",
        // ---- // ---- "{",
        // ---- // ---- "|",
        // ---- // ---- "}",
        // ---- // ---- "~",
        "\u007F",
    ];

    public static LanguageTokenSpaceDelimitersSet: Set<string> =
        new Set(Utility.LanguageTokenSpaceDelimiters);

    public static incrementKeyValueNumberMap<K>(
        keyNumberMap: Map<K, number>,
        key: K,
        value: number = 1): void {
        if (keyNumberMap.has(key)) {
            const existedValue: number = keyNumberMap.get(key) as number;
            keyNumberMap.set(key, existedValue + value);
        } else {
            keyNumberMap.set(key, value);
        }
    }
    public static addKeyValueToNumberMapSet<K>(
        keyNumberMapSet: Map<K, Set<number>>,
        key: K,
        value: number): void {
        if (keyNumberMapSet.has(key)) {
            const numberSet: Set<number> = keyNumberMapSet.get(key) as Set<number>;
            numberSet.add(value);
        } else {
            const numberSet: Set<number> = new Set<number>();
            numberSet.add(value);
            keyNumberMapSet.set(key, numberSet);
        }
    }
    public static addToNumberMapSet<K>(
        keyNumberMapSetTo: Map<K, Set<number>>,
        keyNumberMapSetFrom: Map<K, Set<number>>,
        limit: number = -1): void {
        for (const key of keyNumberMapSetFrom.keys()) {
            const valueSetFrom: Set<number> =
                keyNumberMapSetFrom.get(key) as Set<number>;
            for (const value of valueSetFrom) {
                const valueSetTo: Set<number> =
                    keyNumberMapSetTo.get(key) as Set<number>;
                if (limit >= 0) {
                    const existingNumbers: number =
                        valueSetTo.size;
                    if (existingNumbers < limit) {
                        valueSetTo.add(value);
                    }
                } else {
                    valueSetTo.add(value);
                }
            }
        }
    }
    public static addKeyValueToNumberMapArray<K>(
        keyNumberMapArray: Map<K, number[]>,
        key: K,
        value: number): void {
        if (keyNumberMapArray.has(key)) {
            const numberArray: number[] = keyNumberMapArray.get(key) as number[];
            numberArray.push(value);
        } else {
            const numberArray: number[] = [];
            numberArray.push(value);
            keyNumberMapArray.set(key, numberArray);
        }
    }
    public static addToNumberMapArray<K>(
        keyNumberMapArrayTo: Map<K, number[]>,
        keyNumberMapArrayFrom: Map<K, number[]>,
        limit: number = -1): void {
        for (const key of keyNumberMapArrayFrom.keys()) {
            const valueArrayFrom: number[] =
                keyNumberMapArrayFrom.get(key) as number[];
            for (const value of valueArrayFrom) {
                const valueArrayTo: number[] =
                    keyNumberMapArrayTo.get(key) as number[];
                if (limit >= 0) {
                    const existingNumbers: number =
                        valueArrayTo.length;
                    if (existingNumbers < limit) {
                        valueArrayTo.push(value);
                    }
                } else {
                    valueArrayTo.push(value);
                }
            }
        }
    }

    public static mapToJsonSerialization<K, V>(map: Map<K, V>): string {
        return JSON.stringify([...map]);
        // ==== TODO ==== let jsonString: string = "{";
        // ==== TODO ==== let isFirst: boolean = true;
        // ==== TODO ==== map.forEach((value: V, key: K) => {
        // ==== TODO ====     if (isFirst) {
        // ==== TODO ====         isFirst = false;
        // ==== TODO ====     } else {
        // ==== TODO ====         jsonString += ",";
        // ==== TODO ====     }
        // ==== TODO ====     jsonString += JSON.stringify(key);
        // ==== TODO ====     jsonString += ":";
        // ==== TODO ====     jsonString += JSON.stringify(value);
        // ==== TODO ==== });
        // ==== TODO ==== jsonString += "}";
        // ==== TODO ==== return jsonString;
    }
    public static jsonSerializationToMap<K, V>(jsonString: string): Map<K, V> {
        const jsonParsedObject: any = JSON.parse(jsonString);
        return new Map<K, V>(jsonParsedObject);
        // ==== TODO ==== console.log("jsonParsedObject=", jsonParsedObject);
        // ==== TODO ==== console.log("Object.keys(jsonParsedObject)=", Object.keys(jsonParsedObject));
        // ==== TODO ==== console.log("Object.values(jsonParsedObject)=", Object.values(jsonParsedObject));
        // ==== TODO ==== const keys: string[] = Object.keys(jsonParsedObject);
        // ==== TODO ==== const values: V[] = Object.values(jsonParsedObject);
        // ==== TODO ==== const keyValuePairs = keys.map(function(key, index) {
        // ==== TODO ====     return [key, values[index]];
        // ==== TODO ==== });
        // ==== TODO ==== return new Map<K, V>(keyValuePairs);
    }
    public static setToJsonSerialization<T>(set: Set<T>): string {
        return JSON.stringify([...set]);
    }
    public static jsonSerializationToSet<T>(jsonString: string): Set<T> {
        return new Set<T>(JSON.parse(jsonString));
    }
    public static arrayToJsonSerialization<T>(set: T[]): string {
        return JSON.stringify([...set]);
    }
    public static jsonSerializationToArray<T>(jsonString: string): T[] {
        return new Array<T>(JSON.parse(jsonString));
    }

    public static stringMapToObject<V>(stringMap: Map<string, V>): any {
        const obj = Object.create(null);
        for (const [key, value] of stringMap) {
            // ---- We don't escape the key '__proto__'
            // ---- which can cause problems on older engines
            obj[key] = value;
        }
        return obj;
    }
    public static objectToStringMap<V>(obj: any): Map<string, V> {
        const stringMap = new Map<string, V>();
        for (const key of Object.keys(obj)) {
            stringMap.set(key, obj[key]);
        }
        return stringMap;
    }

    public static stringMapToJson<V>(stringMap: Map<string, V>): string {
        return JSON.stringify(Utility.stringMapToObject<V>(stringMap));
    }
    public static jsonToStringMap<V>(jsonString: string): Map<string, V> {
        return Utility.objectToStringMap<V>(JSON.parse(jsonString));
    }

    public static stringMapSetToObject<V>(stringMapSet: Map<string, Set<V>>): any {
        const obj = Object.create(null);
        for (const key of stringMapSet.keys()) {
            const value: Set<V> = stringMapSet.get(key) as Set<V>;
            obj[key] = Utility.setToJsonSerialization(value);
        }
        return obj;
    }
    public static objectToStringMapSet<V>(obj: any): Map<string, Set<V>> {
        const stringMapSet = new Map<string, Set<V>>();
        for (const key of Object.keys(obj)) {
            // ---- Utility.debuggingLog(`key=${key}`);
            // ---- Utility.debuggingLog(`value=${obj[key]}`);
            const valueSet: Set<V> = Utility.jsonSerializationToSet(obj[key]);
            stringMapSet.set(key, valueSet);
        }
        return stringMapSet;
    }
    public static stringMapArrayToObject<V>(stringMapArray: Map<string, V[]>): any {
        const obj = Object.create(null);
        for (const key of stringMapArray.keys()) {
            const value: V[] = stringMapArray.get(key) as V[];
            obj[key] = Utility.arrayToJsonSerialization(value);
        }
        return obj;
    }
    public static objectToStringMapArray<V>(obj: any): Map<string, V[]> {
        const stringMapArray = new Map<string, V[]>();
        for (const key of Object.keys(obj)) {
            const valueArray: V[] = Utility.jsonSerializationToArray(obj[key]);
            stringMapArray.set(key, valueArray);
        }
        return stringMapArray;
    }

    public static stringMapSetToJson<V>(stringMapSet: Map<string, Set<V>>): string {
        return JSON.stringify(Utility.stringMapSetToObject<V>(stringMapSet));
    }
    public static jsonToStringMapSet<V>(jsonString: string): Map<string, Set<V>> {
        return Utility.objectToStringMapSet<V>(JSON.parse(jsonString));
    }
    public static stringMapArrayToJson<V>(stringMapArray: Map<string, V[]>): string {
        return JSON.stringify(Utility.stringMapArrayToObject<V>(stringMapArray));
    }
    public static jsonToStringMapArray<V>(jsonString: string): Map<string, V[]> {
        return Utility.objectToStringMapArray<V>(JSON.parse(jsonString));
    }

    // ---- NOTE-REFERENCE:
    // https://github.com/v8/v8/blob/085fed0fb5c3b0136827b5d7c190b4bd1c23a23e/src/base
    // /utils/random-number-generator.h#L102
    public static getXorshift128plusState0(): number {
        return Utility.xorshift128plusState0;
    }
    public static getXorshift128plusState1(): number {
        return Utility.xorshift128plusState1;
    }
    public static rngSeedXorshift128plus(newState0: number, newState1: number): void {
        Utility.xorshift128plusState0 = newState0;
        Utility.xorshift128plusState1 = newState1;
        for (let i: number = 0; i < Utility.rngBurninIterations; i++) {
            Utility.rngNextXorshift128plusDirect();
        }
        Utility.rngBurninDone = true;
    }
    public static rngNextXorshift128plusDirect(): number {
        let s1: number = Utility.xorshift128plusState0;
        const s0: number = Utility.xorshift128plusState1;
        Utility.xorshift128plusState0 = s0;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s1 << 23;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s1 >> 17;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s0;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s0 >> 26;
        Utility.xorshift128plusState1 = s1;
        return Utility.xorshift128plusState0 + Utility.xorshift128plusState1;
    }
    public static rngNextXorshift128plus(): number {
        if (!Utility.rngBurninDone) {
            for (let i: number = 0; i < Utility.rngBurninIterations; i++) {
                Utility.rngNextXorshift128plusDirect();
            }
            Utility.rngBurninDone = true;
        }
        return Utility.rngNextXorshift128plusDirect();
    }
    // ==== TODO ==== public static rngNextFloatXorshift128plus(): number {
    // ==== TODO ====     let s1: number = Utility.xorshift128plusState0;
    // ==== TODO ====     let s0: number = Utility.xorshift128plusState1;
    // ==== TODO ====     Utility.xorshift128plusState0 = s0;
    // ==== TODO ====     s1 ^= s1 << 23;
    // ==== TODO ====     s1 ^= s1 >> 17;
    // ==== TODO ====     s1 ^= s0;
    // ==== TODO ====     s1 ^= s0 >> 26;
    // ==== TODO ====     Utility.xorshift128plusState1 = s1;
    // ==== TODO ====     const randomInt: number = Utility.xorshift128plusState0 + Utility.xorshift128plusState1;
    // ==== TODO ====     return randomInt / Number.MAX_VALUE;
    // ==== TODO ==== }

    public static getXorshift128plusState0BigInt(): bigint {
        return Utility.xorshift128plusState0BigInt;
    }
    public static getXorshift128plusState1BigInt(): bigint {
        return Utility.xorshift128plusState1BigInt;
    }
    public static getXorshift128plusCycleBigInt(): bigint {
        return Utility.xorshift128plusCycleBigInt;
    }
    public static getXorshift128plusCycleBigIntFloat(): number {
        return Utility.xorshift128plusCycleBigIntFloat;
    }
    public static rngSeedXorshift128plusBigIntWithNumber(
        newState0: number,
        newState1: number): void {
        Utility.xorshift128plusState0BigInt = BigInt(newState0);
        Utility.xorshift128plusState1BigInt = BigInt(newState1);
        for (let i: number = 0; i < Utility.rngBurninIterationsBigInt; i++) {
            Utility.rngNextXorshift128plusBigIntDirect();
        }
        Utility.rngBurninDoneBigInt = true;
    }
    public static rngSeedXorshift128plusBigInt(
        newState0BigInt: bigint,
        newState1BigInt: bigint,
        newCycleBigInt: bigint): void {
        Utility.xorshift128plusState0BigInt = newState0BigInt;
        Utility.xorshift128plusState1BigInt = newState1BigInt;
        Utility.xorshift128plusCycleBigInt = newCycleBigInt;
        for (let i: number = 0; i < Utility.rngBurninIterationsBigInt; i++) {
            Utility.rngNextXorshift128plusBigIntDirect();
        }
        Utility.rngBurninDoneBigInt = true;
    }
    public static rngNextXorshift128plusBigIntDirect(): bigint {
        let s1: bigint =
            Utility.xorshift128plusState0BigInt;
        const s0: bigint =
            Utility.xorshift128plusState1BigInt;
        Utility.xorshift128plusState0BigInt =
            s0;
        // tslint:disable-next-line: no-bitwise
        Utility.xorshift128plusState0BigInt %=
            Utility.xorshift128plusCycleBigInt;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s1 << Utility.bigint23;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s1 >> Utility.bigint17;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s0;
        // tslint:disable-next-line: no-bitwise
        s1 ^= s0 >> Utility.bigint26;
        Utility.xorshift128plusState1BigInt =
            s1;
        // tslint:disable-next-line: no-bitwise
        Utility.xorshift128plusState1BigInt %=
            Utility.xorshift128plusCycleBigInt;
        let result: bigint =
            Utility.xorshift128plusState0BigInt + Utility.xorshift128plusState1BigInt;
        // tslint:disable-next-line: no-bitwise
        result %= Utility.xorshift128plusCycleBigInt;
        return result;
    }
    public static rngNextXorshift128plusBigInt(): bigint {
        if (!Utility.rngBurninDoneBigInt) {
            for (let i: number = 0; i < Utility.rngBurninIterationsBigInt; i++) {
                Utility.rngNextXorshift128plusBigIntDirect();
            }
            Utility.rngBurninDoneBigInt = true;
        }
        return Utility.rngNextXorshift128plusBigIntDirect();
    }
    public static rngNextXorshift128plusBigIntFloat(): number {
        const resultBigInt: bigint = Utility.rngNextXorshift128plusBigInt();
        const resultNumber: number = Number(resultBigInt);
        return (resultNumber / Utility.xorshift128plusCycleBigIntFloat);
    }

    public static shuffle<T>(array: T[]): T[] {
        let currentIndex = array.length;
        let randomIndex: number = -1;
        // ---- While there remains elements to shuffle.
        while (currentIndex > 0) {
            // ---- Pick a remaining element.
            randomIndex =
                Math.floor(Utility.rngNextXorshift128plusBigIntFloat() * currentIndex);
            currentIndex--;
            // ---- And swap it with the current element.
            const temporaryValue: T = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    public static buildStringMapFromUniqueStringArray(
        stringArray: string[]): { [id: string]: number; } {
        const stringMap: { [id: string]: number; } = { };
        for (let index: number = 0; index < stringArray.length; index++) {
            stringMap[stringArray[index]] = index;
        }
        return stringMap;
    }
    public static buildStringMapFromStringArray(
        strings: string[]):
        { "stringArray": string[], "stringMap": { [id: string]: number; } } {
        const stringSet: Set<string> = new Set(strings);
        const stringArray: string[] = Array.from(stringSet.values());
        const stringMap: { [id: string]: number; } = Utility.buildStringMapFromUniqueStringArray(stringArray);
        return { stringArray, stringMap };
    }
    public static buildStringMapFromStringArrays(
        stringArrays: string[][]): { "stringArray": string[], "stringMap": { [id: string]: number; } } {
        const stringSet: Set<string> = new Set();
        for (const elementStringArray of stringArrays) {
            for (const elementString of elementStringArray) {
                stringSet.add(elementString);
            }
        }
        const stringArray: string[] = Array.from(stringSet.values());
        const stringMap: { [id: string]: number; } = Utility.buildStringMapFromUniqueStringArray(stringArray);
        return { stringArray, stringMap };
    }

    public static validateStringArrays(
        stringArrayFirst: string[],
        stringArraySecond: string[],
        throwIfNotLegal: boolean = true): boolean {
        if ((stringArrayFirst == null) && (stringArraySecond == null)) {
            return true;
        }
        if (stringArrayFirst == null) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow("stringArrayFirst==null");
            }
            return false;
        }
        if (stringArraySecond == null) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow("stringArraySecond==null");
            }
            return false;
        }
        if (stringArrayFirst.length !== stringArraySecond.length) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow(
                    `stringArrayFirst.length|${stringArrayFirst.length}|` +
                    `!=stringArraySecond.length|${ stringArraySecond.length}|`);
            }
            return false;
        }
        for (let index = 0; index < stringArrayFirst.length; index++) {
            const first: string = stringArrayFirst[index];
            const second: string = stringArraySecond[index];
            if (first !== second) {
                if (throwIfNotLegal) {
                    Utility.debuggingThrow(
                        `index=${index}` +
                        `first|${first}|` +
                        `!=second|${second}|`);
                }
                return false;
            }
        }
        return true;
    }
    public static validateStringSets(
        stringSetFirst: Set<string>,
        stringSetSecond: Set<string>,
        throwIfNotLegal: boolean = true): boolean {
        if ((stringSetFirst == null) && (stringSetSecond == null)) {
            return true;
        }
        if (stringSetFirst == null) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow("stringSetFirst==null");
            }
            return false;
        }
        if (stringSetSecond == null) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow("stringSetSecond==null");
            }
            return false;
        }
        const stringSetFirstLength: number = Utility.getSetLength(stringSetFirst);
        const stringSetSecondLength: number = Utility.getSetLength(stringSetSecond);
        if (stringSetFirstLength !== stringSetSecondLength) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow(
                    `stringSetFirstLength|${stringSetFirstLength}|` +
                    `!=stringSetSecondLength|${stringSetSecondLength}|`);
            }
            return false;
        }
        for (const key of stringSetFirst) {
            if (key) {
                if (stringSetSecond.has(key)) {
                    continue;
                } else {
                    if (throwIfNotLegal) {
                        Utility.debuggingThrow(
                            `key|${key}| is in stringSetFirst, but not in stringSetSecond`);
                    }
                    return false;
                }
            }
        }
        for (const key of stringSetSecond) {
            if (key) {
                if (stringSetFirst.has(key)) {
                    continue;
                } else {
                    if (throwIfNotLegal) {
                        Utility.debuggingThrow(
                            `key|${key}| is in stringSetSecond, but not in stringSetFirst`);
                    }
                    return false;
                }
            }
        }
        return true;
    }
    public static validateStringMaps(
        stringMapFirst: { [id: string]: number; },
        stringMapSecond: { [id: string]: number; },
        throwIfNotLegal: boolean = true): boolean {
        if ((stringMapFirst == null) && (stringMapSecond == null)) {
            return true;
        }
        if (stringMapFirst == null) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow("stringMapFirst==null");
            }
            return false;
        }
        if (stringMapSecond == null) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow("stringMapSecond==null");
            }
            return false;
        }
        const stringMapFirstLength: number = Utility.getMapLength(stringMapFirst);
        const stringMapSecondLength: number = Utility.getMapLength(stringMapSecond);
        if (stringMapFirstLength !== stringMapSecondLength) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow(
                    `stringMapFirstLength|${stringMapFirstLength}|` +
                    `!=stringMapSecondLength|${stringMapSecondLength}|`);
            }
            return false;
        }
        for (const key in stringMapFirst) {
            if (key) {
                if (key in stringMapSecond) {
                    if (stringMapFirst[key] !== stringMapSecond[key]) {
                        if (throwIfNotLegal) {
                            Utility.debuggingThrow(
                                `stringMapFirst[key]=${key}, stringMapSecond[key]=${key}`);
                        }
                        return false;
                    }
                    continue;
                } else {
                    if (throwIfNotLegal) {
                        Utility.debuggingThrow(
                            `key|${key}| is in stringMapFirst, but not in stringMapSecond`);
                    }
                    return false;
                }
            }
        }
        for (const key in stringMapSecond) {
            if (key) {
                if (key in stringMapFirst) {
                    if (stringMapFirst[key] !== stringMapSecond[key]) {
                        if (throwIfNotLegal) {
                            Utility.debuggingThrow(
                                `stringMapFirst[key]=${key}, stringMapSecond[key]=${key}`);
                        }
                        return false;
                    }
                    continue;
                } else {
                    if (throwIfNotLegal) {
                        Utility.debuggingThrow(
                            `key|${key}| is in stringMapSecond, but not in stringMapFirst`);
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public static validateStringMap(
        stringArray: string[],
        stringMap: { [id: string]: number; },
        throwIfNotLegal: boolean = true): boolean {
        if (stringArray == null) {
            if (throwIfNotLegal) {
                throw new Error("stringArray == null");
            }
            return false;
        }
        if (stringMap == null) {
            if (throwIfNotLegal) {
                throw new Error("stringMap == null");
            }
            return false;
        }
        if (stringArray.length !== Utility.getMapLength(stringMap)) {
            if (throwIfNotLegal) {
                throw new Error(
                    "stringArray.length|" + stringArray.length +
                    "| !== stringMap.length|" + Utility.getMapLength(stringMap) + "|");
            }
            return false;
        }
        for (const key in stringMap) {
            if (key) {
                // ---- side effect is to remove TSLint warning for
                // ---- "in" statements must be filtered with an if statement.
                const keyId = stringMap[key];
                if ((keyId < 0) || (keyId > stringArray.length)) {
                    if (throwIfNotLegal) {
                        throw new Error("(keyId < 0) || (keyId > stringArray.length)");
                    }
                    return false;
                }
                const keyRetrieved = stringArray[keyId];
                if (key !== keyRetrieved) {
                    if (throwIfNotLegal) {
                        throw new Error("key !== keyRetrieved");
                    }
                    return false;
                }
            }
        }
        return true;
    }
    public static validateKeyId(
        keyId: number,
        stringMap: { [id: string]: number; },
        throwIfNotLegal: boolean = true): boolean {
        if (keyId < 0) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow(
                    `keyId=${keyId}, small than 0`);
            }
            return false;
        }
        if (keyId >= Utility.getMapLength(stringMap)) {
            if (throwIfNotLegal) {
                Utility.debuggingThrow(
                    `keyId=${keyId}, greater or equal to number of keys, ${stringMap.size}`);
            }
            return false;
        }
        return true;
    }
    public static validateKey(
        key: string,
        stringMap: { [id: string]: number; },
        throwIfNotLegal: boolean = true): boolean {
        if (key in stringMap) {
            return true;
        } else {
            if (throwIfNotLegal) {
                Utility.debuggingThrow(
                    `key=${key}, not int the key map=${stringMap}`);
            }
            return false;
        }
    }

    public static loadLabelTextColumnarFile(
        filename: string,
        labelColumnIndex: number = 0,
        textColumnIndex: number = 1,
        lineIndexToStart: number = 0,
        columnDelimiter: string = "\t",
        rowDelimiter: string = "\n",
        encoding: string = "utf8",
        lineIndexToEnd: number = -1): { "intents": string[], "utterances": string[] } {
        if (encoding == null) {
            encoding = "utf8";
        }
        const fileContent: string = Utility.loadFile(
            filename,
            encoding);
        return Utility.loadLabelTextColumnarContent(
            fileContent,
            labelColumnIndex,
            textColumnIndex,
            lineIndexToStart,
            columnDelimiter,
            rowDelimiter,
            lineIndexToEnd);
    }
    public static loadLabelTextColumnarContent(
        fileContent: string,
        labelColumnIndex: number = 0,
        textColumnIndex: number = 1,
        lineIndexToStart: number = 0,
        columnDelimiter: string = "\t",
        rowDelimiter: string = "\n",
        lineIndexToEnd: number = -1):
        { "intents": string[], "utterances": string[] } {
        if (labelColumnIndex < 0) {
            labelColumnIndex = 0;
        }
        if (textColumnIndex < 0) {
            textColumnIndex = 1;
        }
        if (lineIndexToStart < 0) {
            lineIndexToStart = 0;
        }
        if (columnDelimiter == null) {
            columnDelimiter = "\t";
        }
        if (rowDelimiter == null) {
            rowDelimiter = "\n";
        }
        const intents: string[] = [];
        const utterances: string[] = [];
        const fileLines: string[] = fileContent.split(rowDelimiter);
        for (let lineIndex = lineIndexToStart;
            (lineIndex < fileLines.length) && ((lineIndexToEnd < 0) || (lineIndex < lineIndexToEnd));
            lineIndex++) {
            const line: string = fileLines[lineIndex].trim();
            if (Utility.isEmptyString(line)) {
                continue;
            }
            const lineColumns: string[] = line.split(columnDelimiter);
            const intent: string = lineColumns[labelColumnIndex];
            const utterance: string = lineColumns[textColumnIndex];
            if (Utility.isEmptyString(intent)) {
                Utility.debuggingThrow(
                    `LINE - INDEX=${lineIndex}, intent is empty` +
                    `, lineColumns.length=${lineColumns.length}` +
                    `, intent=$${intent}$` +
                    `, utterance=$${utterance}$` +
                    `, line=$${line}$`);
            }
            // {
            //     Utility.debuggingLog(
            //         `LINE - INDEX=${lineIndex}` +
            //         `, lineColumns.length=${lineColumns.length}` +
            //         `, intent=$${intent}$` +
            //         `, utterance=$${utterance}$` +
            //         `, line=$${line}$`);
            //
            // }
            intents.push(intent);
            utterances.push(utterance);
        }
        return { intents, utterances };
    }

    public static luUtterancesToEntityAnnotatedCorpusTypes(
        luUtterances: any[],
        utteranceReconstructionDelimiter: string = " ",
        defaultEntityTag: string = "O",
        defaultPartOfSpeechTag: string = "",
        useIntentForId: boolean = false): {
            "ids": string[],
            "wordArrays": string[][],
            "partOfSpeechTagArrays": string[][],
            "entityTagArrays": string[][] } {
        const ids: string[] = [];
        const wordArrays: string[][] = [];
        const partOfSpeechTagArrays: string[][] = [];
        const entityTagArrays: string[][] = [];
        const numberInstances = luUtterances.length;
        for (let index: number = 0; index < numberInstances; index++) {
            const luUtterance: any = luUtterances[index];
            const text: string = luUtterance.text;
            const intent: string = luUtterance.intent;
            const entities: any[] = luUtterance.entities;
            const partOfSpeechTags: any[] = luUtterance.partOfSpeechTags;
            if (useIntentForId) {
                ids.push(intent);
            } else {
                ids.push(index.toString());
            }
            const wordArray: string[] = Utility.splitByPunctuation(
                text,
                utteranceReconstructionDelimiter);
            wordArrays.push(wordArray);
            const numberWords: number = wordArrays.length;
            const entityTagArray: string[] = [];
            if (!Utility.isEmptyArrays(entities)) {
                let utteranceCurrentIndex: number = 0;
                for (let wordIndex: number = 0; wordIndex < numberWords; wordIndex++) {
                    const wordCurrent: string = wordArray[wordIndex];
                    const currentWordInUtteranceIndex: number = text.substr(utteranceCurrentIndex).indexOf(wordCurrent);
                    const currentWordInUtteranceIndexEnd: number = currentWordInUtteranceIndex + wordCurrent.length;
                    let wordEntityTag: string = defaultEntityTag;
                    for (const entity of entities) {
                        const entityTag: string = entity.entity;
                        const entityStartPos: number  = entity.startPos;
                        const entityEndPos: number  = entity.endPos;
                        if ((currentWordInUtteranceIndex >= entityStartPos) &&
                            (currentWordInUtteranceIndexEnd <= entityEndPos)) {
                            wordEntityTag = entityTag;
                            break;
                        }
                    }
                    entityTagArray.push(wordEntityTag);
                    utteranceCurrentIndex = currentWordInUtteranceIndexEnd;
                }
            }
            entityTagArrays.push(entityTagArray);
            const partOfSpeechTagArray: string[] = [];
            if (!Utility.isEmptyArrays(partOfSpeechTags)) {
                let utteranceCurrentIndex: number = 0;
                for (let wordIndex: number = 0; wordIndex < numberWords; wordIndex++) {
                    const wordCurrent: string = wordArray[wordIndex];
                    const currentWordInUtteranceIndex: number = text.substr(utteranceCurrentIndex).indexOf(wordCurrent);
                    const currentWordInUtteranceIndexEnd: number = currentWordInUtteranceIndex + wordCurrent.length;
                    let wordPartOfSpeechTag: string = defaultPartOfSpeechTag;
                    for (const partOfSpeechTag of partOfSpeechTags) {
                        const partOfSpeechTagString: string = partOfSpeechTag.partOfSpeechTag;
                        const partOfSpeechStartPos: number  = partOfSpeechTag.startPos;
                        const partOfSpeechEndPos: number  = partOfSpeechTag.endPos;
                        if ((currentWordInUtteranceIndex >= partOfSpeechStartPos) &&
                            (currentWordInUtteranceIndexEnd <= partOfSpeechEndPos)) {
                            wordPartOfSpeechTag = partOfSpeechTagString;
                            break;
                        }
                    }
                    partOfSpeechTagArray.push(wordPartOfSpeechTag);
                    utteranceCurrentIndex = currentWordInUtteranceIndexEnd;
                }
            }
            partOfSpeechTagArrays.push(partOfSpeechTagArray);
        }
        return {ids, wordArrays, partOfSpeechTagArrays, entityTagArrays};
    }
    public static entityAnnotatedCorpusTypesToEntityAnnotatedCorpusUtterances(
        entityAnnotatedCorpusTypes: {
            "ids": string[],
            "wordArrays": string[][],
            "partOfSpeechTagArrays": string[][],
            "entityTagArrays": string[][] },
        includePartOfSpeechTagTagAsEntities: boolean = true,
        utteranceReconstructionDelimiter: string = " ",
        defaultEntityTag: string = "O",
        useIdForIntent: boolean = true): any[] {
        if (Utility.isEmptyString(utteranceReconstructionDelimiter)) {
            utteranceReconstructionDelimiter = " ";
        }
        const utteranceReconstructionDelimiterLength: number = utteranceReconstructionDelimiter.length;
        const ids: string[] = entityAnnotatedCorpusTypes.ids;
        const wordArrays: string[][] = entityAnnotatedCorpusTypes.wordArrays;
        const partOfSpeechTagArrays: string[][] = entityAnnotatedCorpusTypes.partOfSpeechTagArrays;
        const entityTagArrays: string[][] = entityAnnotatedCorpusTypes.entityTagArrays;
        if (Utility.isEmptyStringArray(ids)) {
            Utility.debuggingThrow("ids is empty");
        }
        if (Utility.isEmptyArray(wordArrays)) {
            Utility.debuggingThrow("wordArrays is empty");
        }
        if (includePartOfSpeechTagTagAsEntities) {
            if (Utility.isEmptyArray(partOfSpeechTagArrays)) {
                Utility.debuggingThrow("partOfSpeechTagArrays is empty");
            }
        }
        if (Utility.isEmptyArray(entityTagArrays)) {
            Utility.debuggingThrow("entityTagArrays is empty");
        }
        const numberInstances: number = ids.length;
        if (wordArrays.length !== numberInstances) {
            Utility.debuggingThrow(
                `wordArrays.length|${wordArrays.length}|!==numberInstances|${numberInstances}|`);
        }
        if (includePartOfSpeechTagTagAsEntities) {
            if (partOfSpeechTagArrays.length !== numberInstances) {
            Utility.debuggingThrow(`partOfSpeechTagArrays.length|${partOfSpeechTagArrays.length}|!==numberInstances|${numberInstances}|`);
            }
        }
        if (entityTagArrays.length !== numberInstances) {
            Utility.debuggingThrow(
                `entityTagArrays.length|${entityTagArrays.length}|!==numberInstances|${numberInstances}|`);
        }
        const luUtterances: any[] = [];
        for (let index: number = 0; index < numberInstances; index++) {
            let intent = "";
            const id: string = ids[index];
            if (useIdForIntent) {
                intent = id;
            }
            const wordArray: string[] = wordArrays[index];
            const numberWords: number = wordArray.length;
            let partOfSpeechTagArray: string[] = [];
            if (includePartOfSpeechTagTagAsEntities) {
                partOfSpeechTagArray = partOfSpeechTagArrays[index];
                if (partOfSpeechTagArray.length !== numberWords) {
                    Utility.debuggingThrow(
                        `partOfSpeechTagArray.length|${partOfSpeechTagArray.length}|!==numberWords|${numberWords}|`);
                }
            }
            const entityTagArray: string[] = entityTagArrays[index];
            if (entityTagArray.length !== numberWords) {
                Utility.debuggingThrow(
                    `entityTagArray.length|${entityTagArray.length}|!==numberWords|${numberWords}|`);
            }
            const text: string = wordArray.join(utteranceReconstructionDelimiter);
            const entities: any[] = [];
            {
                let currentUtteranceBeginIndex: number = 0;
                for (let wordIndex: number = 0; wordIndex < numberWords; wordIndex++) {
                    const word: string = wordArray[wordIndex];
                    const wordLength: number = word.length;
                    const currentUtteranceEndIndex: number = currentUtteranceBeginIndex + wordLength;
                    {
                        const entityTag = entityTagArray[wordIndex];
                        if (entityTag !== defaultEntityTag) {
                            const entityStructure: any = {
                                entity: entityTag,
                                startPos: currentUtteranceBeginIndex,
                                endPos: currentUtteranceEndIndex,
                            };
                            entities.push(entityStructure);
                        }
                    }
                    currentUtteranceBeginIndex = currentUtteranceEndIndex + utteranceReconstructionDelimiterLength;
                }
            }
            const partOfSpeechTags: any[] = [];
            if (includePartOfSpeechTagTagAsEntities) {
                let currentUtteranceBeginIndex: number = 0;
                for (let wordIndex: number = 0; wordIndex < numberWords; wordIndex++) {
                    const word: string = wordArray[wordIndex];
                    const wordLength: number = word.length;
                    const currentUtteranceEndIndex: number = currentUtteranceBeginIndex + wordLength;
                    const partOfSpeechTag: string = partOfSpeechTagArray[wordIndex];
                    const partOfSpeechStructure: any = {
                        partOfSpeechTag,
                        startPos: currentUtteranceBeginIndex,
                        endPos: currentUtteranceEndIndex,
                    };
                    partOfSpeechTags.push(partOfSpeechStructure);
                    currentUtteranceBeginIndex = currentUtteranceEndIndex + utteranceReconstructionDelimiterLength;
                }
            }
            const luUtterance: any = {
                entities,
                partOfSpeechTags,
                intent,
                text,
            };
            luUtterances.push(luUtterance);
        }
        return luUtterances;
    }

    public static loadEntityAnnotatedCorpusFile(
        filename: string,
        lineIndexToStart: number = 0,
        columnDelimiter: string = ",",
        rowDelimiter: string = "\n",
        encoding: string = "utf8",
        lineIndexToEnd: number = -1): {
            "ids": string[],
            "wordArrays": string[][],
            "partOfSpeechTagArrays": string[][],
            "entityTagArrays": string[][] } {
        if (encoding == null) {
            encoding = "utf8";
        }
        const fileContent: string = Utility.loadFile(
            filename,
            encoding);
        return Utility.loadEntityAnnotatedCorpusContent(
            fileContent,
            lineIndexToStart,
            columnDelimiter,
            rowDelimiter,
            lineIndexToEnd);
    }
    public static loadEntityAnnotatedCorpusContent(
        fileContent: string,
        lineIndexToStart: number = 1,
        columnDelimiter: string = ",",
        rowDelimiter: string = "\n",
        lineIndexToEnd: number = -1): {
            "ids": string[],
            "wordArrays": string[][],
            "partOfSpeechTagArrays": string[][],
            "entityTagArrays": string[][] } {
        if (lineIndexToStart < 0) {
            lineIndexToStart = 0;
        }
        if (columnDelimiter == null) {
            columnDelimiter = ",";
        }
        if (rowDelimiter == null) {
            rowDelimiter = "\n";
        }
        const ids: string[] = [];
        const wordArrays: string[][] = [];
        const partOfSpeechTagArrays: string[][] = [];
        const entityTagArrays: string[][] = [];
        let currentId: string = "";
        let currentWordArray: string[] = [];
        let currentPartOfSpeechTagArray: string[] = [];
        let currentTagArray: string[] = [];
        let isFirst: boolean = true;
        const fileLines: string[] = fileContent.split(rowDelimiter);
        for (let lineIndex = lineIndexToStart;
            (lineIndex < fileLines.length) && ((lineIndexToEnd < 0) || (lineIndex < lineIndexToEnd));
            lineIndex++) {
            const line: string = fileLines[lineIndex].trim();
            if (Utility.isEmptyString(line)) {
                continue;
            }
            const lineColumns: string[] = Utility.splitStringWithColumnDelimitersFilteredByQuotingDelimiters(
                line,
                columnDelimiter,
                "\"");
            if (lineColumns.length !== 4) {
                Utility.debuggingThrow(
                    `lineColumns.length|${lineColumns.length}|!=4` +
                    `,line=$${line}$` +
                    `,lineColumns=$${JSON.stringify(lineColumns)}$`);
            }
            const id: string = lineColumns[0];
            const word: string  = lineColumns[1];
            const partOfSpeechTag: string  = lineColumns[2];
            const entityTag: string  = lineColumns[3];
            const isIdEmpty: boolean = Utility.isEmptyString(id);
            if (isIdEmpty) {
                currentWordArray.push(word);
                currentPartOfSpeechTagArray.push(partOfSpeechTag);
                currentTagArray.push(entityTag);
            } else {
                if (isFirst) {
                    isFirst = false;
                } else {
                    ids.push(currentId);
                    wordArrays.push(currentWordArray);
                    partOfSpeechTagArrays.push(currentPartOfSpeechTagArray);
                    entityTagArrays.push(currentTagArray);
                }
                currentId = id;
                currentWordArray = [word];
                currentPartOfSpeechTagArray = [partOfSpeechTag];
                currentTagArray = [entityTag];
            }
        }
        if (!Utility.isEmptyString(currentId)) {
            ids.push(currentId);
            wordArrays.push(currentWordArray);
            partOfSpeechTagArrays.push(currentPartOfSpeechTagArray);
            entityTagArrays.push(currentTagArray);
        }
        return {ids, wordArrays, partOfSpeechTagArrays, entityTagArrays};
    }

    public static loadFile(
        filename: string,
        encoding: string = "utf8"): string {
        Utility.debuggingLog(
            `Utility.loadFile(): filename=${filename}`);
        Utility.debuggingLog(
            `Utility.loadFile(): process.cmd()=${process.cwd()}`);
        try {
            const fileContent: string = fs.readFileSync(filename, encoding);
            return fileContent;
        } catch (e) {
            Utility.debuggingThrow(
                `Utility.loadFile(): filename=${filename}, exception=${e}`);
        }
        return "";
    }
    public static dumpFile(
        filename: string,
        content: any,
        encoding: string = "utf8"): void {
        // Utility.debuggingLog(
        //     `Utility.dumpFile(): filename=${filename}`);
        fs.writeFileSync(filename, content, encoding);
    }
    public static exists(path: string): boolean {
        return fs.existsSync(path);
    }

    public static getObjectMd5Hash(objectValue: object): string|Int32Array {
        return Utility.getStringMd5Hash(JSON.stringify(objectValue));
    }
    public static getStringMd5Hash(feature: string): string | Int32Array {
        return md5.Md5.hashStr(feature);
    }

    public static getPositiveObjectHashCode(objectValue: object): number {
        return Math.abs(Utility.getObjectHashCode(objectValue));
    }
    public static getObjectHashCode(objectValue: object): number {
        return Utility.getStringHashCode(JSON.stringify(objectValue).toString());
    }
    public static getPositiveStringHashCode(feature: string): number {
        return Math.abs(Utility.getStringHashCode(feature));
    }
    public static getStringHashCode(feature: string): number {
        let hash: number = 0;
        if (!feature) {
            return hash;
        }
        if (feature.length === 0) {
            return hash;
        }
        for (let i: number = 0; i < feature.length; i++) {
            const char: number = feature.charCodeAt(i);
            // tslint:disable-next-line: no-bitwise
            hash = ((hash << 5) - hash) + char;
            // tslint:disable-next-line: no-bitwise
            hash |= 0; // ---- Convert to 32bit integer
        }
        return hash;
    }

    public static isEmptyNumberF32I32U8Array(inputArray: Float32Array | Int32Array | Uint8Array): boolean {
        return !(inputArray && inputArray.length > 0);
    }
    public static isEmptyBooleanArrays(inputArrays: boolean[][]): boolean {
        return !(inputArrays && inputArrays.length > 0);
    }
    public static isEmptyNumberArrays(inputArrays: number[][]): boolean {
        return !(inputArrays && inputArrays.length > 0);
    }
    public static isEmptyArrays(inputArrays: object[][]): boolean {
        return !(inputArrays && inputArrays.length > 0);
    }
    public static isEmptyBooleanArray(inputArray: boolean[]): boolean {
        return !(inputArray && inputArray.length > 0);
    }
    public static isEmptyNumberArray(inputArray: number[]): boolean {
        return !(inputArray && inputArray.length > 0);
    }
    public static isEmptyStringArray(inputArray: string[]): boolean {
        return !(inputArray && inputArray.length > 0);
    }
    public static isEmptyArray(inputArray: object[]): boolean {
        return !(inputArray && inputArray.length > 0);
    }
    public static isEmptyString(input: string): boolean {
        return !(input && input.length > 0);
    }

    public static getSetLength(set: Set<string>): number {
        return (set.size);
    }
    public static getMapLength(map: { [id: string]: number; }): number {
        return (Object.keys(map).length);
    }

    public static getJsonStringified(jsonObject: any, indents: number = 4): string {
        return JSON.stringify(jsonObject, null, indents);
    }

    public static debuggingLog(
        message: any): void {
        const dateTimeString: string = (new Date()).toISOString();
        const logMessage: string = `[${dateTimeString}] LOG-MESSAGE: ${message}`;
        if (Utility.toPrintDebuggingLogToConsole) {
            // tslint:disable-next-line:no-console
            console.log(logMessage);
        }
    }

    public static debuggingThrow(
        message: any): void {
        const dateTimeString: string = (new Date()).toISOString();
        const logMessage: string = `[${dateTimeString}] ERROR-MESSAGE: ${message}`;
        throw new Error(JSON.stringify(logMessage));
    }

    public static almostEqual(first: number, second: number): boolean {
        return Utility.getAlmostEqualPercentage(first, second) < Utility.epsilon;
    }
    public static almostEqualRough(first: number, second: number): boolean {
        return Utility.getAlmostEqualPercentage(first, second) < Utility.epsilonRough;
    }
    public static getAlmostEqualPercentage(first: number, second: number): number {
        if (second === 0) {
            return Math.abs(first);
        }
        return Math.abs((first - second) / second);
    }
    public static almostEqualAbsolute(first: number, second: number): boolean {
        return Utility.getAlmostEqualAbsolute(first, second) < Utility.epsilon;
    }
    public static almostEqualAbsoluteRough(first: number, second: number): boolean {
        return Utility.getAlmostEqualAbsolute(first, second) < Utility.epsilonRough;
    }
    public static getAlmostEqualAbsolute(first: number, second: number): number {
        return Math.abs(first - second);
    }

    public static toBoolean(value: any): boolean {
        if (typeof(value) === "string") {
            value = (value as string).toLowerCase();
        }
        switch (value) {
            case true:
                return true;
            case "true":
                return true;
            case 1:
                return true;
            case "1":
                return true;
            case "on":
                return true;
            case "yes":
                return true;
            case "positive":
                return true;
            case false:
                return false;
            case "false":
                return false;
            case 0:
                return false;
            case "0":
                return false;
            case "off":
                return false;
            case "no":
                return false;
            case "negative":
                return false;
            default:
                return false;
        }
    }

    public static splitByPunctuation(
        input: string,
        splitDelimiter: string = " ",
        toRemoveEmptyElements: boolean = true): string[] {
        const delimiters: string[] = Utility.LanguageTokenPunctuationDelimiters;
        const replacementDelimiters: string[] = Utility.LanguageTokenPunctuationReplacementDelimiters;
        const numberDelimiters: number = delimiters.length;
        for (let i = 0; i < numberDelimiters; i++) {
            input = input.replace(delimiters[i], replacementDelimiters[i]);
        }
        let result: string[] = input.split(splitDelimiter);
        if (toRemoveEmptyElements) {
            result = result.filter((element: string) => {
                return (element && (element !== ""));
            });
        }
        return result;
    }

    public static iterableIteratorToArray<K>(iterator: IterableIterator<K>): K[] {
        const anArray: K[] = [];
        for (const element of iterator) {
            anArray.push(element);
        }
        return anArray;
    }

    public static splitStringWithCommaDelimitersFilteredByDoubleQuotes(input: string): string[] {
        return Utility.splitStringWithColumnDelimitersFilteredByQuotingDelimiters(
            input,
            ",",
            "\"");
        // ---- NOTE-FOR-REFERENCE ---- const splittedStrings: string[] = [];
        // ---- NOTE-FOR-REFERENCE ---- const commaIndexIndexes: number[] =
        // ---- NOTE-FOR-REFERENCE ----     Utility.getCommaIndexesFilteredByDoubleQuotes(input);
        // ---- NOTE-FOR-REFERENCE ---- let index: number = 0;
        // ---- NOTE-FOR-REFERENCE ---- for (const commaIndex of commaIndexIndexes) {
        // ---- NOTE-FOR-REFERENCE ----     splittedStrings.push(input.substring(index, commaIndex));
        // ---- NOTE-FOR-REFERENCE ----     index = commaIndex + 1;
        // ---- NOTE-FOR-REFERENCE ---- }
        // ---- NOTE-FOR-REFERENCE ---- return splittedStrings;
    }
    public static splitStringWithColumnDelimitersFilteredByQuotingDelimiters(
        input: string,
        delimiter: string,
        delimiterQuoting: string): string[] {
        const splittedStrings: string[] = [];
        const commaIndexIndexes: number[] = Utility.getColumnDelimiterIndexesFilteredByQuotingDelimiters(
            input,
            delimiter,
            delimiterQuoting);
        let index: number = 0;
        for (const commaIndex of commaIndexIndexes) {
            splittedStrings.push(input.substring(index, commaIndex));
            index = commaIndex + 1;
        }
        splittedStrings.push(input.substring(index));
        return splittedStrings;
    }

    public static getCommaIndexesFilteredByDoubleQuotes(input: string): number[] {
        return Utility.getColumnDelimiterIndexesFilteredByQuotingDelimiters(
            input,
            ",",
            "\"");
        // ---- NOTE-FOR-REFERENCE ---- const commaIndexes: number[] = Utility.getCommaIndexes(input);
        // ---- NOTE-FOR-REFERENCE ---- return Utility.filterOrderedNumberArrayFromOrderedRanges(
        // ---- NOTE-FOR-REFERENCE ----     commaIndexes,
        // ---- NOTE-FOR-REFERENCE ----     Utility.getDoubleQuoteIndexPairs(input));
    }
    public static getColumnDelimiterIndexesFilteredByQuotingDelimiters(
        input: string,
        delimiter: string,
        delimiterQuoting: string): number[] {
        const delimiterIndexes: number[] = Utility.getDelimiterIndexes(input, delimiter);
        return Utility.filterOrderedNumberArrayFromOrderedRanges(
            delimiterIndexes,
            Utility.getDelimiterIndexPairs(input, delimiterQuoting));
    }
    public static filterOrderedNumberArrayFromOrderedRanges(
        anArray: number[],
        filteringRanges: number[][]): number[] {
        const filteredArray: number[] = [];
        let indexArray: number = 0;
        const arrayLength: number = anArray.length;
        let indexfilteringRanges: number = 0;
        const filteringRangesLength: number = filteringRanges.length;
        while (indexArray < arrayLength) {
            const element: number = anArray[indexArray++];
            let filtered: boolean = false;
            while (indexfilteringRanges < filteringRangesLength) {
                const filteringRange: number[] = filteringRanges[indexfilteringRanges];
                const filteringRangeBegin: number = filteringRange[0];
                const filteringRangeEnd: number = filteringRange[1];
                if (element < filteringRangeBegin) {
                    break;
                }
                if (element < filteringRangeEnd) {
                    filtered = true;
                    break;
                }
                if (element >= filteringRangeEnd) {
                    indexfilteringRanges++;
                }
            }
            if (!filtered) {
                filteredArray.push(element);
            }
        }
        return filteredArray;
    }

    public static getDoubleQuoteIndexPairs(input: string): number[][] {
        return Utility.arrayToPairArray(Utility.getDoubleQuoteIndexes(input), input.length);
    }
    public static getDelimiterIndexPairs(input: string, delimiter: string): number[][] {
        return Utility.arrayToPairArray(Utility.getDelimiterIndexes(input, delimiter), input.length);
    }
    public static arrayToPairArray<T>(anArray: T[], lastElement: T): T[][] {
        const pairArray: T[][] = [];
        const arrayLength: number = anArray.length;
        let index: number = 0;
        while (index < arrayLength) {
            const firstElement: T = anArray[index++];
            let secondElement: T = lastElement;
            if (index < arrayLength) {
                secondElement = anArray[index++];
            }
            pairArray.push([firstElement, secondElement]);
        }
        return pairArray;
    }

    public static getCommaIndexes(input: string): number[] {
        return Utility.getDelimiterIndexes(input, ",");
    }
    public static getDoubleQuoteIndexes(input: string): number[] {
        return Utility.getDelimiterIndexes(input, "\"");
    }
    public static getDelimiterIndexes(input: string, delimiter: string): number[] {
        const delimiterIndexes: number[] = [];
        const inputLength: number = input.length;
        let inputIndex: number = 0;
        while (inputIndex < inputLength) {
            const delimiterIndex: number = input.indexOf(delimiter, inputIndex);
            if (delimiterIndex < 0) {
                break;
            }
            delimiterIndexes.push(delimiterIndex);
            inputIndex = delimiterIndex + 1;
        }
        return delimiterIndexes;
    }

    protected static rngBurninIterations: number = 16384;
    protected static rngBurninDone: boolean = false;
    protected static xorshift128plusState0: number = 1;
    protected static xorshift128plusState1: number = 2;

    protected static rngBurninIterationsBigInt: number = 16384;
    protected static rngBurninDoneBigInt: boolean = false;
    protected static bigint23: bigint = BigInt(23);
    protected static bigint17: bigint = BigInt(17);
    protected static bigint26: bigint = BigInt(26);
    protected static xorshift128plusState0BigInt: bigint = BigInt(1);
    protected static xorshift128plusState1BigInt: bigint = BigInt(2);
    protected static xorshift128plusCycleBigInt: bigint =
        BigInt("0xffffffffffffffff"); // ---- NOTE: 2^64 - 1 === 18446744073709551615
    protected static xorshift128plusCycleBigIntFloat: number =
        Number(Utility.xorshift128plusCycleBigInt);

}
