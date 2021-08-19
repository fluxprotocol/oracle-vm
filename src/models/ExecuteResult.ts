export interface ExecuteResult {
    code: number;
    gasUsed: string;
    logs: string[];
}


export interface ValidLoggedOutcome {
    type: 'Valid';
    value: string;
}

export interface InvalidLoggedOutcome {
    type: 'Invalid';
}

export type LoggedOutcome = ValidLoggedOutcome | InvalidLoggedOutcome;
