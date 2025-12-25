{
  description = "Development environment for remix-shadcn-starter";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_20
          pkgs.pnpm
          pkgs.docker
          pkgs.ni
          pkgs.lefthook
          pkgs.biome
          pkgs.git
          pkgs.gh
        ];
        shellHook = ''
          export NODE_ENV=development
          echo "Node version: $(node --version)"
          echo "PNPM version: $(pnpm --version)"
          echo "Docker version: $(docker --version)"
          echo "Lefthook version: $(lefthook version)"
          lefthook install
        '';
      };
    });
}
