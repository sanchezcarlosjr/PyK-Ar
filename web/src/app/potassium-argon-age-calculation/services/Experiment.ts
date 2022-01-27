export interface Cycle {
    cycle: string;
    mass: number;
    peak: string;
    measure: string;
    intensity: number;
    time: number;
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

export interface PotassiumArgonAgeParameter {
    delta: number;
    gramsOfK: number;
    weight: number;
    ar40_divides_ar38_t: number;
    ar36_divides_ar38_t: number;
    experiments: { rawFile: File } | Experiment [];
}