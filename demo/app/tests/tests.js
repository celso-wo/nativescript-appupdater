var Appupdater = require("nativescript-appupdater").Appupdater;
var appupdater = new Appupdater();

describe("greet function", function() {
    it("exists", function() {
        expect(appupdater.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(appupdater.greet()).toEqual("Hello, NS");
    });
});