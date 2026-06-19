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

          # Colors for prettier output
          GREEN='\033[0;32m'
          YELLOW='\033[1;33m'
          CYAN='\033[0;36m'
          NC='\033[0m'

          echo "''${GREEN}=== remix-shadcn-starter dev shell ===''${NC}"
          echo ""

          echo "''${CYAN}Node:''${NC}    $(node --version)"
          echo "''${CYAN}PNPM:''${NC}    $(pnpm --version)"

          # Docker check (daemon may not be running on NixOS)
          if command -v docker >/dev/null 2>&1; then
            if docker info >/dev/null 2>&1; then
              echo "''${CYAN}Docker:''${NC}  $(docker --version)"
            else
              echo "''${YELLOW}Docker CLI installed, but the daemon is not running.''${NC}"
            fi
          fi

          if command -v lefthook >/dev/null 2>&1; then
            echo "''${CYAN}Lefthook:''${NC} $(lefthook version)"
          fi

          echo ""

          # Bootstrap .env from template if missing
          if [[ ! -f .env && -f .env.example ]]; then
            echo "''${YELLOW}Creating .env from .env.example...''${NC}"
            cp .env.example .env
          fi

          # Install dependencies if node_modules is missing
          if [[ ! -d node_modules ]]; then
            echo "''${YELLOW}Installing dependencies with pnpm...''${NC}"
            pnpm install
          fi

          # Install git hooks
          if [[ -d .git ]]; then
            lefthook install
          fi
        '';
      };
    });
}
