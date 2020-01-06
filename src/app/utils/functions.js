export default function toCsvFile(data){
    console.table(data);
    let csvData = [];
    data.map(item=>item.join(","));
    csvData = csvData.join("%0A");
    let a = document.createElement("a");
    a.href = "data:attachement/csv"+csvData;
    a.targe = "_BLANK";
    a.download="NEO.csv";
    a.click();
}