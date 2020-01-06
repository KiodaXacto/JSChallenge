export default function toCsvFile(data) {
    console.table(data);
    let csvData = data.map(item => item.join(","));
    csvData = csvData.join("\r\n");
    let blob = new Blob([csvData]);
    let a = document.createElement("a");

    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    a.targe = "_BLANK";
    a.download = "NEO_.csv";
    a.click();
}