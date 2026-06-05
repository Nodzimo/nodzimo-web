# Repository Text Format

- The repository normalizes text files to LF through `.gitattributes`.
- Keep the global text rule as `* text=auto eol=lf`.
- Keep Windows command scripts on CRLF with explicit `*.bat text eol=crlf` and `*.cmd text eol=crlf` rules.
- Do not change repository encoding or line-ending policy to satisfy one editor warning. Check `.gitattributes` and
  Git normalization first.
