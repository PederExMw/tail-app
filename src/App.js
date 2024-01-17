import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [excelFile, setExcelFile] = useState(null);
  const [error, setError] = useState(null);

  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setError("Lütfen bir excel dosyası seçiniz");
        setExcelFile(null);
      }
      console.log(selectedFile.type);
    } else {
      console.log("plase select folder :>> ");
    }
  };

  const formatColumnName = [
    "names",
    "email",
    "password",
    "branch",
    "department",
  ];

  const handleSubmit = (p) => {
    p.preventDefault();
    if (excelFile !== null) {
      const work = XLSX.read(excelFile, { type: "buffer" });
      const sheetName = work.SheetNames[0];
      const worksheet = work.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // if (formatColumnName === data) {
      //   setExcelData(data.slice(0, 10));
      // } else {
      //   alert("Lütfen Excel Column İsimlerini Kontrol edin");
      // }
      const a =
        excelData?.length > 0
          ? Object.keys(excelData[0]).map((e) => {
              return e;
            })
          : false;
      console.log("a :>> ", a);
      setExcelData(data.slice(0, 10));
    }
  };

  const send = () => {
    console.log("Gönderiliyor...");
  };

  const clo = () => {
    const a = excelData?.map((item) => {
      return {
        name: item.name,
        email: item.email,
        password: item.password,
        branch: item.branch,
        department: item.department,
      };
    });

    console.log(a);
  };

  return (
    <div class="Container">
      <form onSubmit={handleSubmit}>
        <label class="flex m-7"> Bir Excel Dosyası Seçiniz </label>
        <input
          type="file"
          class="block  text-sm text-slate-500
        flex
        m-3
        rounded-full
        w-96
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
          required
          onChange={handleFile}
        />
        {error ? (
          <div className="bg-red-500 w-64 p-3 mx-3" role="alert">
            {error}
          </div>
        ) : null}
        <button
          type="submit"
          class="rounded-md bg-sky-600 w-24 h-12 m-3 shadow-lg shadow-sky-600"
        >
          Yükle
        </button>
        <button
          onClick={clo}
          className="rounded-md bg-rose-600 p-3 shadow-lg shadow-rose-600"
        >
          JSON Formatına Çevir
        </button>
        <button
          onClick={send}
          className="rounded-md bg-slate-300 p-3 shadow-lg shadow-slate-300 m-3"
        >
          Gönder
        </button>
      </form>
      {excelData ? (
        <table className="table">
          <thead>
            <tr class="tableMain text-left">
              {Object.keys(excelData[0]).map((key) => (
                <th key={key}> {key} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((invExcelData, index) => (
              <tr key={index} className="text-left">
                {Object.keys(invExcelData).map((key) => (
                  <td key={key}> {invExcelData[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex m-3"> İçerik Bulunamadı </div>
      )}
    </div>
  );
}

export default App;
