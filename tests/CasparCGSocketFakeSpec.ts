import "jasmine";
import {CasparCGSocket} from "../src/lib/CasparCGSocket";

describe("CasparCG Socket", () => {

	describe("object instantination and options", () => {
		it("should instantiats correctly", () => {
			let instance = new CasparCGSocket("host1", 1234, true, 1000, 5);
			expect(instance).toEqual(jasmine.any(CasparCGSocket));
		});
	});
	describe("reconnection", () => {
		let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

		beforeAll(() => {
			this.instance = null;
			this.reconnectInterval = 500;
			this.attempts = 4;
			this.autoReconnect = true;
		});

		beforeEach(() => {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = this.reconnectInterval * this.attempts + 100;
			this.instance = new CasparCGSocket("host1", 1234, this.autoReconnect, this.reconnectInterval, this.attempts);
		});
		afterEach(() => {
			this.instance.dispose();
			jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		});

		it("should retry connection if autoReconnect and more attempts to go", (done) => {
			spyOn(this.instance, "connect").and.callFake(() => {
				this.instance["_onClose"](true);
			});

			setTimeout(() => {
				expect(this.instance.connect).toHaveBeenCalledTimes(this.attempts + 1);
				done();
			}, this.reconnectInterval * this.attempts + 50);
			this.instance.connect();
		});

		it("should retry connection if autoReconnect and infinite attemtps", (done) => {
			this.instance = new CasparCGSocket("host1", 1234, this.autoReconnect, this.reconnectInterval, Infinity);
			spyOn(this.instance, "connect").and.callFake(() => {
				this.instance["_onClose"](true);
			});

			setTimeout(() => {
				expect(this.instance.connect).toHaveBeenCalledTimes(this.attempts + 1);
				done();
			}, this.reconnectInterval * this.attempts + 50);
			this.instance.connect();
		});

		it("should not retry if not autoReconnect, even with available or infinite attempts", (done) => {
			this.instance = new CasparCGSocket("host1", 1234, false, this.reconnectInterval, 0);
			spyOn(this.instance, "connect").and.callFake(() => {
				this.instance["_onClose"](true);
			});

			setTimeout(() => {
				expect(this.instance.connect).toHaveBeenCalledTimes(1);
				done();
			}, this.reconnectInterval * this.attempts);
			this.instance.connect();
		});

		it("should not retry if autoReconnect if no more available attempts", (done) => {
			this.instance = new CasparCGSocket("host1", 1234, this.autoReconnect, this.reconnectInterval / 2, this.attempts);
			spyOn(this.instance, "connect").and.callFake(() => {
				this.instance["_onClose"](true);
			});

			setTimeout(() => {
				expect(this.instance.connect).toHaveBeenCalledTimes(this.attempts + 1);
				done();
			}, this.reconnectInterval * this.attempts);
			this.instance.connect();
		});

		it("should not reconnect if closed without error", (done) => {
			spyOn(this.instance, "connect");

			setTimeout(() => {
				expect(this.instance.connect).toHaveBeenCalledTimes(1);
				done();
			}, this.reconnectInterval * this.attempts);
			this.instance.connect();
			setTimeout(() => {
				this.instance["_onClose"](false);
			}, this.reconnectInterval / 2);
		});

		it("should not reconnect if successfully connected during retries", (done) => {
			let i = 1;
			let successAttempt = 3;

			spyOn(this.instance, "connect").and.callFake(() => {
				if (i < successAttempt) {
					this.instance["_onClose"](true);
				}else {
					this.instance["_onConnected"]();
				}
				i++;
			});

			setTimeout(() => {
				expect(this.instance.connect).toHaveBeenCalledTimes(successAttempt);
				done();
			}, this.reconnectInterval * this.attempts);
			this.instance.connect();
		});

		it("should reset number of attempts on connection success", (done) => {
			let i = 1;
			let successAttempt = 3;

			spyOn(this.instance, "connect").and.callFake(() => {
				if (i < successAttempt) {
					this.instance["_onClose"](true);
				}else {
					this.instance["_onConnected"]();
				}
				i++;
			});
			setTimeout(() => {
				expect(this.instance["_reconnectAttempt"]).toBe(0);
				done();
			}, this.reconnectInterval * this.attempts);
			this.instance.connect();
		});

		it("should dispose reconnectInterval on connection success", () => {
			let i = 1;
			let successAttempt = 3;

			spyOn(this.instance, "connect").and.callFake(() => {
				if (i < successAttempt) {
					this.instance["_onClose"](true);
				}else {
					this.instance["_onConnected"]();
				}
				i++;
			});
			setTimeout(() => {
				expect(this.instance["_reconnectInterval"]).toBe(undefined);
			}, this.reconnectInterval * this.attempts);
			this.instance.connect();
		});

		it("should dispose reconnectInterval on disconnection during reconnection attempts", (done) => {
			let i = 1;
			let successAttempt = 3;

			spyOn(this.instance, "connect").and.callFake(() => {
				if (i < successAttempt) {
					this.instance["_onClose"](true);
				}else {
					this.instance.disconnect();
				}
				i++;
			});
			setTimeout(() => {
				expect(this.instance["_reconnectInterval"]).toBe(undefined);
				done();
			}, this.reconnectInterval * this.attempts);
			this.instance.connect();
		});
	});
});