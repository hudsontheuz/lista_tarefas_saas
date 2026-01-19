import React, { createContext, useContext, useMemo, useReducer } from "react";

type MaterialTailwindState = {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: "white" | "gray" | "transparent";
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
};

type Action =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: "white" | "gray" | "transparent" }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

const MaterialTailwindContext = createContext<
  [MaterialTailwindState, React.Dispatch<Action>] | null
>(null);

export function reducer(state: MaterialTailwindState, action: Action) {
  switch (action.type) {
    case "OPEN_SIDENAV":
      return { ...state, openSidenav: action.value };
    case "SIDENAV_TYPE":
      return { ...state, sidenavType: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    default:
      throw new Error("Unhandled action type");
  }
}

export function MaterialTailwindControllerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState: MaterialTailwindState = {
    openSidenav: false,
    sidenavColor: "gray",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => [controller, dispatch] as [MaterialTailwindState, React.Dispatch<Action>],
    [controller]
  );

  return (
    <MaterialTailwindContext.Provider value={value}>
      {children}
    </MaterialTailwindContext.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = useContext(MaterialTailwindContext);
  if (!context) {
    throw new Error(
      "useMaterialTailwindController must be used within the provider"
    );
  }
  return context;
}

// Actions
export const setOpenSidenav = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: "OPEN_SIDENAV", value });

export const setSidenavType = (
  dispatch: React.Dispatch<Action>,
  value: "white" | "gray" | "transparent"
) => dispatch({ type: "SIDENAV_TYPE", value });

export const setSidenavColor = (
  dispatch: React.Dispatch<Action>,
  value: string
) => dispatch({ type: "SIDENAV_COLOR", value });

export const setTransparentNavbar = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });

export const setFixedNavbar = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "FIXED_NAVBAR", value });

export const setOpenConfigurator = (
  dispatch: React.Dispatch<Action>,
  value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });
