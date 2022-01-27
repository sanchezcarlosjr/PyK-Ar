export interface Cycle {
    cycle: string;
    mass: string;
    peak: string;
    measure: string;
    intensity: string;
    time: string;
}

export interface Experiment {
    cycles: Cycle[];
    analysis_date: string;
    spectrum: string;
    sample_id: string;
    type: string;
    spectrum_user_name: string;
    file_name: string;
}