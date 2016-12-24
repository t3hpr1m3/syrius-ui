# Syrius

Music server for...me.


## Does it work?

No

## How do I run it?

It doesn't do anything useful yet, but I think I've found my happy place when it
comes to webpack/react in a universal app.  Instead of having lots of
complicated npm scripts to handle development/production, I've just got the
standard build/start.  The app responds to _environment variables_ like all good
apps should.  So, to buid for *production*:

```
NODE_ENV=production npm run build
```

You can figure out how *development* would work, can't you?
