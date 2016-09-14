/// <reference path="../typings/index.d.ts" />
import {CasparCG} from "../src/CasparCG";
import {CasparCGSocket} from "../src/lib/CasparCGSocket";
import {Enum} from "../src/lib/ServerStateEnum";

describe("AMCPProtocol_v2_1", () => {
	xdescribe("basic signature", () => {

		beforeAll((done) => {
			this.instance = new CasparCG({host: "52.208.248.56", onConnected: (event) => done()});
		});

		afterAll(() => {
			this.instance.disconnect();
		});

		it("version", () => {
			this.response = this.instance.version();
		});

		it("helpConsumer", () => {
			this.response = this.instance.helpConsumer(Enum.Consumer.SCREEN);
		});
	});
});