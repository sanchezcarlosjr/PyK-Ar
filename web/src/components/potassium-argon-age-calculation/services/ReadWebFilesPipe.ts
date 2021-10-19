export interface FileInputFormat {
    rawFile: File;
}

export const readWebFilesPipe = (experiments: FileInputFormat[]|File[]) => {
    return experiments.map((experiment) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                resolve(reader.result);
            };
            let file: File = (experiment instanceof File) ? experiment : (experiment as FileInputFormat).rawFile;
            reader.readAsText(file);
        });
    });
};