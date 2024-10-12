import { SyntheticEvent } from "react";
import { IUser } from "./user";

export interface IDestination{
    _id: string;
    country: string;
    city: string;
    image_url: string;
    user: IUser | null | string; 
  }


