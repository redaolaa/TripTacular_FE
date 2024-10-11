import { SyntheticEvent } from "react";
import { IUser } from "./user";

export interface IPost{
    _id: string;
    name: string;
    image: string;
    zone: string;
    user: IUser | null | string; // <--- this should be updated to reflect the user type
  }


