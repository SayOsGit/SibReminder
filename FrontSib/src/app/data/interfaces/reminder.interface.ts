export interface Reminder{
    id: number,
    shortDesc: string,
    fullDesc: string,
    dateCreate: Date,
    dateFinish: Date | null,
    statusId: number

}