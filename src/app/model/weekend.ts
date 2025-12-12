import { Idea } from "./idea";

export interface Weekend {
    id: number,
    title: string,
    first_activity: Idea,
    second_activity: Idea,
    mood: string
}
