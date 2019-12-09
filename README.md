# Social Tables Platform Intern Challenge
Social Tables engineering is looking for an intern!  The position is a great opportunity to learn and grow on a fantastic team working with fun, exciting tech. Your task, should you choose to accept it, is to create a basic events API allowing new events to be saved to a data store. Women, LGBTQ+ and people of color are encouraged to apply!

Your solution should implement the following endpoints:

### GET /
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

### GET /events
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

### GET /events/:event_id
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

### POST /events
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

### PUT /events/:event_id
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

### DELETE /events/:event_id
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

### GET /secrets
Should get a list of secrets:
```
{
  "secrets": [
    "The answer is 42."
  ]
}
```
The twist:  You should protect this secrets endpoint with basic authentication. Write a simple middleware that
checks the authorization header against a username and password of your choosing.  If you hit this endpoint
without credentials, it should return a 401 Unauthorized status. The auth middleware should only be
applied to this endpoint.

## Getting started

A test suite has been provided in the /test folder.  You should examine these tests to figure out additional
requirements like proper HTTP status codes that should be returned from your endpoints.  Do not modify the tests.

1. Get a recent version of node.js (6 or higher): nodejs.org
2. Clone this repo
3. cd to the repo's directory and run ``npm install``
3. If you prefer to use a specific persistence layer or database, install that and use ```npm``` to
install the bindings. Popular choices include: mysql, sqlite, redis, etc. If you'd rather not
have to think about it, the package.json included in this repo depends on bindings to leveldb, a simple
embedded key value store, see docs here: https://www.npmjs.com/package/levelup
4. Run npm ```npm test``` to see what tests are failing
5. Develop and repeat #5 until all the tests pass.

## How to submit
Send all your files in one email to internchallenge@socialtables.com with the subject line, Social Tables Venue Mapper Intern Challenge.

You must include the following files in your email: YourInitials-readme.{md, txt}, YourInitials-code.{tar.gz, zip}, YourInitials-resume.pdf (where YourInitials are your initials).

These files will contain:

* The YourInitials-readme.{md, txt} contains instructions for running your code and any notes you wish to include.
* The YourInitials-code.{tar.gz, zip} contains your code. You can optionally also submit a link to your code in the readme file.
* A file named YourInitials-resume.pdf containing your resume.

Submitting your node-modules folder isn't necessary, for example, because we can get it by running npm install; however, you should at least submit any files you found necessary to change and enough support and explanation so we can reproduce your results. In any case, include all the information in YourInitials-readme.{md, txt}.

## FAQ

**Can I copy code from the Internet?**  
You must cite any outside resources you use in your work (for example, using comments to denote a snippet obtained from Stack Overflow).  

**Can I post my solution to the Internet/GitHub?**  
We ask that you don't. It makes it much harder to evaluate submissions when a completed solution is available for review.

**Can I copy someone else's submission, cite it, and submit?**  
No.

**Can I submit without completing all the challenge?**  
Yes.

**What is the status of my application?**  
Email <internchallenge@socialtables.com>.

**I see a typo.**  
Submit a pr.

**I still have a question.**  
Submit a Github issue.
