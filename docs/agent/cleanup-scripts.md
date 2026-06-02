# Cleanup Scripts

- Keep generated project artifacts under `clean:next`, including Next output, generated TypeScript files, generated
  i18n declarations, and the Dependency Cruiser SVG graph.
- Keep dependency installs under `clean:modules`.
- Keep generated HTTPS certificates under `clean:certs`; `clean:all` should include certificates along with the other
  cleanup targets.
- Keep local development port cleanup under `clean:ports`. The project uses `fkill-cli`; list each `:port` explicitly
  because `fkill` does not support a documented port-range argument.
