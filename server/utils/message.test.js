const expect = require('expect');

const {generateMessage} = require('./message');

describe("generateMessage",()=>{
    it("should generate correct message object",()=>{

        var from = "ankit";
        var text = "to aman";
        var message = generateMessage(from, text);
        expect(message.createAt).toBeA("number");
        expect(message).toInclude({from,text});
    })
})