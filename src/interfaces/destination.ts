import { SyntheticEvent } from "react";
import { IUser } from "./user";

export interface IDestination{
    _id: string;
    country: string;
    city: string;
    image_url: string;
    user: IUser | null | string; 
  }


export interface IComment {
  id: number;
  review: string;
  created_at: string; // ISO 8601 format string
  updated_at: string; // ISO 8601 format string
  image_url: string; // URL to the review image
  destination: number; // ID of the destination this comment belongs to
  owner: number; // ID of the owner of the comment
}

export interface IDestination {
  id: number; // Unique ID of the destination
  comments: IComment[]; // Array of comments associated with the destination
  country: string; // Name of the country
  city: string; // Name of the city
  date_from: string; // Start date of the trip (ISO 8601 format)
  date_to: string; // End date of the trip (ISO 8601 format)
  image_url: string; // URL to the destination image
  owner: number; // ID of the owner of the destination
}