const expect = require('expect');

const {generateMessage , generateLocationMessage} = require('./message');

describe("generateMessage",()=>{
    it("should generate correct message object",()=>{

        var from = "ankit";
        var text = "to aman";
        var message = generateMessage(from, text);
        expect(message.createAt).toBeA("number");
        expect(message).toInclude({from,text});
    })
})

describe("generateLocationMessage",()=>{
    it("should generate correct location message",()=>{
        var from = "ankit";
        var latitude = 14413163;
        var longitude = 144446486;
        var locationMessage = generateLocationMessage(from,latitude,longitude);
        expect(locationMessage.from).toBe(from);
        expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(locationMessage.createAt).toBeA("number");
    })
})