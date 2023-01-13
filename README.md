# hello
A springboard for a Javascript app, containing everything needed front-end, back-end, DB, etc. to create a new JS app.  It says "hello" to you, or someone, maybe the world.

## Technologies

- DB TBD
- Node
- React
- Typescript
- Less

## Technical Debt

### Monorepo'ish architecture

It would be nice to have both `/client` and `/server` use as much overlap as possible in a 
"monorepo"-ish style.  These could still be in the same single repo, but share certain basics.  They might not want to share `package.json`, since those are likely to diverge.  But they might want to share technologies used by both client and server.

* Babel config -- SHOULD ALREADY BE DONE WITH `babel.config.json` AT ROOT.
* Flow config -- Flow does not really have a good way to do this.  SEE: https://github.com/flow-typed/flow-typed/issues/1391.  This might be the solution: https://medium.com/inato/how-to-use-flow-in-a-mono-repo-8947d43d50fb

