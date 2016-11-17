const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require("../index");
chai.use(chaiHttp);

let postEvents = require("./fixtures/postEvents");
let singleEvent = require("./fixtures/singleEvent");
let replacedEvent = require("./fixtures/replacedEvent");
let eventToDelete = require("./fixtures/eventToDelete");

const AWFUL_SEMVER_REGEX =  /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;

describe("should call our events api", function() {
	let api = chai.request(app)
	it("and should report its status and version", function() {
		return api.get('/')
			.then(res => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property("status").and.equal("ok");
				expect(res.body).to.have.property("version");
				expect(res.body.version).to.match(AWFUL_SEMVER_REGEX);
			})
	});

	it("and should protect its secrets", function() {
		return api.get('/secrets')
			.then(res => {
				throw("Shouldn't get here.")
			})
			.catch(err => {
				expect(err).to.have.status(401);
			})
	});

	it("and should divulge its secrets to an admin", function() {
		return api.get('/secrets')
			.auth('admin', 'password')
			.then(res => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property("secrets");
			})
	})

	it("and should create some events", function() {
		return api
			.post('/events')
			.send(postEvents)
			.then(res => {
				expect(res).to.have.status(201);
				expect(res).to.have.body;
				expect(res).to.be.json;
			});
	});

	it("and should return an event by id", function() {
		return api
			.post('/events')
			.send(singleEvent)
			.then(postRes => {
				let eventId = postRes.body.inserted[0];
				return api.get(`/events/${eventId}`)
					.then(function (getRes) {
						expect(getRes).to.have.status(200);
						expect(getRes).to.be.json;
						var getBody = getRes.body;
						expect(getBody).to.have.property.name;
						expect(getBody).to.have.property.start;
						expect(getBody).to.have.property.end;
					});
			});
	});

	it("and should replace an event by id", function() {
		return Promise.resolve()
			.then(() => {
				return api.post('/events')
					.send(singleEvent)
					.then(postRes => {
						expect(postRes).to.have.status(201);
						expect(postRes.body).to.have.property.inserted;
						expect(postRes.body.inserted).to.have.lengthOf(1);
						return postRes.body.inserted[0];
					});
			})
			.then(eventId => {
				return api.get(`/events/${eventId}`)
					.then(function (getRes) {
						expect(getRes).to.have.status(200);
						expect(getRes.body).to.have.property("data");
						return getRes.body.data.id;
					});
			})
			.then(eventId => {
				return api.put(`/events/${eventId}`)
					.send(replacedEvent)
					.then((putRes) => {
						expect(putRes).to.have.status(200);
						expect(putRes.body).to.have.property("replaced");
						expect(putRes.body.replaced).to.have.lengthOf(1);
						return putRes.body.replaced[0];
					});
			})
			.then(eventId => {
				return api.get(`/events/${eventId}`)
					.then(function (getRes) {
						expect(getRes).to.have.status(200);
						expect(getRes.body).to.have.property("data");
						expect(getRes.body.data).to.have.property("name").and.equal(replacedEvent.data.name);
						expect(getRes.body.data).to.have.property("start").and.equal(replacedEvent.data.start);
						expect(getRes.body.data).to.have.property("end").and.equal(replacedEvent.data.end);
						return true;
					});
			});
	});

	it("and should delete an event by id", function() {
		return Promise.resolve()
			.then(() => {
				return api.post('/events')
					.send(eventToDelete)
					.then(postRes => {
						expect(postRes).to.have.status(201);
						expect(postRes.body).to.have.property.inserted;
						return postRes.body.inserted[0];
					});
			})
			.then(eventId => {
				return api.delete(`/events/${eventId}`)
					.then(delRes => {
						expect(delRes).to.have.status(202);
						expect(delRes.body).to.have.property("deleted");
						expect(delRes.body.deleted).to.have.lengthOf(1);
						return eventId;
					})
			})
			.then(eventId => {
				return api.get(`/events/${eventId}`)
					.then(getRes => {
						throw("shouldn't get here");
					})
					.catch(err => {
						expect(err).to.have.status(404);
						return true;
					})
			})
	});
});