export const readWebFilesPipe = (experiments: {rawFile: File}[]) => {
    return experiments.map((experiment) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                resolve(reader.result);
            };
            reader.readAsText(experiment.rawFile);
        });
    });
};