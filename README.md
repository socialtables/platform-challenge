# Apprentice Challenge - Infrastructure

Your task is to create a basic events API allowing new events to be saved to a data store.

Your solution should implement the following endpoints:

GET /
Should return status info in the form of:
```
{
  "title": "Events API",
  "version": "1.0.0",
  "status": "ok"
}
```
1. The status property should be set to "ok"
2. The version property should return the version from package.json

GET /events
Should return json listing (array) of all events in the format:
```
{
  "data": [
    {
      "name": "Interview for sweet dev job",
      "start": "2016-10-30T20:44:49.100Z",
      "end": "2016-10-30T20:44:49.100Z",
      "id": "659ab379-083f-4414-a73a-aa593c3f9892"
    }
  ]
}
```

GET /events/:event_id
Should return json for a specific event in the format:
```
{
  "data": {
    "name": "Interview for sweet dev job",
    "start": "2016-10-30T20:44:49.100Z",
    "end": "2016-10-30T20:44:49.100Z",
    "id": "659ab379-083f-4414-a73a-aa593c3f9892"
  }
}
```

POST /events
Should allow creation of multiple events by posting an array in the format:
```
{
    "data": [
        {
            "name": "Interview for sweet dev job",
            "start": "2016-10-30T20:44:49.100Z",
            "end": "2016-10-30T20:44:49.100Z"
		},
		{
            "name": "Another event",
            "start": "2016-10-25T20:44:49.100Z",
            "end": "2016-10-25T20:44:49.100Z"
		}
    ]
}
```
Should return an array of inserted ids:
```
{
  "inserted": [
    "5297c1e0-8017-4126-bac9-3ce5c2c8f00a",
    "e78bcdd7-960e-4e1e-b05e-fbeade8b505d"
  ]
}
```

PUT /events/:event_id
Should replace an event with a particular id with new data:
```
{
    "data":
        {
            "name": "Maybe later...",
            "start": "2016-11-30T20:44:49.100Z",
            "end": "2016-11-30T20:44:49.100Z"
		}
}
```
Should return the replaced id:
```
{
	"replaced": [
		"5297c1e0-8017-4126-bac9-3ce5c2c8f00a"
	]
}
```

DELETE /events/:event_id
Should delete an event with a particular id.

Should return the deleted id:
```
{
	"deleted": [
		"5297c1e0-8017-4126-bac9-3ce5c2c8f00a"
	]
}
```

A test suite is provided to guide you and let you know when you have completed the task. You can run
the suite with the ```npm test``` command.

GET /secrets
Should get a list of secrets:
```
{
  "secrets": [
    "The answer is 42."
  ]
}
```
The twist:  You should protect this secrets endpoint with basic authentication. Write a simple middleware that
checks the authorization header against a username and passwordof your choosing.  If you hit this endpoint
without credentials, it should return a 401 Unauthorized status. The auth middleware should only be 
applied to this endpoint.

### Instructions:

1. Get a recent version of node.js (6 or higher): nodejs.org
2. clone this repo
3. cd to the repo's directory and run ```npm install``
3. If you prefer to use a specific persistence layer or database, install that and use ```npm``` to 
install the bindings. Popular choices include: mysql, sqlite, redis, etc. If you'd rather not
have to think about it, the package.json included in this repo depends on bindings to leveldb, a simple
embedded key value store, see docs here: https://www.npmjs.com/package/levelup
4. Run npm ```npm test``` to see what tests are failing
5. develop and repeat #4 until all the tests pass.
