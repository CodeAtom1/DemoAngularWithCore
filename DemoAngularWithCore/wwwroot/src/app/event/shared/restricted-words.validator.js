"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function restrictedWords(words) {
    return function (formControl) {
        if (!words)
            return null;
        var invalidWords = words
            .map(function (w) { return formControl.value.includes(w) ? w : null; })
            .filter(function (w) { return w != null; });
        return invalidWords && invalidWords.length > 0
            ? { 'restrictedWords': invalidWords.join(', ') }
            : null;
    };
}
exports.restrictedWords = restrictedWords;
