{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    pkgs.pnpm
    pkgs.docker
    pkgs.ni
    pkgs.lefthook
    pkgs.biome
  ];

  shellHook = ''
    export NODE_ENV=development
    echo "Node version: $(node --version)"
    echo "PNPM version: $(pnpm --version)"
    echo "Docker version: $(docker --version)"
    echo "Lefthook version: $(lefthook version)"
    lefthook install
  '';
}
