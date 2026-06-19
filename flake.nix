{
  description = "Development environment for remix-shadcn-starter";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      formatter = pkgs.alejandra;

      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_24
          pnpm
          docker
          docker-compose
          ni
          lefthook
          biome
          git
          cocogitto
          opencode
          gh
        ];

        shellHook = ''
          export NODE_ENV=development

          echo "=== remix-shadcn-starter dev shell ==="
          echo ""
          echo "Node:    $(node --version)"
          echo "PNPM:    $(pnpm --version)"

          # Docker check (daemon may not be running on NixOS)
          if command -v docker >/dev/null 2>&1; then
            if docker info >/dev/null 2>&1; then
              echo "Docker:  $(docker --version)"
              echo "Compose: $(docker compose version)"
            else
              echo "Docker CLI installed, but the daemon is not running."
            fi
          fi

          if command -v lefthook >/dev/null 2>&1; then
            echo "Lefthook: $(lefthook version)"
          fi

          echo ""

          # Bootstrap .env from template if missing
          if [[ ! -f .env && -f .env.example ]]; then
            echo "Creating .env from .env.example..."
            cp .env.example .env
          fi

          # Install git hooks
          if [[ -d .git ]]; then
            lefthook install
          fi
        '';
      };
    });
}
