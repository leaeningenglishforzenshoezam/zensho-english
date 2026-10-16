# Local recovery backup — 2026-10-16

This branch preserves a git bundle containing local recovery commit c073de1 and mission backup history after 0d1e42e. It is NOT a production release or a complete restoration of the lost UI revision.

In this repository checkout, reconstruct and fetch with:

```sh
python3 -c "import pathlib,base64; p=pathlib.Path('recovery-backup'); pathlib.Path('recovered.bundle').write_bytes(b''.join(base64.b64decode(x.read_text()) for x in sorted(p.glob('part-*.b64'))))"
git fetch recovered.bundle HEAD:refs/heads/recovered-local-preview
git switch recovered-local-preview
```

See LOCAL_PREVIEW.md in that restored branch. Do not deploy the local-only API to production.
