# Telnet/SSH port
1863

# Signatures

Right now; I only have ideas for verifying tally and ballot counts through git history and file timestamps.
I've got a hazy-idea for "signing" all of these objects; the bigger idea being that each publisher of every file while polling can generate a temporary PGP signature; only committing the public part of that signature or something like that to the repo.
They can then provide "signatures" for each file they add to the repository.. when accepting new files one can check them against new signatures to verify they came from one of the published sources, yet also obfuscating with every added signature which one any one might have come from?
This is not yet a well-formulated idea.

