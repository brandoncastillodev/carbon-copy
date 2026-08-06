interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
}

interface FavState {
  id: string | null;
  style: string | null;
  format: string | null;
  color: string | null;
}

interface RootState {
  user: UserState;
  fav: FavState;
}

interface FavoriteItem {
  style: {
    id: string;
    style: string;
    format: string;
    color: string;
  };
}

declare module "*.css";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "react-ace";
declare module "ace-builds";
declare module "program-language-detector";
declare module "html2canvas";
declare module "downloadjs";
declare module "js-cookie";
declare module "react-notifications-component";